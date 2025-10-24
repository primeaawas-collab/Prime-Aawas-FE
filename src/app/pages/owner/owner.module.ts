import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ownerRoutes } from './owner.routes';

import { OwnerDashboardComponent } from './owner-dashboard/owner-dashboard.component';
import { OwnerRegistrationComponent } from './owner-registration/owner-registration.component';
import { OwnerBillingComponent } from './owner-billing/owner-billing.component';
import { OwnerRegisterTenantComponent } from './owner-register-tenant/owner-register-tenant.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ownerRoutes),
    OwnerDashboardComponent,
    OwnerRegistrationComponent,
    OwnerBillingComponent,
    OwnerRegistrationComponent,
    OwnerRegisterTenantComponent
  ],
})
export class OwnerModule { }
