# Authentication Interceptor

This directory contains the authentication interceptor implementation that automatically adds auth tokens to HTTP requests.

## Files

- `token.service.ts` - Service for managing authentication tokens in localStorage
- `auth.interceptor.ts` - HTTP interceptor that adds auth tokens to requests
- `api.service.ts` - Example service showing how to use HTTP client with the interceptor

## How it works

1. **Token Service**: Manages storing, retrieving, and removing auth tokens from localStorage
2. **Auth Interceptor**: Automatically intercepts all HTTP requests and adds the `Authorization: Bearer <token>` header
3. **Excluded URLs**: The interceptor skips adding tokens to login and signup endpoints

## Excluded URLs

The following URLs are excluded from having auth tokens added:
- `/api/auth/login`
- `/api/auth/signup`
- `/api/login`
- `/api/signup`
- `login`
- `signup`

## Usage

### In Components

```typescript
import { TokenService } from './service/authentication/token.service';
import { ApiService } from './service/authentication/api.service';

constructor(
  private tokenService: TokenService,
  private apiService: ApiService
) {}

// Store token after login
this.tokenService.setToken('your-jwt-token');

// Check if user is authenticated
if (this.tokenService.isTokenValid()) {
  // User is logged in
}

// Logout user
this.tokenService.logout();

// Make API calls (token will be added automatically)
this.apiService.getPosts().subscribe(posts => {
  console.log(posts);
});
```

### Making HTTP Requests

All HTTP requests made through Angular's HttpClient will automatically include the auth token (except for excluded URLs):

```typescript
// This will automatically include the auth token
this.http.get('/api/users').subscribe(users => {
  console.log(users);
});

// This will NOT include the auth token (excluded URL)
this.http.post('/api/auth/login', credentials).subscribe(response => {
  console.log(response);
});
```

## Configuration

The interceptor is configured in `app.config.ts`:

```typescript
import { authInterceptor } from './service/authentication/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // ... other providers
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
```
