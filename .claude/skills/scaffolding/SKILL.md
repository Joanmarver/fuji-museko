# [SCAFFOLDING] Code Template Generator

## Purpose
Generate repetitive backend structures (controllers, services, repositories, DTOs)
following the project's established patterns instead of inventing new ones.
**Always ask before correcting or changing existing patterns.**

## When to Use
- User asks to create a new controller, service, repository, or DTO
- User says "create CRUD for [entity]" or "add endpoint for [resource]"
- Any new file that follows an existing pattern in the codebase

## Step 0 — Learn the project's patterns FIRST

```bash
# Find existing controllers, services, repositories
find . -name "*Controller.cs" -o -name "*Service.cs" -o -name "*Repository.cs" -o -name "*DB.cs" | head -10

# Find DTOs / request-response models
find . -name "*Request.cs" -o -name "*Response.cs" -o -name "*Result.cs" -o -name "*Dto.cs" | head -10

# Find the DI registration
grep -rn "AddScoped\|AddTransient\|AddSingleton" --include="*.cs" | head -15

# Find the DbContext
find . -name "*DbContext.cs" | head -5

# Read the most complete controller as reference
head -80 $(find . -name "*Controller.cs" | head -1) 2>/dev/null
```

Read the results. Replicate the existing patterns exactly.

**If you find patterns that look inconsistent or improvable, DO NOT fix them silently. Ask first:**
> "I see your controllers follow [pattern A], but [file] uses [pattern B].
> Which one should I follow? Or want me to suggest a unified approach?"

## Workflow

### Step 1 — Replicate, don't invent
Match the existing pattern exactly:
- Same file naming convention (PascalCase, suffixes like Controller/Service/DB)
- Same folder location
- Same using/import order
- Same class structure (inheritance, interfaces, constructors)
- Same attribute/decorator patterns ([Authorize], [HttpGet], [Route], etc.)
- Same response format
- Same error handling approach

### Step 2 — Adapt only what changes
Replace only entity-specific parts:
- Entity name and types
- Route paths / endpoints
- Validation rules specific to this entity
- Business logic unique to this entity

### Step 3 — Generate related files together
When creating a new resource, list what you'll generate and CONFIRM before writing:
> "For [Entity], I'll create these files following your existing pattern:
> - Entity class
> - DTO / Request / Response models
> - Repository + interface
> - Service + interface
> - Controller
> - DbContext DbSet + migration
> - DI registration in Program.cs
>
> Does this match what you need, or should I skip/add any?"

### Step 4 — Verify
```bash
dotnet build
```

## Anti-patterns
- Do NOT invent a new file structure if one already exists
- Do NOT add extra layers of abstraction the project doesn't use
- Do NOT skip generating related files without asking
- Do NOT change the response format — match what existing endpoints return
- Do NOT add NuGet packages the project doesn't already use without asking
- Do NOT correct existing patterns silently — always ask first

## Template Variables
<!-- Fill these per project -->
```
Controller location:  [e.g. Controllers/]
Service location:     [e.g. Services/]
Repository location:  [e.g. Repositories/ or Models/]
Entity location:      [e.g. DataContext/Entities/ or Models/]
DTO location:         [e.g. DTOs/ or Models/Request/ + Models/Response/]
Route prefix:         [e.g. api/v{version}/]
Response format:      [e.g. custom wrapper, ActionResult<T>, IActionResult]
Naming convention:    [e.g. EntityController.cs, EntityService.cs]
```
