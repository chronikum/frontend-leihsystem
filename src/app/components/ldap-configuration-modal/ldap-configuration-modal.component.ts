import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LDAPConfiguration } from 'src/app/models/configurations/LDAPConfiguration';

@Component({
  selector: 'app-ldap-configuration-modal',
  templateUrl: './ldap-configuration-modal.component.html',
  styleUrls: ['./ldap-configuration-modal.component.scss']
})
export class LdapConfigurationModalComponent implements OnInit {

  /**
   * LDAP Configuration Formgroup
   */
  ldapConfigurationForm: FormGroup;

  /**
   * Construct a new instance of MailConfigurationModal
   */
  constructor(
    public dialogRef: MatDialogRef<LdapConfigurationModalComponent>,
    private formBuilder: FormBuilder,
  ) {
    this.ldapConfigurationForm = this.formBuilder.group({
      host: ['', Validators.required],
      bindDN: ['', Validators.required],
      bindCredentials: ['', Validators.required],
      searchBase: ['', Validators.required],
      searchFilter: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  /**
   * Cancel the modal
   */
  close() {
    this.dialogRef.close(false)
  }

  /**
   * Reads the LDAP configuration
   */
  getConfiguration(): LDAPConfiguration {
    const ldapConfiguration: LDAPConfiguration = {
      host: this.ldapConfigurationForm.get('host').value,
      bindDN: this.ldapConfigurationForm.get('bindDN').value,
      bindCredentials: this.ldapConfigurationForm.get('bindCredentials').value,
      searchBase: this.ldapConfigurationForm.get('searchBase').value,
      searchFilter: this.ldapConfigurationForm.get('searchFilter').value,
    }
    return ldapConfiguration;
  }

  /**
   * Creates the configuration and returns it when closing the modal
   */
  createConfiguration() {
    const ldapConfiguration = this.getConfiguration();
    this.dialogRef.close(ldapConfiguration)
  }

  /**
   * Information on how to  use placeholder in searchFilter
   * @returns string: information on how to  use placeholder in searchFilter
   */
  configurationHintSearchFilter() {
    return '{{username}} und {{password}} können im Suchfilter als Platzhalter benutzt werden.'
  }
}
