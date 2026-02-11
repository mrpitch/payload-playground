## Active Context

**Project**: PayloadCMS Playground - Full-stack Next.js 15 + PayloadCMS 3.67 boilerplate with React 19, TypeScript, Tailwind CSS v4, Server Components/Actions, PostgreSQL, AWS S3, Resend email integration.

**Architecture**: Modular with PayloadCMS collections (Users, Posts, Pages, Docs, Media, Newsletter, Menus, AppSettings), content blocks system, authentication with roles, theme system (Nature/Bubblegum/Vintage themes), Zustand stores, React Hook Form + Zod validation.

**Status**: Production-ready, active development on deployment automation & release management; high code quality with clear separation of concerns, TypeScript throughout, modern Next.js patterns throughout, no test framework yet.

**Security Audit (2026-02-11)**: Identified 15 vulnerabilities (1 critical: weak 4-char password policy; 7 high: missing security headers, TypeScript errors ignored, SVG XSS risk, access control bypasses, hardcoded admin backdoor, preview secret exposure, open redirect; 4 medium: console logging secrets, dependency vulnerabilities, no rate limiting, unauthenticated API; 3 low: CORS, cookie config, info disclosure). Immediate action required on authentication failures.
