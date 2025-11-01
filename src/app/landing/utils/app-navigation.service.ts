import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppNavigationService {
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /**
   * Get the application URL based on environment
   * Development: http://dev-app.primeaawas.com
   * Production: https://app.primeaawas.com
   */
  getAppUrl(): string {
    if (!isPlatformBrowser(this.platformId)) {
      // Server-side: default to production
      return 'https://app.primeaawas.com';
    }

    // Client-side: check if running on localhost
    const isLocalhost = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1' ||
                       window.location.hostname.startsWith('192.168.') ||
                       window.location.hostname.startsWith('10.') ||
                       window.location.hostname === '';

    // Use environment production flag if available, otherwise check hostname
    if (environment.production || !isLocalhost) {
      return 'https://app.primeaawas.com';
    } else {
      return 'http://dev-app.primeaawas.com';
    }
  }

  /**
   * Navigate to the appropriate app URL
   */
  navigateToApp(): void {
    const appUrl = this.getAppUrl();
    window.location.href = appUrl;
  }
}

