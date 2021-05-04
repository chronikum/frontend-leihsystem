import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LdapConfigurationModalComponent } from './ldap-configuration-modal.component';

describe('LdapConfigurationModalComponent', () => {
  let component: LdapConfigurationModalComponent;
  let fixture: ComponentFixture<LdapConfigurationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LdapConfigurationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LdapConfigurationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
