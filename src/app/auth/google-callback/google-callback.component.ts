import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleAuthService } from '../../service/authentication/google-auth.service';
import { TokenService } from '../../service/authentication/token.service';
import { ToastService } from '../../service/toast/toast.service';
import { AuthResponse } from '../../service/authentication/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-google-callback',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="callback-container">
      <div class="spinner-container" *ngIf="isLoading">
        <div class="spinner"></div>
        <p>Processing your authentication...</p>
      </div>
      <div class="error-container" *ngIf="errorMessage">
        <p class="error-text">{{ errorMessage }}</p>
        <button class="retry-button" (click)="retry()">Try Again</button>
      </div>
    </div>
  `,
  styles: [`
    .callback-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    .spinner-container { text-align: center; color: white; }
    .spinner {
      border: 4px solid rgba(255, 255, 255, 0.3);
      border-top: 4px solid white;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      animation: spin 1s linear infinite;
      margin: 0 auto 20px;
    }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    .error-container {
      text-align: center;
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .error-text { color: #e74c3c; margin-bottom: 20px; }
    .retry-button {
      background: #667eea;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
    }
    .retry-button:hover { background: #5568d3; }
  `]
})
export class GoogleCallbackComponent implements OnInit, OnDestroy {
  isLoading = true;
  errorMessage = '';
  private authMode: 'login' | 'signup' = 'login';
  private routeSubscription?: Subscription;
  private callbackSubscription?: Subscription;

  // ✅ Inject PLATFORM_ID for SSR-safe environment checks
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly googleAuthService: GoogleAuthService,
    private readonly tokenService: TokenService,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    // Check if there's a stored auth mode (login or signup)
    const storedMode = sessionStorage.getItem('googleAuthMode');
    if (storedMode && (storedMode === 'login' || storedMode === 'signup')) {
      this.authMode = storedMode;
      sessionStorage.removeItem('googleAuthMode');
    }

    // Get the authorization code from query params
    this.routeSubscription = this.route.queryParams.subscribe(params => {
      const code = params['code'];
      const error = params['error'];
      const errorDescription = params['error_description'];

      if (error) {
        const errorMsg = errorDescription || error || 'Authentication failed';
        this.handleError(`Authentication failed: ${errorMsg}`, 'OAuth Error');
        return;
      }

      if (!code) {
        this.handleError('No authorization code received from Google', 'Missing Code');
        return;
      }

      if (typeof code !== 'string' || code.trim().length === 0) {
        this.handleError('Invalid authorization code received', 'Invalid Code');
        return;
      }

      this.handleGoogleCallback(code.trim());
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) this.routeSubscription.unsubscribe();
    if (this.callbackSubscription) this.callbackSubscription.unsubscribe();
  }

  handleGoogleCallback(code: string): void {
    const callback$ = this.googleAuthService.handleGoogleCallback(code);

    this.callbackSubscription = callback$.subscribe({
      next: (response) => this.handleSuccessResponse(response),
      error: (error) => this.handleErrorResponse(error)
    });
  }

  private handleSuccessResponse(response: AuthResponse): void {
    this.isLoading = false;

    if (!response.success) {
      this.handleError(response.message || `${this.authMode === 'signup' ? 'Signup' : 'Login'} failed`);
      return;
    }

    try {
      if (response.data?.token) {
        this.tokenService.setToken(response.data.token);
      } else {
        const mockToken = `google_oauth_token_${Date.now()}`;
        this.tokenService.setToken(mockToken);
      }

      if (response.data?.role) this.tokenService.setRole(response.data.role);

      if (response.data) {
        const userInfo = {
          name: response.data.name || '',
          email: response.data.email || '',
          role: response.data.role || '',
          profileImageUrl: response.data.profileImageUrl || null
        };
        this.tokenService.setUserInfo(userInfo);
      }

      const successMessage = this.authMode === 'signup'
        ? 'Welcome to Prime Aawas!'
        : 'Login successful! Welcome back.';

      this.toastService.success(successMessage, 'Success');
      this.redirectToDashboard(response.data?.role);
    } catch (error) {
      console.error('Error processing authentication response:', error);
      this.handleError('An error occurred while processing your authentication.');
    }
  }

  private handleErrorResponse(error: any): void {
    this.isLoading = false;
    console.error(`Google ${this.authMode} error:`, error);

    let errorMessage = 'An error occurred. Please try again.';
    let errorTitle = 'Authentication Error';

    if (error?.error) {
      if (typeof error.error === 'string') {
        errorMessage = error.error;
      } else if (error.error?.message) {
        errorMessage = error.error.message;
      } else if (error.error?.error) {
        errorMessage = error.error.error;
      }

      if (error.status === 401) {
        errorMessage = 'Authentication failed. Please try again.';
        errorTitle = 'Unauthorized';
      } else if (error.status === 403) {
        errorMessage = 'Access denied. Please contact support.';
        errorTitle = 'Forbidden';
      } else if (error.status === 0) {
        errorMessage = 'Network error. Please check your connection and try again.';
        errorTitle = 'Network Error';
      } else if (error.status >= 500) {
        errorMessage = 'Server error. Please try again later.';
        errorTitle = 'Server Error';
      }
    }

    this.handleError(errorMessage, errorTitle);
  }

  private redirectToDashboard(role?: string): void {
    const roleBasedRoutes: { [key: string]: string[] } = {
      'admin': ['/admin/dashboard'],
      'owner': ['/owner/owner-dashboard'],
      'tenant': ['/tenant/dashboard']
    };

    const defaultRoute = ['/owner/owner-dashboard'];
    const targetRoute = role ? (roleBasedRoutes[role.toLowerCase()] || defaultRoute) : defaultRoute;

    this.router.navigate(targetRoute);
  }

  handleError(message: string, title: string = 'Authentication Error'): void {
    this.isLoading = false;
    this.errorMessage = message;
    this.toastService.error(message, title);
  }

  retry(): void {
    const redirectPath = this.authMode === 'signup' ? '/auth/signup' : '/auth/login';
    this.router.navigate([redirectPath]);
  }
}
