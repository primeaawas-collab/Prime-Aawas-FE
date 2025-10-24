import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  currentPageTitle = 'Dashboard';
  isDarkMode = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Listen to route changes to update page title
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updatePageTitle(event.url);
      });
  }

  updatePageTitle(url: string) {
    const routeMap: { [key: string]: string } = {
      '/owner/owner-dashboard': 'Dashboard',
      '/owner/owner-property-management': 'Property Management',
      '/owner/owner-register-tenant': 'Register Tenant',
      '/owner/owner-billing': 'Billing',
      '/owner/owner-registration': 'Owner Registration'
    };

    this.currentPageTitle = routeMap[url] || 'Dashboard';
  }

  toggleSidebar() {
    // This will be handled by the parent component or service
    // For now, we'll emit an event or use a service
    console.log('Toggle sidebar');
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    // Add dark mode logic here
    console.log('Toggle dark mode:', this.isDarkMode);
  }
}
