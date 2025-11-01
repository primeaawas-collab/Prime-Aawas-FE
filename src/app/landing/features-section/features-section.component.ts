import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-features-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features-section.component.html',
  styleUrl: './features-section.component.scss'
})
export class FeaturesSectionComponent {
  features = [
    {
      icon: 'bi-speedometer2',
      title: 'Owner Dashboard',
      description: 'View tenants, rent, and bills all in one comprehensive dashboard. Get real-time insights into your property portfolio.'
    },
    {
      icon: 'bi-person-circle',
      title: 'Tenant Portal',
      description: 'Tenants can view and pay bills seamlessly through their dedicated portal. Easy access to payment history and invoices.'
    },
    {
      icon: 'bi-file-earmark-text',
      title: 'Bill Generation & Sharing',
      description: 'Automatically generate bills and share them instantly with tenants via email or portal. Streamlined billing workflow.'
    },
    {
      icon: 'bi-bell',
      title: 'Payment Tracking & Reminders',
      description: 'Track all payments in real-time and send automatic reminders to tenants. Never miss a payment deadline.'
    },
    
  ];
}

