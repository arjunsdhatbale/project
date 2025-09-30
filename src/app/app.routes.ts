import { Routes } from '@angular/router';
import { User } from './components/user/user';

export const routes: Routes = [
    { path: 'user', component: User },    
  { path: '', redirectTo: 'user', pathMatch: 'full' },
];
