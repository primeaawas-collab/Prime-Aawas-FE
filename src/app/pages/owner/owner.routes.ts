import { Routes } from '@angular/router';
import { OwnerDashboardComponent } from './owner-dashboard/owner-dashboard.component';
import { OwnerRegistrationComponent } from './owner-registration/owner-registration.component';
import { OwnerPropertyManagementComponent } from './owner-property-management/owner-property-management.component';
import { OwnerRegisterTenantComponent } from './owner-register-tenant/owner-register-tenant.component';
import { OwnerBillingComponent } from './owner-billing/owner-billing.component';
import { FlatsAssociatedPropertyComponent } from './flats-associated-property/flats-associated-property.component';


export const ownerRoutes: Routes = [
    { path: '', redirectTo: 'owner-dashboard', pathMatch: 'full' },
    { path: 'owner-dashboard', component: OwnerDashboardComponent },
    { path: 'owner-register', component: OwnerRegistrationComponent },
    { path: 'owner-property-management', component: OwnerPropertyManagementComponent },
    { path: 'flats-associated-property', component: FlatsAssociatedPropertyComponent },
    { path: 'owner-register-tenant', component: OwnerRegisterTenantComponent },
    { path: 'owner-billing', component: OwnerBillingComponent },
];
