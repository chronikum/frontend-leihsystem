import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableButtonGroupComponent } from './table-button-group.component';

describe('TableButtonGroupComponent', () => {
  let component: TableButtonGroupComponent;
  let fixture: ComponentFixture<TableButtonGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableButtonGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
