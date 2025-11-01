import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { TokenService } from '../../service/authentication/token.service';
import { AuthService, SignupRequest } from '../../service/authentication/auth.service';
import { ToastService } from '../../service/toast/toast.service';

@Component({
  selector: 'app-signup',
  standalone: true,
 imports: [CommonModule, FormsModule, RouterModule], 
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  name = '';
  email = '';
  phone = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  isLoading: boolean = false;
  fieldErrors: { [key: string]: string } = {};

  constructor(
    private tokenService: TokenService, 
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  onSubmit() {
    if (!this.name || !this.email || !this.phone || !this.password || !this.confirmPassword) {
      this.toastService.warning('All fields are required', 'Validation Error');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.toastService.warning('Passwords do not match', 'Validation Error');
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.fieldErrors = {};

    const signupData: SignupRequest = {
      name: this.name,
      email: this.email,
      phoneNumber: this.phone,
      password: this.password,
      confirmPassword: this.confirmPassword
    };

    this.authService.signup(signupData).subscribe({
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
          this.toastService.success('Account created successfully! Welcome to Prime Aawas.', 'Success');
          this.router.navigate(['/owner/owner-dashboard']);
        } else {
          // Handle validation errors from API
          this.handleApiErrors(response);
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Signup error:', error);
        
        // Handle HTTP error response
        if (error.error && error.error.data) {
          this.handleApiErrors(error.error);
        } else {
          this.toastService.error('An error occurred. Please try again.', 'Network Error');
        }
      }
    });
  }

  onGoogleSignup(): void {
    console.log('Google signup clicked');
    this.toastService.info('Google signup feature coming soon!', 'Feature Notice');
    // TODO: Implement Google OAuth signup
    // For now, simulate successful signup
    // const mockToken = 'google_oauth_token_' + Date.now();
    // this.tokenService.setToken(mockToken);
    // this.router.navigate(['/owner/owner-dashboard']);
  }

  onFacebookSignup(): void {
    console.log('Facebook signup clicked');
    this.toastService.info('Facebook signup feature coming soon!', 'Feature Notice');
    // TODO: Implement Facebook OAuth signup
    // For now, simulate successful signup
    // const mockToken = 'facebook_oauth_token_' + Date.now();
    // this.tokenService.setToken(mockToken);
    // this.router.navigate(['/owner/owner-dashboard']);
  }

  private handleApiErrors(response: any): void {
    this.fieldErrors = {};
    
    // Extract field-specific errors from response.data
    if (response.data && typeof response.data === 'object') {
      Object.keys(response.data).forEach((field) => {
        // Map API field names to component property names
        const fieldKey = field === 'phoneNumber' ? 'phone' : field;
        this.fieldErrors[fieldKey] = response.data[field];
      });
    }
    
    // Show general error message if no field-specific errors
    if (Object.keys(this.fieldErrors).length === 0) {
      this.toastService.error(response.message || 'Signup failed. Please try again.', 'Signup Error');
    } else {
      // Show general error message as well
      this.toastService.error(response.message || 'Please correct the errors below.', 'Validation Error');
    }
  }

  getFieldError(fieldName: string): string {
    return this.fieldErrors[fieldName] || '';
  }

  hasFieldError(fieldName: string): boolean {
    return !!this.fieldErrors[fieldName];
  }

  clearFieldError(fieldName: string): void {
    if (this.fieldErrors[fieldName]) {
      delete this.fieldErrors[fieldName];
    }
  }
}
