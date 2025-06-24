import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-billing-cost',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './billing-cost.component.html',
  styleUrls: ['./billing-cost.component.scss']
})
export class BillingCostComponent  implements OnInit  {
  billingForm!: FormGroup;
  electricityRate = 10; // ₹ per unit

  // Simulated tenant/flat data with services
  rentedFlats = [
    {
      flatId: 'A01',
      tenantName: 'Alice Johnson',
      rentAmount: 12000,
      services: {
        parking: true,
        wifi: true,
        water: true,
        maintenance: true,
        electricity: true,
      },
    },
    {
      flatId: 'A02',
      tenantName: 'Bob Smith',
      rentAmount: 10000,
      services: {
        parking: false,
        wifi: false,
        water: true,
        maintenance: true,
        electricity: true,
      },
    },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.billingForm = this.fb.group({
      billingMonth: ['', Validators.required],
      flats: this.fb.array([]),
    });

    this.initFlats();
  }

  get flats(): FormArray {
    return this.billingForm.get('flats') as FormArray;
  }

  initFlats(): void {
    this.rentedFlats.forEach((flat) => {
      this.flats.push(this.createFlatBillingGroup(flat));
    });
  }

  createFlatBillingGroup(flat: any): FormGroup {
    const group = this.fb.group({
      flatId: [flat.flatId],
      tenantName: [flat.tenantName],
      rentAmount: [flat.rentAmount],
      parking: [flat.services.parking ? 500 : 0],
      wifi: [flat.services.wifi ? 300 : 0],
      water: [flat.services.water ? 200 : 0],
      maintenance: [flat.services.maintenance ? 400 : 0],
      previousUnit: [0],
      currentUnit: [0],
      electricityCost: [{ value: 0, disabled: true }],
      total: [{ value: 0, disabled: true }],
      servicesUsed: [flat.services],
    });

    group.valueChanges.subscribe(() => this.calculateTotals(group));

    return group;
  }

  calculateTotals(group: FormGroup): void {
    const values = group.getRawValue();
    const units = Math.max((+values.currentUnit || 0) - (+values.previousUnit || 0), 0);
    const electricityCost = values.servicesUsed.electricity ? units * this.electricityRate : 0;

    const total =
      +values.rentAmount +
      (+values.parking || 0) +
      (+values.wifi || 0) +
      (+values.water || 0) +
      (+values.maintenance || 0) +
      electricityCost;

    group.patchValue(
      {
        electricityCost,
        total,
      },
      { emitEvent: false }
    );
  }

  submitAllBills(): void {
    const raw = this.billingForm.getRawValue();
    console.log('📤 Submitting All Bills:', raw);
    alert('All bills submitted!');
  }
}