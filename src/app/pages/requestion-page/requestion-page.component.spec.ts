import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestionPageComponent } from './requestion-page.component';

describe('RequestionPageComponent', () => {
  let component: RequestionPageComponent;
  let fixture: ComponentFixture<RequestionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestionPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
