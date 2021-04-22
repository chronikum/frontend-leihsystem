import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EmailConfiguration } from 'src/app/models/configurations/EmailConfiguration';

@Component({
  selector: 'app-mail-configuration-modal',
  templateUrl: './mail-configuration-modal.component.html',
  styleUrls: ['./mail-configuration-modal.component.scss']
})
export class MailConfigurationModalComponent implements OnInit {

  /**
   * Email Configuration Formgroup
   */
  emailConfigurationForm: FormGroup;

  /**
   * Construct a new instance of MailConfigurationModal
   */
  constructor(
    public dialogRef: MatDialogRef<MailConfigurationModalComponent>,
    private formBuilder: FormBuilder,
  ) {
    this.emailConfigurationForm = this.formBuilder.group({
      host: ['', Validators.required],
      port: ['', Validators.required],
      secure: [''],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /**
   * Cancel modal
   */
  close() {
    this.dialogRef.close();
  }


  /**
   * Sends the values for the configuration to the server
   */
  createConfiguration() {
    const configuration = this.buildConfiguration();
    this.dialogRef.close(configuration);
  }

  /**
   * Build the E-Mail configuration
   */
  buildConfiguration() {
    let mailConfiguration: EmailConfiguration = {
      host: this.emailConfigurationForm.get('host').value,
      port: parseInt(this.emailConfigurationForm.get('port').value),
      username: this.emailConfigurationForm.get('username').value,
      password: this.emailConfigurationForm.get('password').value,
      secure: this.emailConfigurationForm.get('secure').value || false,
    }
    return mailConfiguration;
  }



  ngOnInit(): void {
  }

}
