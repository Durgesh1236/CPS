# Security Remediation Plan

## Severity Summary

- P0: Immediate fix before deployment
- P1: Fix before production
- P2: Fix in next hardening sprint
- P3: Best practice

## Findings

| ID | Severity | Component | Finding | Root Cause | Recommended Fix | Regression Test | Priority |
|----|----------|-----------|---------|------------|-----------------|-----------------|----------|
| SEC-001 | High | Backend |  |  |  |  | P1 |
| SEC-002 | High | Backend |  |  |  |  | P1 |
| SEC-003 | Medium | Backend |  |  |  |  | P2 |

## Remediation Guidance

### Authentication and Authorization
- Enforce backend role checks for every protected endpoint.
- Use secure, HttpOnly cookies for JWT tokens in production.
- Return 401/403 for auth failures.

### Validation
- Add request schema validation for JSON payloads and path/query parameters.
- Reject unknown fields and sanitize MongoDB query input.

### Express hardening
- Add Helmet.
- Add CORS with allowlist + credentials.
- Add request body size limits.
- Disable `x-powered-by`.

### File upload
- Validate MIME type and file size server-side.
- Reject unsupported file extensions.
- Do not trust client-side validation alone.

### Dependency hardening
- Audit and update vulnerable packages.
- Replace direct use of packages with known issues.

### Secret management
- Move secrets out of source-controlled `.env`.
- Do not commit cloud/API credentials.
- Rotate exposed credentials.
