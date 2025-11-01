import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppNavigationService } from '../utils/app-navigation.service';

@Component({
  selector: 'app-integration-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './integration-section.component.html',
  styleUrl: './integration-section.component.scss'
})
export class IntegrationSectionComponent {
  integrations = [
    { name: 'Shopify', logo: 'shopify' },
    { name: 'WooCommerce', logo: 'woocommerce' },
    { name: 'PrestaShop', logo: 'prestashop' },
    { name: 'Magento', logo: 'magento' },
    { name: 'BigCommerce', logo: 'bigcommerce' }
  ];
  
  clientCount = '500+';
  
  constructor(private appNavigation: AppNavigationService) {}
  
  startJourney(): void {
    this.appNavigation.navigateToApp();
  }
}

