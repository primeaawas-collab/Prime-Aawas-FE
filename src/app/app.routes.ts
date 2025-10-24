import { PAGES_ROUTES } from './pages/pages.routes';
import { WrapperComponent } from './theme/wrapper/wrapper.component';
import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./auth/routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: '',
    component: WrapperComponent,
    children: [
      {
        path: '',
        redirectTo: 'pages',
        pathMatch: 'full'
      },
      ...PAGES_ROUTES
    ]
  },
  {
    path : '**' , redirectTo: '', pathMatch: 'full'
  }
];
