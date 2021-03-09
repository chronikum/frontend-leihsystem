import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelCountRequestModalComponent } from './model-count-request-modal.component';

describe('ModelCountRequestModalComponent', () => {
  let component: ModelCountRequestModalComponent;
  let fixture: ComponentFixture<ModelCountRequestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelCountRequestModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelCountRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
