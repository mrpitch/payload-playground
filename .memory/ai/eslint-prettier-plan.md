# Plan: ESLint & Prettier Setup

## Overview

Change project config to use ESLint 9 (flat config) and Prettier 3 with integrated Tailwind CSS plugin support. The setup is modern, well-configured, and follows Next.js 16 best practices.

---

## Code Map

### Config Files

- **`eslint.config.mjs`** - ESLint flat config (ESLint 9)
- **`.prettierrc.json`** - Prettier formatting rules
- **`tsconfig.json`** - TypeScript compiler config
- **`package.json`** - Dependencies & scripts

### Key Dependencies (from package.json)

**Linting:**

- `eslint@^9` - ESLint with flat config support
- `eslint-config-next@16.1.6` - Next.js ESLint config (core-web-vitals + typescript)
- `eslint-config-prettier@^10.1.8` - Disables ESLint rules conflicting with Prettier
- `eslint-plugin-prettier@^5.5.5` - Runs Prettier as ESLint rule (not recommended by Prettier team, but present)

**Formatting:**

- `prettier@^3.8.1` - Code formatter
- `prettier-plugin-tailwindcss@^0.7.2` - Sorts Tailwind CSS classes

## Goal

**Strengths:**

1. **Modern ESLint 9 flat config** - `eslint.config.mjs` uses FlatConfig API (not legacy .eslintrc)
2. **Next.js integrated** - Includes `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
3. **Tailwind CSS formatting** - `prettier-plugin-tailwindcss` configured with custom attributes/functions (`className`, `clsx`, `cn`, `twMerge`)
4. **TypeScript strict mode** - tsconfig.json uses strict: true
5. **Smart ignores** - Explicitly ignores `.next/`, `out/`, `build/`, `cdk/` directories
6. **Zero conflicts** - `eslint-config-prettier` integrated correctly

**Prettier Configuration Details:**

- Single quotes, tabs (width 2), trailing commas, print width 100, no semicolons
- Tailwind class sorting enabled with custom stylesheet reference
- `tailwindPreserveWhitespace: false` prevents extra spacing in Tailwind classes

**Linting & Formatting Scripts:**

- `pnpm lint` → runs eslint
- `pnpm format` → runs prettier --write (formats all files)
- `pnpm check` → runs lint + typecheck sequentially

### Gaps & Observations

1. **`eslint-plugin-prettier` presence** - Technically included (v5.5.5) but not required by modern Prettier setup. Newer best practice is to run Prettier separately from ESLint (separate CI steps).
   - Current: ESLint runs Prettier rules as linting rules
   - Recommendation: Consider removing and relying on `prettier.format` in editor + `pnpm format` pre-commit

2. **No .prettierignore file** - Prettier format command will process all files. May want to exclude:
   - `.next/`, `out/`, `cdk/`, `.git/`, `node_modules/` (auto-excluded by Prettier)
   - `CHANGELOG.md`, `public/` (if minified/vendor assets present)

3. **No .eslintignore file** - Relies on global ignores in eslint.config.mjs, which is cleaner but less discoverable

4. **Pre-commit hooks absent** - No husky/lint-staged setup detected in package.json. Consider adding to catch issues before commit.

5. **No explicit lint rules for MDX** - Content files in `/content/` are not being linted (likely intentional for content-only files)
