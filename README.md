# PayloadCMS Playground

A modern, full-stack web application built with PayloadCMS 3.0 and Next.js 15.

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

```env
# Required
PAYLOAD_SECRET=your-secret-key
DATABASE_URI=postgres://postgres:postgres@localhost:5432/payload
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Optional
S3_BUCKET=your-bucket-name
S3_REGION=your-region
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key
CLOUDFRONT_DISTRIBUTION_ID=your-distribution-id
```

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

## License

MIT