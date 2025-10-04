import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user';

export const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: 'user', component: UserComponent },
];
