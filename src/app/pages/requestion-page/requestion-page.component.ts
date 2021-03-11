import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { WarningModalComponent } from 'src/app/modals/warning-modal/warning-modal.component';
import { SubRequest } from 'src/app/models/SubRequest';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-requestion-page',
  templateUrl: './requestion-page.component.html',
  styleUrls: ['./requestion-page.component.scss']
})
export class RequestionPageComponent implements OnInit {

  /**
   * Request form
   */
  requestForm: FormGroup;

  /**
   * Count of devices requested
   */
  countOfDevices: number;

  /**
   * Subrequests
   */
  subRequests: SubRequest[] = [];

  /**
   * Subrequest Updater
   */
  subRequestUpdateEmitter = new EventEmitter<SubRequest[]>();


  /**
   * Constructs a new instance of RequestionPage and builts the form requestForm
   */
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private dialog: MatDialog,
  ) {
    this.requestForm = formBuilder.group({
      advancedSelection: ['', ''],
      deviceAmount: [''],
      start: [''],
      end: [''],
      notes: [''],
    })
  }

  /**
   * Subscribes to the subRequestUpdateEmitter
   */
  ngOnInit(): void {
    this.subRequestUpdateEmitter.subscribe(updated => this.updateSubrequests(updated));
  }

  /**
   * Will update the components property with the given
   * @param subrequest[] array
   */
  updateSubrequests(updatedSubRequests: SubRequest[]) {
    console.log(updatedSubRequests);
    this.subRequests = updatedSubRequests;
  }

  /**
   * Submits the final request to the system
   */
  submitRequest() {

  }


  /**
   * Request is empty - warning
   */
  requestIsEmpty() {
    const dialogRef = this.dialog.open(WarningModalComponent, {
      width: '650px',
      data: { message: "Die Anfrage enthält keine Geräte." }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
