import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-protection-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './protection-section.component.html',
  styleUrl: './protection-section.component.scss'
})
export class ProtectionSectionComponent {
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

  notifyComingSoon(store: string): void {
    alert(`${store} app coming soon! Stay tuned for updates.`);
  }
}

