# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev              # dev server (turbopack)
pnpm devsafe          # clears .next, then dev
pnpm build            # production build
pnpm lint             # ESLint
pnpm check-types      # TypeScript type check (tsc --noEmit)
pnpm start:postgres   # start local PostgreSQL via Docker
pnpm stop:postgres    # stop PostgreSQL
pnpm db:dump:local    # dump local DB
pnpm db:restore       # restore DB from backup
pnpm generate:types   # regenerate Payload types
pnpm generate:importmap # regenerate Payload importmap
pnpm dev:seed         # dev with DB drop + seed
pnpm deploy:release   # deploy release script
```

No test framework is currently configured.

## Architecture

**Stack**: Next.js 15.5 (App Router) + PayloadCMS 3.67 + React 19 + TypeScript 5 + Tailwind CSS v4 + PostgreSQL + AWS S3 + Resend email

### Route Groups (`src/app/`)

- `(app)/(app)/` — authenticated routes: dashboard, account-settings, exercise, workout
- `(app)/(auth)/` — public auth: login, register, reset-password, verify-email, change-password
- `(app)/(marketing)/` — public pages: home, blog, `[slug]` dynamic pages
- `(app)/(docs)/` — documentation pages
- `(payload)/` — PayloadCMS admin UI + API (auto-generated)
- `api/` — custom API routes (preview system)

### PayloadCMS (`src/payload/`)

- **Content models** in `content-model/`: Posts, Pages, Docs, Categories, Newsletter, Users, Media, Menus, AppSettings
- **Blocks** in `blocks/`: CopyBlock, ImageTextBlock, StageBlock, QuoteBlock, BlogTeaserBlock, DocsTeaserBlock, VideoBlock, CodeBlock
- **Config** in `payload.config.ts`: lexicalEditor, postgresAdapter (pool max:20), resendAdapter, SEO plugin, folders plugin, localization, live preview
- **Access control** in `access/`: admin, adminAndEditor, anyone functions
- **Hooks** in `content-model/shared/hooks/`: revalidate-cache, check-role, protect-roles
- **Email templates** in `email-templates/`: React Email components rendered via Resend
- **Globals**: AppSettings, EmailTemplates
- Generated types output to `src/payload/payload-types.ts`

### Components (`src/components/`)

- `ui/` — Shadcn/ui components (configured via `components.json`, RSC-enabled, stone base color)
- `ui/custom/` — custom extensions: Container, Typography, Icons, Logo, ThemeToggle
- `layout/` — content block renderers (stage, copy-block, image-text, quote-block, blog-teaser)
- `auth/` — auth form components
- `utils/` — render-blocks.tsx (maps Payload blockType → React component), richtext.tsx, theme-provider

### Key Patterns

**Server Actions** (`src/lib/actions/`): Use `'use server'`, call `getPayload({ config })`, validate with Zod `.safeParse()`, return `{ success, error, errors }` objects. Handle cookies via `await cookies()`.

**Forms**: React Hook Form + zodResolver + Zod schemas (`src/lib/schema/`). Submit to server actions. Field-level + root-level error setting.

**State**: Zustand stores (`src/lib/store/`) with persist middleware — user-store, theme-store, nav-store.

**Block rendering**: `src/components/utils/render-blocks.tsx` maps `blockType` string to component via `blockComponents` object.

**Theme system**: CSS variables via `data-mode` attribute, Zustand store with localStorage persistence, Tailwind `@custom-variant dark (&:is(.dark *))`. Theme CSS files in `src/lib/styles/`.

**Middleware** (`src/middleware.ts`): Handles preview mode — rewrites preview URLs, manages preview cookies (`__next_preview_data`, `__prerender_bypass`).

### Path Aliases (tsconfig)

```text
@/*          → src/*
@/app/*      → src/app/(app)/*
@/components/* → src/components/*
@/lib/*      → src/lib/*
@/payload/*  → src/payload/*
@payload-config → src/payload/payload.config.ts
@payload-types  → src/payload/payload-types.ts
```

## Conventions

- **Type naming**: `T{DescriptiveName}` (e.g., `TUserProps`, `TApiResponse`) — interfaces over types for object shapes
- **File/dir naming**: `kebab-case` everywhere
- **No enums** — use literal types
- **No inline styles** — Tailwind only, use `cn()` from `@/lib/utils/cn` (clsx + twMerge)
- **Server components first** — `'use client'` only when needed
- **Early returns & guard clauses** for error handling
- **Mobile-first** responsive: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- **Named exports** for components, function keyword for pure functions
- **CVA** (class-variance-authority) for component variants
- **Variables**: auxiliary verbs (`isLoading`, `hasError`)
- **Imports**: `@/` aliases, ordered: external → internal → relative
- **Accessibility**: WCAG 2.1 AA, semantic HTML, aria attributes

## Formatting

- Tabs, single quotes, no semicolons, trailing commas, 100 char print width
- Prettier with `prettier-plugin-tailwindcss`

## Git

- Conventional Commits: `<type>(<scope>)!: <subject>` — max 72 chars, imperative, no period
- Types: feat|fix|chore|docs|refactor|perf|test|ci|build|style|revert
