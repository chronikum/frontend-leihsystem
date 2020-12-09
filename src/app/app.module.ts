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
import { MatNativeDateModule } from '@angular/material/core';
import { ReservationPageComponent } from './pages/reservation-page/reservation-page.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UserCreationModalComponent } from './modals/user-creation-modal/user-creation-modal.component';
import { PasswordChangeModalComponent } from './modals/password-change-modal/password-change-modal.component';
import { QrcodeModalComponent } from './modals/qrcode-modal/qrcode-modal.component';
import { ScannerPageComponent } from './pages/scanner-page/scanner-page.component';

import { ZXingScannerModule } from '@zxing/ngx-scanner';


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
    ScannerPageComponent
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
    ZXingScannerModule
  ],
  providers: [
    // Http Interceptor(s) -  adds with Client Credentials
    [
      { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
    ],
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
