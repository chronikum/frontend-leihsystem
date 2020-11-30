import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {

  /**
   * Holds the current selection information
   */
  selection = new SelectionModel<User>();

  /**
   * Refresh action stream
   */
  refreshActionStream = new EventEmitter<any>();


  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Delete user
   */
  deleteUser() {

  }

  /**
   * Create user
   * 
   * @param user: User
   */
  createUser(user: User) {

  }

}
