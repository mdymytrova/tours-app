import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./tour-list/tour-list.component').then(c => c.TourListComponent),
    title: 'Tours',
  },
];
