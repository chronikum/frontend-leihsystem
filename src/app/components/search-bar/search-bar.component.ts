import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  /**
   * A placeholder
   */
  @Input() placeholder: string;
  /**
   * Emits the string when string changes
   */
  @Output() searchString = new EventEmitter<string>();

  searchForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.searchForm = formBuilder.group({
      searchInput: [],
    });
  }

  ngOnInit(): void {
  }

  /**
   * Clears the input form
   */
  clearInput(): void {
    this.searchForm.get('searchInput').setValue('');
  }

  /**
   * Fires search string event
   * @param searchString
   */
  onSearchStringChange(searchString: string): void {
    this.searchString.emit(searchString);
  }

}
