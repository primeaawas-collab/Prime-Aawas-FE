import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface UserInfo {
  name: string;
  email: string;
  role: string;
  profileImageUrl: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly ROLE_KEY = 'user_role';
  private readonly USER_INFO_KEY = 'user_info';
  private readonly REMEMBERED_EMAIL_KEY = 'remembered_email';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  setToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  removeToken(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }

  setRole(role: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.ROLE_KEY, role);
    }
  }

  getRole(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(this.ROLE_KEY);
    }
    return null;
  }

  removeRole(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.ROLE_KEY);
    }
  }

  setUserInfo(userInfo: UserInfo): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.USER_INFO_KEY, JSON.stringify(userInfo));
    }
  }

  getUserInfo(): UserInfo | null {
    if (this.isBrowser()) {
      const userInfoStr = localStorage.getItem(this.USER_INFO_KEY);
      if (userInfoStr) {
        try {
          return JSON.parse(userInfoStr);
        } catch (e) {
          console.error('Error parsing user info from localStorage:', e);
          return null;
        }
      }
    }
    return null;
  }

  removeUserInfo(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.USER_INFO_KEY);
    }
  }

  generateInitials(name: string): string {
    if (!name || name.trim().length === 0) {
      return 'U';
    }
    
    const nameParts = name.trim().split(/\s+/);
    if (nameParts.length === 1) {
      // Single word - take first two letters
      return nameParts[0].substring(0, 2).toUpperCase();
    } else {
      // Multiple words - take first letter of first and last word
      return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
    }
  }

  isTokenValid(): boolean {
    const token = this.getToken();
    return token !== null && token.length > 0;
  }

  logout(): void {
    this.removeToken();
    this.removeRole();
    this.removeUserInfo();
  }

  setRememberedEmail(email: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.REMEMBERED_EMAIL_KEY, email);
    }
  }

  getRememberedEmail(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(this.REMEMBERED_EMAIL_KEY);
    }
    return null;
  }

  removeRememberedEmail(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.REMEMBERED_EMAIL_KEY);
    }
  }
}
