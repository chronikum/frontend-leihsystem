import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GroupCreationModalComponent } from 'src/app/modals/group-creation-modal/group-creation-modal.component';
import { Group } from 'src/app/models/Group';
import { UserRoles } from 'src/app/models/UserRoles';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss']
})
export class GroupsPageComponent implements OnInit {

  /**
   * Holds the current selection information
   */
  selection = new SelectionModel<Group>();

  /**
   * Refresh action stream
   */
  refreshActionStream = new EventEmitter<any>();

  /**
   * Roles
   */
  roles: UserRoles[] = [];

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.apiService.getAllRoles$().subscribe(result => {
      if (result.success) {
        this.roles = result.roles;
      } else {
        this.roles = [];
      }
    })
  }

  /**
   * Create new group with group modal
   */
  openGroupModal() {
    const dialogRef = this.dialog.open(GroupCreationModalComponent, {
      width: '650px',
      data: { roles: this.roles }
    });

    dialogRef.afterClosed().subscribe(async (result: Group) => {
      console.log(result);
      if (result.displayName && result.role) {
        this.apiService.createGroup$(result).subscribe(group => {
          this.refreshActionStream.next(true);
        })
      }
    });
  }

  /**
   * Edit Group Members
   */
  editMembers() {

  }

  /**
   * Selection of the table is being changed
   * 
   * @param SelectionModel<Item> the current selection of the table
   */
  selectionChange(selection: SelectionModel<Group>) {
    this.selection = selection;
  }

}
