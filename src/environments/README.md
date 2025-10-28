# Environment Configuration

This directory contains environment-specific configuration files for different deployment environments.

## Environment Files

- `environment.ts` - Development environment (default)
- `environment.local.ts` - Local development environment
- `environment.qa.ts` - QA/Testing environment
- `environment.prod.ts` - Production environment

## Environment Variables

Each environment file contains the following configuration:

### Core Settings
- `production`: Boolean indicating if this is a production build
- `environment`: String identifier for the environment (local, development, qa, production)
- `apiUrl`: Base URL for API endpoints
- `apiVersion`: API version string
- `appName`: Application display name
- `appVersion`: Application version

### Feature Flags
- `enableLogging`: Enable/disable console logging
- `enableAnalytics`: Enable/disable analytics tracking
- `enableDebugMode`: Enable/disable debug features

### Performance Settings
- `timeout`: HTTP request timeout in milliseconds
- `retryAttempts`: Number of retry attempts for failed requests

### Feature Toggles
- `features.enableNotifications`: Enable/disable push notifications
- `features.enableDarkMode`: Enable/disable dark mode
- `features.enableOfflineMode`: Enable/disable offline functionality

### Third Party Services
- `thirdPartyServices.googleMapsApiKey`: Google Maps API key
- `thirdPartyServices.firebaseConfig`: Firebase configuration object

## Usage

### In Components
```typescript
import { EnvironmentService } from './service/environment/environment.service';

constructor(private envService: EnvironmentService) {}

// Check environment
if (this.envService.isProduction) {
  // Production-specific logic
}

// Get API endpoint
const apiUrl = this.envService.getApiEndpoint('/users');

// Check feature flags
if (this.envService.isFeatureEnabled('enableDarkMode')) {
  // Dark mode logic
}
```

### Building for Different Environments

```bash
# Development
npm run build:dev

# QA
npm run build:qa

# Local
npm run build:local

# Production
npm run build:prod
```

### Serving Different Environments

```bash
# Development
npm run start:dev

# QA
npm run start:qa

# Local
npm run start:local

# Production
npm run start:prod
```

## Environment-Specific URLs

- **Local**: http://localhost:3000
- **Development**: https://api-dev.primeaawas.com
- **QA**: https://api-qa.primeaawas.com
- **Production**: https://api.primeaawas.com

## Security Notes

- Never commit sensitive API keys to version control
- Use environment-specific keys for each deployment
- Consider using a secrets management service for production
- The production environment has analytics enabled and debug mode disabled
