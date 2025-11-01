import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent {
  features = [
    'Owner dashboard (view tenants, rent, bills)',
    'Tenant portal (view and pay bills)',
    'Bill generation and sharing',
    'Payment tracking and reminders',
    'Service requests and maintenance tracking',
    'Report generation (monthly / annual summary)',
  ];

  paymentMethods = [
    { name: 'VISA', icon: 'bi-credit-card-2-front-fill', color: '#1a1f71' },
    { name: 'American Express', icon: 'bi-credit-card-2-front-fill', color: '#006fcf' },
    { name: 'Discover', icon: 'bi-credit-card-2-front-fill', color: '#ff6000' },
    { name: 'Verve', icon: 'bi-credit-card-2-front-fill', color: '#6400aa' },
    { name: 'Google Pay', icon: 'bi-wallet-fill', color: '#4285f4' },
    { name: 'Apple Pay', icon: 'bi-wallet-fill', color: '#000000' },
    { name: 'Paytm', icon: 'bi-wallet-fill', color: '#002970' },
    { name: 'PhonePe', icon: 'bi-wallet-fill', color: '#5f259f' },
    { name: 'Amazon Pay', icon: 'bi-wallet-fill', color: '#ff9900' }
  ];

  notifyComingSoon(store: string): void {
    alert(`${store} app coming soon! Stay tuned for updates.`);
  }
}

