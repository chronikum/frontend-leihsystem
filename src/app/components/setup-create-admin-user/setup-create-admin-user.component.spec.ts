import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupCreateAdminUserComponent } from './setup-create-admin-user.component';

describe('SetupCreateAdminUserComponent', () => {
  let component: SetupCreateAdminUserComponent;
  let fixture: ComponentFixture<SetupCreateAdminUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupCreateAdminUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupCreateAdminUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
