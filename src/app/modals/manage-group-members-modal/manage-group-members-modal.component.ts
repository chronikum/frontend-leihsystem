import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Result } from '@zxing/library';
import { Group } from 'src/app/models/Group';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';

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

  /**
   * All Users
   */
  allUsers: User[] = [];

  /**
   * Group which is being currently managed
   */
  managedGroup: Group;

  /**
   * Suggested users
   */
  suggested: User[];

  /**
   * Constructs new instance of ManageGroupMembersModalComponent
   * @param dialogRef 
   * @param data 
   * @param apiService
   */
  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<ManageGroupMembersModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { group: Group, members: User[] }
  ) {
    this.managedGroup = this.data?.group;
    this.members = this.data?.members;
  }

  ngOnInit(): void {
  }

  /**
   * Get user suggestions
   * 
   * @param query to search
   */
  getSuggestions(event: any) {
    this.suggested = [];
    console.log("Query");
    let query = event.target.value || '';
    this.apiService.suggestUsers$(query).subscribe(result => {
      if (result.success) {
        if (result.users) {
          this.suggested = result.users;
        }
      }
    })
  }

  /**
   * Add the given user to the currently selected group
   * 
   * @param User to be added 
   */
  addMemberToGroup(user: User) {
    this.apiService.addUserToGroup$(user, this.managedGroup).subscribe(result => {
      if (result.success) {
        console.log("Updated group!")
      }
    })
  }

  cancel() {
    this.dialogRef.close();
  }

}
