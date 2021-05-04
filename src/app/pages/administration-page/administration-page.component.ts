import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LdapConfigurationModalComponent } from 'src/app/components/ldap-configuration-modal/ldap-configuration-modal.component';
import { MailConfigurationModalComponent } from 'src/app/components/mail-configuration-modal/mail-configuration-modal.component';
import { EmailConfiguration } from 'src/app/models/configurations/EmailConfiguration';
import { LDAPConfiguration } from 'src/app/models/configurations/LDAPConfiguration';
import { ApiService } from 'src/app/services/api.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { InfoModalService } from 'src/app/services/info-modal.service';

@Component({
  selector: 'app-administration-page',
  templateUrl: './administration-page.component.html',
  styleUrls: ['./administration-page.component.scss']
})
export class AdministrationPageComponent implements OnInit {

  /**
   * Emitter to observe when a new system logo is available.
   * This will be passed to the apiservice and to the system logo component
   */
  refreshSystemLogoTrigger = new EventEmitter<any>();

  /**
   * Returns new instance of AdministrationPage
   */
  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private configurationService: ConfigurationService,
    private infoModalService: InfoModalService,
  ) { }

  ngOnInit(): void {
    this.refreshSystemLogoTrigger.subscribe(refreshAction => {
      this.apiService.refreshSystemLogo.next(true);
    })
  }

  /**
   * Opens the email configuration modal
   */
  configureEmail() {
    const dialogRef = this.dialog.open(MailConfigurationModalComponent, {
      width: '650px',
    });

    dialogRef.afterClosed().subscribe(async (result: EmailConfiguration) => {
      if (result) {
        this.configurationService.mailConfiguration$(result).subscribe(result => {
          if (result?.success) {
            this.infoModalService.showInformation("Erfolgreich gespeichert. Ihnen wurde zudem eine Test-Mail an Ihre hinterlegte Adresse gesandt.")
          }
        })
      }
    });
  }

  /**
   * Configure LDAP 
   */
  configureLDAP() {
    const dialogRef = this.dialog.open(LdapConfigurationModalComponent, {
      width: '650px',
    });

    dialogRef.afterClosed().subscribe(async (result: LDAPConfiguration) => {
      if (result) {
        this.configurationService.LDAPconfiguration$(result).subscribe(result => {
          if (result.success) {
            this.infoModalService.showInformation("Die LDAP-Konfiguration wurde gespeichert. Die Konfiguration kann jedoch erst wirksam werden, nachdem das System neu gestartet wurde.")
          }
        })
      }
    });
  }



}
