import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

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

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TenantFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.flatOptions = ['A01', 'A02', 'B01', 'B02']; // Simulated API response

    this.tenantForm = this.fb.group({
      name: [this.data?.tenant?.name || '', Validators.required],
      email: [this.data?.tenant?.email || '', [Validators.required, Validators.email]],
      phone: [this.data?.tenant?.phone || '', [Validators.required, Validators.pattern('[0-9]{10}')]],
      flatAssigned: [this.data?.tenant?.flatAssigned || '', Validators.required],
      rentStartDate: [this.data?.tenant?.rentStartDate || '', Validators.required],
      rentAmount: [this.data?.tenant?.rentAmount || '', Validators.required],
      overdueAmount: [this.data?.tenant?.overdueAmount || 0],
      address: [this.data?.tenant?.address || '']
    });
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
