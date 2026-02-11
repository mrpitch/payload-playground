# Security Audit Report - PayloadCMS Playground

**Project**: PayloadCMS Playground - Full-stack Next.js 15 + PayloadCMS 3.67
**Auditor**: Security Auditor Agent
**Date**: 2026-02-11
**OWASP Top 10 Compliance Review**

---

## Executive Summary

This security audit identified **12 security vulnerabilities** across multiple OWASP Top 10 categories. The findings range from **Critical** to **Low** severity. Key areas of concern include:

- Weak password policy (Critical)
- Missing security headers (High)
- Hardcoded secrets exposure risk (High)
- Excessive access control bypasses (High)
- TypeScript build errors ignored in production (High)
- Known vulnerabilities in dependencies (Medium)
- Information disclosure through console logging (Medium)

---

## Detailed Findings

### CRITICAL VULNERABILITIES

#### 1. Weak Password Policy - Minimum Length Too Short

**Location**: `/Users/magnus/Dev/payload-playground/src/lib/schema/register.schema.ts:10-12`
**Location**: `/Users/magnus/Dev/payload-playground/src/lib/schema/change-password.schema.ts:11-13`
**OWASP Category**: A07:2021 - Identification and Authentication Failures

**Description**:
Password validation requires only 4 characters minimum, which is dangerously weak and violates modern security standards (NIST recommends minimum 8 characters, industry best practice is 12+).

```typescript
// register.schema.ts
password: z.string().min(4, {
  message: formMessages.validation.passwordLength,
}),

// change-password.schema.ts
password: z.string().min(4, {
  message: passwordLength,
}),
```

**Impact**:
- Enables brute-force attacks
- Allows dictionary attacks
- Violates compliance requirements (PCI-DSS, HIPAA, etc.)
- Users can create trivially weak passwords like "1234"

**Recommended Remediation**:

```typescript
// Update both files
password: z.string()
  .min(12, { message: 'Password must be at least 12 characters' })
  .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
  .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
  .regex(/[0-9]/, { message: 'Password must contain at least one number' })
  .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character' }),
```

Also update `/Users/magnus/Dev/payload-playground/src/lib/utils/constants.ts:36` message accordingly.

---

#### 2. No Password Validation on Login

**Location**: `/Users/magnus/Dev/payload-playground/src/lib/schema/login.schema.ts:7`
**OWASP Category**: A07:2021 - Identification and Authentication Failures

**Description**:
Login schema validates email but performs zero validation on password field (not even checking if empty).

```typescript
password: z.string(),
```

**Impact**:
- Allows empty password submissions
- No client-side validation feedback
- Potential for enumeration attacks

**Recommended Remediation**:

```typescript
password: z.string().min(1, { message: 'Password is required' }),
```

---

### HIGH VULNERABILITIES

#### 3. Missing Security Headers (CSP, HSTS, X-Frame-Options, etc.)

**Location**: `/Users/magnus/Dev/payload-playground/next.config.mjs`
**OWASP Category**: A05:2021 - Security Misconfiguration

**Description**:
Next.js config has NO security headers configured. Missing critical headers:
- Content-Security-Policy (XSS protection)
- Strict-Transport-Security (HTTPS enforcement)
- X-Frame-Options (clickjacking protection)
- X-Content-Type-Options (MIME sniffing protection)
- Referrer-Policy
- Permissions-Policy

**Impact**:
- Vulnerable to XSS attacks
- Vulnerable to clickjacking
- No HTTPS enforcement
- MIME sniffing vulnerabilities

**Recommended Remediation**:

Add to `next.config.mjs`:

```javascript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://assets.mrpitch.rocks;"
          }
        ],
      },
    ]
  },
  // ... rest of config
}
```

Note: CSP should be tuned to your specific needs. The above is a starting point.

---

#### 4. TypeScript Build Errors Ignored in Production

**Location**: `/Users/magnus/Dev/payload-playground/next.config.mjs:6-9`
**OWASP Category**: A05:2021 - Security Misconfiguration

**Description**:
Production builds ignore TypeScript errors, potentially shipping code with type-safety violations.

```javascript
typescript: {
  // TEMP: allow build to pass while seed scripts are being fixed
  ignoreBuildErrors: true,
},
```

**Impact**:
- Type-safety bypass allows runtime errors
- Potential security bugs from type mismatches
- Undefined behavior in production

**Recommended Remediation**:

1. Fix all TypeScript errors
2. Remove `ignoreBuildErrors: true`
3. Add CI/CD pipeline check:

```json
// package.json
"scripts": {
  "ci:type-check": "tsc --noEmit",
  "ci:build": "pnpm check-types && pnpm build"
}
```

---

#### 5. SVG Upload Without Sanitization

**Location**: `/Users/magnus/Dev/payload-playground/next.config.mjs:16`
**OWASP Category**: A03:2021 - Injection / A01:2021 - Broken Access Control

**Description**:
SVG files allowed without sanitization. SVGs can contain malicious JavaScript (XSS).

```javascript
dangerouslyAllowSVG: true,
```

**Impact**:
- Stored XSS via malicious SVG upload
- Session hijacking
- Cookie theft
- Phishing attacks

**Recommended Remediation**:

```javascript
// Option 1: Remove if not needed
dangerouslyAllowSVG: false,

// Option 2: If SVGs required, sanitize on upload
// In Media collection (src/payload/content-model/Media.ts), add beforeChange hook:
import DOMPurify from 'isomorphic-dompurify'

hooks: {
  beforeChange: [
    async ({ data, req }) => {
      if (data.mimeType === 'image/svg+xml' && req.file) {
        const svgContent = req.file.data.toString()
        const cleanSVG = DOMPurify.sanitize(svgContent, {
          USE_PROFILES: { svg: true, svgFilters: true }
        })
        req.file.data = Buffer.from(cleanSVG)
      }
      return data
    }
  ]
}
```

Install: `pnpm add isomorphic-dompurify`

---

#### 6. Excessive Use of overrideAccess (Access Control Bypass)

**Location**: Multiple files
- `/Users/magnus/Dev/payload-playground/src/lib/utils/getCollections.ts:71, 110, 147, 194, 231`
- `/Users/magnus/Dev/payload-playground/src/lib/actions/change-password.ts:30`

**OWASP Category**: A01:2021 - Broken Access Control

**Description**:
`overrideAccess: true` bypasses ALL PayloadCMS access control checks. Used excessively in utility functions that fetch content for public pages. While this may be intentional for public data, it's dangerous if misused.

```typescript
// getCollections.ts - 5 instances
overrideAccess: true,

// change-password.ts
await payload.resetPassword({
  collection: 'users',
  data: { password: password, token: token },
  overrideAccess: true, // BYPASSES ACCESS CONTROL
})
```

**Impact**:
- If `getCollectionBySlug()` is called with user-controlled collection/slug parameters, could expose admin-only content
- Password reset bypassing access control is acceptable ONLY because it validates the reset token first
- Future developers may copy this pattern unsafely

**Recommended Remediation**:

1. **Document why access is overridden** in each location with comments:

```typescript
// SECURITY: overrideAccess used here because this content is always public
// and we need to fetch it for SSR pages regardless of user session.
overrideAccess: true,
```

2. **For change-password.ts**, the usage is acceptable but add validation comment:

```typescript
// SECURITY: overrideAccess is safe here because payload.resetPassword()
// internally validates the token before allowing password change
overrideAccess: true,
```

3. **Ensure getCollectionBySlug parameters are never user-controlled** - add JSDoc warning:

```typescript
/**
 * @security WARNING - Uses overrideAccess to bypass access control.
 * Do NOT pass user-controlled input to collection/slug parameters.
 * Only use with hardcoded collection names and validated slugs.
 */
export const getCollectionBySlug = async <T extends TCollection>({ ... })
```

---

#### 7. Hardcoded Seed Admin Backdoor

**Location**: `/Users/magnus/Dev/payload-playground/src/payload/content-model/shared/hooks/protect-roles.ts:25`
**OWASP Category**: A07:2021 - Identification and Authentication Failures

**Description**:
Hardcoded email address `hurdi@gurdi.de` has permanent admin privileges, bypassing normal role protection.

```typescript
const isAdmin =
  (reqUser?.roles?.includes('admin') ?? false) || data?.email === 'hurdi@gurdi.de' // seed account
```

**Impact**:
- Anyone who creates/controls this email address gets admin access
- Backdoor persists even if removed from database
- Difficult to audit in production

**Recommended Remediation**:

Remove hardcoded backdoor and use environment variable for seed accounts:

```typescript
const SEED_ADMIN_EMAILS = process.env.SEED_ADMIN_EMAILS?.split(',') || []

const isAdmin =
  (reqUser?.roles?.includes('admin') ?? false) ||
  (process.env.NODE_ENV === 'development' && data?.email && SEED_ADMIN_EMAILS.includes(data.email))
```

Update `.env.example`:

```
# Development only - comma-separated admin emails for seeding
SEED_ADMIN_EMAILS=hurdi@gurdi.de
```

---

#### 8. Preview Secret Exposed in Client-Side Code

**Location**: `/Users/magnus/Dev/payload-playground/src/lib/utils/constants.ts:2`
**OWASP Category**: A02:2021 - Cryptographic Failures

**Description**:
Preview secret is imported and potentially exposed to client-side bundles.

```typescript
export const previewSecret = process.env.PREVIEW_SECRET
```

**Impact**:
- If bundled in client JavaScript, preview secret is publicly accessible
- Allows unauthorized preview mode access
- Enables content leak before publication

**Recommended Remediation**:

1. Move preview secret handling to server-only code
2. Add `.server.ts` suffix to files using secrets
3. Update `/Users/magnus/Dev/payload-playground/src/middleware.ts:16`:

```typescript
// In middleware.ts, fetch from process.env directly:
const secret = process.env.PREVIEW_SECRET || ''
```

4. Remove from `/Users/magnus/Dev/payload-playground/src/lib/utils/constants.ts` or mark server-only:

```typescript
// Create constants.server.ts
export const previewSecret = process.env.PREVIEW_SECRET

// In constants.ts (client-safe)
export const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL
// Remove previewSecret from here
```

---

### MEDIUM VULNERABILITIES

#### 9. Open Redirect Vulnerability in Preview Disable

**Location**: `/Users/magnus/Dev/payload-playground/src/app/api/preview/disable/route.ts:9-14`
**OWASP Category**: A01:2021 - Broken Access Control

**Description**:
Redirect URL from query parameter is not validated, allowing open redirect attacks.

```typescript
const redirectUrl = searchParams.get('redirect')
return NextResponse.redirect(new URL(redirectUrl || '/', nextUrl))
```

**Impact**:
- Phishing attacks via trusted domain redirect
- Example: `https://yoursite.com/api/preview/disable?redirect=https://evil.com`

**Recommended Remediation**:

```typescript
export async function GET(request: NextRequest) {
  const { nextUrl } = request
  const searchParams = nextUrl.searchParams
  const redirectParam = searchParams.get('redirect')

  const draft = await draftMode()
  draft.disable()

  // Validate redirect URL is same-origin
  let redirectUrl = '/'
  if (redirectParam) {
    try {
      const url = new URL(redirectParam, nextUrl.origin)
      // Only allow same-origin redirects
      if (url.origin === nextUrl.origin) {
        redirectUrl = url.pathname + url.search
      }
    } catch {
      // Invalid URL, use default
    }
  }

  return NextResponse.redirect(new URL(redirectUrl, nextUrl))
}
```

---

#### 10. Information Disclosure via Console Logging

**Location**: Multiple files
- `/Users/magnus/Dev/payload-playground/src/lib/actions/login.ts:58`
- `/Users/magnus/Dev/payload-playground/src/lib/actions/reset-password.ts:39`
- `/Users/magnus/Dev/payload-playground/src/lib/actions/verify-email.ts:18`
- `/Users/magnus/Dev/payload-playground/src/payload/content-model/Posts/index.ts:161`
- `/Users/magnus/Dev/payload-playground/src/payload/content-model/Docs/index.ts:215-216`

**OWASP Category**: A09:2021 - Security Logging and Monitoring Failures

**Description**:
Sensitive information logged to console in production.

```typescript
// login.ts
console.log('error', error)

// reset-password.ts
console.log('url:', `http://localhost:3000/change-password?token=${token}`)

// Posts/Docs index.ts
console.log('value', value)
console.log('req', req.user)
```

**Impact**:
- Password reset tokens exposed in server logs
- User data exposed in logs
- Potential log injection attacks
- Compliance violations (GDPR, PCI-DSS)

**Recommended Remediation**:

1. Remove or sanitize production console.logs:

```typescript
// Replace in login.ts
if (process.env.NODE_ENV === 'development') {
  console.log('Login error:', error?.message)
}

// REMOVE ENTIRELY from reset-password.ts:39
// This exposes password reset tokens!

// Replace in Posts/Docs with structured logging
if (process.env.NODE_ENV === 'development') {
  console.log('Setting default author:', req.user?.id)
}
```

2. Implement proper logging service (e.g., Winston, Pino)
3. Add `.eslintrc` rule to prevent console.log in production code

---

#### 11. Known Vulnerabilities in Dependencies

**Location**: Dependencies detected by `pnpm audit`
**OWASP Category**: A06:2021 - Vulnerable and Outdated Components

**Description**:
Package audit revealed vulnerabilities:
- `lodash@4.17.21` - Prototype pollution (ID: 1112455)
- `undici` - Unspecified vulnerability (ID: 1112497)
- `next` - Multiple advisories (ID: 1112593, 1112648)
- `payload` - Advisory ID: 1113075
- `fast-xml-parser` - Advisory ID: 1112708

**Impact**:
- Potential RCE via prototype pollution
- HTTP request smuggling
- DoS attacks

**Recommended Remediation**:

```bash
# Update vulnerable packages
pnpm update lodash@latest
pnpm update undici@latest
pnpm update next@latest
pnpm update payload@latest
pnpm update @payloadcms/payload-cloud@latest

# Run audit and review
pnpm audit --fix

# Add to CI/CD pipeline
pnpm audit --audit-level=high
```

Add to `package.json` scripts:

```json
"security:audit": "pnpm audit --audit-level=high",
"security:check": "pnpm security:audit && pnpm check-types"
```

---

#### 12. No Rate Limiting on Authentication Endpoints

**Location**: `/Users/magnus/Dev/payload-playground/src/lib/actions/login.ts`
**Location**: `/Users/magnus/Dev/payload-playground/src/lib/actions/reset-password.ts`
**OWASP Category**: A07:2021 - Identification and Authentication Failures

**Description**:
No rate limiting on login, registration, or password reset endpoints.

**Impact**:
- Brute force password attacks
- Account enumeration
- Credential stuffing
- DoS via password reset email spam

**Recommended Remediation**:

Implement rate limiting using `@upstash/ratelimit` or similar:

```typescript
// lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export const loginRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '15 m'), // 5 attempts per 15 minutes
})

export const passwordResetRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '1 h'), // 3 attempts per hour
})
```

Use in server actions:

```typescript
// login.ts
export async function login(data: TLoginForm) {
  const identifier = data.email
  const { success } = await loginRateLimit.limit(identifier)

  if (!success) {
    return { error: 'Too many login attempts. Please try again later.' }
  }

  // ... rest of login logic
}
```

**Alternative**: Use Vercel's built-in rate limiting or implement IP-based limiting with middleware.

---

### LOW VULNERABILITIES

#### 13. No CORS Configuration

**Location**: Not configured
**OWASP Category**: A05:2021 - Security Misconfiguration

**Description**:
No explicit CORS policy configured. Relies on default behavior.

**Impact**:
- Potential for unauthorized cross-origin requests
- May allow malicious sites to make authenticated API calls

**Recommended Remediation**:

Add CORS headers to API routes or in `next.config.mjs`:

```javascript
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: process.env.ALLOWED_ORIGINS || 'https://yourdomain.com' },
        { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
        { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
      ],
    },
  ]
}
```

---

#### 14. Cookie Security - SameSite None with Secure Flag

**Location**: `/Users/magnus/Dev/payload-playground/src/payload/content-model/Users.ts:23-27`
**OWASP Category**: A05:2021 - Security Misconfiguration

**Description**:
Cookies configured with `sameSite: 'None'` and `secure: true` but domain is dynamically set based on environment.

```typescript
cookies: {
  sameSite: 'None',
  secure: true,
  domain: process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_SERVER_URL?.split('://')[1]
    : 'localhost',
},
```

**Impact**:
- `SameSite: None` allows cross-site cookie sending (required for embedded iframes but increases CSRF risk)
- Domain extraction via string splitting is fragile

**Recommended Remediation**:

```typescript
cookies: {
  sameSite: process.env.NODE_ENV === 'production' ? 'Lax' : 'None',
  secure: process.env.NODE_ENV === 'production',
  domain: process.env.COOKIE_DOMAIN || (
    process.env.NODE_ENV === 'production'
      ? new URL(process.env.NEXT_PUBLIC_SERVER_URL || '').hostname
      : 'localhost'
  ),
  httpOnly: true, // Ensure this is set
},
```

Update `.env.example`:

```
COOKIE_DOMAIN=localhost
```

---

#### 15. No API Route Authentication

**Location**: `/Users/magnus/Dev/payload-playground/src/app/api/my-route/route.ts`
**OWASP Category**: A01:2021 - Broken Access Control

**Description**:
Custom API route has no authentication check.

```typescript
export const GET = async () => {
  const payload = await getPayload({ config: configPromise })
  const data = await payload.find({ collection: 'payload-folders' })
  return Response.json(data)
}
```

**Impact**:
- Unauthenticated access to internal folder structure
- Information disclosure

**Recommended Remediation**:

```typescript
import { getSession } from '@/lib/actions/get-session'

export const GET = async () => {
  const user = await getSession()

  if (!user) {
    return new Response('Unauthorized', { status: 401 })
  }

  const payload = await getPayload({ config: configPromise })
  const data = await payload.find({ collection: 'payload-folders' })
  return Response.json(data)
}
```

---

## Additional Security Recommendations

### 1. Add .env to .gitignore (Already Done ✓)

**Status**: `.env` is already in `.gitignore` (line 41)
**Action**: Verify `.env` is not tracked by git (confirmed - not in repo)

---

### 2. Implement Security Monitoring

**Recommendation**: Add security monitoring and alerting

```typescript
// lib/security/monitoring.ts
export function logSecurityEvent(event: {
  type: 'failed_login' | 'password_reset' | 'role_change' | 'access_denied'
  userId?: string
  ip?: string
  userAgent?: string
  metadata?: Record<string, any>
}) {
  // Send to monitoring service (Sentry, LogRocket, etc.)
  if (process.env.NODE_ENV === 'production') {
    console.error('[SECURITY]', JSON.stringify(event))
  }
}
```

Use in login failures, role changes, etc.

---

### 3. Add Content Security Policy Report URI

```javascript
'Content-Security-Policy': "default-src 'self'; ... report-uri /api/csp-report;"
```

---

### 4. Implement CSRF Protection

PayloadCMS handles this internally, but verify tokens are validated on mutations.

---

### 5. Add Security.txt

Create `public/.well-known/security.txt`:

```
Contact: security@yourdomain.com
Expires: 2027-01-01T00:00:00.000Z
Preferred-Languages: en
```

---

## Compliance Checklist

| OWASP Category | Issues Found | Status |
|----------------|--------------|--------|
| A01: Broken Access Control | 4 | Action Required |
| A02: Cryptographic Failures | 1 | Action Required |
| A03: Injection | 1 | Action Required |
| A04: Insecure Design | 0 | ✓ Pass |
| A05: Security Misconfiguration | 4 | Action Required |
| A06: Vulnerable Components | 1 | Action Required |
| A07: Authentication Failures | 4 | **CRITICAL** |
| A08: Software/Data Integrity | 0 | ✓ Pass |
| A09: Logging Failures | 1 | Action Required |
| A10: SSRF | 0 | ✓ Pass |

---

## Prioritized Action Plan

### Immediate (Critical - Fix within 24 hours)
1. Fix weak password policy (min 12 chars + complexity)
2. Add password validation to login schema
3. Remove hardcoded admin backdoor email

### High Priority (Fix within 1 week)
4. Add security headers (CSP, HSTS, X-Frame-Options)
5. Remove `ignoreBuildErrors: true` - fix TypeScript errors
6. Implement SVG sanitization or disable SVG uploads
7. Move preview secret to server-only code
8. Fix open redirect in preview disable route

### Medium Priority (Fix within 2 weeks)
9. Remove/sanitize production console.logs (especially password reset token!)
10. Update vulnerable dependencies
11. Implement rate limiting on auth endpoints
12. Add authentication to custom API routes

### Low Priority (Fix within 1 month)
13. Configure explicit CORS policy
14. Review cookie settings (SameSite policy)
15. Add security monitoring/logging
16. Add security.txt

---

## Unresolved Questions

1. Is SVG upload functionality actually needed? Can it be disabled?
2. What is preview mode secret currently set to in production?
3. Is `my-route` API endpoint used? Can it be removed?
4. Are there budget/resources for paid services (Upstash Redis for rate limiting)?
5. What monitoring/logging service is preferred (Sentry, LogRocket, Datadog)?
6. Should `SameSite=None` cookies be required for any iframe embedding use case?
7. Is CORS needed for any legitimate cross-origin requests?

---

## Testing Recommendations

After implementing fixes, perform:

1. **Penetration testing** on authentication flows
2. **Dependency audit** with `pnpm audit`
3. **CSP validation** using browser console/reports
4. **Rate limit testing** with automated tools
5. **XSS testing** on all user input fields
6. **CSRF testing** on state-changing operations

---

**End of Report**
