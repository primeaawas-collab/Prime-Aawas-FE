# Environment Configuration

This folder contains environment-specific configuration files for the Prime Aawas brand landing page.

## Available Environments

### 1. Local (`environment.local.ts`)
- **Use**: Development on localhost
- **Build**: `ng build --configuration=local` or `ng serve --configuration=local`
- **API URL**: `http://localhost:3000/api`

### 2. Dev (`environment.ts`)
- **Use**: Development/staging environment
- **Build**: `ng build --configuration=dev` or `ng serve --configuration=dev` (default)
- **API URL**: `https://dev-api.primeaawas.com/api`

### 3. Production (`environment.prod.ts`)
- **Use**: Production deployment
- **Build**: `ng build --configuration=production` (default for build)
- **API URL**: `https://api.primeaawas.com/api`

## Environment Structure

Each environment file contains:
- `production`: Boolean flag for production mode
- `environment`: String identifier ('local' | 'dev' | 'production')
- `apiUrl`: Base API URL for backend services
- `appName`: Application name
- `appVersion`: Application version

## Build Commands

```bash
# Local development
ng serve --configuration=local
ng build --configuration=local

# Dev environment
ng serve --configuration=dev
ng build --configuration=dev

# Production build
ng build --configuration=production
```

## Usage in Code

```typescript
import { environment } from '../environments/environment';

console.log(environment.appName);
console.log(environment.apiUrl);
```
