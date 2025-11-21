import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from './token.service';

// URLs that should not have the auth token
const excludedUrls = [
  '/api/auth/login',
  '/api/auth/signup',
  '/api/login',
  '/api/signup',
  'login',
  'signup',
  '/api/auth/oauth2/callback/google',
  
];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);

  // Check if the request URL should be excluded from adding the auth token
  const shouldExclude = excludedUrls.some(url =>
    req.url.includes(url) || req.urlWithParams.includes(url)
  );

  if (shouldExclude) {
    return next(req);
  }

  // Get the token from the token service
  const token = tokenService.getToken();

  if (token) {
    // Clone the request and add the authorization header
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  // If no token, proceed with the original request
  return next(req);
};
