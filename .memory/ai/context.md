## Active Context

**Project**: PayloadCMS Playground - Full-stack Next.js 15 + PayloadCMS 3.67 boilerplate with React 19, TypeScript, Tailwind CSS v4, Server Components/Actions, PostgreSQL, AWS S3, Resend email integration.

**Architecture**: Modular with PayloadCMS collections (Users, Posts, Pages, Docs, Media, Newsletter, Menus, AppSettings), content blocks system, authentication with roles, theme system (Nature/Bubblegum/Vintage themes), Zustand stores, React Hook Form + Zod validation.

**Status**: Production-ready, active development on deployment automation & release management; high code quality with clear separation of concerns, TypeScript throughout, modern Next.js patterns throughout, no test framework yet.

**Security Audit (2026-02-11)**: Identified 15 vulnerabilities (1 critical: weak 4-char password policy; 7 high: missing security headers, TypeScript errors ignored, SVG XSS risk, access control bypasses, hardcoded admin backdoor, preview secret exposure, open redirect; 4 medium: console logging secrets, dependency vulnerabilities, no rate limiting, unauthenticated API; 3 low: CORS, cookie config, info disclosure). Immediate action required on authentication failures.

**ESLint/Prettier Baseline (2026-02-11)**: ✅ ESLint 9.39.2 + Prettier 3.7.4 + simple-import-sort + husky + lint-staged fully deployed. lint:check script + format glob expansion (yml/yaml/graphql) + pre-commit hooks active.

**Security Vulnerabilities (2026-02-11)**: 15 issues identified. Critical (1): 4-char password min. High (7): TypeScript errors ignored, SVG XSS, missing security headers, open redirect, preview secret exposure, access control gaps, unauth APIs. Medium (4): console logging, dependency vulns, no rate limiting, cookie config. Phase 1 (1 week): fix password policy, enable TS strict, add security headers, mitigate SVG risk, secure preview, remove console logs. See codebase-analyzer-plan.md.

**Next Phase**: Fix critical/high security issues (Phase 1), add rate limiting + CORS (Phase 2), establish test framework (Phase 3).

**Phase 1 Complete (2026-02-11)**: All 8 critical fixes deployed & verified. TS strict enabled (7 errors fixed), CSP + security headers added, SVG XSS mitigated, open redirect patched, preview secret moved to httpOnly cookie, 18 console.logs removed, API auth added. Build/lint/types all pass. Ready for Phase 2 (rate limiting, CORS, dependency audit).

**Next**: Phase 2 (rate limiting, CORS, audit deps, error boundaries) — est. 4-5h. Follow with Phase 3 (test framework + E2E).
