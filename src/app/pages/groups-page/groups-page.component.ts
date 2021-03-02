import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationModalComponent } from 'src/app/modals/confirmation-modal/confirmation-modal.component';
import { GroupCreationModalComponent } from 'src/app/modals/group-creation-modal/group-creation-modal.component';
import { ManageGroupMembersModalComponent } from 'src/app/modals/manage-group-members-modal/manage-group-members-modal.component';
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
   * Edit Group Members - load the current active users before
   * TODO: Cleanup
   */
  editMembers() {
    // Opens the modal if the group members have been loaded.
    this.apiService.getGroupMembers$(this.selection.selected[0]).subscribe(response => {
      if (response.success) {
        const dialogRef = this.dialog.open(ManageGroupMembersModalComponent, {
          width: '750px',
          data: { group: this.selection.selected[0], members: response.users }
        });

        dialogRef.afterClosed().subscribe(_ => {
          console.log("Closed");
        });
      }
    })
  }

  /**
   * Group deletion modal
   */
  deleteGroup() {
    let groupToDelete: Group = this.selection.selected[0];
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '650px',
      data: { message: "Die ausgewählten Gruppen werden unwiderruflich gelöscht.", critical: true }
    });

    dialogRef.afterClosed().subscribe(_ => {
      console.log("Closed");
    });
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
