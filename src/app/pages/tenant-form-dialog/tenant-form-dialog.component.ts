import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

interface ServiceConfig {
  parking: { available: boolean; carCharge?: number; bikeCharge?: number };
  wifi: { available: boolean; charge?: number };
  maintenance: { available: boolean; charge?: number };
  water: { available: boolean; charge?: number };
  electricityRate: number;
}

@Component({
  selector: 'app-tenant-form-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tenant-form-dialog.component.html',
  styleUrls: ['./tenant-form-dialog.component.scss']
})
export class TenantFormDialogComponent implements OnInit {
  tenantForm!: FormGroup;
  flatOptions: string[] = [];
  availableServices: ServiceConfig;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TenantFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mode: string; tenant?: any; services?: ServiceConfig }
  ) {
    this.availableServices = data.services || {} as ServiceConfig;
  }

  ngOnInit(): void {
    this.flatOptions = ['A01', 'A02', 'B01', 'B02']; // Replace with API later

    this.tenantForm = this.fb.group({
      name: [this.data?.tenant?.name || '', Validators.required],
      email: [this.data?.tenant?.email || '', [Validators.required, Validators.email]],
      phone: [this.data?.tenant?.phone || '', [Validators.required, Validators.pattern('[0-9]{10}')]],
      flatAssigned: [this.data?.tenant?.flatAssigned || '', Validators.required],
      rentStartDate: [this.data?.tenant?.rentStartDate || '', Validators.required],
      rentAmount: [this.data?.tenant?.rentAmount || '', Validators.required],
      overdueAmount: [this.data?.tenant?.overdueAmount || 0],
      address: [this.data?.tenant?.address || ''],
      optedServices: this.fb.group({
        parking: [this.data?.tenant?.optedServices?.parking || false],
        wifi: [this.data?.tenant?.optedServices?.wifi || false],
        maintenance: [this.data?.tenant?.optedServices?.maintenance || false],
        water: [this.data?.tenant?.optedServices?.water || false]
      })
    });
  }

  get optedServicesGroup(): FormGroup {
    return this.tenantForm.get('optedServices') as FormGroup;
  }

  submit(): void {
    if (this.tenantForm.valid) {
      this.dialogRef.close(this.tenantForm.value);
    } else {
      this.tenantForm.markAllAsTouched();
    }
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}
