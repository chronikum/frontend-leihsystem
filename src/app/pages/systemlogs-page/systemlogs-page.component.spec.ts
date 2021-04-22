import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemlogsPageComponent } from './systemlogs-page.component';

describe('SystemlogsPageComponent', () => {
  let component: SystemlogsPageComponent;
  let fixture: ComponentFixture<SystemlogsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemlogsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemlogsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
