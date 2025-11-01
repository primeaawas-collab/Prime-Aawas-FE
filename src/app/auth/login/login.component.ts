import { Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private router: Router, 
    private tokenService: TokenService,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    // Load remembered email if it exists
    const rememberedEmail = this.tokenService.getRememberedEmail();
    if (rememberedEmail) {
      this.email = rememberedEmail;
      this.rememberMe = true;
    }
  }

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
          
          // Store role if provided in response.data
          if (response.data && response.data.role) {
            this.tokenService.setRole(response.data.role);
          }
          
          // Store user info (name, email, role, profileImageUrl)
          if (response.data) {
            const userInfo = {
              name: response.data.name || '',
              email: response.data.email || '',
              role: response.data.role || '',
              profileImageUrl: response.data.profileImageUrl || null
            };
            this.tokenService.setUserInfo(userInfo);
          }
          
          // Handle remember me functionality
          if (this.rememberMe) {
            this.tokenService.setRememberedEmail(this.email);
          } else {
            this.tokenService.removeRememberedEmail();
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
