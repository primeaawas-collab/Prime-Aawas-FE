import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegesterPropertyComponent } from './regester-property/regester-property.component';
import { RegesterTenantComponent } from './regester-tenant/regester-tenant.component';

import { BillingCostComponent } from './billing-cost/billing-cost.component';
import { OwnerProvidedServiceComponent } from './owner-provided-service/owner-provided-service.component';

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
    path: 'billing-cost',
    component: BillingCostComponent
  },
    {
    path: 'service-section',
    component: OwnerProvidedServiceComponent
  },
  
];
