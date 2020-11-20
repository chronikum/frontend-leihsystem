import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { InventoryPageComponent } from './pages/inventory-page/inventory-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

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
    path: '', redirectTo: '/login', pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
