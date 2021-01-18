import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGroupMembersModalComponent } from './manage-group-members-modal.component';

describe('ManageGroupMembersModalComponent', () => {
  let component: ManageGroupMembersModalComponent;
  let fixture: ComponentFixture<ManageGroupMembersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageGroupMembersModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageGroupMembersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
