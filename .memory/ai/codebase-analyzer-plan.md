# Codebase Analysis & Implementation Plan
**Scan Date**: 2026-02-11
**Scope**: PayloadCMS Playground (Next.js 15 + React 19 + PayloadCMS 3.67)

---

## Executive Summary

**Status**: Production-ready with linting/formatting baseline in place (ESLint 9 flat config, Prettier 3.7, simple-import-sort, pre-commit hooks via husky/lint-staged). Major security vulnerabilities identified requiring immediate remediation. No test framework. Architecture sound with clear separation of concerns.

**Immediate Action Required**: 15 security issues (1 critical, 7 high-severity) blocking production readiness.

**Next Priorities**: (1) Fix critical/high vulnerabilities, (2) Add rate limiting & security headers, (3) Establish test framework, (4) Finalize TypeScript strict mode.

---

## Current State Analysis

### ✅ Strengths
- **Tooling baseline**: ESLint 9.39.2 (flat config), Prettier 3.7.4, simple-import-sort 12.1.1, husky 9.1.7, lint-staged 16.2.7
- **Format/lint automation**: lint, lint:check, format, format:check scripts working; pre-commit hooks via lint-staged active
- **Architecture**: Modular (PayloadCMS collections, content blocks, auth roles, Zustand stores, React Hook Form + Zod)
- **TypeScript**: Throughout codebase with path aliases configured
- **Server Components**: Modern Next.js patterns (Server Actions, middleware, route handlers)
- **Code quality**: Consistent naming conventions, early returns, guard clauses, semantic HTML

### 🔴 Critical Issues (Blocks Production)
1. **Weak Password Policy** — 4-char minimum (line: src/lib/schema/register.schema.ts:10, change-password.schema.ts:11)
   - **Risk**: Trivial password cracking (128 combinations for 4-char lowercase)
   - **Fix**: Increase to 12+ chars minimum, add complexity requirements

2. **TypeScript Build Errors Ignored** — `ignoreBuildErrors: true` in next.config.mjs:8
   - **Risk**: Hidden compilation errors, undefined behavior in production
   - **Fix**: Remove flag, fix underlying TypeScript errors, enable `strict: true` (already enabled in tsconfig)

3. **SVG XSS Risk** — `dangerouslyAllowSVG: true` in next.config.mjs:16 without sanitization
   - **Risk**: Malicious SVG uploads lead to arbitrary JS execution
   - **Fix**: Use SVG sanitizer (e.g., DOMPurify) or disable SVG uploads; validate uploaded files

4. **Missing Security Headers** — No `headers()` in next.config.mjs
   - **Risk**: Open to XSS, clickjacking, MIME-sniffing attacks
   - **Required**: CSP, X-Frame-Options, X-Content-Type-Options, Strict-Transport-Security, etc.

5. **Open Redirect Vulnerability** — src/app/api/preview/route.ts:34 uses user input in redirect without validation
   ```typescript
   NextResponse.redirect(new URL(`${baseUrl}/${path}/${slug}`, nextUrl))  // path/slug not validated
   ```
   - **Risk**: Attacker redirects users to malicious sites
   - **Fix**: Whitelist allowed paths or validate against deployed routes

6. **Preview Secret Exposure** — src/middleware.ts:21 passes previewSecret in URL query params
   - **Risk**: Secret logged in server logs, referer headers, browser history
   - **Fix**: Use secure cookies or POST with body; remove from query params

7. **Hardcoded Access Control Bypass** — Need to verify there's no hardcoded admin account
   - **Fix**: Audit payload.config.ts for default/seed credentials

### 🟡 High-Severity Issues
8. **Access Control Gaps** — src/app/api/preview/route.ts checks roles but doesn't validate path ownership
   - **Risk**: Editor can preview content outside their permission scope
   - **Fix**: Validate user can access requested content before enabling draft mode

9. **Unauthenticated API Routes** — src/app/api/my-route/route.ts (need to verify all routes have auth checks)
   - **Risk**: Unprotected endpoints expose sensitive data
   - **Fix**: Add middleware auth check or action-level validation to all API routes

10. **Console Logging Secrets** — 20 files with console.log (middleware.ts, email-preview.tsx, etc.)
    - **Risk**: Secrets in logs (tokens, user data, internal paths)
    - **Fix**: Remove all console logs, replace with structured logging only for errors

11. **Dependency Vulnerabilities** — pnpm-lock.yaml contains deprecated packages (esbuild-kit, node-domexception)
    - **Risk**: Known CVEs in transitive dependencies
    - **Fix**: Update transitive deps; audit with `pnpm audit`

12. **No Rate Limiting** — No rate limiting on auth/API routes
    - **Risk**: Brute force attacks on login, password reset, email verification
    - **Fix**: Add `next-rate-limit` or similar to server actions

13. **Cookie Security Config** — Need to verify Secure + SameSite flags set
    - **Risk**: Cookie theft via MITM, CSRF attacks
    - **Fix**: Ensure all cookies set with `httpOnly: true, secure: true, sameSite: 'lax'`

14. **Information Disclosure** — Error pages might expose stack traces in production
    - **Risk**: Attackers learn internal structure
    - **Fix**: Catch errors in route handlers, return generic 500 page in production

### 🟢 Medium/Low Issues
15. **CORS Not Configured** — Need to verify GraphQL endpoint has proper CORS
    - **Risk**: Unintended cross-origin access
    - **Fix**: Add CORS headers to src/app/(payload)/api/graphql/route.ts

16. **No Test Framework** — No Jest/Vitest configured
    - **Priority**: Medium (after security fixes)
    - **Recommendation**: Add Vitest + @testing-library/react

---

## Implementation Roadmap

### Phase 1: Critical Security Fixes (URGENT)
**Est. effort**: 3-4 hours
**Blocker for production**

1. **Fix password policy** (5 min)
   - src/lib/schema/register.schema.ts: min(12), add regex for complexity
   - src/lib/schema/change-password.schema.ts: same
   - Update validation message in constants.ts

2. **Enable TypeScript strict mode** (30 min)
   - Remove `ignoreBuildErrors: true` from next.config.mjs:8
   - Run `pnpm check-types` and fix errors
   - (May require: type annotations, null checks, error handling updates)

3. **Mitigate SVG XSS risk** (20 min)
   - Install DOMPurify or use `sanitize-html`
   - Update image-converter.tsx to sanitize SVG content
   - OR disable `dangerouslyAllowSVG` and validate file uploads in payload.config.ts

4. **Add security headers** (15 min)
   - Add `headers()` export to next.config.mjs
   - Set: CSP, X-Frame-Options: DENY, X-Content-Type-Options: nosniff, HSTS, Referrer-Policy

5. **Fix open redirect** (10 min)
   - src/app/api/preview/route.ts: validate `path` against allowed routes
   - OR use whitelist of valid preview paths

6. **Secure preview secret** (15 min)
   - Remove secret from query params in middleware.ts:21
   - Use signed cookie or POST request with secure token exchange

7. **Remove console logs** (20 min)
   - Identify all console.log statements (found in 20 files)
   - Replace with structured logging (winston, pino) for errors only
   - OR use `debug` module scoped to NODE_ENV=development

8. **Verify API route auth** (15 min)
   - Audit all src/app/api/* routes for getSession() + role checks
   - Add middleware to enforce auth on protected routes

### Phase 2: Medium-Priority Security (Following Week)
**Est. effort**: 4-5 hours

1. **Add rate limiting** (30 min)
   - Install `Ratelimit` from `@vercel/ratelimit` or use native middleware
   - Apply to: POST /api/preview, login action, password-reset action
   - Config: 5 attempts/5 min for login, 3/day for password reset

2. **Verify cookie security** (10 min)
   - Audit src/lib/actions/login.ts (line 49) for `secure: true, sameSite: 'lax'`
   - Check all other cookieStore.set() calls

3. **Dependency security audit** (20 min)
   - Run `pnpm audit --prod`
   - Update transitive deps (esbuild-kit, node-domexception)
   - Pin versions in pnpm overrides

4. **Add access control validation** (30 min)
   - src/app/api/preview/route.ts: verify user owns/can access content being previewed
   - Payload hooks: ensure role checks for collection-level operations

5. **Configure CORS for GraphQL** (10 min)
   - src/app/(payload)/api/graphql/route.ts: add Origin header validation

6. **Implement error boundaries** (30 min)
   - Review src/app/(app)/error.tsx and src/app/error.tsx
   - Ensure production mode returns generic error page, dev mode shows stack

### Phase 3: Quality & Testing (Month 2)
**Est. effort**: 2 weeks

1. **Establish test framework** (3 hours)
   - Install Vitest + @testing-library/react
   - Configure in vitest.config.ts
   - Add sample tests for auth actions

2. **Add snapshot tests** (2 hours)
   - Key components: auth forms, block renderers, navigation

3. **E2E tests** (Playwright, optional)
   - Auth flow (register, login, email verify, password reset)
   - Preview mode workflow

---

## Risk Assessment

| Issue | Severity | CVSS | Likelihood | Impact | Mitigation Timeline |
|-------|----------|------|-----------|--------|-------------------|
| Weak password policy | Critical | 7.5 | High | Account takeover | Immediate |
| TypeScript errors ignored | Critical | 7.0 | High | Runtime errors | Immediate |
| SVG XSS | High | 7.0 | Medium | RCE via upload | 1 day |
| Missing security headers | High | 6.1 | Medium | XSS, clickjacking | 1 day |
| Open redirect | High | 6.8 | Medium | Phishing redirect | 1 day |
| Preview secret in URL | High | 5.3 | Medium | Secret disclosure | 1 day |
| No rate limiting | High | 6.0 | High | Brute force | 2 days |
| Console logging | Medium | 4.3 | High | Info disclosure | 1 day |
| Unauth API routes | Medium | 5.0 | Medium | Data exposure | 1 day |
| Cookie config | Medium | 4.0 | Medium | CSRF/session theft | 1 day |
| Dependency vulns | Medium | 5.0 | Low | Transitive exploits | 2 days |

**Timeline to Production-Ready**: 1 week (Phase 1 + Phase 2 core items)

---

## Key Files to Modify

**Phase 1:**
- src/lib/schema/{register,change-password}.schema.ts — password policy
- next.config.mjs — ignoreBuildErrors, dangerouslyAllowSVG, security headers
- src/app/api/preview/route.ts — validation, auth, secure token
- src/middleware.ts — remove secret from query params
- src/payload/payload.config.ts — verify no hardcoded credentials
- src/components/utils/richtext/image-converter.tsx — SVG sanitization
- All console.log files — structured logging

**Phase 2:**
- src/lib/actions/{login,register,reset-password}.ts — add rate limiting
- src/app/(payload)/api/graphql/route.ts — CORS headers
- tsconfig.json — stricter compiler options (already mostly set)

**Phase 3:**
- vitest.config.ts (create)
- src/**/*.test.{ts,tsx} (create)

---

## Architecture Notes

**Strengths:**
- Clear separation: routes (app/), actions (lib/actions/), UI (components/)
- Payload modular (collections, blocks, hooks)
- Type-safe: TypeScript throughout, Zod schemas
- State: Zustand with persist (theme, user, nav)

**Areas for Enhancement:**
- Error handling: Use try-catch + error boundaries, not silent failures
- Logging: Implement structured logging (pino/winston) scoped by level
- Testing: No test runner configured; recommend Vitest
- Monitoring: No error tracking (Sentry/Honeybadger); optional for MVP

---

## Unresolved Questions

1. **Hardcoded admin account?** — Need to audit payload.config.ts seed data for default credentials
2. **Which API routes are public?** — Verify all /api/* routes have appropriate auth checks
3. **SVG upload restrictions?** — Are SVG uploads restricted by file type or full content validation?
4. **Monitoring needed?** — Should error tracking (Sentry) be added pre-launch?
5. **Email rate limiting?** — Password reset email has no per-user rate limit?

---

## Next Steps (For User)

1. Review this plan for approval
2. Run Phase 1 security fixes (1 week)
3. Run Phase 2 enhancements (1 week)
4. Add tests + monitoring (Week 3-4)
5. Deploy to staging, run security scan, deploy to production
