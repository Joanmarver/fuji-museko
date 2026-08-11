# [API-DESIGN] Endpoint Conventions & Response Standards

## Purpose
Ensure every new endpoint is consistent with the project's existing API conventions.
Learn the patterns first, replicate them, suggest improvements only when asked.
**Always ask before correcting or changing existing patterns.**

## When to Use
- Creating new endpoints or routes
- Designing request/response shapes for new features
- User asks to "add an API for [resource]" or "create endpoint for [action]"

## Step 0 — Learn the project's API patterns FIRST

```bash
# Find controllers and route definitions
find . -name "*Controller.cs" | grep -v obj | head -10

# Find route attributes
grep -rn "\[Route\|\[HttpGet\|\[HttpPost\|\[HttpPut\|\[HttpPatch\|\[HttpDelete\|\[ApiVersion" \
  --include="*.cs" | grep -v obj | head -20

# Find response format patterns
grep -rn "Ok(\|BadRequest(\|NotFound(\|Forbid(\|CreatedAtAction\|StatusCode(\|ActionResult" \
  --include="*.cs" | grep -v obj | head -15

# Find pagination patterns
grep -rn "page\|Page\|limit\|Limit\|offset\|Offset\|PageSize\|PageNumber" \
  --include="*.cs" | grep -v obj | head -10

# Find API versioning
grep -rn "ApiVersion\|MapToApiVersion\|api/v" --include="*.cs" | grep -v obj | head -5

# Find DTOs / validation
find . -name "*Request.cs" -o -name "*Response.cs" -o -name "*Dto.cs" -o -name "*Validator.cs" | grep -v obj | head -10
```

**Adopt everything you find. New endpoints must look like existing ones.**

**If existing endpoints have inconsistencies, ASK first before unifying.**

## Default Conventions (when no existing pattern found)

### URL Structure
```
GET    /api/v1/users          → list (paginated)
GET    /api/v1/users/{id}     → get one
POST   /api/v1/users          → create
PUT    /api/v1/users/{id}     → full update
PATCH  /api/v1/users/{id}     → partial update
DELETE /api/v1/users/{id}     → delete (or deactivate)

# Nested resources
GET    /api/v1/companies/{companyId}/users

# Non-CRUD actions
POST   /api/v1/orders/{id}/cancel
```

### HTTP Status Codes
```
200 — Success
201 — Created (POST that creates a resource)
204 — No Content (DELETE success)
400 — Bad Request (input validation failed)
401 — Unauthorized (not authenticated)
403 — Forbidden (authenticated but not allowed)
404 — Not Found
409 — Conflict (duplicate, state conflict)
422 — Unprocessable Entity (business rule violation)
500 — Internal Server Error (unexpected)
```

### Pagination (default when no pattern exists)
- Query params: `?page=1&pageSize=20`
- Default pageSize: 20, max: 100
- Return total count in response
- Never return unbounded lists

### Controller Pattern
```csharp
[ApiController]
[Route("api/v1/[controller]")]
[Authorize]
public class UsersController : ControllerBase
{
    // Thin — only calls Service and returns HTTP result
    // No business logic here
}
```

## Endpoint Creation Checklist
- [ ] URL follows existing naming convention
- [ ] Request body has validation (DataAnnotations / FluentValidation)
- [ ] Response shape matches project standard
- [ ] List endpoints are paginated
- [ ] Auth attribute applied where needed
- [ ] Business logic is in the service layer (not controller)
- [ ] Error responses use the project's standard format
- [ ] HTTP status codes are correct for each case

## Anti-patterns
- Do NOT invent a new response format — match existing endpoints
- Do NOT correct existing endpoint naming without asking first
- Do NOT use verbs in URLs: `/getUsers` → use `/users` with GET method
- Do NOT return 200 for errors
- Do NOT accept unbounded queries without pagination
- Do NOT put business logic in the controller — keep controllers thin
