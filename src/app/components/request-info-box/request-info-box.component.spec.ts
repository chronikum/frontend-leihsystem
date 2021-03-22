import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestInfoBoxComponent } from './request-info-box.component';

describe('RequestInfoBoxComponent', () => {
  let component: RequestInfoBoxComponent;
  let fixture: ComponentFixture<RequestInfoBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestInfoBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestInfoBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
