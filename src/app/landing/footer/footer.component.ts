import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppNavigationService } from '../utils/app-navigation.service';

@Component({
  selector: 'app-landing-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  
  links = {
    appStore: 'https://apps.apple.com/app/your-app-id',
    playStore: 'https://play.google.com/store/apps/details?id=your.app.id'
  };
  
  constructor(private appNavigation: AppNavigationService) {}
  
  getWebAppUrl(): string {
    return this.appNavigation.getAppUrl();
  }
  
  navigateToWebApp(): void {
    this.appNavigation.navigateToApp();
  }
  
  socialLinks = {
    facebook: 'https://facebook.com/primeaawas',
    twitter: 'https://twitter.com/primeaawas',
    linkedin: 'https://linkedin.com/company/primeaawas',
    instagram: 'https://instagram.com/primeaawas'
  };
  
  navigateToLink(url: string): void {
    if (url.startsWith('http')) {
      window.open(url, '_blank');
    } else {
      window.location.href = url;
    }
  }
}

