# Security Remediation Plan

## Severity Summary

- P0: Immediate fix before deployment
- P1: Fix before production
- P2: Fix in the next hardening sprint
- P3: Best practice

## Findings

| ID | Severity | Component | Finding | Root Cause | Recommended Fix | Regression Test | Priority |
|----|----------|-----------|---------|------------|-----------------|-----------------|----------|
| SEC-001 | Critical | Backend | Committed `.env` contains live MongoDB and Cloudinary credentials | Secrets stored in source control | Remove `.env` from repository, add `.env` to `.gitignore`, rotate credentials | verify repository contains no secrets and .env is ignored | P0 |
| SEC-002 | High | Backend | API endpoints accept payloads without schema validation | Missing request validation middleware | Add request validation using `Joi`, `Zod`, or `express-validator` for all write endpoints | tests for invalid payloads and rejection responses | P1 |
| SEC-003 | High | Backend | Cookie-based JWT auth lacks explicit CSRF protections | Stateful auth via HttpOnly cookies without CSRF token | Add CSRF protection for state-changing endpoints or migrate to Authorization header tokens | tests for CSRF token enforcement | P1 |
| SEC-004 | Medium | Testing | No UI or end-to-end regression suite for frontend workflows | Only API smoke tests exist | Add Playwright or Cypress end-to-end tests for login, upload, and fee workflows | e2e regression test coverage | P2 |

## Recommended Fixes

### Immediate fixes
- Remove `.env` from Git history and add it to `.gitignore`.
- Rotate exposed MongoDB and Cloudinary credentials immediately.
- Keep current Helmet and CORS allowlist configuration.
- Maintain request body size limits and disable `x-powered-by`.

### Application hardening
- Add schema validation for JSON request bodies on all protected and public APIs.
- Reject unknown fields and sanitize data before database use.
- Enforce consistent auth failure status codes (401 for unauthorized, 403 for forbidden).
- Validate file uploads server-side by MIME type, extension, and size.

### Auth and session security
- Keep JWT cookie `HttpOnly` and `sameSite=strict` in production.
- Consider adding CSRF tokens or double-submit cookies for write actions.
- Limit token lifetime and handle refresh securely.

### Testing and audit
- Add automated API regression tests for core teacher and student workflows.
- Add UI/E2E tests for login, photo upload, fee submission, and profile updates.
- Regularly audit dependencies and update vulnerable packages.

## Regression testing guidance

- Create tests for unauthenticated access to all protected endpoints.
- Test login/register payload validation and failure modes.
- Test file upload rejection for invalid MIME types and oversize files.
- Test auth cookie lifecycle: login, access protected route, logout, token expiration.
