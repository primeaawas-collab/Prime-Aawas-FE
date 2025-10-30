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
          this.toastService.error(response.message || 'Signup failed. Please try again.', 'Signup Error');
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Signup error:', error);
        this.toastService.error('An error occurred. Please try again.', 'Network Error');
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
}
