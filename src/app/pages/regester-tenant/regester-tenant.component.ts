import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TenantFormDialogComponent } from '../tenant-form-dialog/tenant-form-dialog.component';

@Component({
  selector: 'app-regester-tenant',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './regester-tenant.component.html',
  styleUrls: ['./regester-tenant.component.scss'],
})
export class RegesterTenantComponent {
  tenants: any[] = [
    {
      id: 'T001',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      phone: '9998887770',
      emergencyPhone: '9876543210',
      address: 'Green Street',
      flatAssigned: 'A01',
      rentStartDate: '2023-07-01',
      rentAmount: 12000,
      securityDeposit: 10000,
      overdueAmount: 0,
      services: {
        Wifi: true,
        Parking: true,
        Maintenance: false,
        Water: false,
        Electricity: false,
      },
      totalRent: 12800,
    },
    {
      id: 'T002',
      name: 'Bob Smith',
      email: 'bob@example.com',
      phone: '9988776655',
      emergencyPhone: '9991112222',
      address: 'Blue Avenue',
      flatAssigned: 'A02',
      rentStartDate: '2023-08-15',
      rentAmount: 13500,
      securityDeposit: 10000,
      overdueAmount: 1000,
      services: {
        Wifi: true,
        Parking: false,
        Maintenance: true,
        Water: false,
        Electricity: false,
      },
      totalRent: 14000,
    },
  ];

  constructor(private dialog: MatDialog) {}

  openAddTenant(): void {
    const dialogRef = this.dialog.open(TenantFormDialogComponent, {
      data: { mode: 'add' },
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newId = 'T' + String(this.tenants.length + 1).padStart(3, '0');
        this.tenants.push({ id: newId, ...result });
      }
    });
  }

  openEditTenant(tenant: any): void {
    const dialogRef = this.dialog.open(TenantFormDialogComponent, {
      data: { mode: 'edit', tenant },
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.tenants.findIndex((t) => t.id === tenant.id);
        this.tenants[index] = { id: tenant.id, ...result };
      }
    });
  }

  getSelectedServices(services: any): string[] {
    return Object.entries(services)
      .filter(([_, value]) => value)
      .map(([key]) => key);
  }
  deleteTenant(tenant: any): void {
  const confirmed = confirm(`Are you sure you want to delete tenant ${tenant.name}?`);
  if (confirmed) {
    this.tenants = this.tenants.filter(t => t.id !== tenant.id);
  }
}

}
