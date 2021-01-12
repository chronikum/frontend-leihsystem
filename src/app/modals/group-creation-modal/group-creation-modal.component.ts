import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
  roles: UserRoles[] = [UserRoles.ADMIN, UserRoles.USER];

  /**
   * UserRoles selected (Set)
   */
  activeRoles: Set<UserRoles> = new Set<UserRoles>();

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<GroupCreationModalComponent>,
    private apiService: ApiService,
  ) {
    this.groupCreationForm = this.formBuilder.group({
      groupName: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  /**
   * Init and get all roles available
   */
  ngOnInit(): void {
    this.apiService.getAllRoles$().subscribe(roles => {
      this.roles = roles;
    })
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
      role: this.getRoles(),
      description: this.groupCreationForm.get('description').value,
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
   * Cancel
   */
  createAction() {
    let group = this.getGroup();
    this.dialogRef.close(group);
  }

}
