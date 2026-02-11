# ESLint & Prettier Enhancement Plan

## Current State Analysis

### ✅ What's Working
- **ESLint 9.39.2** with flat config (eslint.config.mjs)
- **Prettier 3.7.4** properly configured
- **eslint-config-prettier v10.1.8** installed (prevents ESLint↔Prettier conflicts)
- **.prettierrc.json** with correct settings (tabs, single quotes, 100 print width, Tailwind plugin)
- **.prettierignore** covering build artifacts, deps, generated files
- **Format scripts** in package.json ("format" & "format:check")
- **ESLint rules** configured with sensible TypeScript overrides

### ❌ Gaps & Improvements Needed
1. **No .eslintignore file** — ESLint ignores are only in flat config (less discoverable)
2. **No pre-commit hooks** — husky/lint-staged missing, no enforcement before commits
3. **Limited format scope** — Only covers js|jsx|ts|tsx|json|css|md; missing yml|yaml|graphql
4. **Missing lint:check script** — No way to run linting in check-only mode (CI/CD friendly)
5. **No additional ESLint plugins** — Could add import sorting, accessibility checks
6. **Tailwind config incomplete** — `.prettierrc.json` hardcodes stylesheet path

---

## Implementation Plan

### Phase 1: Core Essentials (5 min)
1. **Create .eslintignore** → Mirror eslint.config.mjs ignores for clarity
2. **Add lint:check script** → `eslint . --max-warnings 0`
3. **Expand format script** → Add yml|yaml|graphql support

### Phase 2: Pre-commit Automation (10 min, optional)
1. Install: `pnpm add -D husky lint-staged`
2. Init husky: `pnpm husky install`
3. Create .husky/pre-commit hook → Run lint-staged
4. Create lint-staged config (.lintstagedrc.json)

### Phase 3: Enhanced Rules (optional)
1. Add eslint-plugin-import → Sort imports
2. Add eslint-plugin-jsx-a11y → Accessibility rules
3. Configure import sort order

---

## Risk: Low
All changes additive/CLI-only, no breaking changes.

## Unresolved Questions
None — confirm Phase 2 (pre-commit hooks) priority.
