import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRequestInterceptor } from './interceptors/HttpRequestInterceptor';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { InventoryPageComponent } from './pages/inventory-page/inventory-page.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { InventoryTableComponent } from './components/inventory-table/inventory-table.component';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { TableButtonGroupComponent } from './components/table-button-group/table-button-group.component';
import { ConfirmationModalComponent } from './modals/confirmation-modal/confirmation-modal.component';
import { CreationModalComponent } from './modals/creation-modal/creation-modal.component';
import { MatSelectModule } from '@angular/material/select';
import { ReserveModalComponent } from './modals/reserve-modal/reserve-modal.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { ReservationPageComponent } from './pages/reservation-page/reservation-page.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UserCreationModalComponent } from './modals/user-creation-modal/user-creation-modal.component';
import { PasswordChangeModalComponent } from './modals/password-change-modal/password-change-modal.component';
import { QrcodeModalComponent } from './modals/qrcode-modal/qrcode-modal.component';
import { ScannerPageComponent } from './pages/scanner-page/scanner-page.component';

import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ItemDisplayModalComponent } from './modals/item-display-modal/item-display-modal.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { AvailableNotAvailableIndicatorComponent } from './components/available-not-available-indicator/available-not-available-indicator.component';
import { ReservationTableComponent } from './components/reservation-table/reservation-table.component';
import { ReservationButtonGroupComponent } from './components/reservation-button-group/reservation-button-group.component';

import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from "@angular/material-moment-adapter";
import { RequestsPageComponent } from './pages/requests-page/requests-page.component';
import { GroupsPageComponent } from './pages/groups-page/groups-page.component';
import { RequestionPageComponent } from './pages/requestion-page/requestion-page.component';
import { GroupTableComponent } from './components/group-table/group-table.component';
import { GroupCreationModalComponent } from './modals/group-creation-modal/group-creation-modal.component';
import { ManageGroupMembersModalComponent } from './modals/manage-group-members-modal/manage-group-members-modal.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { InfoTableComponent } from './components/info-table/info-table.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { RequestTableComponent } from './components/request-table/request-table.component';
import { RequestButtonGroupComponent } from './components/request-button-group/request-button-group.component';

import { MatTooltipModule } from '@angular/material/tooltip';
import { AccessoirePageComponent } from './pages/accessoire-page/accessoire-page.component';
import { AccessoireTableComponent } from './components/accessoire-table/accessoire-table.component';
import { AccesssoireButtonGroupComponent } from './components/accesssoire-button-group/accesssoire-button-group.component';
import { DeviceModelTableComponent } from './components/device-model-table/device-model-table.component';
import { DeviceModelButtonGroupComponent } from './components/device-model-button-group/device-model-button-group.component';
import { DeviceModelPageComponent } from './pages/device-model-page/device-model-page.component';
import { DeviceModelCreationModalComponent } from './modals/device-model-creation-modal/device-model-creation-modal.component';
import { GeneralSelectionTableComponent } from './components/general-selection-table/general-selection-table.component';
import { ModelCountSelectorComponent } from './components/model-count-selector/model-count-selector.component';
import { ModelCountChipComponent } from './components/model-count-chip/model-count-chip.component';
import { ModelCountRequestModalComponent } from './modals/model-count-request-modal/model-count-request-modal.component';
import { InfoBoxComponent } from './components/info-box/info-box.component';
import { WarningModalComponent } from './modals/warning-modal/warning-modal.component';
import { ReviewReservationRequestModalComponent } from './modals/review-reservation-request-modal/review-reservation-request-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DashboardPageComponent,
    NotFoundPageComponent,
    MenuBarComponent,
    InventoryPageComponent,
    InventoryTableComponent,
    TableButtonGroupComponent,
    ConfirmationModalComponent,
    CreationModalComponent,
    ReserveModalComponent,
    ReservationPageComponent,
    SearchBarComponent,
    UsersPageComponent,
    UsersTableComponent,
    UserCreationModalComponent,
    PasswordChangeModalComponent,
    QrcodeModalComponent,
    ScannerPageComponent,
    ItemDisplayModalComponent,
    AvailableNotAvailableIndicatorComponent,
    ReservationTableComponent,
    ReservationButtonGroupComponent,
    RequestsPageComponent,
    GroupsPageComponent,
    RequestionPageComponent,
    GroupTableComponent,
    GroupCreationModalComponent,
    ManageGroupMembersModalComponent,
    ErrorPageComponent,
    InfoTableComponent,
    ProfilePageComponent,
    RequestTableComponent,
    RequestButtonGroupComponent,
    AccessoirePageComponent,
    AccessoireTableComponent,
    AccesssoireButtonGroupComponent,
    DeviceModelTableComponent,
    DeviceModelButtonGroupComponent,
    DeviceModelPageComponent,
    DeviceModelCreationModalComponent,
    GeneralSelectionTableComponent,
    ModelCountSelectorComponent,
    ModelCountChipComponent,
    ModelCountRequestModalComponent,
    InfoBoxComponent,
    WarningModalComponent,
    ReviewReservationRequestModalComponent,
  ],
  imports: [
    FlexLayoutModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ZXingScannerModule,
    MatSidenavModule,
    MatMomentDateModule,
    MatExpansionModule,
    MatListModule,
    MatTooltipModule,
    MatChipsModule,
    MatBadgeModule,
    MatStepperModule,
    MatRadioModule
  ],
  providers: [
    // Http Interceptor(s) -  adds with Client Credentials
    [
      { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
      { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUTC: false } },
      { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
    ],
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
