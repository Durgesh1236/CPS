# Full-Stack QA + Security Report

Application: {{applicationName}}
Environment: {{environment}}

## Executive Summary

- Frontend: {{frontend}}
- Backend: {{backend}}
- Database: {{database}}
- Total Tests: {{totalTests}}
- Passed: {{passedTests}}
- Failed: {{failedTests}}
- Skipped: {{skippedTests}}
- Security Findings: Critical {{critical}}, High {{high}}, Medium {{medium}}, Low {{low}}
- Overall Risk: {{overallRisk}}

## Application Inventory

- Frontend Pages: {{frontendPages}}
- API Routes: {{apiRoutes}}
- Database Models: {{models}}
- Roles: {{roles}}
- Auth Mechanism: {{authMechanism}}
- Critical Workflows: {{criticalWorkflows}}

## Functional Tests

| ID | Area | Test | Status | Evidence |
|----|------|------|--------|----------|
{{functionalRows}}

## API Tests

| ID | Method | Endpoint | Scenario | Expected | Actual | Status |
|----|--------|----------|----------|----------|--------|--------|
{{apiRows}}

## Security Findings

| ID | Severity | Category | Finding | Evidence | Status |
|----|----------|----------|---------|----------|--------|
{{securityRows}}

## Remediation Plan

{{remediationSummary}}

## Limitations

{{limitations}}
