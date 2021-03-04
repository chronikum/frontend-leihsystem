import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoireTableComponent } from './accessoire-table.component';

describe('AccessoireTableComponent', () => {
  let component: AccessoireTableComponent;
  let fixture: ComponentFixture<AccessoireTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessoireTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessoireTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
