import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { TokenService } from '../../service/authentication/token.service';

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

  constructor(private router: Router, private tokenService: TokenService) {}

  onSubmit(): void {
    if (this.email === 'prime@123' && this.password === '12345') {
      this.errorMessage = '';
      // Generate a mock token and store it
      const mockToken = 'mock_jwt_token_' + Date.now();
      this.tokenService.setToken(mockToken);
      this.router.navigate(['/owner/owner-dashboard']);
    } else {
      this.errorMessage = 'Invalid email or password';
    }
  }

  onGoogleLogin(): void {
    console.log('Google login clicked');
    // TODO: Implement Google OAuth login
    // For now, simulate successful login
    const mockToken = 'google_oauth_token_' + Date.now();
    this.tokenService.setToken(mockToken);
    this.router.navigate(['/owner/owner-dashboard']);
  }

  onFacebookLogin(): void {
    console.log('Facebook login clicked');
    // TODO: Implement Facebook OAuth login
    // For now, simulate successful login
    const mockToken = 'facebook_oauth_token_' + Date.now();
    this.tokenService.setToken(mockToken);
    this.router.navigate(['/owner/owner-dashboard']);
  }
  
}
