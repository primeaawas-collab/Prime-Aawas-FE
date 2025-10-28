import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.post<AuthResponse>(`${this.baseUrl}/api/auth/login`, credentials);
  }

  signup(userData: SignupRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/api/auth/signup`, userData);
  }
}
