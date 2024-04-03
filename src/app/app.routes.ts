import { Routes } from '@angular/router';
import { LoggedInGuard } from './services/logged-in.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./tour-list/tour-list.component').then(c => c.TourListComponent),
    title: 'Tours',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then(c => c.LoginComponent),
    title: 'Login',
    canActivate: [LoggedInGuard],
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./auth/sign-up/sign-up.component').then(c => c.SignUpComponent),
    title: 'Sign Up',
    canActivate: [LoggedInGuard],
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];
