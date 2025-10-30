import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-card" [class.show]="isVisible" (click)="$event.stopPropagation()">
      <div class="profile-header">
        <div class="user-info">
          <div class="user-avatar-large">
            <span class="avatar-text">{{ userInitials }}</span>
          </div>
          <div class="user-details">
            <h3 class="user-name">{{ userName }}</h3>
            <p class="user-role">{{ userRole }}</p>
          </div>
        </div>
        <button class="close-btn" (click)="onClose()" title="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <div class="profile-content">
        <!-- App Information Section -->
        <div class="info-section">
          <h4 class="section-title">App Information</h4>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">App Name:</span>
              <span class="info-value">{{ environment.appName }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Version:</span>
              <span class="info-value">{{ environment.appVersion }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Environment:</span>
              <span class="info-value env-badge" [ngClass]="getEnvironmentClass()">
                {{ environment.environment.toUpperCase() }}
              </span>
            </div>
            <div class="info-item">
              <span class="info-label">API URL:</span>
              <span class="info-value">{{ environment.apiUrl }}</span>
            </div>
          </div>
        </div>

      </div>

      <div class="profile-actions">
        <button class="action-btn secondary" (click)="onLogout()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <polyline points="16,17 21,12 16,7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Logout
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent {
  @Input() isVisible = false;
  @Input() userName = 'John Doe';
  @Input() userRole = 'Property Owner';
  @Input() userInitials = 'JD';
  
  @Output() close = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  environment = environment;

  getEnvironmentClass(): string {
    return this.environment.environment.toLowerCase();
  }

  onClose(): void {
    this.close.emit();
  }

  onLogout(): void {
    this.logout.emit();
  }
}
