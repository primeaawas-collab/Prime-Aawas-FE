export const environment = {
  production: false,
  environment: 'development',
  apiUrl: 'https://dev-api.primeaawas.com',
  googleClientId: '291833976055-vbq78uud51cn1q1uqvtnauhh6lv3pimt.apps.googleusercontent.com',
  googleRedirectUri: 'https://dev-app.primeaawas.com/auth/google/callback', // Update this with your actual frontend URL for development
  apiVersion: 'v1',
  appName: 'Prime Aawas',
  appVersion: '1.0.0',
  enableLogging: true,
  enableAnalytics: false,
  enableDebugMode: true,
  timeout: 30000,
  retryAttempts: 3,
  features: {
    enableNotifications: true,
    enableDarkMode: false,
    enableOfflineMode: false
  },

};
