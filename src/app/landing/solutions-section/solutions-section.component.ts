import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solutions-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solutions-section.component.html',
  styleUrl: './solutions-section.component.scss'
})
export class SolutionsSectionComponent {
  solutions = [
    {
      icon: 'bi-speedometer2',
      title: 'Owner Dashboard',
      description: 'Centralized dashboard to view tenants, track rent, and monitor bills. Complete property management at your fingertips.'
    },
    {
      icon: 'bi-person-circle',
      title: 'Tenant Portal',
      description: 'Self-service portal for tenants to view bills and make payments online. Simplifying tenant-owner communication.'
    },
    {
      icon: 'bi-file-earmark-text',
      title: 'Bill Generation',
      description: 'Automated bill generation and instant sharing with tenants. Reduce manual work and improve efficiency.'
    },
    {
      icon: 'bi-calendar-check',
      title: 'Payment Reminders',
      description: 'Automated payment tracking with smart reminders. Keep everyone informed and payments on schedule.'
    },
    {
      icon: 'bi-graph-up-arrow',
      title: 'Reports & Analytics',
      description: 'Generate monthly and annual reports with detailed insights. Make data-driven decisions for your Flats.'
    },
    {
      icon: 'bi-graph-up-arrow',
      title: 'Service Requests and Maintenance Tracking',
      description: 'Tenant can submit service requests and track the progress of the maintenance. Make data-driven decisions for your Flats.'
    }
  ];

  testimonials = [
    {
      rating: 5,
      text: 'Prime Aawas has revolutionized how we manage our properties. Highly recommended!'
    },
    {
      rating: 5,
      text: 'The billing system is automated and efficient. Great platform for property owners.'
    },
    {
      rating: 5,
      text: 'Easy to use, comprehensive features, and excellent customer support.'
    }
  ];
}

