import { Routes } from '@angular/router';

export const PAGES_ROUTES: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./admins/admins.module').then((m) => m.AdminsModule),
  },
  {
    path: 'owner',
    loadChildren: () =>
      import('./owner/owner.module').then((m) => m.OwnerModule),
  },
  {
    path: 'tenant',
    loadChildren: () =>
      import('./tenent/tenent.module').then((m) => m.TenentModule),
  },
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full',
  },
];
