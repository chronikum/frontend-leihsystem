import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreationModalComponent } from './user-creation-modal.component';

describe('UserCreationModalComponent', () => {
  let component: UserCreationModalComponent;
  let fixture: ComponentFixture<UserCreationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCreationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
