import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  serviceCards = [
  {
    number: '1',
    title: 'Register Property',
    desc: 'Manage your flats',
    icon: 'bi bi-house-door-fill',
    link: '/register-property',
    bgClass: 'bg-skill-1'
  },
  {
    number: '2',
    title: 'Manage Services',
    desc: 'Update your Services',
    icon: 'bi bi-card-list',
    link: '/service-section',
    bgClass: 'bg-skill-5'
  },
  {
    number: '3',
    title: 'Register Tenant',
    desc: 'Add tenant details',
    icon: 'bi bi-person-plus-fill',
    link: '/register-tenant',
    bgClass: 'bg-skill-2'
  },
  {
    number: '4',
    title: 'Manage Billing',
    desc: 'Update the Billing',
    icon: 'bi bi-card-list',
    link: '/billing-cost',
    bgClass: 'bg-skill-3'
  },
  {
    number: '5',
    title: 'Billing',
    desc: 'Generate and manage bills',
    icon: 'bi bi-receipt-cutoff',
    link: '/billing',
    bgClass: 'bg-skill-4'
  }
];

}
