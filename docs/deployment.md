# Deployment Guide

This guide covers deployment strategies, infrastructure setup, and production considerations for the PayloadCMS Playground project.

## Deployment Overview

The project supports multiple deployment strategies:
- **Vercel** (Recommended) - Full-stack deployment with edge functions
- **Docker** - Containerized deployment
- **Traditional VPS** - Self-hosted deployment

## Vercel Deployment (Recommended)

### Prerequisites
- Vercel account
- GitHub repository
- Environment variables configured

### Step-by-Step Deployment

#### 1. Connect Repository
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link project
vercel link
```

#### 2. Configure Environment Variables
Set the following environment variables in Vercel dashboard:

```env
# Database
DATABASE_URI=postgresql://user:password@host:port/database
PAYLOAD_SECRET=your-production-secret-key

# Next.js
NEXT_PUBLIC_SERVER_URL=https://your-domain.vercel.app
NEXT_PUBLIC_ASSETS_PATH=https://your-domain.vercel.app

# AWS S3
AWS_S3_REGION=eu-central-1
AWS_S3_BUCKET_NAME=your-production-bucket
AWS_S3_ACCESS_KEY_ID=your-access-key
AWS_S3_SECRET_ACCESS_KEY=your-secret-key

# Resend
RESEND_API_KEY=your-resend-api-key
RESEND_FROM_EMAIL=noreply@yourdomain.com
```

#### 3. Deploy
```bash
# Deploy to production
vercel --prod

# Or push to main branch for automatic deployment
git push origin main
```

### Vercel Configuration

#### `vercel.json`
```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "env": {
    "NODE_ENV": "production"
  }
}
```

#### Build Settings
- **Framework Preset**: Next.js
- **Build Command**: `pnpm build`
- **Output Directory**: `.next`
- **Install Command**: `pnpm install`

## Docker Deployment

### Dockerfile
```dockerfile
# Multi-stage build
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm i --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate types
RUN pnpm generate:types

# Build application
RUN pnpm build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Docker Compose
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URI=postgresql://user:password@db:5432/database
      - PAYLOAD_SECRET=your-secret-key
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=database
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    restart: unless-stopped

volumes:
  postgres_data:
```

### Build and Deploy
```bash
# Build Docker image
docker build -t payload-playground .

# Run with Docker Compose
docker-compose up -d

# Or run standalone
docker run -p 3000:3000 \
  -e DATABASE_URI="postgresql://user:password@host:5432/database" \
  -e PAYLOAD_SECRET="your-secret-key" \
  payload-playground
```

## Database Setup

### PostgreSQL Production Setup

#### Using Managed Services
- **Vercel Postgres** (Recommended for Vercel)
- **Supabase**
- **PlanetScale**
- **AWS RDS**

#### Vercel Postgres
```bash
# Install Vercel Postgres
vercel storage create postgres

# Get connection string
vercel env pull .env.local
```

#### Manual PostgreSQL Setup
```sql
-- Create database
CREATE DATABASE payload_production;

-- Create user
CREATE USER payload_user WITH PASSWORD 'secure_password';

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE payload_production TO payload_user;
```

### Database Migrations
```bash
# Generate migration
pnpm payload migrate:create

# Run migrations
pnpm payload migrate

# Seed production data
pnpm payload seed
```

## File Storage Setup

### AWS S3 Configuration

#### 1. Create S3 Bucket
```bash
# Using AWS CLI
aws s3 mb s3://your-bucket-name --region eu-central-1

# Enable versioning
aws s3api put-bucket-versioning \
  --bucket your-bucket-name \
  --versioning-configuration Status=Enabled
```

#### 2. Configure CORS
```json
{
  "CORSRules": [
    {
      "AllowedHeaders": ["*"],
      "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
      "AllowedOrigins": ["https://yourdomain.com"],
      "ExposeHeaders": ["ETag"]
    }
  ]
}
```

#### 3. Create IAM User
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

### CloudFront CDN Setup
```bash
# Create CloudFront distribution
aws cloudfront create-distribution \
  --distribution-config file://cloudfront-config.json
```

## Environment Configuration

### Production Environment Variables

#### Required Variables
```env
# Application
NODE_ENV=production
NEXT_PUBLIC_SERVER_URL=https://yourdomain.com
NEXT_PUBLIC_ASSETS_PATH=https://yourdomain.com

# Database
DATABASE_URI=postgresql://user:password@host:port/database
PAYLOAD_SECRET=your-super-secure-secret-key

# File Storage
AWS_S3_REGION=eu-central-1
AWS_S3_BUCKET_NAME=your-production-bucket
AWS_S3_ACCESS_KEY_ID=your-access-key
AWS_S3_SECRET_ACCESS_KEY=your-secret-key

# Email
RESEND_API_KEY=your-resend-api-key
RESEND_FROM_EMAIL=noreply@yourdomain.com
RESEND_FROM_NAME=Your App Name
```

#### Optional Variables
```env
# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Monitoring
SENTRY_DSN=your-sentry-dsn
SENTRY_ORG=your-org
SENTRY_PROJECT=your-project

# Redis (for caching)
REDIS_URL=redis://user:password@host:port

# Rate Limiting
UPSTASH_REDIS_REST_URL=your-upstash-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-token
```

## Performance Optimization

### Next.js Configuration
```javascript
// next.config.mjs
const nextConfig = {
  // Enable static optimization
  output: 'standalone',
  
  // Image optimization
  images: {
    domains: ['your-s3-bucket.s3.amazonaws.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Compression
  compress: true,
  
  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

export default nextConfig
```

### Caching Strategy
```typescript
// API route caching
export async function GET() {
  const data = await fetchData()
  
  return Response.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  })
}
```

## Monitoring & Logging

### Error Tracking with Sentry
```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
})
```

### Performance Monitoring
```typescript
// monitoring.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

function sendToAnalytics(metric: any) {
  // Send to your analytics service
  console.log(metric)
}

getCLS(sendToAnalytics)
getFID(sendToAnalytics)
getFCP(sendToAnalytics)
getLCP(sendToAnalytics)
getTTFB(sendToAnalytics)
```

## Security Considerations

### Security Headers
```typescript
// middleware.ts
import { NextResponse } from 'next/server'

export function middleware(request: Request) {
  const response = NextResponse.next()
  
  // Security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  
  return response
}
```

### Environment Security
- Use strong, unique secrets
- Rotate secrets regularly
- Use environment-specific configurations
- Never commit secrets to version control

## Backup Strategy

### Database Backups
```bash
# Automated backup script
#!/bin/bash
pg_dump $DATABASE_URI > backup_$(date +%Y%m%d_%H%M%S).sql

# Upload to S3
aws s3 cp backup_*.sql s3://your-backup-bucket/database/
```

### File Storage Backups
```bash
# Sync S3 bucket for backup
aws s3 sync s3://your-bucket s3://your-backup-bucket --delete
```

## Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Check for TypeScript errors
pnpm check-types
```

#### Database Connection Issues
```bash
# Test database connection
psql $DATABASE_URI -c "SELECT version();"

# Check environment variables
echo $DATABASE_URI
```

#### File Upload Issues
```bash
# Test S3 connection
aws s3 ls s3://your-bucket-name

# Check IAM permissions
aws iam get-user
```

### Health Checks
```typescript
// app/api/health/route.ts
export async function GET() {
  try {
    // Check database
    await payload.find({ collection: 'users', limit: 1 })
    
    // Check S3
    // Add S3 health check
    
    return Response.json({ status: 'healthy', timestamp: new Date().toISOString() })
  } catch (error) {
    return Response.json({ status: 'unhealthy', error: error.message }, { status: 500 })
  }
}
```

## Scaling Considerations

### Horizontal Scaling
- Use load balancers
- Implement session storage (Redis)
- Use CDN for static assets
- Database read replicas

### Vertical Scaling
- Monitor resource usage
- Optimize database queries
- Implement caching strategies
- Use connection pooling

This deployment guide provides comprehensive coverage of production deployment strategies and best practices for the PayloadCMS Playground project.
