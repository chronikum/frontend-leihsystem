import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewRequestSelectorTableComponent } from './review-request-selector-table.component';

describe('ReviewRequestSelectorTableComponent', () => {
  let component: ReviewRequestSelectorTableComponent;
  let fixture: ComponentFixture<ReviewRequestSelectorTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewRequestSelectorTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewRequestSelectorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
