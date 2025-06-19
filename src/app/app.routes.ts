import { Routes } from '@angular/router';
import { WrapperComponent } from './theme/wrapper/wrapper.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  
   {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path:'',
    component:WrapperComponent,
    canActivate:[],
    children:[
      
       {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      
    ]
  }
 
];
