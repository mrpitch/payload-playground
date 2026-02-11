# Implementation Plan: Security Vulnerability Remediation
**Created**: 2026-02-11
**Source**: context.md + codebase-analyzer-plan.md
**Goal**: Fix 15 security vulnerabilities → production-ready

---

## MVP: Phase 1 — Critical/High (Week 1)

**Success**: All critical/high CVEs mitigated, TS builds clean, security headers active

### 1.1 Password Policy (5 min)
**Files**: `src/lib/schema/register.schema.ts:10`, `src/lib/schema/change-password.schema.ts:11`
- Change `.min(4)` → `.min(12)`
- Add complexity regex: uppercase + lowercase + digit
- Update validation messages
- **Commit**: `fix(auth): enforce 12-char min password with complexity`

### 1.2 TypeScript Strict Build (30 min)
**Files**: `next.config.mjs:8`, various TS files
- Remove `ignoreBuildErrors: true`
- Run `pnpm check-types` → fix all errors
- Verify: `pnpm build` succeeds
- **Commit**: `fix(ts): remove ignoreBuildErrors, resolve type errors`
- **Note**: Do this early — may surface issues affecting other steps

### 1.3 SVG XSS Mitigation (20 min)
**Files**: `next.config.mjs:16`, `src/components/utils/richtext/image-converter.tsx`
- Option A: Install `dompurify` + sanitize SVG before render
- Option B: Remove `dangerouslyAllowSVG: true` + validate uploads in Media collection
- Test: SVG with `<script>` tag → stripped/rejected
- **Commit**: `fix(xss): sanitize SVG uploads`

### 1.4 Security Headers (15 min)
**Files**: `next.config.mjs`
- Add `headers()` async export: CSP, X-Frame-Options DENY, X-Content-Type-Options nosniff, HSTS, Referrer-Policy
- CSP needs tuning for PayloadCMS admin (`unsafe-inline`, `unsafe-eval` likely needed)
- Verify: `curl -I http://localhost:3000`
- **Commit**: `feat(security): add CSP, X-Frame-Options, HSTS headers`

### 1.5 Open Redirect Fix (10 min)
**Files**: `src/app/api/preview/route.ts:34`
- Whitelist allowed paths: `['posts', 'pages', 'docs']`
- Reject unrecognized `path` param with 400
- Test: `?path=evil.com` → rejected
- **Commit**: `fix(preview): validate redirect path against whitelist`

### 1.6 Preview Secret Security (15 min)
**Files**: `src/middleware.ts:21`, `src/app/api/preview/route.ts`
- Remove `previewSecret` from query params
- Use httpOnly secure cookie instead
- Update preview link generation
- **Commit**: `fix(preview): move secret from URL to secure cookie`

### 1.7 Remove Console Logs (20 min)
**Files**: ~20 files with `console.log`
- Remove all `console.log` from src/
- Keep `console.error` for genuine exceptions only
- OR wrap in `process.env.NODE_ENV === 'development'` guard
- **Commit**: `fix(logging): remove console.log from production code`

### 1.8 API Route Auth Audit (15 min)
**Files**: `src/app/api/**/route.ts`
- List all API routes
- Verify each has session check OR is intentionally public
- Add auth where missing
- **Commit**: `fix(auth): add session validation to unprotected API routes`

---

## Phase 2 — Medium Priority (Week 2)

### 2.1 Rate Limiting (30 min)
- Install `@upstash/ratelimit` or similar
- Apply to: login (5/5min), password reset (3/day), preview (10/min)
- Return 429 on exceeded
- **Commit**: `feat(security): add rate limiting to auth endpoints`

### 2.2 Cookie Security (10 min)
- Audit all `cookieStore.set()` calls
- Enforce `httpOnly: true, secure: true, sameSite: 'lax'`
- **Commit**: `fix(cookies): enforce secure cookie flags`

### 2.3 Dependency Audit (20 min)
- `pnpm audit --prod` → fix critical/high
- Update deprecated transitive deps
- **Commit**: `chore(deps): fix audit vulnerabilities`

### 2.4 Access Control Validation (30 min)
- Preview: verify user can access content before enabling draft
- Payload hooks: collection-level role checks
- **Commit**: `fix(access): validate content ownership in preview`

### 2.5 CORS for GraphQL (10 min)
- Add Origin validation to `src/app/(payload)/api/graphql/route.ts`
- **Commit**: `feat(cors): restrict GraphQL endpoint origins`

### 2.6 Error Boundaries (30 min)
- Verify prod error pages hide stack traces
- Generic 500 page in production
- **Commit**: `fix(errors): hide stack traces in production`

---

## Phase 3 — Testing (Month 2)

### 3.1 Vitest Setup (3h)
- Install vitest + @testing-library/react + jsdom
- Configure with path aliases
- Add `pnpm test` script

### 3.2 Unit Tests (2h)
- Auth actions, Zod schemas, auth form components

### 3.3 E2E (Optional)
- Playwright: register → verify → login → preview

---

## Execution Order & Dependencies

```
1.1 Password ──┐
1.2 TS Strict ──┤ (do 1.2 first — may surface issues)
1.3 SVG XSS  ──┤
1.4 Headers  ──┼──→ Phase 1 Complete ──→ Phase 2 ──→ Phase 3
1.5 Redirect ──┤
1.6 Preview  ──┤
1.7 Logs     ──┤
1.8 API Auth ──┘
```

**Critical path**: 1.2 first (TS strict may break build). Rest of Phase 1 parallelizable. Phase 2 after Phase 1. Phase 3 independent.

---

## Unresolved Questions

1. Hardcoded admin creds in seed data? → audit payload.config.ts
2. Which API routes intentionally public? → need inventory
3. SVG: sanitize or block entirely? → user decision
4. Add Sentry/error monitoring pre-launch?
5. Rate limiter backend: Upstash Redis vs in-memory vs Vercel KV?
