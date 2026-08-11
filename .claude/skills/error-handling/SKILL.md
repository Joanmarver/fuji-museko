# [ERROR-HANDLING] Error Management & Business Logic Validation

## Purpose
Apply consistent error handling across the codebase. Always learn and respect the
project's existing error patterns first. Only suggest improvements when asked or
when explicitly flagging them for the user's approval.
**Always ask before correcting or changing existing patterns.**

## When to Use
- **Always run Step 0 first** when entering a new project or codebase
- Writing any new endpoint, service method, or database operation
- Refactoring existing code that has inconsistent error handling
- User says "add error handling" or "handle errors properly"
- User says "improve my error handling" (only then suggest changes)

## Step 0 — Learn the project's existing patterns FIRST

```bash
# Find existing error handling patterns
grep -rn "try\|catch" --include="*.cs" -l | head -10

# Find custom exception classes
find . -name "*Exception.cs" -o -name "*Error.cs" | head -10

# Find error middleware or global handlers
grep -rn "UseExceptionHandler\|ExceptionFilter\|IExceptionFilter\|ProblemDetails\|ErrorHandling" \
  --include="*.cs" | head -10

# Find how errors are returned (custom wrapper? ProblemDetails? ActionResult?)
grep -rn "BadRequest\|NotFound\|Forbid\|Conflict\|StatusCode\|Problem(" --include="*.cs" | head -15

# Find result wrapper patterns
grep -rn "Result<\|Response<\|ApiResponse\|ResponseHelper\|ServiceResult" --include="*.cs" | head -10
```

### Step 0b — Learn how business logic validations are done

This is NOT input/field validation (DataAnnotations, FluentValidation).
This is logic like: does this user belong to this company? Can this order be cancelled
in its current state? Does this user have permission to perform this action?

```bash
# Find authorization / ownership checks
grep -rn "Authorize\|Forbid\|IsInRole\|HasClaim\|belongsTo\|HasAccess\|IsOwner\|IsMember" \
  --include="*.cs" | head -15

# Find business rule guards (state checks, preconditions)
grep -rn "InvalidOperationException\|cannot\|not_allowed\|InvalidState\|already\|must be" \
  --include="*.cs" | head -15

# Find where 403/401/409 status codes are used
grep -rn "403\|401\|409\|Forbid\|Unauthorized\|Conflict" --include="*.cs" | head -15

# Find guard/policy/middleware patterns
find . -name "*Guard*" -o -name "*Policy*.cs" -o -name "*Authorization*.cs" | head -10
```

**Read the results and identify:**
- Where do these checks live? (middleware, service methods, separate policy files?)
- How are failures communicated? (throw exception, return result object, return StatusCode?)
- Is there a reusable pattern for ownership checks?

**Then apply the 3-path rule:**

1. **Pattern exists** → adopt it. If you spot a gap, flag it:
   > "I notice `OrderService.Update()` doesn't check user permission,
   > but other services do. Should I add it here too?"

2. **No pattern exists** → ask before creating one:
   > "I don't see a consistent way you validate business rules.
   > Want me to suggest an approach, or show me how you'd prefer it?"

3. **Inconsistent** → point out the inconsistency and ask which to follow.

**NEVER silently override the user's existing error handling.**

---

## Default Principles (apply only when no existing pattern, or user asks to improve)

### 1 — Never swallow errors silently
```csharp
// BAD
try { ... } catch (Exception) { }
try { ... } catch (Exception) { return null; }

// GOOD
try { ... }
catch (Exception ex)
{
    _logger.LogError(ex, "Context about what operation failed");
    throw; // or return error result
}
```

### 2 — Use custom exception classes or result types, not raw throws
Every error should have:
- A machine-readable code (e.g. enum value, string constant)
- A human-readable message
- An HTTP status code mapping (if web API)
- Original exception preserved for debugging

### 3 — Error handling lives in layers

**Controller layer** — catches and formats HTTP response
- Catches errors from service layer
- Maps error codes to HTTP status codes
- Returns standardized error response to client
- Never exposes internal details (stack traces, SQL errors) to client

**Service layer** — catches, enriches, and re-throws or returns error result
- Catches low-level errors (DB, external APIs)
- Wraps them in domain-specific errors with context
- Example: EF `DbUpdateException` with unique constraint → "Email already exists" (409)

**Repository/Data layer** — lets most errors bubble up
- Only catches errors it can meaningfully handle
- Adds context (which entity, which operation) when re-throwing

### 4 — Always log with context
```csharp
// BAD
_logger.LogError(ex, "Error occurred");

// GOOD
_logger.LogError(ex, "Failed to create report for Company {CompanyId} by User {UserId}",
    companyId, userId);
```

### 5 — Input validation vs Business logic validation are DIFFERENT things

**Input validation** (field format, required fields, data types):
- Use DataAnnotations, FluentValidation, or manual checks
- Happens at the controller/entry point
- Returns 400 Bad Request with specific field errors

**Business logic validation** (authorization, ownership, state transitions):
- Happens in the service layer, BEFORE the main operation
- Examples:
  - Does this user belong to this company?
  - Can this order be cancelled in its current state?
  - Has this invoice already been paid?
- Use the project's existing pattern (discovered in Step 0b)
- If no pattern exists, follow these defaults:
  - Group precondition checks at the TOP of the service method
  - Fail fast: check and throw/return before doing any work
  - Use specific error codes, not generic "Forbidden"
  - Return 403 for authorization, 409 for state conflicts, 422 for business rule violations

## Checklist Before Finishing
- [ ] Every try/catch block logs the error with context
- [ ] No raw `throw new Exception("something broke")` — use typed exceptions or result objects
- [ ] No internal details leaked in API responses
- [ ] Input validation errors return specific field information
- [ ] Business logic checks (ownership, permissions, state) are present where needed
- [ ] Business logic checks match the project's existing pattern
- [ ] Async operations have proper error handling (no unobserved Task exceptions)
- [ ] External API/HTTP calls have timeouts and handle failures

## Anti-patterns
- Do NOT override existing error patterns without asking the user first
- Do NOT assume the project's current approach is wrong — ask before "improving"
- Do NOT mix input validation with business logic validation — they're different layers
- Do NOT skip ownership/authorization checks just because the route has [Authorize]
- Do NOT scatter the same business check across multiple places — make it reusable
- Do NOT log the error AND re-throw at the same layer (causes duplicate logs)
- Do NOT catch `Exception` and return 200 — use proper HTTP status codes
- Do NOT handle errors differently in each controller — centralize with middleware/filters
