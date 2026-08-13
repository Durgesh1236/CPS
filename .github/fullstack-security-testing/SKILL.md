---
name: fullstack-security-testing
description: Test and security-audit a React + Node.js/Express + MongoDB full-stack application. Use when asked to run comprehensive automated UI, API, integration, regression, dependency, configuration, authentication/authorization, input-validation, and OWASP-aligned security tests, then generate evidence-based reports and a prioritized remediation plan. Only test applications the user owns or is explicitly authorized to test.
argument-hint: "[optional scope: smoke | full | security | api | ui | regression]"
context: fork
---

# Full-Stack Automation & Security Testing Skill

## Mission

Act as a senior QA automation engineer and application-security tester for the current repository.

The application is expected to use:
- React frontend
- Node.js/Express backend
- MongoDB/Mongoose database

Your job is to:
1. Discover the actual application architecture before testing.
2. Build or reuse automated tests instead of relying on manual inspection.
3. Test frontend, backend/API, authentication/authorization, validation, database behavior, error handling, and security controls.
4. Run the tests against a local/test environment only.
5. Collect reproducible evidence for failures.
6. Generate a human-readable test report and a machine-readable result file.
7. Generate a prioritized remediation plan with severity, affected component, evidence, fix, validation test, and priority.
8. Never silently weaken security controls just to make tests pass.
9. Never perform destructive or unauthorized testing against production.

## Safety / authorization

- Test only the repository and environments explicitly authorized by the user.
- Default target is localhost/test/staging, never production.
- Do not use real user credentials, production secrets, payment data, or personal data.
- Never print secrets, tokens, cookies, API keys, database URIs, or passwords into reports.
- Use dedicated test accounts and test data.
- Do not run destructive database commands such as `dropDatabase`, collection deletion, mass deletion, or destructive migrations.
- Do not perform denial-of-service, credential stuffing, brute-force, persistence, malware, or exploit-chain testing.
- Security tests must be bounded, rate-limited, and non-destructive.
- If the application target is ambiguous, inspect package scripts/configuration and use localhost defaults. If no safe target can be established, stop and explain what is missing.

## Execution modes

Interpret the user's scope as:

- `smoke`: critical happy paths only.
- `api`: API and backend tests.
- `ui`: browser/UI tests.
- `security`: security-focused tests plus dependency/configuration checks.
- `regression`: existing tests plus critical workflows.
- `full` or no scope: run the complete workflow below.

If a required test tool already exists, use it. Do not replace the project's existing test framework unnecessarily.

## Phase 0 — Repository discovery

Before changing code:

1. Inspect:
   - root `package.json`
   - frontend `package.json`
   - backend `package.json`
   - lockfiles
   - `.env.example` / environment documentation
   - source directories
   - existing test directories
   - route/controller/model/middleware files
   - auth/JWT/cookie/session code
   - upload/file-handling code
   - CORS/security middleware
   - Docker/CI configuration if present
2. Determine:
   - frontend start/build command
   - backend start/test command
   - frontend URL
   - API base URL
   - authentication mechanism
   - database configuration
   - test database strategy
   - available seeded/demo accounts
3. Read existing tests and reuse their conventions.
4. Identify all API routes and classify them:
   - public
   - authenticated
   - admin/teacher/student/role-specific
   - file upload/download
   - CRUD
5. Create a test inventory before implementation.

Do not assume endpoint names. Discover them from the actual source.

## Phase 1 — Test infrastructure

Prefer this stack when it fits the repository:

### Browser/UI
- Playwright
- `@playwright/test`

### API/integration
- Existing Jest/Vitest/Mocha if present
- Otherwise Jest or Vitest
- Supertest for Express HTTP testing when practical

### Security/dependency checks
- `npm audit --json` / package-manager equivalent
- OWASP-aligned checks implemented as bounded application tests
- Optional Semgrep only if already available or explicitly approved
- Do not require commercial scanners

### Reporting
Produce:
- `test-results/fullstack-test-report.md`
- `test-results/fullstack-test-results.json`
- Playwright HTML report if Playwright is used
- screenshots/traces/videos only for failed UI tests where supported
- `test-results/security-remediation-plan.md`

Keep generated artifacts out of source code.

Before installing packages, check whether equivalent packages already exist. If packages are missing, install only the minimum required development dependencies.

## Phase 2 — Build a test matrix

Create a matrix with at least:

### Functional
- application loads
- frontend routing
- login/logout
- registration if present
- protected-route behavior
- CRUD operations
- form submission
- validation messages
- search/filter/sort if present
- pagination if present
- upload/download if present
- role-specific features
- important business workflows discovered from the code

### API
For every discovered route:
- correct method
- valid request
- missing required fields
- wrong data type
- malformed JSON where applicable
- invalid identifier
- unauthorized request
- forbidden request
- not-found behavior
- duplicate resource behavior
- boundary values
- unexpected extra fields
- correct status code
- response shape
- sensitive-field exposure
- consistent error handling

### Authentication
- login success
- invalid credentials
- missing credentials
- logout
- expired/invalid token if applicable
- protected endpoint without auth
- token tampering
- cookie flags if cookie auth is used
- session invalidation after logout where applicable
- password policy if passwords are managed by the application
- account enumeration resistance where applicable

### Authorization / IDOR
For every protected resource:
- user A cannot access user B's resource by changing an ID
- lower-privilege role cannot access higher-privilege routes
- unauthenticated users cannot invoke protected actions
- hidden UI controls are not treated as authorization
- backend independently enforces ownership/role checks

Use two dedicated test identities where the application supports multiple users/roles.

### Input validation / injection
Bounded, non-destructive checks for:
- MongoDB/Mongoose operator injection
- unsafe object keys such as `$` and `.`
- query parameter manipulation
- JSON type confusion
- reflected/stored XSS indicators
- HTML/script payload handling
- path traversal indicators for file/path inputs
- prototype-pollution-prone input patterns
- unsafe redirects
- command/shell injection indicators where user input reaches process execution

Do not attempt destructive payloads or exploit chains.

### Security headers / transport
Check when applicable:
- HTTPS assumptions in non-production
- Helmet/security headers
- Content-Security-Policy
- X-Content-Type-Options
- Referrer-Policy
- frame-ancestors / clickjacking protection
- HSTS in production-like HTTPS environments
- CORS is restrictive and intentional
- credentials are not accepted from arbitrary origins
- server does not expose unnecessary framework/version details

Do not mark a header as a vulnerability merely because it is absent if the deployment architecture intentionally supplies it elsewhere. Record evidence and context.

### Error handling
Verify:
- no stack traces in normal API responses
- no MongoDB connection strings
- no JWT secrets
- no environment variables
- no filesystem paths beyond what is intentionally public
- no internal database errors exposed to users
- stable 4xx/5xx responses

### File upload
If uploads exist:
- extension/MIME mismatch
- empty file
- oversized file handling
- filename/path manipulation
- executable/script-like content rejection where appropriate
- unauthorized upload
- ownership checks on download/delete
- storage URL exposure
- safe image processing if images are accepted

Use small test files only.

### Database/data exposure
Check:
- API returns only intended fields
- password hashes are never returned
- reset tokens/secrets are never returned
- users cannot query arbitrary records
- ObjectId validation is safe
- pagination/limits prevent unbounded reads
- sorting/filtering cannot access unauthorized fields
- Mongo queries are constrained

## Phase 3 — Generate automated tests

Create tests only where they add coverage. Prefer black-box HTTP/UI tests for behavior and focused unit tests for complex utilities.

Use stable selectors:
- `data-testid`
- accessible roles/names
- labels
- semantic selectors

Avoid brittle CSS/XPath selectors unless unavoidable.

Tests must:
- be deterministic
- clean up their own test data
- avoid dependency on test execution order
- use unique test identifiers when creating records
- avoid hard-coded production data
- have clear names
- capture useful failure context

For API tests, create reusable helpers for:
- base URL
- auth
- request creation
- test data
- cleanup
- response assertions

For Playwright:
- use a dedicated config
- use retries only in CI or when appropriate
- collect trace/screenshot on failure
- avoid arbitrary long sleeps; wait for observable state

## Phase 4 — Run tests

Run in this order:

1. Existing unit/integration tests.
2. Build/type/lint checks if configured.
3. API tests.
4. UI smoke tests.
5. Full UI regression tests.
6. Security-focused application tests.
7. Dependency/security audit.

Before UI/API tests:
- start frontend/backend using existing scripts or a safe test command
- verify health/readiness
- verify the app is using a test database
- never point tests at production

If a server is already running, reuse it only after confirming the target is local/test and the port is expected.

## Phase 5 — Failure triage

For every failure classify:

- `BUG`: application behavior is incorrect.
- `TEST_DEFECT`: test itself is wrong/brittle.
- `ENVIRONMENT`: setup/dependency/service issue.
- `SECURITY_FINDING`: security control is missing or bypassable.
- `UNVERIFIED`: evidence is insufficient.

Do not inflate findings.

For each real issue record:
- ID
- severity
- category
- component
- route/page
- exact reproduction
- expected behavior
- actual behavior
- evidence path
- likely root cause
- recommended remediation
- regression test to add
- priority

Severity guidance:
- Critical: practical compromise of authentication, authorization, secrets, or major data exposure.
- High: significant unauthorized access, injection, account compromise, or serious security boundary failure.
- Medium: meaningful security weakness or important functional defect with limited impact.
- Low: hardening, minor validation, or low-impact defect.
- Informational: observation or improvement without a demonstrated vulnerability.

Do not assign Critical/High solely from a scanner's label. Validate the application's behavior and evidence.

## Phase 6 — Security remediation plan

Generate a remediation plan ordered by risk.

For each finding use:

| ID | Severity | Finding | Evidence | Root cause | Fix | Regression test | Priority |
|---|---|---|---|---|---|---|---|

Include concrete engineering actions such as:

### Authentication
- use strong password hashing such as Argon2id/bcrypt with appropriate cost
- secure cookies: `HttpOnly`, `Secure` in HTTPS, appropriate `SameSite`
- short-lived access tokens and safe refresh-token rotation where JWT is used
- invalidate sessions/tokens appropriately
- generic authentication error messages
- rate limiting on authentication endpoints

### Authorization
- enforce role/ownership checks in backend middleware/controllers
- use allowlists for accessible resources
- test every ID-bearing endpoint for IDOR/BOLA
- never rely on frontend route hiding for access control

### Input validation
- use schema validation such as Zod/Joi/express-validator where appropriate
- reject unexpected fields
- validate MongoDB ObjectIds
- sanitize/escape output based on context
- block dangerous Mongo operators and unsafe query objects

### Express hardening
- Helmet/security headers
- restrictive CORS
- body-size limits
- request rate limiting
- safe error middleware
- disable unnecessary fingerprinting such as `x-powered-by`

### MongoDB
- least-privilege database user
- TLS for remote connections
- network restrictions
- no public database exposure
- avoid unsafe query construction
- project only required fields
- indexes and pagination for untrusted queries

### Secrets
- remove secrets from source control
- `.env` in `.gitignore`
- `.env.example` with placeholders only
- rotate exposed credentials immediately
- use environment/secret manager in deployment
- never include secrets in test reports

### Frontend
- avoid storing sensitive tokens in `localStorage` when an HttpOnly cookie design is feasible
- do not render untrusted HTML without sanitization
- validate authorization server-side
- avoid leaking API errors or internal details

### Dependencies
- update vulnerable packages after compatibility review
- remove unused dependencies
- lock dependencies
- rerun audit after fixes

## Phase 7 — Report format

Create `test-results/fullstack-test-report.md` containing:

# Full-Stack Test & Security Report

## 1. Executive summary
- test date/time
- environment
- application stack
- total tests
- passed
- failed
- skipped
- security findings by severity
- overall risk rating

## 2. Test scope
List tested frontend pages, API routes, roles, and workflows.

## 3. Results
A table with:
- suite
- total
- passed
- failed
- skipped
- duration

## 4. Functional findings

## 5. Security findings

## 6. Evidence
Reference screenshots, traces, response excerpts, and logs without exposing secrets.

## 7. Dependency findings

## 8. Remediation plan

## 9. Retest criteria

## 10. Limitations
Explicitly state anything not tested, blocked, or requiring manual review.

Create `test-results/fullstack-test-results.json` with a stable structure:

{
  "generatedAt": "...",
  "environment": "local/test",
  "summary": {
    "total": 0,
    "passed": 0,
    "failed": 0,
    "skipped": 0
  },
  "security": {
    "critical": 0,
    "high": 0,
    "medium": 0,
    "low": 0,
    "informational": 0
  },
  "findings": [
    {
      "id": "SEC-001",
      "severity": "High",
      "category": "Authorization",
      "title": "...",
      "component": "...",
      "evidence": "...",
      "rootCause": "...",
      "remediation": "...",
      "regressionTest": "...",
      "status": "open"
    }
  ]
}

## Phase 8 — Final quality gate

Before finishing:

- Confirm tests actually ran; do not claim tests passed based on generated code.
- Confirm report numbers match the test runner output.
- Confirm failed tests have evidence.
- Confirm security findings have reproducible evidence.
- Confirm no secrets are present in reports.
- Confirm remediation items map to findings.
- Confirm every security fix has a regression-test recommendation.
- Re-run affected tests after any remediation changes.
- If tests could not run, clearly report `NOT RUN` and why.

## Deliverable checklist

At the end, provide:
1. Test commands executed.
2. Files added/changed.
3. Test summary.
4. Security summary.
5. Top remediation priorities.
6. Exact report locations.
7. Recommended next command for a retest.

Never say "application is secure". Say "no issues were detected within the tested scope" when appropriate.
