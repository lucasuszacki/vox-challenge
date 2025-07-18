import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'solicitar',
    loadComponent: () =>
      import('./pages/form/form.component').then((m) => m.FormComponent),
  },
  {
    path: 'editar/:id',
    loadComponent: () =>
      import('./pages/form/form.component').then((m) => m.FormComponent),
  },
];

export const appRouting = provideRouter(routes);
