import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/models/Item';
import { Request } from 'src/app/models/Request';
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
  allConditionsPrefilled = new EventEmitter<boolean[]>();

  /**
   * All conditions prefilled property
   */
  allConditionsArePrefilled: boolean = false;

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
      console.log("CHECK")
      conditionsarray[0] = (this.reservationRequest.deviceCount === this.selection.selected.length);
      console.log(conditionsarray[0])
    }

    // COMPLEX
    if (this.isComplex()) {
      selectedItems.forEach(item => {

      })
    }

    this.subRequestConditionEmitter.next(conditionsarray);
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

}
