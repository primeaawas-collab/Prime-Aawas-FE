import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  message: string;
  data: any;
  success: boolean;
  status: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/login`, credentials, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }

  signup(userData: SignupRequest): Observable<AuthResponse> {
    const url = `${this.baseUrl}/auth/signup`;
    console.log('Signup API URL:', url);
    console.log('Base URL from environment:', this.baseUrl);
    return this.http.post<AuthResponse>(url, userData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }

  checkEmailExists(email: string): Observable<AuthResponse> {
    const params = new HttpParams().set('email', email);
    return this.http.get<AuthResponse>(`${this.baseUrl}/users/check-email`, {
      params,
      headers: {
        'Accept': 'application/json'
      }
    });
  }

  checkPhoneExists(phoneNumber: string): Observable<AuthResponse> {
    const params = new HttpParams().set('phoneNumber', phoneNumber);
    return this.http.get<AuthResponse>(`${this.baseUrl}/users/check-phone`, {
      params,
      headers: {
        'Accept': 'application/json'
      }
    });
  }
}
