# Getting Started

This guide will help you set up and run the PayloadCMS Playground project locally.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: `^18.20.2 || >=20.9.0` (LTS or Current)
- **pnpm**: Latest version (recommended package manager)
- **Docker**: For PostgreSQL database
- **Git**: For version control

## Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd payload-playground
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Setup

Copy the environment template and configure your variables:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Database
DATABASE_URI=postgres://payload_db_user:payload_db_pw@127.0.0.1:5432/db_payload_dev

# PayloadCMS
PAYLOAD_SECRET=your-super-secret-key-here

# Next.js
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
NEXT_PUBLIC_ASSETS_PATH=http://localhost:3000

# AWS S3 (Optional - for file storage)
AWS_S3_REGION=eu-central-1
AWS_S3_BUCKET_NAME=your-bucket-name
AWS_S3_ACCESS_KEY_ID=your-access-key
AWS_S3_SECRET_ACCESS_KEY=your-secret-key

# Resend (Optional - for email)
RESEND_API_KEY=your-resend-api-key
RESEND_FROM_EMAIL=noreply@yourdomain.com
```

### 4. Start PostgreSQL

```bash
pnpm start:postgres
```

This will start a PostgreSQL container using Docker Compose.

### 5. Run the Development Server

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### 6. Access PayloadCMS Admin

Visit [http://localhost:3000/admin](http://localhost:3000/admin) to access the PayloadCMS admin interface.

## Development Scripts

### Core Development

```bash
# Start development server with Turbopack
pnpm dev

# Clean start (removes .next cache)
pnpm devsafe

# Start with database seeding
pnpm dev:seed

# Build for production
pnpm build

# Start production server
pnpm start
```

### Database Management

```bash
# Start PostgreSQL container
pnpm start:postgres

# Stop PostgreSQL container
pnpm stop:postgres

# Stop and remove volumes (clean slate)
pnpm stop:postgres:cleanup
```

### Code Quality

```bash
# Run ESLint
pnpm lint

# Fix linting issues automatically
pnpm lint:fix

# Type checking
pnpm check-types

# Bundle analysis
pnpm analyze
```

### Type Generation

```bash
# Generate TypeScript types from PayloadCMS collections
pnpm generate:types

# Generate import map
pnpm generate:importmap
```

## Project Structure Overview

```
payload-playground/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (app)/             # Protected routes
│   │   ├── (auth)/            # Authentication
│   │   ├── (marketing)/       # Public pages
│   │   └── (payload)/         # PayloadCMS admin
│   ├── components/            # React components
│   ├── lib/                   # Utilities and config
│   └── payload/               # PayloadCMS configuration
├── docs/                      # Documentation
├── public/                    # Static assets
└── .cursor/                   # Cursor AI rules
```

## First Steps

1. **Explore the Admin Interface**: Visit `/admin` and create your first user
2. **Check the Collections**: Navigate through the different content types
3. **View the Frontend**: Browse the public pages to see content rendering
4. **Read the Code**: Start with `src/app/(marketing)/page.tsx` for the homepage

## Common Issues

### Database Connection Issues

If you encounter database connection errors:

1. Ensure PostgreSQL container is running: `pnpm start:postgres`
2. Check your `DATABASE_URI` in `.env`
3. Verify Docker is running

### Port Conflicts

If port 3000 is in use:

1. Kill the process: `lsof -ti:3000 | xargs kill -9`
2. Or use a different port: `pnpm dev -- -p 3001`

### Type Generation Issues

If TypeScript types are outdated:

```bash
pnpm generate:types
```

## Next Steps

- [Technology Stack](./technology-stack.md) - Learn about the technologies used
- [Development Guide](./development.md) - Deep dive into development practices
- [API Documentation](./api.md) - Understanding the API structure
- [Deployment Guide](./deployment.md) - Deploy to production

## Getting Help

- Check the [Issues](https://github.com/your-repo/issues) for common problems
- Review the [PayloadCMS Documentation](https://payloadcms.com/docs/)
- Read the [Next.js Documentation](https://nextjs.org/docs/)
- Follow the [Cursor Rules](../.cursor/rules/) for development guidelines
