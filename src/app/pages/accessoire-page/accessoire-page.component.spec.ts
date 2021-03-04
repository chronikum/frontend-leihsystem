import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoirePageComponent } from './accessoire-page.component';

describe('AccessoirePageComponent', () => {
  let component: AccessoirePageComponent;
  let fixture: ComponentFixture<AccessoirePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessoirePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessoirePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
