# PayloadCMS Playground

A modern, full-stack web application built with PayloadCMS 3.0 and Next.js 15.

## Table of Contents
- [PayloadCMS Playground](#payloadcms-playground)
  - [Table of Contents](#table-of-contents)
  - [Project Description](#project-description)
    - [Cursor AI Optimization](#cursor-ai-optimization)
    - [Key Features](#key-features)
    - [Use Cases](#use-cases)
    - [Target Audience](#target-audience)
  - [Getting Started](#getting-started)
  - [Package Configuration](#package-configuration)
    - [Scripts](#scripts)
      - [Development Scripts](#development-scripts)
      - [Database Scripts](#database-scripts)
      - [Type Generation](#type-generation)
      - [Code Quality Scripts](#code-quality-scripts)
      - [Testing](#testing)
      - [Git Hooks](#git-hooks)
    - [Dependencies](#dependencies)
      - [Core Dependencies](#core-dependencies)
      - [Development Dependencies](#development-dependencies)
  - [Environment Variables](#environment-variables)
  - [Project Structure](#project-structure)
  - [Directory Structure](#directory-structure)
    - [App Directory (`src/app/`)](#app-directory-srcapp)
    - [Components (`src/components/`)](#components-srccomponents)
    - [Library (`src/lib/`)](#library-srclib)
    - [PayloadCMS (`src/payload/`)](#payloadcms-srcpayload)
  - [Internationalization (i18n)](#internationalization-i18n)
    - [Supported Languages](#supported-languages)
    - [Collection Fields](#collection-fields)
  - [Technology Stack](#technology-stack)
    - [Frontend](#frontend)
    - [Backend \& CMS](#backend--cms)
    - [Infrastructure](#infrastructure)
    - [Development Tools](#development-tools)
  - [License](#license)

## Project Description

PayloadCMS Playground is a comprehensive content management system that demonstrates the power of modern web technologies. This project serves as both a practical application and a learning resource for developers working with PayloadCMS and Next.js.

### Cursor AI Optimization
This project is optimized for use with Cursor AI, providing enhanced development experience and intelligent code assistance. The project includes a `.cursorfile` in the root directory that contains:
- Custom instructions for AI code generation
- Project-specific coding guidelines
- Technology stack preferences
- Code style and formatting rules
- Best practices for React, TypeScript, and PayloadCMS development

The `.cursorfile` helps Cursor AI understand the project's architecture, coding standards, and development patterns, enabling it to provide more accurate and context-aware code suggestions and completions.

### Key Features
- **Modern Tech Stack**: Built with Next.js 15, React 19, and PayloadCMS 3.0
- **Type Safety**: Full TypeScript implementation with generated types
- **Rich Content Management**: 
  - Dynamic content blocks
  - Media management with AWS S3
  - Rich text editing with Lexical
  - Email template system
- **Developer Experience**:
  - Hot module reloading
  - Type generation
  - Code quality tools
  - Comprehensive documentation
- **Production Ready**:
  - Docker support
  - AWS infrastructure
  - Vercel deployment
  - Edge functions
- **Internationalization**:
  - Multi-language support
  - RTL compatibility
  - Localized content management

### Use Cases
- Content-heavy websites
- E-commerce platforms
- Documentation sites
- Marketing websites
- Blog platforms
- Corporate websites

### Target Audience
- Developers learning PayloadCMS
- Teams building content-driven applications
- Organizations needing a modern CMS solution
- Developers looking for a Next.js + CMS reference implementation

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in required variables

4. Start PostgreSQL:
   ```bash
   pnpm start:postgres
   ```

5. Run the development server:
   ```bash
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Package Configuration

### Scripts

#### Development Scripts
- `pnpm dev`: Starts development server with hot-reloading
- `pnpm build:payload`: Builds PayloadCMS for production
- `pnpm build:next`: Builds Next.js application
- `pnpm build`: Complete production build

#### Database Scripts
- `pnpm start:postgres`: Starts PostgreSQL Docker container
- `pnpm stop:postgres`: Stops PostgreSQL container

#### Type Generation
- `pnpm generate:types`: Generates TypeScript types from PayloadCMS collections

#### Code Quality Scripts
- `pnpm lint`: Runs ESLint
- `pnpm lint:fix`: Automatically fixes linting issues
- `pnpm format`: Formats code using Prettier
- `pnpm typecheck`: Runs TypeScript compiler checks

#### Testing
- `pnpm test`: Runs Jest test suite
- `pnpm test:watch`: Runs tests in watch mode

#### Git Hooks
- `pnpm prepare`: Sets up Husky git hooks

### Dependencies

#### Core Dependencies
- `next`: ^15.0.0
- `react`: ^19.0.0
- `payload`: ^3.0.0
- `@payloadcms/db-postgres`: ^1.0.0
- `@payloadcms/richtext-lexical`: ^1.0.0

#### Development Dependencies
- `typescript`: ^5.0.0
- `@types/react`: ^19.0.0
- `@types/node`: ^20.0.0
- `eslint`: ^8.0.0
- `prettier`: ^3.0.0
- `jest`: ^29.0.0
- `husky`: ^8.0.0

## Environment Variables

| Name | Default Value | Description |
|------|---------------|-------------|
| **Next.js** |
| `NEXT_PUBLIC_ASSETS_PATH` | `http://localhost:3000` | Base URL for static assets |
| `NEXT_PUBLIC_IMAGE_URL` | - | URL for image CDN |
| `NEXT_PUBLIC_SERVER_URL` | `http://localhost:3000` | Base URL for the application |
| `NEXT_PUBLIC_REVALIDATE` | `60` | Cache revalidation time in seconds |
| `VERCEL_PROJECT_PRODUCTION_URL` | - | Vercel production URL |
| `COOKIE_DOMAIN` | `localhost` | Domain for cookie storage |
| **PayloadCMS** |
| `DATABASE_URI` | `postgres://payload_db_user:payload_db_pw@127.0.0.1:5432/db_payload_dev` | PostgreSQL connection string |
| `PAYLOAD_SECRET` | `supersecret` | Secret key for PayloadCMS |
| **PostgreSQL** |
| `DATABASE_CLIENT` | `postgres` | Database client type |
| `DATABASE_HOST` | `localhost` | Database host |
| `DATABASE_PORT` | `5432` | Database port |
| `DATABASE_USERNAME` | `payload_db_user` | Database username |
| `DATABASE_PASSWORD` | `payload_db_pw` | Database password |
| `DATABASE_NAME` | `db_payload_dev` | Database name |
| `DATABASE_SCHEMA` | `public` | Database schema |
| `DATABASE_SSL` | `false` | Enable SSL for database connection |
| **AWS S3** |
| `AWS_S3_REGION` | `eu-central-1` | AWS region for S3 |
| `AWS_S3_BUCKET_NAME` | - | S3 bucket name |
| `AWS_S3_ACCESS_KEY_ID` | - | AWS access key ID |
| `AWS_S3_SECRET_ACCESS_KEY` | - | AWS secret access key |
| `AWS_S3_BUCKET_PREFIX` | `payloadcms-playground` | Prefix for S3 bucket objects |
| **Resend** |
| `RESEND_API_KEY` | - | Resend API key for email service |
| `RESEND_FROM_EMAIL` | - | Default sender email address |
| `RESEND_FROM_NAME` | `Payloadcms Playground` | Default sender name |

## Project Structure

```text
.
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── (app)/             # Protected app routes
│   │   ├── (auth)/            # Authentication routes
│   │   ├── api/               # API routes
│   │   └── [locale]/          # Internationalized routes
│   │
│   ├── components/            # Shared React components
│   │   ├── auth/             # Authentication related components
│   │   ├── common/           # Common UI components
│   │   ├── forms/            # Form components
│   │   ├── layout/           # Layout components
│   │   └── ui/               # Shadcn UI components
│   │
│   ├── lib/                  # Utility functions and shared logic
│   │   ├── actions/          # Server actions
│   │   ├── config/           # Configuration files
│   │   ├── hooks/            # Custom React hooks
│   │   ├── schema/           # Zod validation schemas
│   │   ├── store/            # Zustand store definitions
│   │   ├── types/            # TypeScript type definitions
│   │   └── utils/            # Helper utilities
│   │
│   └── payload/             # PayloadCMS configuration
│       ├── blocks/          # Content blocks
│       ├── collections/     # Database collections
│       ├── fields/          # Custom fields
│       ├── hooks/           # Collection hooks
│       ├── i18n/           # Internationalization
│       │   ├── messages/   # Translation files
│       │   ├── routing.ts  # i18n routing configuration
│       │   └── i18n.ts     # PayloadCMS i18n config
│       ├── plugins/        # PayloadCMS plugins
│       └── utils/          # CMS utilities
│
├── public/                 # Static files
├── styles/                # Global styles
├── types/                 # Global TypeScript types
├── next.config.js         # Next.js configuration
├── payload.config.ts      # PayloadCMS configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Directory Structure

### App Directory (`src/app/`)
- `(app)`: Protected routes requiring authentication
- `(auth)`: Authentication-related pages (login, register, etc.)
- `api`: API route handlers
- `[locale]`: Internationalized routes following Next.js 13+ conventions

### Components (`src/components/`)
- `auth`: Authentication components (login forms, password reset, etc.)
- `common`: Reusable UI components
- `forms`: Form-specific components and handlers
- `layout`: Layout components (header, footer, navigation)
- `ui`: Shadcn UI component library customizations

### Library (`src/lib/`)
- `actions`: Server-side actions (Next.js Server Actions)
- `config`: Application configuration
- `hooks`: Custom React hooks
- `schema`: Zod validation schemas
- `store`: Zustand state management
- `types`: TypeScript interfaces and types
- `utils`: Helper functions and utilities

### PayloadCMS (`src/payload/`)
- `blocks`: Reusable content blocks
- `collections`: Database collection definitions
- `fields`: Custom field types
- `hooks`: Collection lifecycle hooks
- `i18n`: Internationalization configuration
- `plugins`: Custom and third-party plugins
- `utils`: CMS utility functions

## Internationalization (i18n)

### Supported Languages
- English (en) - Default
- German (de)

### Collection Fields
Localized fields in collections are marked with:

```typescript
{
  name: 'title',
  type: 'text',
  localized: true
}
```

## Technology Stack

### Frontend
- Next.js 15 (App Router)
- React 19
- TypeScript
- TailwindCSS
- Shadcn UI
- Radix UI

### Backend & CMS
- PayloadCMS 3.0
- PostgreSQL (via Docker)
- Node.js (^18.20.2 || >=20.9.0)

### Infrastructure
- Docker for local development
- AWS S3 (media storage)
- AWS CloudFront (CDN)
- AWS Route53 (DNS)
- Vercel (hosting)
- Vercel Edge Functions

### Development Tools
- PNPM (package manager)
- ESLint
- Prettier
- TypeScript
- Next-intl (internationalization)

## License

MIT
