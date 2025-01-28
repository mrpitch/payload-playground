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

```shell
.
├── src/
│   ├── app/                 # Next.js app router pages
│   ├── components/          # Shared React components
│   ├── lib/                 # Utility functions
│   └── payload/            # PayloadCMS configuration
│       ├── blocks/         # Content blocks
│       ├── collections/    # Database collections
│       ├── i18n/          # Internationalization
│           ├── routing.ts  # i18n routing configuration
│           └── i18n.ts     # PayloadCMS i18n config
│       ├── plugins/       # PayloadCMS plugins
│       └── utils/         # CMS utilities
```

## Internationalization (i18n)

The project uses a dual i18n setup:

- PayloadCMS Admin UI translations (en, de)
- Next.js frontend translations using next-intl

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

### Configuration Files

- `src/payload/i18n/i18n.ts` - PayloadCMS admin translations
- `src/payload/i18n/messages/` - Frontend translation files
- `src/payload/i18n/routing.ts` - i18n routing setup
- `src/payload/i18n/request.ts` - next-intl configuration

## Collections

- Users
- Media
- Pages
- Posts
- Categories
- Newsletter

## Features

- 🌐 Internationalization (i18n) support
- 📝 Rich text editing with Lexical Editor
- 🔍 SEO optimization with PayloadCMS SEO plugin
- 🖼️ Media management
- 📱 Responsive design
- 🔒 Authentication and authorization
- 🚀 Server-side rendering
- 📊 Content versioning

## Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start PostgreSQL:

   ```bash
   pnpm start:postgres
   ```

4. Run the development server:

   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```properties
PAYLOAD_SECRET=your-secret-key
DATABASE_URI=postgres://postgres:postgres@localhost:5432/payload
```

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm generate:types` - Generate PayloadCMS types
- `pnpm start:postgres` - Start PostgreSQL container
- `pnpm stop:postgres` - Stop PostgreSQL container

## License

MIT
