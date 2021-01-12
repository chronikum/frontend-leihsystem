import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCreationModalComponent } from './group-creation-modal.component';

describe('GroupCreationModalComponent', () => {
  let component: GroupCreationModalComponent;
  let fixture: ComponentFixture<GroupCreationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupCreationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupCreationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
