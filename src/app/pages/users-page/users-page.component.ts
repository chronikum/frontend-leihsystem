import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from 'src/app/modals/confirmation-modal/confirmation-modal.component';
import { UserCreationModalComponent } from 'src/app/modals/user-creation-modal/user-creation-modal.component';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';

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


  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  /**
   * Delete users selected
   */
  deleteUser() {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '650px',
      data: { message: "The selected users will be deleted. Please confirm this action.", critical: true }
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        let userToDelete = Array.from(this.selection.selected || []) as User[];
        // Delete the users
        this.apiService.deleteUsers$(userToDelete).subscribe(result => {
          if (result.success) {
            this.refreshActionStream.next(true);
          }
        });
        console.log("User confirmed deletion")
      }
    });
  }

  /**
   * Selection of the table is being changed
   * 
   * @param SelectionModel<Item> the current selection of the table
   */
  selectionChange(selection: SelectionModel<User>) {
    this.selection = selection;
  }

  /**
   * Creates User provided by the dialog
   * 
   * @param user: User
   */
  createUser() {
    const dialogRef = this.dialog.open(UserCreationModalComponent, {
      width: '650px',
    });

    dialogRef.afterClosed().subscribe(async (result: User) => {
      console.log(result);
      if (result.email && result.password) {
        this.apiService.createUser$(result).subscribe(result => {
          if (result.success) {
            this.refreshActionStream.next(true)
          }
        })
      }
    });
  }

}
