import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqestReviewStatusBoxComponent } from './reqest-review-status-box.component';

describe('ReqestReviewStatusBoxComponent', () => {
  let component: ReqestReviewStatusBoxComponent;
  let fixture: ComponentFixture<ReqestReviewStatusBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReqestReviewStatusBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqestReviewStatusBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
