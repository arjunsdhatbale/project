import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user';

export const routes: Routes = [
    { path: 'user', component: UserComponent },    
  { path: '', redirectTo: 'user', pathMatch: 'full' },
];
