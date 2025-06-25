import { HttpClient, HttpClientModule } from '@angular/common/http';
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
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './regester-property.component.html',
  styleUrls: ['./regester-property.component.scss'],
})
export class RegesterPropertyComponent implements OnInit {
  propertyForm!: FormGroup;
  ownerEmail = 'prime@123';
ownerName = 'Mr. Prime'; // new auto-populated name
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.propertyForm = this.fb.group({
    propertyName: ['', Validators.required],
    ownerName: [{ value: this.ownerName, disabled: true }], // NEW
    addressLine: ['', Validators.required],
    pinCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    district: [{ value: '', disabled: true }],
    state: [{ value: '', disabled: true }],
    ownerEmail: [{ value: this.ownerEmail, disabled: true }],
    ownerPhone: [{ value: '9876543210', disabled: true }], // Optional: dummy data
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

    this.propertyForm.get('pinCode')?.valueChanges.subscribe((pin: string) => {
      if (pin.length === 6 && /^\d{6}$/.test(pin)) {
        this.lookupPinCode(pin);
      } else {
        this.propertyForm.patchValue({ state: '', district: '' });
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
          monthlyRent: ['', [Validators.required, Validators.min(0)]],
        })
      );
    }
  }

  private lookupPinCode(pin: string): void {
    const url = `https://api.postalpincode.in/pincode/${pin}`;
    this.http.get<any[]>(url).subscribe(
      (response) => {
        const postOffice = response?.[0]?.PostOffice?.[0];
        if (postOffice) {
          this.propertyForm.patchValue({
            state: postOffice.State,
            district: postOffice.District,
          });
        } else {
          alert('Invalid PIN Code!');
          this.propertyForm.patchValue({ state: '', district: '' });
        }
      },
      (error) => {
        console.error('PIN Lookup failed', error);
        this.propertyForm.patchValue({ state: '', district: '' });
      }
    );
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
