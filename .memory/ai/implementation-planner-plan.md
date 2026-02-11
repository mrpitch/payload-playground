# Implementation Plan: ESLint & Prettier Enhancement

## Current State Analysis

✅ **Already Configured:**
- ESLint 9.39.1 with flat config (`eslint.config.mjs`)
- Next.js ESLint extends: `next/core-web-vitals`, `next/typescript`
- Prettier 3.5.3 with Tailwind plugin 0.6
- TypeScript strict mode enabled
- Custom rules for `@typescript-eslint` (ban-ts-comment, no-empty-object-type, no-explicit-any, no-unused-vars)
- Scripts: `pnpm lint`, `pnpm check-types`

⚠️ **Gaps Identified (from eslint-prettier-plan.md):**
1. No `eslint-config-prettier` — potential rule conflicts between ESLint & Prettier
2. No `eslint-plugin-prettier` — no integration (acceptable per modern best practices)
3. No `.prettierignore` — uncontrolled format scope
4. No `pnpm format` script — manual formatting awkward
5. No pre-commit hooks (husky/lint-staged) — no automated quality gate
6. Tailwind plugin config incomplete — missing custom attributes/functions

## MVP Implementation (Phase 1)

### 1. Install Missing Dependencies

```bash
pnpm add -D eslint-config-prettier@^10.1.0
```

**Why:** Disables ESLint formatting rules that conflict with Prettier. Critical to prevent rule conflicts.

### 2. Update `eslint.config.mjs`

Add `eslint-config-prettier` to disable conflicting rules:

```js
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),  // ADD 'prettier'
  {
    ignores: ['.next/**', 'out/**', 'build/**', 'cdk/**'],  // ADD explicit ignores
    rules: {
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
        },
      ],
    },
  },
]

export default eslintConfig
```

**Changes:**
- Add `'prettier'` to extends array (disables conflicting rules)
- Add explicit `ignores` for build artifacts

### 3. Update `.prettierrc.json`

Enhance Tailwind plugin configuration with custom attributes:

```json
{
  "singleQuote": true,
  "useTabs": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 100,
  "semi": false,
  "plugins": ["prettier-plugin-tailwindcss"],
  "tailwindConfig": "./tailwind.config.ts",
  "tailwindAttributes": ["className", "class"],
  "tailwindFunctions": ["cn", "clsx", "twMerge"],
  "tailwindPreserveWhitespace": false
}
```

**Why:** Ensures Tailwind class sorting works with `cn()` utility and custom attributes.

### 4. Create `.prettierignore`

```
# Build artifacts
.next
out
build
dist

# Dependencies
node_modules
pnpm-lock.yaml

# Generated files
.memory/ai/
src/payload/payload-types.ts
src/payload/importmap.js

# Configs
.env*
.git

# Documentation (if preserving specific formatting)
CHANGELOG.md

# Public assets (minified/vendor)
public/vendor
```

**Why:** Prevents Prettier from processing generated/minified files, improving performance and preventing unwanted changes.

### 5. Add Format Script to `package.json`

```json
{
  "scripts": {
    "format": "prettier --write \"**/*.{js,jsx,ts,tsx,json,css,md}\"",
    "format:check": "prettier --check \"**/*.{js,jsx,ts,tsx,json,css,md}\""
  }
}
```

**Why:** Easy formatting commands. `format:check` useful for CI/CD.

### 6. Verification Steps

After implementation:

```bash
# 1. Install dependencies
pnpm install

# 2. Run linter (should pass with no Prettier conflicts)
pnpm lint

# 3. Check types
pnpm check-types

# 4. Format all files
pnpm format

# 5. Verify no changes needed
pnpm format:check

# 6. Run lint again (should still pass)
pnpm lint
```

## Phase 2 (Optional Enhancements)

### Pre-commit Hooks with Husky & lint-staged

**Install:**
```bash
pnpm add -D husky lint-staged
```

**Setup:**
```bash
pnpm exec husky init
```

**Configure `.husky/pre-commit`:**
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm lint-staged
```

**Add to `package.json`:**
```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,css,md}": [
      "prettier --write"
    ]
  }
}
```

**Why:** Automatically formats & lints staged files before commit. Prevents bad code from entering repo.

### Additional ESLint Rules (Security & Code Quality)

Consider adding if needed:
- `eslint-plugin-security` — detect security vulnerabilities
- `eslint-plugin-import` — enforce import ordering
- `eslint-plugin-jsx-a11y` — accessibility checks (may already be in next/core-web-vitals)

## Implementation Order

1. ✅ Install `eslint-config-prettier`
2. ✅ Update `eslint.config.mjs` (add 'prettier' extend + ignores)
3. ✅ Update `.prettierrc.json` (Tailwind config)
4. ✅ Create `.prettierignore`
5. ✅ Add format scripts to `package.json`
6. ✅ Run verification steps
7. ⏭️ (Optional) Phase 2: Pre-commit hooks

## Dependencies to Install

```json
{
  "devDependencies": {
    "eslint-config-prettier": "^10.1.0"
  }
}
```

## Files to Modify

1. `package.json` — add `format` & `format:check` scripts, install `eslint-config-prettier`
2. `eslint.config.mjs` — add `'prettier'` to extends, add `ignores` field
3. `.prettierrc.json` — add Tailwind config options
4. `.prettierignore` — create new file

## Files to Create

1. `.prettierignore` — ignore patterns for Prettier

## Unresolved Questions

1. Pre-commit hooks? Add husky/lint-staged now or later?
2. Format existing codebase immediately or gradually?
3. Add `format:check` to CI/CD pipeline?
4. Need additional ESLint plugins (security, import ordering)?
