export const environment = {
  production: false,
  environment: 'local',
  apiUrl: 'http://localhost:8080/api',
  googleClientId: '291833976055-kklqrb0dsf42h3vh0uoh4m4i5c2qn947.apps.googleusercontent.com',
  googleRedirectUri: 'http://localhost:4200/auth/google/callback',
  apiVersion: 'v1',
  appName: 'Prime Aawas (Local)',
  appVersion: '1.0.0',
  enableLogging: true,
  enableAnalytics: false,
  enableDebugMode: true,
  timeout: 10000,
  retryAttempts: 1,
  features: {
    enableNotifications: false,
    enableDarkMode: true,
    enableOfflineMode: true
  },

};
