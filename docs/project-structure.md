# Project Structure

This document provides a comprehensive overview of the project's directory structure, file organization, and architectural patterns.

## Root Level Structure

```
payload-playground/
├── .cursor/                    # Cursor AI configuration
│   └── rules/                 # Development rules and guidelines
├── docs/                      # Project documentation
├── public/                    # Static assets
│   └── images/               # Images, icons, logos
├── src/                       # Source code
├── components.json            # Shadcn/ui components configuration
├── docker-compose.yml         # Docker services configuration
├── eslint.config.mjs          # ESLint configuration
├── next.config.mjs            # Next.js configuration
├── package.json               # Dependencies and scripts
├── postcss.config.cjs         # PostCSS configuration
├── tsconfig.json              # TypeScript configuration
├── vercel.json                # Vercel deployment configuration
└── README.md                  # Project documentation
```

## Source Code Structure (`src/`)

### App Router (`src/app/`)

```
src/app/
├── (app)/                     # Main application routes
│   ├── _components/           # App-specific components
│   │   ├── footer.tsx
│   │   ├── header.tsx
│   │   └── navigation/        # Navigation components
│   ├── (app)/                 # Authenticated app routes
│   │   ├── account-settings/
│   │   ├── dashboard/
│   │   └── layout.tsx
│   ├── (auth)/                # Authentication routes
│   │   ├── change-password/
│   │   ├── login/
│   │   ├── register/
│   │   ├── reset-password/
│   │   └── verify-email/
│   ├── (marketing)/           # Marketing/public routes
│   │   ├── [slug]/           # Dynamic pages
│   │   ├── blog/
│   │   ├── docs/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── error.tsx
│   ├── layout.tsx
│   └── not-found.tsx
├── (payload)/                 # PayloadCMS admin routes
│   ├── admin/                 # Admin interface
│   ├── api/                   # Payload API routes
│   ├── custom.scss
│   ├── layout.tsx
│   └── payloadShadcn.css
└── api/                       # Custom API routes
    ├── my-route/
    └── preview/
```

### Components (`src/components/`)

```
src/components/
├── auth/                      # Authentication components
│   ├── form-change-password.tsx
│   ├── form-container.tsx
│   ├── form-login.tsx
│   ├── form-register.tsx
│   ├── form-reset-password.tsx
│   ├── logout-button.tsx
│   └── verify-email.tsx
├── form/                      # Form components
│   ├── form-message.tsx
│   └── form.tsx
├── layout/                    # Layout components
│   ├── blog-teaser-block.tsx
│   ├── breadcrumb-nav.tsx
│   ├── copy-block.tsx
│   ├── image-text.tsx
│   ├── quote-block.tsx
│   ├── stage.tsx
│   └── toc.tsx
├── ui/                        # Shadcn/ui components
│   ├── accordion.tsx
│   ├── alert.tsx
│   ├── avatar.tsx
│   ├── button.tsx
│   ├── card.tsx
│   ├── custom/                # Custom UI components
│   │   ├── author.tsx
│   │   ├── container.tsx
│   │   ├── custom-dialog.tsx
│   │   ├── disable-preview-button.tsx
│   │   ├── exit-preview-button.tsx
│   │   ├── icons.tsx
│   │   ├── logo.tsx
│   │   ├── theme-toggle.tsx
│   │   ├── toast.tsx
│   │   └── typography.tsx
│   ├── dialog.tsx
│   ├── form.tsx
│   ├── input.tsx
│   ├── sidebar.tsx
│   └── ... (other shadcn components)
└── utils/                     # Utility components
    ├── image-provider.tsx
    ├── refresh-route-onsave.tsx
    ├── render-blocks.tsx
    ├── richtext.tsx
    └── theme-provider.tsx
```

### Library (`src/lib/`)

```
src/lib/
├── actions/                   # Server actions
│   ├── change-password.ts
│   ├── get-session.ts
│   ├── login.ts
│   ├── logout.ts
│   ├── register.ts
│   ├── reset-password.ts
│   ├── user.ts
│   └── verify-email.ts
├── config.ts                  # App configuration
├── routes.ts                  # Route definitions
├── schema/                    # Zod validation schemas
│   ├── change-password.schema.ts
│   ├── login.schema.ts
│   ├── register.schema.ts
│   └── reset-password.schema.ts
├── store/                     # Zustand stores
│   ├── nav-store.ts
│   ├── theme-store.ts
│   └── user-store.ts
├── styles/                    # Styling and themes
│   ├── fonts/                 # Font configurations
│   │   ├── amethysthaze.ts
│   │   ├── bubblegum.ts
│   │   ├── candyland.ts
│   │   ├── custom/            # Custom fonts
│   │   ├── index.ts
│   │   ├── nature.ts
│   │   ├── sageandsand.ts
│   │   └── vintagepaper.ts
│   ├── v3/                    # Theme v3 files
│   │   ├── emailStyles.ts
│   │   ├── theme.ts
│   │   ├── variables-bubblegum.ts
│   │   └── variables.ts
│   ├── globals.css            # Global styles
│   ├── theme.css              # Theme configuration
│   └── variables-*.css        # Theme variable files
├── types/                     # TypeScript type definitions
│   └── index.ts
└── utils/                     # Utility functions
    ├── cn.ts                  # Class name utility
    ├── constants.ts
    ├── cookies.ts
    ├── generate-preview-path.ts
    ├── generateMeta.ts
    ├── getCollections.ts
    └── getGlobals.ts
```

### PayloadCMS (`src/payload/`)

```
src/payload/
├── access/                    # Access control
│   ├── admin-and-editor.ts
│   ├── admin.ts
│   ├── anyone.ts
│   └── index.ts
├── actions/                   # Payload actions
│   └── send-email.ts
├── blocks/                    # Content blocks
│   ├── blog-teaser-block.ts
│   ├── copy-block.ts
│   ├── email-gallery.ts
│   ├── email-image-text-block.ts
│   ├── image-text-block.ts
│   ├── quote-block.ts
│   └── stage-block.ts
├── collections/               # Payload collections
│   ├── Categories.ts
│   ├── Docs.ts
│   ├── Media.ts
│   ├── Newsletter.ts
│   ├── Pages.ts
│   ├── Posts.ts
│   └── Users.ts
├── components/                # Payload components
│   ├── avatar-client.tsx
│   ├── avatar.tsx
│   ├── email-preview.tsx
│   ├── Icon.tsx
│   ├── logo.tsx
│   ├── nav-links.tsx
│   └── order-cell.tsx
├── email-templates/           # Email templates
│   ├── email-gallery.tsx
│   ├── email-image-text.tsx
│   ├── newsletter.tsx
│   ├── password-reset.tsx
│   ├── render-email-blocks.tsx
│   └── verify-account.tsx
├── globals/                   # Payload globals
│   ├── AppShell.ts
│   └── EmailTemplates.ts
├── hooks/                     # Payload hooks
│   ├── check-role.ts
│   ├── email-preview.ts
│   ├── protect-roles.ts
│   └── revalidate-cache.ts
├── i18n/                      # Internationalization
│   ├── localization.ts
│   └── routing.ts
├── plugins/                   # Payload plugins
│   └── index.ts
├── types/                     # Payload types
│   └── email-templates.ts
├── utils/                     # Payload utilities
│   ├── breakpoints.ts
│   ├── can-use-dom.ts
│   ├── constants.ts
│   ├── generate-preview-path.ts
│   ├── get-url.ts
│   ├── render-email.ts
│   └── seed/                  # Database seeding
├── views/                     # Custom admin views
│   ├── folder-view.tsx
│   └── my-custom-view.tsx
├── payload-types.ts           # Generated Payload types
└── payload.config.ts          # Payload configuration
```

### Hooks (`src/hooks/`)

```
src/hooks/
├── use-mobile.ts              # Mobile detection hook
└── use-toc.ts                 # Table of contents hook
```

## Important Configuration Files

### Core Configuration
- `package.json` - Dependencies, scripts, and project metadata
- `tsconfig.json` - TypeScript configuration
- `next.config.mjs` - Next.js configuration
- `postcss.config.cjs` - PostCSS configuration
- `eslint.config.mjs` - ESLint configuration

### Styling Configuration
- `components.json` - Shadcn/ui components configuration
- `src/lib/styles/globals.css` - Global CSS styles
- `src/lib/styles/theme.css` - Theme configuration
- `src/lib/styles/variables-*.css` - Theme variable files

### PayloadCMS Configuration
- `src/payload/payload.config.ts` - Main Payload configuration
- `src/payload/collections/` - Content collections
- `src/payload/globals/` - Global content
- `src/payload/blocks/` - Content blocks

### Development Tools
- `docker-compose.yml` - Local development services
- `vercel.json` - Deployment configuration
- `.cursor/rules/` - Cursor IDE rules

## File Naming Conventions

### Components
- **React Components**: `kebab-case.tsx` (e.g., `user-profile.tsx`)
- **Page Components**: `page.tsx`, `layout.tsx`, `error.tsx`
- **API Routes**: `route.ts` (e.g., `api/users/route.ts`)

### Utilities
- **Utility Functions**: `kebab-case.ts` (e.g., `format-date.ts`)
- **Type Definitions**: `index.ts` or `kebab-case.ts`
- **Configuration**: `config.ts` or `kebab-case.config.ts`

### Styles
- **CSS Files**: `kebab-case.css` (e.g., `theme-nature.css`)
- **TypeScript Variables**: `variables-kebab-case.ts`

## Import Patterns

### Path Aliases
```typescript
// Use @/ alias for src/ directory
import { Button } from '@/components/ui/button'
import { TUser } from '@/lib/types'
import { cn } from '@/lib/utils/cn'
```

### Import Organization
```typescript
// 1. External libraries
import React from 'react'
import { NextRequest } from 'next/server'

// 2. Internal imports (absolute paths)
import { Button } from '@/components/ui/button'
import { TUser } from '@/lib/types'

// 3. Relative imports
import './styles.css'
import { LocalComponent } from './local-component'
```

## Route Groups

### App Router Groups
- `(app)` - Main application routes
- `(auth)` - Authentication routes  
- `(marketing)` - Public marketing routes
- `(payload)` - PayloadCMS admin routes

### Route Group Benefits
- **Organization**: Logical grouping of related routes
- **Layouts**: Shared layouts within groups
- **URL Structure**: Groups don't affect URL paths
- **Code Splitting**: Automatic code splitting by group

## Theme System Architecture

### Theme Structure
```
src/lib/styles/
├── fonts/                     # Font configurations
│   ├── index.ts              # Font exports
│   ├── nature.ts             # Nature theme fonts
│   ├── bubblegum.ts          # Bubblegum theme fonts
│   └── vintagepaper.ts       # Vintage paper theme fonts
├── v3/                       # Theme v3 TypeScript files
│   ├── variables.ts          # Base variables
│   ├── variables-bubblegum.ts # Bubblegum variables
│   └── theme.ts              # Theme configuration
├── globals.css               # Global styles and Tailwind
├── theme.css                 # Theme configuration
├── theme-nature.css          # Nature theme variables
├── variables-bubblegum.css   # Bubblegum theme variables
└── variables-vintagepaper.css # Vintage paper theme variables
```

### Theme Usage
```typescript
// Import theme variables
import { variablesNature } from '@/lib/styles/v3/variables-nature'

// Use in components
const theme = variablesNature.root['--primary']
```

## State Management Architecture

### Zustand Stores
```
src/lib/store/
├── nav-store.ts              # Navigation state
├── theme-store.ts            # Theme switching
└── user-store.ts             # User authentication state
```

### Store Pattern
```typescript
interface TUserStore {
  user: TUser | null
  isLoading: boolean
  setUser: (user: TUser | null) => void
  setLoading: (loading: boolean) => void
}

export const useUserStore = create<TUserStore>((set) => ({
  user: null,
  isLoading: false,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
}))
```

## API Architecture

### API Routes Structure
```
src/app/api/
├── auth/                     # Authentication endpoints
│   ├── login/route.ts
│   ├── register/route.ts
│   └── logout/route.ts
├── user/                     # User management
│   ├── profile/route.ts
│   └── settings/route.ts
└── content/                  # Content operations
    ├── preview/route.ts
    └── duplicate/route.ts
```

### Server Actions
```
src/lib/actions/
├── auth/                     # Authentication actions
│   ├── login.ts
│   ├── register.ts
│   └── logout.ts
├── user/                     # User actions
│   ├── update-profile.ts
│   └── change-password.ts
└── content/                  # Content actions
    ├── create-post.ts
    └── update-post.ts
```

## Best Practices

### File Organization
1. **Group by feature** when possible
2. **Use consistent naming** conventions
3. **Keep related files together**
4. **Separate concerns** clearly
5. **Use barrel exports** for clean imports

### Component Structure
1. **Co-locate** related components
2. **Extract** reusable components to `/components`
3. **Keep** page-specific components in route folders
4. **Use** TypeScript interfaces for props
5. **Follow** the established patterns

### Import/Export Patterns
1. **Use named exports** for components
2. **Use default exports** for pages
3. **Group imports** logically
4. **Use path aliases** consistently
5. **Avoid** deep relative imports

This comprehensive project structure guide ensures consistent organization and maintainability across the entire codebase.
