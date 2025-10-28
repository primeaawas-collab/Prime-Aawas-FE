import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { TokenService } from '../../service/authentication/token.service';

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

  constructor(private tokenService: TokenService, private router: Router) {}

  onSubmit() {
    if (!this.name || !this.email || !this.phone || !this.password || !this.confirmPassword) {
      this.errorMessage = 'All fields are required';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    // Simulate successful signup
    console.log('Signup Success:', {
      name: this.name,
      email: this.email,
      phone: this.phone,
      password: this.password
    });
    
    // Generate a mock token and store it
    const mockToken = 'mock_jwt_token_' + Date.now();
    this.tokenService.setToken(mockToken);
    this.errorMessage = '';
    
    // Navigate to dashboard after successful signup
    this.router.navigate(['/owner/owner-dashboard']);
  }

  onGoogleSignup(): void {
    console.log('Google signup clicked');
    // TODO: Implement Google OAuth signup
    // For now, simulate successful signup
    const mockToken = 'google_oauth_token_' + Date.now();
    this.tokenService.setToken(mockToken);
    this.router.navigate(['/owner/owner-dashboard']);
  }

  onFacebookSignup(): void {
    console.log('Facebook signup clicked');
    // TODO: Implement Facebook OAuth signup
    // For now, simulate successful signup
    const mockToken = 'facebook_oauth_token_' + Date.now();
    this.tokenService.setToken(mockToken);
    this.router.navigate(['/owner/owner-dashboard']);
  }
}
