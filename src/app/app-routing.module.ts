import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';
import { ResetPasswordValidatingGuard } from './guards/reset-password-validating.guard';
import { SetupGuard } from './guards/setup.guard';
import { AdministrationPageComponent } from './pages/administration-page/administration-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { DeviceModelPageComponent } from './pages/device-model-page/device-model-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { GroupsPageComponent } from './pages/groups-page/groups-page.component';
import { InventoryPageComponent } from './pages/inventory-page/inventory-page.component';
import { LicenseInformationPageComponent } from './pages/license-information-page/license-information-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { RequestionPageComponent } from './pages/requestion-page/requestion-page.component';
import { RequestsPageComponent } from './pages/requests-page/requests-page.component';
import { ReservationPageComponent } from './pages/reservation-page/reservation-page.component';
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';
import { ScannerPageComponent } from './pages/scanner-page/scanner-page.component';
import { SetupPageComponent } from './pages/setup-page/setup-page.component';
import { SystemlogsPageComponent } from './pages/systemlogs-page/systemlogs-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';

const routes: Routes = [
  {
    path: 'error',
    component: ErrorPageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'not-found',
    component: NotFoundPageComponent,
  },
  {
    path: 'inventory',
    component: InventoryPageComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'reservations',
    component: ReservationPageComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'users',
    component: UsersPageComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'deviceModels',
    component: DeviceModelPageComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'scanner',
    component: ScannerPageComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'administration',
    component: AdministrationPageComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'systemlogs',
    component: SystemlogsPageComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'licenseInformation',
    component: LicenseInformationPageComponent,
  },
  {
    path: 'resetPassword/:email/:token',
    component: ResetPasswordPageComponent,
    canActivate: [ResetPasswordValidatingGuard],
    pathMatch: 'full',
  },
  {
    path: 'requests',
    component: RequestsPageComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'groups',
    component: GroupsPageComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'requestion',
    component: RequestionPageComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'setup',
    component: SetupPageComponent,
    canActivate: [SetupGuard]
  },
  {
    path: '', redirectTo: '/login', pathMatch: 'full',
  },
  {
    path: '**', redirectTo: '/dashboard'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
