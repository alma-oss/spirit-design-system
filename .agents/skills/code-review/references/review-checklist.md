# Code Review Checklist

Quick-scan checklist organized by review dimension. Use during reviews for systematic coverage.

## Project Guidelines Compliance

- \[ \] Follows import patterns from CLAUDE.md / project config
- \[ \] Naming conventions match codebase (camelCase, snake_case, etc.)
- \[ \] Error handling follows project patterns
- \[ \] File size within project limits
- \[ \] Framework conventions respected

## Bug Detection

- \[ \] No logic errors (wrong comparisons, inverted conditions)
- \[ \] Null/undefined handled on nullable values
- \[ \] No race conditions on shared mutable state
- \[ \] Resources properly closed/cleaned up
- \[ \] No off-by-one or boundary errors
- \[ \] State transitions are consistent

## Security

- \[ \] No hardcoded credentials, API keys, or tokens
- \[ \] No SQL injection (parameterized queries used)
- \[ \] No XSS (user input escaped/sanitized)
- \[ \] No path traversal (file paths validated)
- \[ \] CSRF protection on state-changing endpoints
- \[ \] Auth checks on all protected routes
- \[ \] No secrets logged or exposed in error messages
- \[ \] Dependencies free of known vulnerabilities

## Silent Failure Detection

- \[ \] No empty catch blocks
- \[ \] Errors logged, reported, or re-thrown
- \[ \] No broad `catch (e: any)` swallowing specific errors
- \[ \] User informed of operation failures
- \[ \] No mock/stub implementations in production code
- \[ \] Promise rejections handled
- \[ \] Default fallbacks don't hide real errors

## Test Coverage

- \[ \] Critical paths tested end-to-end
- \[ \] Edge cases covered (empty, null, boundary values)
- \[ \] Error handling paths tested
- \[ \] Integration points tested
- \[ \] No high-risk regression paths left uncovered

## Type Design Quality

- \[ \] Implementation details behind interfaces
- \[ \] Types make invalid states unrepresentable
- \[ \] No `any` abuse or stringly-typed APIs
- \[ \] No exposed mutable internals
- \[ \] No god objects (10+ fields)

## Code Simplification

- \[ \] No deep nesting (>3 levels)
- \[ \] No duplicate/redundant logic
- \[ \] Clear, descriptive naming
- \[ \] No unnecessary abstractions or over-engineering
- \[ \] Comments explain "why", not "what"
- \[ \] No unresolved TODOs without issue references
