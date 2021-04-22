import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailConfigurationModalComponent } from './mail-configuration-modal.component';

describe('MailConfigurationModalComponent', () => {
  let component: MailConfigurationModalComponent;
  let fixture: ComponentFixture<MailConfigurationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailConfigurationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MailConfigurationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
