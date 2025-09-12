# Environment Variables

This document provides a comprehensive guide to all environment variables used in the PayloadCMS Playground project.

## Environment Setup

### Development Environment
Copy the example environment file and configure your variables:

```bash
cp .env.example .env
```

### Production Environment
Set environment variables in your deployment platform (Vercel, Docker, etc.).

## Required Variables

### Database Configuration

| Variable | Default | Description | Required |
|----------|---------|-------------|----------|
| `DATABASE_URI` | `postgres://payload_db_user:payload_db_pw@127.0.0.1:5432/db_payload_dev` | PostgreSQL connection string | ✅ |
| `DATABASE_CLIENT` | `postgres` | Database client type | ✅ |
| `DATABASE_HOST` | `localhost` | Database host | ✅ |
| `DATABASE_PORT` | `5432` | Database port | ✅ |
| `DATABASE_USERNAME` | `payload_db_user` | Database username | ✅ |
| `DATABASE_PASSWORD` | `payload_db_pw` | Database password | ✅ |
| `DATABASE_NAME` | `db_payload_dev` | Database name | ✅ |
| `DATABASE_SCHEMA` | `public` | Database schema | ✅ |
| `DATABASE_SSL` | `false` | Enable SSL for database connection | ❌ |

### PayloadCMS Configuration

| Variable | Default | Description | Required |
|----------|---------|-------------|----------|
| `PAYLOAD_SECRET` | `supersecret` | Secret key for PayloadCMS authentication | ✅ |
| `PAYLOAD_CONFIG_PATH` | `src/payload/payload.config.ts` | Path to PayloadCMS configuration | ❌ |
| `PAYLOAD_DROP_DATABASE` | `false` | Drop database on startup (development only) | ❌ |
| `PAYLOAD_SEED` | `false` | Seed database with initial data | ❌ |

### Next.js Configuration

| Variable | Default | Description | Required |
|----------|---------|-------------|----------|
| `NEXT_PUBLIC_SERVER_URL` | `http://localhost:3000` | Base URL for the application | ✅ |
| `NEXT_PUBLIC_ASSETS_PATH` | `http://localhost:3000` | Base URL for static assets | ✅ |
| `NEXT_PUBLIC_IMAGE_URL` | - | URL for image CDN | ❌ |
| `NEXT_PUBLIC_REVALIDATE` | `60` | Cache revalidation time in seconds | ❌ |
| `NEXT_PUBLIC_GA_ID` | - | Google Analytics ID | ❌ |
| `NEXT_PUBLIC_GTM_ID` | - | Google Tag Manager ID | ❌ |

## Optional Variables

### AWS S3 Configuration

| Variable | Default | Description | Required |
|----------|---------|-------------|----------|
| `AWS_S3_REGION` | `eu-central-1` | AWS region for S3 | ❌ |
| `AWS_S3_BUCKET_NAME` | - | S3 bucket name | ❌ |
| `AWS_S3_ACCESS_KEY_ID` | - | AWS access key ID | ❌ |
| `AWS_S3_SECRET_ACCESS_KEY` | - | AWS secret access key | ❌ |
| `AWS_S3_BUCKET_PREFIX` | `payloadcms-playground` | Prefix for S3 bucket objects | ❌ |

### Email Configuration (Resend)

| Variable | Default | Description | Required |
|----------|---------|-------------|----------|
| `RESEND_API_KEY` | - | Resend API key for email service | ❌ |
| `RESEND_FROM_EMAIL` | - | Default sender email address | ❌ |
| `RESEND_FROM_NAME` | `Payloadcms Playground` | Default sender name | ❌ |

### Vercel Configuration

| Variable | Default | Description | Required |
|----------|---------|-------------|----------|
| `VERCEL_PROJECT_PRODUCTION_URL` | - | Vercel production URL | ❌ |
| `VERCEL_URL` | - | Vercel deployment URL (auto-set) | ❌ |

### Cookie Configuration

| Variable | Default | Description | Required |
|----------|---------|-------------|----------|
| `COOKIE_DOMAIN` | `localhost` | Domain for cookie storage | ❌ |
| `COOKIE_SECURE` | `false` | Use secure cookies (HTTPS only) | ❌ |
| `COOKIE_SAME_SITE` | `lax` | SameSite cookie attribute | ❌ |

### Redis Configuration (Optional)

| Variable | Default | Description | Required |
|----------|---------|-------------|----------|
| `REDIS_URL` | - | Redis connection URL for caching | ❌ |
| `UPSTASH_REDIS_REST_URL` | - | Upstash Redis REST URL | ❌ |
| `UPSTASH_REDIS_REST_TOKEN` | - | Upstash Redis REST token | ❌ |

### Monitoring & Analytics

| Variable | Default | Description | Required |
|----------|---------|-------------|----------|
| `SENTRY_DSN` | - | Sentry DSN for error tracking | ❌ |
| `SENTRY_ORG` | - | Sentry organization | ❌ |
| `SENTRY_PROJECT` | - | Sentry project | ❌ |
| `SENTRY_AUTH_TOKEN` | - | Sentry auth token | ❌ |

### Development Tools

| Variable | Default | Description | Required |
|----------|---------|-------------|----------|
| `NODE_ENV` | `development` | Node.js environment | ❌ |
| `NODE_OPTIONS` | - | Node.js options | ❌ |
| `ANALYZE` | `false` | Enable bundle analysis | ❌ |
| `IGNORE_LOCAL_FONT` | `false` | Ignore local fonts | ❌ |

## Environment-Specific Configurations

### Development Environment

```env
# Database
DATABASE_URI=postgres://payload_db_user:payload_db_pw@127.0.0.1:5432/db_payload_dev
DATABASE_SSL=false

# PayloadCMS
PAYLOAD_SECRET=your-development-secret-key
PAYLOAD_DROP_DATABASE=false
PAYLOAD_SEED=false

# Next.js
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
NEXT_PUBLIC_ASSETS_PATH=http://localhost:3000
NODE_ENV=development

# Optional
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Staging Environment

```env
# Database
DATABASE_URI=postgresql://user:password@staging-db-host:5432/staging_db
DATABASE_SSL=true

# PayloadCMS
PAYLOAD_SECRET=your-staging-secret-key
PAYLOAD_DROP_DATABASE=false
PAYLOAD_SEED=false

# Next.js
NEXT_PUBLIC_SERVER_URL=https://staging.yourdomain.com
NEXT_PUBLIC_ASSETS_PATH=https://staging.yourdomain.com
NODE_ENV=production

# AWS S3
AWS_S3_REGION=eu-central-1
AWS_S3_BUCKET_NAME=your-staging-bucket
AWS_S3_ACCESS_KEY_ID=your-access-key
AWS_S3_SECRET_ACCESS_KEY=your-secret-key

# Email
RESEND_API_KEY=your-resend-api-key
RESEND_FROM_EMAIL=noreply@yourdomain.com
```

### Production Environment

```env
# Database
DATABASE_URI=postgresql://user:password@prod-db-host:5432/production_db
DATABASE_SSL=true

# PayloadCMS
PAYLOAD_SECRET=your-super-secure-production-secret-key
PAYLOAD_DROP_DATABASE=false
PAYLOAD_SEED=false

# Next.js
NEXT_PUBLIC_SERVER_URL=https://yourdomain.com
NEXT_PUBLIC_ASSETS_PATH=https://yourdomain.com
NODE_ENV=production

# AWS S3
AWS_S3_REGION=eu-central-1
AWS_S3_BUCKET_NAME=your-production-bucket
AWS_S3_ACCESS_KEY_ID=your-access-key
AWS_S3_SECRET_ACCESS_KEY=your-secret-key

# Email
RESEND_API_KEY=your-resend-api-key
RESEND_FROM_EMAIL=noreply@yourdomain.com
RESEND_FROM_NAME=Your App Name

# Monitoring
SENTRY_DSN=your-sentry-dsn
SENTRY_ORG=your-org
SENTRY_PROJECT=your-project

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

## Security Best Practices

### Secret Management

1. **Never commit secrets to version control**
   ```bash
   # Add to .gitignore
   .env
   .env.local
   .env.*.local
   ```

2. **Use strong, unique secrets**
   ```bash
   # Generate secure secrets
   openssl rand -base64 32
   ```

3. **Rotate secrets regularly**
   - Change `PAYLOAD_SECRET` monthly
   - Rotate AWS credentials quarterly
   - Update database passwords annually

4. **Use environment-specific secrets**
   - Different secrets for dev/staging/production
   - Never reuse production secrets in development

### Environment Variable Validation

```typescript
// lib/config/env.ts
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URI: z.string().url(),
  PAYLOAD_SECRET: z.string().min(32),
  NEXT_PUBLIC_SERVER_URL: z.string().url(),
  // ... other variables
})

export const env = envSchema.parse(process.env)
```

## Platform-Specific Setup

### Vercel

1. **Set environment variables in Vercel dashboard**
2. **Use Vercel's built-in Postgres**
   ```bash
   vercel storage create postgres
   vercel env pull .env.local
   ```

3. **Configure preview deployments**
   ```json
   {
     "git": {
       "deploymentEnabled": {
         "main": true,
         "preview": true
       }
     }
   }
   ```

### Docker

```dockerfile
# Use environment variables in Dockerfile
ENV NODE_ENV=production
ENV DATABASE_URI=${DATABASE_URI}
ENV PAYLOAD_SECRET=${PAYLOAD_SECRET}

# Or use docker-compose
```

```yaml
# docker-compose.yml
services:
  app:
    environment:
      - DATABASE_URI=${DATABASE_URI}
      - PAYLOAD_SECRET=${PAYLOAD_SECRET}
    env_file:
      - .env
```

### Traditional VPS

```bash
# Set environment variables in systemd service
[Service]
Environment=NODE_ENV=production
Environment=DATABASE_URI=postgresql://...
Environment=PAYLOAD_SECRET=...

# Or use .env file
echo "DATABASE_URI=postgresql://..." >> .env
echo "PAYLOAD_SECRET=..." >> .env
```

## Troubleshooting

### Common Issues

#### Database Connection Errors
```bash
# Check database connection
psql $DATABASE_URI -c "SELECT version();"

# Verify environment variables
echo $DATABASE_URI
echo $DATABASE_HOST
echo $DATABASE_PORT
```

#### Missing Environment Variables
```bash
# Check if variables are set
env | grep DATABASE
env | grep PAYLOAD
env | grep NEXT_PUBLIC
```

#### SSL Certificate Issues
```bash
# For development, disable SSL
DATABASE_SSL=false

# For production, ensure SSL certificates are valid
DATABASE_SSL=true
```

### Validation Script

```typescript
// scripts/validate-env.ts
import { envSchema } from '../lib/config/env'

try {
  envSchema.parse(process.env)
  console.log('✅ Environment variables are valid')
} catch (error) {
  console.error('❌ Environment validation failed:', error)
  process.exit(1)
}
```

```bash
# Run validation
pnpm tsx scripts/validate-env.ts
```

## Environment Variable Reference

### Complete Example

```env
# ===========================================
# REQUIRED VARIABLES
# ===========================================

# Database
DATABASE_URI=postgresql://user:password@host:5432/database
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=user
DATABASE_PASSWORD=password
DATABASE_NAME=database
DATABASE_SCHEMA=public
DATABASE_SSL=false

# PayloadCMS
PAYLOAD_SECRET=your-super-secure-secret-key-here
PAYLOAD_CONFIG_PATH=src/payload/payload.config.ts

# Next.js
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
NEXT_PUBLIC_ASSETS_PATH=http://localhost:3000

# ===========================================
# OPTIONAL VARIABLES
# ===========================================

# AWS S3
AWS_S3_REGION=eu-central-1
AWS_S3_BUCKET_NAME=your-bucket-name
AWS_S3_ACCESS_KEY_ID=your-access-key
AWS_S3_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET_PREFIX=payloadcms-playground

# Email (Resend)
RESEND_API_KEY=your-resend-api-key
RESEND_FROM_EMAIL=noreply@yourdomain.com
RESEND_FROM_NAME=Your App Name

# Vercel
VERCEL_PROJECT_PRODUCTION_URL=https://yourdomain.vercel.app

# Cookies
COOKIE_DOMAIN=localhost
COOKIE_SECURE=false
COOKIE_SAME_SITE=lax

# Redis (Optional)
REDIS_URL=redis://user:password@host:port
UPSTASH_REDIS_REST_URL=your-upstash-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-token

# Monitoring
SENTRY_DSN=your-sentry-dsn
SENTRY_ORG=your-org
SENTRY_PROJECT=your-project

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Development
NODE_ENV=development
NODE_OPTIONS=--no-deprecation
ANALYZE=false
IGNORE_LOCAL_FONT=false
```

This comprehensive environment variables guide ensures proper configuration across all deployment environments.
