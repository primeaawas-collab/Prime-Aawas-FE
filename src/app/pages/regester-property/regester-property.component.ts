import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-regester-property',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './regester-property.component.html',
  styleUrls: ['./regester-property.component.scss'],
})
export class RegesterPropertyComponent implements OnInit {
  propertyForm!: FormGroup;
  ownerEmail = 'prime@123'; // To be dynamically fetched via AuthService later

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.propertyForm = this.fb.group({
      propertyName: ['', Validators.required],
      address: ['', Validators.required],
      ownerEmail: [{ value: this.ownerEmail, disabled: true }],
      ownerPhone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      electricityUnitRate: ['', Validators.required],
      numberOfFlats: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      flats: this.fb.array([]),
    });

    this.propertyForm.get('numberOfFlats')?.valueChanges.subscribe((count) => {
      const parsed = parseInt(count, 10);
      if (!isNaN(parsed) && parsed > 0 && parsed <= 10) {
        this.generateFlats(parsed);
      } else {
        this.flats.clear();
      }
    });
  }

  get flats(): FormArray {
    return this.propertyForm.get('flats') as FormArray;
  }

 private generateFlats(count: number): void {
  this.flats.clear();
  for (let i = 0; i < count; i++) {
    this.flats.push(
      this.fb.group({
        type: ['', Validators.required],
        serialNumber: ['', Validators.required],
        furnishing: ['', Validators.required],
        parking: ['', Validators.required],
        monthlyRent: ['', [Validators.required, Validators.min(0)]], // 💰 New field
      })
    );
  }
}


  submitForm(): void {
    if (this.propertyForm.valid) {
      const payload = {
        ...this.propertyForm.getRawValue(),
        ownerEmail: this.ownerEmail,
      };
      console.log('✅ Property Registered:', payload);
      alert('Property registered successfully!');
    } else {
      this.propertyForm.markAllAsTouched();
    }
  }
}
