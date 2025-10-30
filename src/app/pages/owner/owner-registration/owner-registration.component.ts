import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-owner-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './owner-registration.component.html',
  styleUrl: './owner-registration.component.scss'
})
export class OwnerRegistrationComponent {
  registrationForm: FormGroup;
  uploadedFiles: { [key: string]: File } = {};

  @ViewChild('aadhaarFrontInput') aadhaarFrontInput!: ElementRef;
  @ViewChild('aadhaarBackInput') aadhaarBackInput!: ElementRef;
  @ViewChild('panCardInput') panCardInput!: ElementRef;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      // Property Information
      propertyName: ['', Validators.required],
      ownerName: ['', Validators.required],
      ownerPhone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      ownerEmail: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      pinCode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      address: ['', Validators.required],
      
      // Bank Account Details
      accountHolderName: ['', Validators.required],
      accountNumber: ['', Validators.required],
      confirmAccountNumber: ['', Validators.required],
      ifscCode: ['', Validators.required],
      bankName: [''],
      accountType: ['savings', Validators.required],
      
      // Terms
      agreeTerms: [false, Validators.requiredTrue]
    });
  }

  triggerFileUpload(type: string) {
    switch (type) {
      case 'aadhaarFront':
        this.aadhaarFrontInput.nativeElement.click();
        break;
      case 'aadhaarBack':
        this.aadhaarBackInput.nativeElement.click();
        break;
      case 'panCard':
        this.panCardInput.nativeElement.click();
        break;
    }
  }

  onFileSelected(event: any, type: string) {
    const file = event.target.files[0];
    if (file) {
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload JPG, PNG, or PDF files only');
        return;
      }
      
      this.uploadedFiles[type] = file;
      console.log(`File uploaded for ${type}:`, file.name);
    }
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = {
        ...this.registrationForm.value,
        uploadedFiles: this.uploadedFiles
      };
      
      console.log('Registration form submitted:', formData);
      // Here you would typically send the data to your backend service
      alert('Registration submitted successfully!');
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.registrationForm.controls).forEach(key => {
      const control = this.registrationForm.get(key);
      control?.markAsTouched();
    });
  }
}
