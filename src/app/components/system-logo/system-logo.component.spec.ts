import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemLogoComponent } from './system-logo.component';

describe('SystemLogoComponent', () => {
  let component: SystemLogoComponent;
  let fixture: ComponentFixture<SystemLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemLogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
