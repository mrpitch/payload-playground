# Codebase Analysis Plan

## Project Overview
**PayloadCMS Playground** is a full-stack Next.js 15 + PayloadCMS 3.67 application with React 19, TypeScript, and Tailwind CSS v4.

### Core Purpose
Educational/reference boilerplate combining:
- Headless CMS (PayloadCMS) with custom admin UI
- Modern Next.js App Router with Server Components
- Full authentication system
- Multiple content management features
- Email integration and template system
- Theme management system

## Architecture

### Tech Stack
- **Framework**: Next.js 15.5 (App Router)
- **CMS**: PayloadCMS 3.67 (Headless)
- **Runtime**: React 19.0.1
- **Database**: PostgreSQL
- **Storage**: AWS S3
- **Email**: Resend
- **Styling**: Tailwind CSS v4 + Shadcn/ui + Radix UI
- **State**: Zustand
- **Forms**: React Hook Form + Zod
- **Hosting**: Vercel

### Key Directories

#### `/src/app` - Next.js App Router
- `(app)/` - Main app routes
- `(auth)/` - Authentication routes (login, register, reset, verify)
- `(marketing)/` - Public pages (blog, docs, home)
- `(payload)/` - PayloadCMS admin interface
- `(app)/(app)/` - Protected routes (dashboard, account-settings, exercise, workout)
- `(app)/(docs)/` - Docs routes
- `api/` - Custom API routes (preview system, custom endpoints)

#### `/src/payload` - PayloadCMS Configuration
**Collections (Content Models)**:
- Users (with auth, roles)
- Posts (with blocks, categories)
- Pages (with blocks)
- Docs (documentation)
- Media (file management)
- Newsletter (subscribers)
- Categories (for posts/pages)
- Menus (navigation menus)
- AppSettings (global settings)

**Blocks System**:
- Copy Block (rich text)
- Image/Text Block
- Blog Teaser Block
- Docs Teaser Block
- Quote Block
- Stage Block (hero)
- Video Block
- Code Block
- Email blocks (for email templates)

**Other Payload Config**:
- `/access/` - Access control (admin, editor, public)
- `/actions/` - Custom actions (send-email)
- `/plugins/` - Payload plugins
- `/i18n/` - Internationalization setup
- `/email-templates/` - Email template components
- `/globals/` - Global content (AppShell, EmailTemplates)

#### `/src/components` - React Components
- `auth/` - Auth forms and components
- `layout/` - Layout blocks and components
- `ui/` - Shadcn/ui components
- `form/` - Form utilities
- `utils/` - Helper components

#### `/src/lib` - Utilities & Config
- `actions/` - Server actions (auth, user, password reset)
- `store/` - Zustand stores (user, theme, nav)
- `schema/` - Zod validation schemas
- `styles/` - Theme system, fonts, CSS variables
- `utils/` - Helper functions
- `types/` - TypeScript type definitions

## Key Features

### Authentication System
- User registration with email verification
- Login/logout
- Password reset flow
- Password change
- Session management via Payload auth
- User roles (admin, editor, user)

### Content Management
- Pages with block-based content
- Blog posts with categories
- Documentation system
- Media library with S3 integration
- Draft/published states
- SEO optimization

### Email System
- Resend integration
- Email templates (password reset, verify account, newsletter)
- Email block components
- Email preview in admin

### Theme System
- Multiple pre-built themes (Nature, Bubblegum, Vintage Paper)
- CSS variables-based theming
- Light/dark mode support
- Font family configurations
- TypeScript theme variables

### Admin Interface
- Custom Payload admin UI
- Shadcn/ui components
- Custom views and components
- Role-based access control
- Media management

## Code Patterns & Conventions

### File Naming
- Components: `kebab-case.tsx` (e.g., `form-login.tsx`)
- Pages: `page.tsx`, `layout.tsx`
- Server actions: `kebab-case.ts`
- CSS: `kebab-case.css`
- Types/Config: `kebab-case.ts`

### Imports
- Use `@/` alias for `src/` imports
- Organized by: external → internal → relative
- Barrel exports from `ui/` and `components/`

### Server Actions
Located in `src/lib/actions/`:
- `login.ts` - Login user
- `register.ts` - Register new user
- `logout.ts` - Logout user
- `verify-email.ts` - Verify email token
- `reset-password.ts` - Reset password
- `change-password.ts` - Change password when logged in
- `user.ts` - User profile operations
- `get-session.ts` - Get current user session

### State Management
Zustand stores in `src/lib/store/`:
- `user-store.ts` - Current user and auth state
- `theme-store.ts` - Theme selection
- `nav-store.ts` - Navigation state

### Validation
Zod schemas in `src/lib/schema/`:
- Login, register, password reset, change password
- Used in both client forms and server actions

## Recent Development

### Latest Commits
1. **fix**: update prompt messages in pg-restore-backup script
2. **chore**: bump version to 1.1.2
3. **chore**: remove deploy-release workflow file
4. **chore**: add deploy release script and update branch in workflow
5. **chore**: bump version to 1.1.1

### Active Development Areas
- Deployment and release management
- Database backup/restore tooling
- Version management
- GitHub workflows

## Dependencies Status

### Core Dependencies (Current)
- `@payloadcms/*`: ^3.67.0 (up to date)
- `next`: ^15.5 (latest)
- `react`: ^19.0.1 (latest)
- `typescript`: ^5 (latest)
- `tailwindcss`: ^4 (latest beta)
- `zod`: ^3.24.1
- `zustand`: ^5.0.3
- `react-hook-form`: ^7.54.2
- `@radix-ui/*`: Various ~1.2.x versions

### Known Overrides (in pnpm config)
- `@modelcontextprotocol/sdk`: ^1.24.0
- `esbuild`: 0.25.8 (specific version)
- `body-parser`: ^2.2.1
- `js-yaml`: ^4.1.1
- `nodemailer`: ^7.0.11
- `prismjs`: ^1.30.0

## Potential Areas for Enhancement

1. **Testing Framework** - No test framework currently in place
2. **API Documentation** - GraphQL available but limited docs
3. **Performance Monitoring** - No built-in analytics
4. **Error Handling** - Could benefit from centralized error handling
5. **Logging** - No structured logging system
6. **Cache Strategy** - No explicit caching beyond Next.js defaults
7. **Mobile Responsiveness** - Already good but could be enhanced
8. **Accessibility** - Shadcn/ui provides baseline; could be audited
9. **SEO** - Has SEO plugin but could expand metadata strategy
10. **Rate Limiting** - Not visible in current setup

## Summary

This is a **well-architected, production-ready boilerplate** combining:
- Modern Next.js patterns (Server Components, Server Actions)
- Professional CMS setup (PayloadCMS with extensive customization)
- Clean component architecture (Shadcn/ui + Radix)
- Proper auth/security (role-based access, email verification)
- Scalable styling (theme system, CSS variables)
- Deployment-ready (Docker, Vercel config, CI/CD scripts)

The codebase follows consistent conventions, uses TypeScript throughout, and demonstrates best practices for Next.js 15 + PayloadCMS integration.

---

**Current Status**: Active development phase, focusing on deployment automation and release management. Code quality is high with clear separation of concerns and modern JavaScript/TypeScript practices.
