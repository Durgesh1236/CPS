---
name: fullstack-qa-security
description: Discover and test a React + Node.js + Express + MongoDB application using safe, bounded quality and security automation.
argument-hint: "[optional scope: smoke | full | security | api | ui | regression]"
context: fork
---

# Fullstack QA + Security Skill

## Mission

Discover the repository, infer the application architecture, and run automated tests for functional, API, integration, regression, authentication, authorization, file upload, and OWASP-related security checks.

The skill must:
- Discover actual endpoints, pages, routes, models, roles, and workflows from source.
- Use existing test frameworks when present.
- Only run against localhost/test/development environments.
- Avoid destructive actions and production testing unless explicitly authorized.

## Safety Requirements

- Test only this repository and localhost/test targets.
- Never test production unless explicitly authorized.
- Do not perform denial-of-service, brute-force, credential stuffing, destructive DB operations, data deletion, or secret exposure.
- Use dedicated test data.
- Do not print secrets, API keys, JWTs, cookies, or passwords in reports.

## Discovery Phase

1. Inspect repository files:
   - root package.json
   - frontend package.json
   - lockfiles
   - .env / .env.example
   - README
   - React source under Frontend/src
   - Express entry point and routers under Backend
   - controllers, models, middleware, upload code
   - auth/JWT/cookie/session code
   - security middleware and CORS configuration
   - existing tests or CI config
2. Determine:
   - frontend framework/version, routing, pages, forms, auth state
   - backend entry point, routes, controllers, middleware, auth, uploads
   - database connection, Mongoose models, relationships
   - application URLs, API base path, available roles, login mechanism

## Inventory and Reporting

Create these artifacts under `test-results/`:
- `application-inventory.json`
- `fullstack-test-report.md`
- `fullstack-test-results.json`
- `security-remediation-plan.md`
- `evidence/` directories for API and UI

## Testing Strategy

Use existing frameworks if present.
If none exist, prefer:
- API: Jest/Vitest + Supertest
- UI: Playwright + @playwright/test

Automate:
- frontend startup
- backend startup
- API route discovery and testing
- authentication/authorization testing
- CRUD workflows
- input validation and injection checks
- file upload and upload security
- CORS and security headers
- dependency and secret/config audits

## Report Requirements

Generate final reports with:
- Executive summary
- application inventory
- functional test results
- API test results
- security findings
- remediation plan
- evidence summary

Ensure every finding is classified and tied to a regression test.
