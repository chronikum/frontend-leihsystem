import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
   * Constructs a new instance of RequestionPage and builts the form requestForm
   */
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
  ) {
    this.requestForm = formBuilder.group({
      deviceAmount: [''],
      start: [''],
      end: [''],
      notes: [''],
    })
  }

  ngOnInit(): void {
  }

}
