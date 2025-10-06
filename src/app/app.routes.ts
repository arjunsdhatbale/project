import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user';
import { DashboardComponent } from './components/dashboard-component/dashboard-component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users', component: UserComponent },
  { path: '**', redirectTo: '/dashboard' },
];
