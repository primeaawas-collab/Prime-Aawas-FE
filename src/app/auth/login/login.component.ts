import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { TokenService } from '../../service/authentication/token.service';
import { AuthService, LoginRequest } from '../../service/authentication/auth.service';
import { ToastService } from '../../service/toast/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private router: Router, 
    private tokenService: TokenService,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  onSubmit(): void {
    if (!this.email || !this.password) {
      this.toastService.warning('Please fill in all fields', 'Validation Error');
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const loginData: LoginRequest = {
      email: this.email,
      password: this.password
    };

    this.authService.login(loginData).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          // Store token if provided in response.data
          if (response.data && response.data.token) {
            this.tokenService.setToken(response.data.token);
          } else {
            // Generate a mock token if not provided by API
            const mockToken = 'api_jwt_token_' + Date.now();
            this.tokenService.setToken(mockToken);
          }
          this.toastService.success('Login successful! Welcome back.', 'Success');
          this.router.navigate(['/owner/owner-dashboard']);
        } else {
          this.toastService.error(response.message || 'Login failed. Please try again.', 'Login Error');
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Login error:', error);
        this.toastService.error('An error occurred. Please try again.', 'Network Error');
      }
    });
  }

  onGoogleLogin(): void {
    console.log('Google login clicked');
    this.toastService.info('Google login feature coming soon!', 'Feature Notice');
    // TODO: Implement Google OAuth login
    // For now, simulate successful login
    // const mockToken = 'google_oauth_token_' + Date.now();
    // this.tokenService.setToken(mockToken);
    // this.router.navigate(['/owner/owner-dashboard']);
  }

  onFacebookLogin(): void {
    console.log('Facebook login clicked');
    this.toastService.info('Facebook login feature coming soon!', 'Feature Notice');
    // TODO: Implement Facebook OAuth login
    // For now, simulate successful login
    // const mockToken = 'facebook_oauth_token_' + Date.now();
    // this.tokenService.setToken(mockToken);
    // this.router.navigate(['/owner/owner-dashboard']);
  }
  
}
