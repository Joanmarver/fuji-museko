# [API-CONTRACT] API Contract Reader & Implementer

## Purpose
Read, understand, and work with API contracts (OpenAPI/Swagger, Postman collections,
custom specs, or any structured API documentation). Use contracts as the single source
of truth when implementing, validating, or consuming endpoints.
**Never deviate from the contract without asking first.**

## When to Use
- User provides an OpenAPI/Swagger JSON or YAML file
- User provides a Postman collection
- User provides any API specification document (PDF, markdown, Word)
- User says "implement this API", "follow this contract", "read this spec"
- User wants to validate existing code against a contract
- User wants to generate code FROM a contract
- User wants to CONSUME an external API based on its documentation

## Step 0 — Identify the contract format

```bash
# Find existing contract files in the project
find . -name "swagger*.json" -o -name "openapi*.json" -o -name "openapi*.yaml" \
  -o -name "*.openapi.*" -o -name "*.postman_collection.json" | head -10

# Find markdown API contracts (common patterns)
find . -name "*contract*" -o -name "*api-spec*" -o -name "*api-doc*" \
  -o -name "*endpoints*" -o -name "*API_*.md" -o -name "*api_*.md" | \
  grep -i "\.md$" | head -10

# Also check docs/ and contracts/ folders for .md files
find . -path "*/docs/*.md" -o -path "*/contracts/*.md" -o -path "*/specs/*.md" | head -10

# Find if the project auto-generates its Swagger spec
grep -rn "UseSwagger\|SwaggerEndpoint\|MapOpenApi" --include="*.cs" | head -5

# Check for NSwag or other code generators
grep -rn "NSwag\|Swashbuckle\|Kiota\|AutoRest\|OpenApiReference" --include="*.csproj" | head -5
```

**Priority order for contract formats:**
1. Markdown files (.md) — the team's primary contract format
2. OpenAPI/Swagger JSON/YAML — if available
3. Postman collections — if available
4. Any other documentation

## Reading Contracts — How to Parse Each Format

### OpenAPI / Swagger (JSON or YAML)
Extract and organize:

**1. Endpoints inventory**
For each path + method, extract:
- Route: `GET /api/v1/companies/{companyId}/reports`
- Description / summary
- Parameters: path, query, header (name, type, required)
- Request body: schema, required fields, content type
- Response codes: 200, 400, 401, 403, 404, 409, 500
- Response schema for each code
- Auth requirements (security schemes)

**2. Data models / schemas**
For each schema in `components/schemas` or `definitions`:
- Name, properties, types, required fields
- Nested objects and references (`$ref`)
- Enums and their values
- Validation rules (minLength, maxLength, pattern, minimum, maximum)

**3. Auth schemes**
From `securityDefinitions` / `components/securitySchemes`:
- Type (Bearer JWT, API Key, OAuth2)
- Where it goes (header, query, cookie)
- Required scopes

### Postman Collection
Extract:
- Folder structure → endpoint grouping
- Each request: method, URL, headers, body (raw JSON / form-data)
- Pre-request scripts → auth flow, variable setup
- Tests → expected responses, status codes
- Environment variables → base URLs, tokens, IDs

### Markdown API Contract (.md) — Primary format

Markdown contracts vary in structure. Read the ENTIRE file first, then identify
which sections contain what. Common patterns to look for:

**Endpoint definitions** — look for patterns like:
```markdown
## GET /api/v1/users
## POST /api/v1/users
## [GET] /api/v1/users/{id}
### Endpoint: GET /users
### Route: POST /companies/{companyId}/reports
```

**Request/Response bodies** — look for:
- JSON code blocks after endpoint headers
- Tables with field definitions (name | type | required | description)
- Bullet lists describing fields
- Sections titled "Request Body", "Body", "Payload", "Parameters"
- Sections titled "Response", "Returns", "Output"

**Status codes** — look for:
- Tables or lists with HTTP codes (200, 400, 401, 403, 404, 409, 500)
- Sections titled "Errors", "Error codes", "Responses"
- Inline mentions like "Returns 404 if not found"

**Auth requirements** — look for:
- Sections titled "Auth", "Authentication", "Authorization"
- Mentions of "Bearer", "JWT", "Token", "[Authorize]"
- Role requirements: "Admin only", "Requires role: Customer"

**Data models** — look for:
- Sections titled "Models", "Entities", "Schemas", "DTOs"
- TypeScript-style interfaces or JSON examples
- Tables defining field names, types, and constraints

**When parsing, extract into this structure:**
```
For each endpoint found:
  - Method: GET/POST/PUT/PATCH/DELETE
  - Route: full path with parameters
  - Description: what it does
  - Auth: required? which roles?
  - Request:
    - Path params: { name, type, required }
    - Query params: { name, type, required, default }
    - Body: { field, type, required, constraints, description }
  - Responses:
    - 200: { description, body schema }
    - 400: { description, when it happens }
    - 403: { description }
    - 404: { description }
    ...
```

**Handle ambiguity — ASK, don't assume:**
- Field type unclear → "The contract says 'id' but doesn't specify the type. Is it `int`, `Guid`, or `string`?"
- Required/optional not stated → "The contract doesn't say if 'phone' is required. Should I make it optional?"
- Response code not specified → "The contract doesn't define error responses for this endpoint. Should I use the project's standard error format?"
- Missing validation rules → "The contract says 'name (string)' but no max length. Should I add a limit?"

### Custom/Informal Specs (PDF, Word, plain text)
Extract the same info as markdown but handle more ambiguity:
- If a field type is unclear, ASK before assuming
- If a response code is not specified, suggest the standard one and ASK
- If auth requirements are missing, flag it

## Working with Contracts

### MODE 1 — Implement FROM a contract

When the user gives you a contract and says "implement this":

1. **Parse the full contract first** — don't start coding from the first endpoint
2. **Present a summary before coding:**
   ```
   ## Contract Summary
   
   ### Endpoints: X total
   - GET  /api/v1/users          → List users (paginated)
   - POST /api/v1/users          → Create user
   - GET  /api/v1/users/{id}     → Get user by ID
   ...
   
   ### Models: Y total
   - UserRequest:  { name (string, required), email (string, required), role (enum) }
   - UserResponse: { id (guid), name, email, role, createdAt }
   ...
   
   ### Auth: JWT Bearer
   
   ### Notes / Ambiguities:
   - [anything unclear in the contract]
   
   Which endpoints should I implement first?
   ```
3. **Implement one endpoint at a time**, matching the contract EXACTLY:
   - Route, method, parameters → Controller
   - Request body schema → Request DTO with validation matching contract constraints
   - Response schemas → Response DTOs matching every field name and type
   - Status codes → Service returns the exact codes from the contract
   - Auth → `[Authorize]` with correct roles/policies

4. **After each endpoint, verify against the contract:**
   - Does the route match exactly?
   - Do all parameters exist with correct types and required flags?
   - Does the request body match the schema?
   - Does each response code return the correct shape?
   - Are validation rules from the contract enforced?

### MODE 2 — Validate existing code AGAINST a contract

When the user says "check if our API matches this contract":

1. Parse the contract
2. Find the corresponding Controller + Service + DTOs for each endpoint
3. Compare field by field:
   ```
   ## Validation Report
   
   ### ✅ Matches contract
   - GET /users — route, params, response all match
   
   ### ❌ Mismatches
   - POST /users
     - Contract expects field "phoneNumber" (string, optional) — MISSING in CreateUserRequest
     - Contract returns 409 on duplicate email — code returns 400 instead
     - Contract says "role" is enum ["admin","user"] — code allows "superadmin" too
   
   ### ⚠️ Not implemented yet
   - DELETE /users/{id} — endpoint exists in contract but not in code
   ```

### MODE 3 — Generate client/consumer code FROM a contract

When consuming an external API:

1. Parse the contract
2. Generate:
   - HTTP client service with typed methods for each endpoint
   - Request/Response DTOs matching the external API's schemas
   - Error handling for each documented error code
3. Use `IHttpClientFactory` / typed `HttpClient` following .NET patterns

### MODE 4 — Generate contract FROM existing code

When the user wants to create a contract from their code:

1. Scan all controllers for routes, methods, parameters
2. Scan all DTOs for request/response shapes
3. Scan all `[ProducesResponseType]` for status codes
4. Generate OpenAPI 3.0 JSON or YAML
5. Flag anything incomplete:
   > "Controller X has endpoints without `[ProducesResponseType]`.
   > Want me to add them before generating the contract?"

## Contract Discrepancies — Always Ask

If the contract conflicts with the project's patterns:
> "The contract defines the route as `/users/{userId}` but your project uses
> GUIDs for public IDs (`/users/{userGuid:guid}`). Should I follow the contract
> exactly, or adapt it to your naming convention?"

If the contract is incomplete:
> "The contract doesn't specify the response for 500 errors. Your project uses
> [existing pattern]. Should I apply that, or leave it undocumented?"

## Anti-patterns
- Do NOT start implementing without parsing the FULL contract first
- Do NOT deviate from the contract's field names, types, or status codes without asking
- Do NOT assume optional/required — check the contract
- Do NOT skip validation rules defined in the contract (minLength, pattern, etc.)
- Do NOT ignore enum values — implement them exactly as specified
- Do NOT mix contract field naming with project naming without asking which wins
- Do NOT generate all endpoints at once — one at a time, verified against the contract
