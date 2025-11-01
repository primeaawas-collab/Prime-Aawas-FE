import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-protection-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './protection-section.component.html',
  styleUrl: './protection-section.component.scss'
})
export class ProtectionSectionComponent {
  contactForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  };

  features = [
    'High Risk Properties',
    'International Support',
    'Data Protection',
    'Fraud Prevention',
    '24/7 Support',
    'Secure Transactions',
    'Compliance Management',
    'Automated Backups'
  ];

  onSubmit(): void {
    // Handle form submission
    console.log('Form submitted:', this.contactForm);
    // Add API call here
  }
}

