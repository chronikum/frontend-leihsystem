import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(
    private formBuilder: FormBuilder,
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
