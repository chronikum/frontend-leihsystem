import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/models/Item';
import { Request } from 'src/app/models/Request';
import { Reservation } from 'src/app/models/Reservation';
import { SubRequest } from 'src/app/models/SubRequest';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-review-reservation-request-modal',
  templateUrl: './review-reservation-request-modal.component.html',
  styleUrls: ['./review-reservation-request-modal.component.scss']
})
export class ReviewReservationRequestModalComponent implements OnInit {


  /**
   * The reservation request
   */
  reservationRequest: Request;

  /**
   * The suggested item data
   */
  suggestions: Item[]

  /**
   * Suggested items
   */
  suggestedItems = new EventEmitter<Item[]>();


  /**
   * EventEmitter to fire subrequest condition updates to subcomponent review status box and active single checkmarks
   * The indexes of the boolean array should match the indexes of the given subrequests.
   */
  subRequestConditionEmitter = new EventEmitter<boolean[]>();

  /**
   * Conditions prefilled emitter
   */
  allConditionsPrefilled = new EventEmitter<boolean>();

  /**
   * All conditions prefilled property
   */
  allConditionsArePrefilled: boolean = false;

  /**
   * Reservation name (min length 5 chars)
   */
  reservationName: string = ''

  /**
   * Determines if the unused entries indicator should be shown
   */
  showUnusedEntries: boolean = false;

  /**
   * Control array of items to see unused items in item selection during a complex request
   */
  controlArray: Item[] = [];

  /**
   * Currently selected items in the table
   */
  selection = new SelectionModel<Item>(true, []);

  constructor(
    private dialog: MatDialogRef<ReviewReservationRequestModalComponent>,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: { request: Request }) {
    this.reservationRequest = data?.request;
    this.getSuggestion();
    this.checkSelectionForConditions();
  }

  /**
   * ngOnInit
   * 
   * Will subscribe to the emitter which determines if all conditions are prefilled
   */
  ngOnInit(): void {
    this.allConditionsPrefilled.subscribe(prefilled => this.allConditionsArePrefilled = prefilled);
  }

  /**
   * Will be called if the review requests table updates the selection
   */
  updateSelection(selection: any) {
    this.selection = selection;
    this.checkSelectionForConditions();
  }

  /**
   * Check the selection for the given conditions
   */
  checkSelectionForConditions() {
    let selectedItems = this.selection.selected || [];

    let conditionsarray: boolean[] = [];

    // SIMPLE
    if (this.isSimple()) {
      conditionsarray[0] = (this.reservationRequest.deviceCount === this.selection.selected.length);
      console.log(conditionsarray[0])
    }

    // COMPLEX
    if (this.isComplex()) {
      // This array represents all items selected, if there are too many selected
      // for the given conditions, this can be seen through the array here
      this.controlArray = [];
      this.reservationRequest.subRequest.forEach(subRequest => {
        const is_satisfied = this.subRequestSatisfied(subRequest, selectedItems);
        conditionsarray.push(is_satisfied);
      })
      this.checkForUnusedEntries();
    }

    this.subRequestConditionEmitter.next(conditionsarray);
  }

  /**
   * Check for unused entries
   */
  checkForUnusedEntries(): boolean {
    this.showUnusedEntries = (this.selection.selected.length === this.controlArray.length);
    return (this.selection.selected.length === this.controlArray.length);
  }

  /**
   * Checks if a given subrequest is satisfied with a set of elements
   * - adds only required elements to the control array
   * - returns true if subrequest is being satisfied
   */
  subRequestSatisfied(subRequest: SubRequest, items: Item[]): boolean {
    let count_of_device_models = 0;
    items.forEach(item => {
      if (item.modelIdentifier === subRequest.deviceModelIdentifier) {
        count_of_device_models++;
        this.controlArray.push(item);
      }
    })
    console.log("Requested " + subRequest.count + " of " + subRequest.deviceModelIdentifier);
    console.log("Given " + count_of_device_models + " of " + subRequest.deviceModelIdentifier);

    return (subRequest.count === count_of_device_models);
  }



  /**
   * Gets a suggestion from the server and fire a subscriber pointing to the table
   */
  getSuggestion() {
    this.apiService.getDevicesForTimespan$(this.reservationRequest).subscribe(response => {
      let items = response.items;
      this.suggestions = response.items;
      this.suggestedItems.next(items);
    })
  }

  /**
   * Closes the modal
   */
  closeAction() {
    this.dialog.close();
  }

  /**
   * Deletes request
   */
  deleteRequest() {
    this.dialog.close();
  }

  /**
   * Submit reservation from the request
   */
  submitReservation() {
    // Get all the item ids
    const selectedItemIds = this.selection.selected.map(item => item.itemId);
    // Create reservation
    const reservation: Reservation = {
      reservationName: this.reservationName,
      itemIds: selectedItemIds,
      startDate: this.reservationRequest.startDate,
      plannedEndDate: this.reservationRequest.plannedEndDate,
      responsible: this.reservationRequest.userCreated.toString(),
    } as any;

    this.dialog.close({
      reservation,
      items: this.selection.selected
    })
  }

  /**
   * Simple request
   */
  isSimple() {
    return (this.getSimpleOrComplex() === 'Einfach')
  }

  /**
   * Complex request
   */
  isComplex() {
    return (this.getSimpleOrComplex() === 'Komplex')
  }

  /**
   * Will return Komplex string if the request has subrequests
   */
  getSimpleOrComplex() {
    return (this.reservationRequest?.subRequest[0] || false) ? 'Komplex' : 'Einfach';
  }

  /**
   * Checks if reservation name is valid
   */
  checksIfReservationNameIsValid() {
    return (this.reservationName.length > 4);
  }

}
