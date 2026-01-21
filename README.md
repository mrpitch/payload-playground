# PayloadCMS Playground

A modern, full-stack web application built with PayloadCMS 3.50.0 and Next.js 15.4, featuring React 19, TypeScript, and Tailwind CSS v4.

## 🚀 Quick Start

   ```bash
# Clone and install
git clone <repository-url>
cd payload-playground
   pnpm install

# Start database and development server
   pnpm start:postgres
   pnpm dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📚 Documentation

- **[Getting Started](./docs/getting-started.md)** - Complete setup guide
- **[Technology Stack](./docs/technology-stack.md)** - Detailed tech overview
- **[Development Guide](./docs/development.md)** - Coding standards and practices
- **[API Documentation](./docs/api.md)** - API endpoints and patterns
- **[Deployment Guide](./docs/deployment.md)** - Production deployment
- **[Environment Variables](./docs/environment-variables.md)** - Complete environment setup
- **[Project Structure](./docs/project-structure.md)** - Directory organization and architecture

## 🛠️ Technology Stack

### Core Technologies
- **Next.js 15.4** - App Router, Server Components
- **React 19.0.0** - Latest with Actions, use(), new features
- **PayloadCMS 3.50.0** - Headless CMS with admin interface
- **TypeScript 5.x** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling (beta)

### UI & Components
- **Shadcn/ui** - Modern component library
- **Radix UI** - Headless accessibility primitives
- **Lucide React** - Beautiful icons
- **Class Variance Authority** - Component variants

### State & Data
- **Zustand** - Lightweight state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **TanStack React Query** - Data fetching and caching

### Infrastructure
- **PostgreSQL** - Primary database
- **AWS S3** - File storage
- **Resend** - Email service
- **Vercel** - Hosting and deployment

## 📁 Project Structure

```
payload-playground/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (app)/             # Protected routes
│   │   ├── (auth)/            # Authentication
│   │   ├── (marketing)/       # Public pages
│   │   └── (payload)/         # PayloadCMS admin
│   ├── components/            # React components
│   │   ├── auth/             # Authentication components
│   │   ├── ui/               # Shadcn UI components
│   │   └── layout/           # Layout components
│   ├── lib/                  # Utilities and configuration
│   │   ├── actions/          # Server actions
│   │   ├── schema/           # Zod validation schemas
│   │   ├── store/            # Zustand stores
│   │   └── styles/           # Theme and styling
│   └── payload/              # PayloadCMS configuration
│       ├── collections/      # Database collections
│       ├── blocks/           # Content blocks
│       └── plugins/          # PayloadCMS plugins
├── docs/                     # Comprehensive documentation
├── .cursor/                  # Cursor AI rules and guidelines
└── public/                   # Static assets
```

## 🎨 Theme System

The project includes a comprehensive theme system with multiple pre-built themes:

- **Nature Theme** - Earth tones and natural colors
- **Bubblegum Theme** - Bright, playful colors
- **Vintage Paper Theme** - Classic, warm aesthetic

Each theme includes:
- Complete color palettes (light/dark modes)
- Typography configurations
- Shadow and border radius settings
- TypeScript variable definitions

## 🤖 Cursor AI Optimization

This project is optimized for Cursor AI development with:

- **Comprehensive Rules**: Detailed development guidelines in `.cursor/rules/`
- **Project Structure**: Clear organization for AI understanding
- **Type Safety**: Full TypeScript for better AI assistance
- **Best Practices**: Modern patterns and conventions
- **Documentation**: Extensive docs for AI context


**Built with ❤️ using PayloadCMS, Next.js, and modern web technologies.**

