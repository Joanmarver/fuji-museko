# [SECURITY] Pre-Delivery Security Review

## Purpose
Automatically run a security review before marking any task as done. Catch common
vulnerabilities before they reach production.
**Always report issues and ask before applying fixes.**

## When to Use
- **Always** — run this checklist before finishing any task that touches:
  auth, user input, database queries, external APIs, file uploads, sensitive data
- When user says "review security" or "is this secure?"

## Step 0 — Understand the project's security setup

```bash
# Find auth implementation
find . -name "*.cs" | xargs grep -l "Authorize\|Identity\|JWT\|Bearer\|Claims" 2>/dev/null | grep -v obj | head -10

# Find middleware / filters
grep -rn "UseAuthentication\|UseAuthorization\|AddAuthentication\|IAuthorizationFilter" \
  --include="*.cs" | grep -v obj | head -10

# Find environment / secrets
find . -name "appsettings*.json" -o -name ".env*" -o -name "secrets*" | head -5

# Find input validation
grep -rn "FluentValidation\|DataAnnotations\|Validate\|\[Required\]\|\[StringLength\]" \
  --include="*.cs" | grep -v obj | head -10

# Find rate limiting
grep -rn "RateLimiting\|UseRateLimiter\|FixedWindow\|SlidingWindow" \
  --include="*.cs" | grep -v obj | head -5
```

## Security Review Checklist

### Authentication & Authorization
- [ ] Every endpoint that needs auth has `[Authorize]` (or equivalent)
- [ ] Ownership checks exist: users can only access THEIR resources
- [ ] Role-based checks are present where needed (`[Authorize(Roles = "Admin")]`)
- [ ] Token validation cannot be bypassed
- [ ] Password/token fields are NEVER included in API responses

### Input Handling
- [ ] All user input is validated BEFORE processing
- [ ] EF Core parameterized queries used — no string concatenation in SQL
- [ ] No `FromBody` objects passed directly to DB without mapping/validation
- [ ] File uploads validate type, size, and content
- [ ] URLs from user input are validated (prevents SSRF)

### Data Exposure
- [ ] API responses don't leak internal IDs, stack traces, or DB structure
- [ ] Error messages don't reveal system internals in production
- [ ] Logs don't contain passwords, tokens, credit cards, or PII
- [ ] Development endpoints (Swagger, debug) secured or disabled in production
- [ ] Queries don't return more fields than the client needs (use DTOs)

### Secrets & Configuration
- [ ] No hardcoded secrets, API keys, or passwords in source code
- [ ] Secrets in environment variables or User Secrets, not `appsettings.json`
- [ ] `appsettings.json` with real credentials is NOT committed
- [ ] Connection strings don't contain passwords in plain text in source control
- [ ] Third-party API keys have minimal required permissions

### Common .NET Vulnerabilities
- [ ] No mass assignment: use DTOs, don't bind `[FromBody]` directly to entities
- [ ] Rate limiting on auth endpoints (login, register, password reset)
- [ ] CORS configured restrictively — not `AllowAnyOrigin()` in production
- [ ] Cookies have `HttpOnly`, `Secure`, `SameSite` flags
- [ ] Anti-forgery tokens used where applicable

## How to Report Issues

> **Security issue found:** [endpoint/file]
> **Risk:** [what could go wrong]
> **Fix:** [specific recommendation]
> **Severity:** [critical / high / medium / low]
>
> Want me to fix this now?

**Critical issues** → always flag, even if the user didn't ask for a review.
**Medium/low issues** → flag during explicit security reviews.

## Anti-patterns
- Do NOT silently fix security issues — always report and ask before applying fixes
- Do NOT store or log the values of secrets, even in error messages
- Do NOT assume `[Authorize]` covers ownership checks — they're different
- Do NOT trust client-side validation alone — always validate server-side
- Do NOT add security NuGet packages without asking the user first
- Do NOT change auth/permission logic without explicit approval
