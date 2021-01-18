import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Group } from 'src/app/models/Group';
import { User } from 'src/app/models/User';
import { UserRoles } from 'src/app/models/UserRoles';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-group-creation-modal',
  templateUrl: './group-creation-modal.component.html',
  styleUrls: ['./group-creation-modal.component.scss']
})
export class GroupCreationModalComponent implements OnInit {

  /**
   * Group creation form
   */
  groupCreationForm: FormGroup;

  /**
   * Permissions available (need to fetch from the server!)
   */
  @Input() roles: UserRoles[] = [];

  /**
   * UserRoles selected (Set)
   */
  activeRoles: Set<UserRoles> = new Set<UserRoles>();

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<GroupCreationModalComponent>,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: { roles: UserRoles[] }
  ) {
    this.roles = data.roles;
    this.groupCreationForm = this.formBuilder.group({
      groupName: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  /**
   * Init and get all roles available
   */
  ngOnInit(): void {

  }

  /**
   * Gets called when user changes user role
   * @param role which has been toggled 
   */
  toggleUserRole(role) {
    if (this.activeRoles.has(role)) {
      this.activeRoles.delete(role);
    } else {
      this.activeRoles.add(role);
    }
    console.log(Array.from(this.activeRoles))
  }

  /**
   * Cancel
   */
  cancelAction() {
    this.dialogRef.close();
  }

  /**
   * Builds group
   */
  getGroup(): Group {
    let group: Group = {
      displayName: this.groupCreationForm.get('groupName').value,
      description: this.groupCreationForm.get('description').value,
      role: this.getRoles(),
    }

    return group;
  }

  /**
   * Get the selected roles
   * 
   * @returns UserRoles[] which are currently selected
   */
  getRoles(): UserRoles[] {
    return Array.from(this.activeRoles);
  }

  /**
   * Create action
   */
  createAction() {
    let group = this.getGroup();
    console.log(group)
    this.dialogRef.close(group);
  }

}
