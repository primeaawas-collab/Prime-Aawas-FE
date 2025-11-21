import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthResponse } from './auth.service';
import { environment } from '../../../environments/environment';

declare const google: any;
@Injectable({ providedIn: 'root' })
export class GoogleAuthService {
  private readonly baseUrl = environment.apiUrl;
  public user$ = new BehaviorSubject<any>(null);
  googleClientId = environment.googleClientId;
  googleRedirectUri = environment.googleRedirectUri;

  constructor(private readonly http: HttpClient) {}

  /**
   * Initiates Google OAuth flow for signup
   * Stores the auth mode in sessionStorage so callback knows it's a signup
   */
  initiateGoogleSignup(): void {
    // Store auth mode for callback handler
    sessionStorage.setItem('googleAuthMode', 'signup');

    // Build Google OAuth URL
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${this.googleClientId}` +
      `&redirect_uri=${encodeURIComponent(this.googleRedirectUri)}` +
      `&response_type=code` +
      `&scope=openid%20email%20profile` +
      `&access_type=offline` +
      `&prompt=consent`;

    // Redirect to Google OAuth
    globalThis.location.href = googleAuthUrl;
  }

  /**
   * Initiates Google OAuth flow for login
   * Stores the auth mode in sessionStorage so callback knows it's a login
   */
  initiateGoogleLogin(): void {
    // Store auth mode for callback handler
    sessionStorage.setItem('googleAuthMode', 'login');

    // Build Google OAuth URL
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${this.googleClientId}` +
      `&redirect_uri=${encodeURIComponent(this.googleRedirectUri)}` +
      `&response_type=code` +
      `&scope=openid%20email%20profile` +
      `&access_type=offline`;

    // Redirect to Google OAuth
    globalThis.location.href = googleAuthUrl;
  }

  /**
   * Handles the callback from Google OAuth for signup
   * Exchanges the authorization code for tokens via backend using GET request
   * @param code - Authorization code received from Google OAuth
   * @returns Observable with authentication response
   */
  handleGoogleCallback(code: string): Observable<AuthResponse> {
    const params = new HttpParams().set('code', code);
    return this.http.get<AuthResponse>(
      `${this.baseUrl}/auth/oauth2/callback/google`,
      {
        params,
        headers: {
          'Accept': 'application/json'
        }
      }
    );
  }

}
