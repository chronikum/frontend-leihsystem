import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { GroupsPageComponent } from './pages/groups-page/groups-page.component';
import { InventoryPageComponent } from './pages/inventory-page/inventory-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { RequestsPageComponent } from './pages/requests-page/requests-page.component';
import { ReservationPageComponent } from './pages/reservation-page/reservation-page.component';
import { ScannerPageComponent } from './pages/scanner-page/scanner-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
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
    path: 'scanner',
    component: ScannerPageComponent,
    canActivate: [AuthenticationGuard]
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
    path: '', redirectTo: '/login', pathMatch: 'full',
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
