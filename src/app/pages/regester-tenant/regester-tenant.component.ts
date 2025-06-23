import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenantFormDialogComponent } from '../tenant-form-dialog/tenant-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-regester-tenant',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './regester-tenant.component.html',
})
export class RegesterTenantComponent {
tenants = [
  {
    id: 'T001',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    phone: '9998887770',
    address: 'Green Street',
    flatAssigned: 'A01',
    rentStartDate: '2023-07-01',
    rentAmount: 12000,
    overdueAmount: 0,
  },
  {
    id: 'T002',
    name: 'Bob Smith',
    email: 'bob@example.com',
    phone: '9988776655',
    address: 'Blue Avenue',
    flatAssigned: 'A02',
    rentStartDate: '2023-08-15',
    rentAmount: 13500,
    overdueAmount: 1000,
  },
  {
    id: 'T003',
    name: 'Clara Yadav',
    email: 'clara@example.com',
    phone: '9876543210',
    address: 'Sunshine Colony',
    flatAssigned: 'B01',
    rentStartDate: '2023-06-10',
    rentAmount: 15000,
    overdueAmount: 3000,
  },
];

  expandedTenantId: string | null = null;

  constructor(private dialog: MatDialog) {}

  toggleExpand(tenantId: string): void {
    this.expandedTenantId = this.expandedTenantId === tenantId ? null : tenantId;
  }

  openAddTenant(): void {
    const dialogRef = this.dialog.open(TenantFormDialogComponent, {
      data: { mode: 'add' },
        width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
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

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.tenants.findIndex(t => t.id === tenant.id);
        this.tenants[index] = { id: tenant.id, ...result };
      }
    });
  }
}
