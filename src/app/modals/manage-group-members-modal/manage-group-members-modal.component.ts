import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-manage-group-members-modal',
  templateUrl: './manage-group-members-modal.component.html',
  styleUrls: ['./manage-group-members-modal.component.scss']
})
export class ManageGroupMembersModalComponent implements OnInit {

  /**
   * Group members
   */
  members: User[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
