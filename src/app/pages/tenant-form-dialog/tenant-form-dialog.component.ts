import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-tenant-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './tenant-form-dialog.component.html',
  styleUrls: ['./tenant-form-dialog.component.scss'],
})
export class TenantFormDialogComponent implements OnInit {
  tenantForm!: FormGroup;
  availableServices = ['Parking', 'Wifi', 'Maintenance', 'Water', 'Electricity'];
  serviceCharges = {
    Parking: 500,
    Wifi: 300,
    Maintenance: 200,
    Water: 100,
    Electricity: 0,
  };

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TenantFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.tenantForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      emergencyPhone: [''],
      address: [''],
      flatAssigned: ['', Validators.required],
      rentAmount: [0, Validators.required],
      services: this.fb.group<Record<string, boolean>>(
  Object.fromEntries(this.availableServices.map((s) => [s, false]))
)
,
      rentStartDate: ['', Validators.required],
      overdueAmount: [0],
      securityDeposit: [0],
      totalRent: [{ value: 0, disabled: true }],
    });

    if (this.data?.tenant) {
      this.tenantForm.patchValue(this.data.tenant);
    }

    this.tenantForm.valueChanges.subscribe(() => this.calculateTotalRent());
    this.calculateTotalRent();
  }

  calculateTotalRent(): void {
    const baseRent = +this.tenantForm.get('rentAmount')?.value || 0;
    const servicesGroup = this.tenantForm.get('services')?.value || {};
    let totalServiceCharge = 0;

   for (const [service, enabled] of Object.entries(servicesGroup)) {
  if (enabled) {
    totalServiceCharge += this.serviceCharges[service as keyof typeof this.serviceCharges] || 0;
  }
}


    this.tenantForm.patchValue(
      { totalRent: baseRent + totalServiceCharge },
      { emitEvent: false }
    );
  }

  submit(): void {
    if (this.tenantForm.valid) {
      const formValue = {
        ...this.tenantForm.getRawValue(),
        totalRent: this.tenantForm.get('totalRent')?.value,
      };
      this.dialogRef.close(formValue);
    } else {
      this.tenantForm.markAllAsTouched();
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
