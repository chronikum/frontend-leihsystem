import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestReviewStatusBoxComponent } from './request-review-status-box.component';

describe('RequestReviewStatusBoxComponent', () => {
  let component: RequestReviewStatusBoxComponent;
  let fixture: ComponentFixture<RequestReviewStatusBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestReviewStatusBoxComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestReviewStatusBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
