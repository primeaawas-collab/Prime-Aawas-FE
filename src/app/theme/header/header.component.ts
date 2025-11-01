import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { TokenService } from '../../service/authentication/token.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ProfileCardComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  currentPageTitle = 'Dashboard';
  isDarkMode = false;
  showProfileCard = false;
  userName = 'John Doe';
  userRole = 'Property Owner';
  userInitials = 'JD';

  constructor(
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    // Load user info from localStorage
    this.loadUserInfo();
    
    // Listen to route changes to update page title
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updatePageTitle(event.url);
      });
  }

  loadUserInfo(): void {
    const userInfo = this.tokenService.getUserInfo();
    const role = this.tokenService.getRole();
    
    if (userInfo) {
      this.userName = userInfo.name || 'User';
      this.userRole = this.formatRole(userInfo.role || role || 'Property Owner');
      this.userInitials = this.tokenService.generateInitials(this.userName);
    } else if (role) {
      this.userRole = this.formatRole(role);
    }
  }

  formatRole(role: string): string {
    if (!role) return 'Property Owner';
    
    // Convert role like "OWNER" to "Owner"
    return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  }

  updatePageTitle(url: string) {
    const routeMap: { [key: string]: string } = {
      // Auth Routes
      '/login': 'Login',
      '/signup': 'Sign Up',
      
      // Owner Routes
      '/owner/owner-dashboard': 'Dashboard',
      '/owner/owner-register': 'Owner Registration',
      '/owner/owner-property-management': 'Property Management',
      '/owner/flats-associated-property': 'Flats Associated Property',
      '/owner/owner-register-tenant': 'Register Tenant',
      '/owner/owner-billing': 'Billing',
      
      // Admin Routes
      '/admin': 'Admin Dashboard',
      
      // Tenant Routes
      '/tenant': 'Tenant Dashboard',
      
      // Default fallbacks
      '/': 'Dashboard',
      '': 'Dashboard'
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

  toggleProfileCard() {
    this.showProfileCard = !this.showProfileCard;
  }

  onCloseProfileCard() {
    this.showProfileCard = false;
  }

  onLogout() {
    console.log('Logout clicked');
    this.showProfileCard = false;
    // Clear token, role, and user info
    this.tokenService.logout();
    // Reset user info display
    this.userName = 'John Doe';
    this.userRole = 'Property Owner';
    this.userInitials = 'JD';
    this.router.navigate(['/auth/login']);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    // Close profile card when clicking outside
    if (this.showProfileCard) {
      const target = event.target as HTMLElement;
      if (!target.closest('.profile-card') && !target.closest('.user-avatar')) {
        this.showProfileCard = false;
      }
    }
  }
}
