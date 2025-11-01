import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string;

  constructor(
    private http: HttpClient) 
    {
      this.baseUrl = environment.apiUrl;
    }
  

  // This API call will automatically include the auth token


  // Example method using environment-specific configuration
  getAppInfo(): any {
    return {
      name: environment.appName,
      version: environment.appVersion,
      environment: environment.environment,
      apiUrl: environment.apiUrl
    };
  }
}
