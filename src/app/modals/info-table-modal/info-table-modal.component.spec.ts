import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTableModalComponent } from './info-table-modal.component';

describe('InfoTableModalComponent', () => {
  let component: InfoTableModalComponent;
  let fixture: ComponentFixture<InfoTableModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoTableModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoTableModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
