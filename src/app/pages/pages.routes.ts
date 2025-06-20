import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegesterPropertyComponent } from './regester-property/regester-property.component';
import { RegesterTenantComponent } from './regester-tenant/regester-tenant.component';
import { TenanantDetailsComponent } from './tenanant-details/tenanant-details.component';

export const PAGES_ROUTES: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'register-property',
    component: RegesterPropertyComponent
  },
  {
    path: 'register-tenant',
    component: RegesterTenantComponent
  },
  {
    path: 'tenant-details',
    component: TenanantDetailsComponent
  }
];
