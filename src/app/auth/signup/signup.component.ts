import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {TokenService} from '../../service/authentication/token.service';
import {AuthService, SignupRequest} from '../../service/authentication/auth.service';
import {ToastService} from '../../service/toast/toast.service';
import {GoogleAuthService} from '../../service/authentication/google-auth.service';

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
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private readonly tokenService: TokenService,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly toastService: ToastService,
    private readonly googleAuthService: GoogleAuthService
  ) {}

  onSubmit() {
    // Validate all fields using existing validation methods
    this.validateName();
    this.validatePhone();
    this.validateEmail();
    this.validatePassword();
    this.validateConfirmPassword();

    // If there are validation errors, stop here
    if (Object.keys(this.fieldErrors).length > 0) {
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
          // Handle validation errors from API
          this.handleApiErrors(response);
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Signup error:', error);

        // Extract field-specific errors from API response
        this.fieldErrors = {};

        if (error.error && error.error.data && typeof error.error.data === 'object') {
          Object.keys(error.error.data).forEach((field) => {
            // Map API field names to component property names

            const fieldKey = field === 'phoneNumber' ? 'phone' : field === 'email' ? 'email' : field;

            this.fieldErrors[fieldKey] = error.error.data[field];
          });
        }

        // Show general error message
        const errorMessage = error.error?.message || 'Signup failed. Please try again.';
        const errorTitle = Object.keys(this.fieldErrors).length > 0 ? 'Validation Error' : 'Signup Error';
        this.toastService.error(errorMessage, errorTitle);
      }
    });
  }

  onGoogleSignup(): void {
    console.log('Google signup clicked');
    this.isLoading = true;
    this.googleAuthService.initiateGoogleSignup();
    // The redirect will happen, and the callback component will handle the rest
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

  // Real-time validation methods for blur events
  validateName(): void {
    if (!this.name || this.name.trim() === '') {
      this.fieldErrors['name'] = 'Required Field';
    } else {
      const trimmedName = this.name.trim();
      if (!/^[a-zA-Z\s'-]+$/.test(trimmedName)) {
        this.fieldErrors['name'] = 'Full Name must contain alphabets only';
      } else if (trimmedName.length > 100) {
        this.fieldErrors['name'] = 'Full Name must be under 100 characters';
      } else {
        this.clearFieldError('name');
      }
    }
  }

  validatePhone(): void {
    if (!this.phone || this.phone.trim() === '') {
      this.fieldErrors['phone'] = 'Required Field';
    } else {
      const phoneDigits = this.phone.replace(/\s+/g, '');
      if (!/^\d+$/.test(phoneDigits)) {
        this.fieldErrors['phone'] = 'Phone number must contain digits only';
      } else if (phoneDigits.length !== 10) {
        this.fieldErrors['phone'] = 'Phone number must be 10 digits';
      } else {
        this.clearFieldError('phone');
      }
    }
  }

  validateEmail(): void {
    if (!this.email || this.email.trim() === '') {
      this.fieldErrors['email'] = 'Required Field';
    } else {
      const trimmedEmail = this.email.trim();
      if (/\s/.test(trimmedEmail)) {
        this.fieldErrors['email'] = 'Invalid email format';
      } else if (!trimmedEmail.includes('@')) {
        this.fieldErrors['email'] = 'Invalid email format';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
        this.fieldErrors['email'] = 'Invalid email format';
      } else {
        this.clearFieldError('email');
      }
    }
  }

  validatePassword(): void {
    if (!this.password || this.password.trim() === '') {
      this.fieldErrors['password'] = 'Required Field';
    } else {
      const passwordErrors: string[] = [];
      if (!/\d/.test(this.password)) {
        passwordErrors.push('Password must include at least one number');
      }
      if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(this.password)) {
        passwordErrors.push('Password must include at least one special character');
      }
      if (passwordErrors.length > 0) {
        this.fieldErrors['password'] = passwordErrors.join(' and ');
      } else {
        this.clearFieldError('password');
        // Re-validate confirm password if password is now valid
        if (this.confirmPassword) {
          this.validateConfirmPassword();
        }
      }
    }
  }

  validateConfirmPassword(): void {
    if (!this.confirmPassword || this.confirmPassword.trim() === '') {
      this.fieldErrors['confirmPassword'] = 'Required Field';
    } else if (this.password !== this.confirmPassword) {
      this.fieldErrors['confirmPassword'] = 'Passwords do not match';
    } else {
      this.clearFieldError('confirmPassword');
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
