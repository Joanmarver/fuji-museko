---
description: Scaffold a full entity chain (Entity → DB repo → Service → Controller → DTOs)
argument-hint: [EntityName]
---

Create a complete entity chain for **$ARGUMENTS** following the project's existing patterns.

**Before starting, read these skills:**
- `.claude/skills/scaffolding/SKILL.md` — [SCAFFOLDING] template patterns
- `.claude/skills/database-queries/SKILL.md` — [DATABASE] migration & query patterns
- `.claude/skills/api-design/SKILL.md` — [API-DESIGN] endpoint conventions
- `.claude/skills/error-handling/SKILL.md` — [ERROR-HANDLING] error & validation patterns

## Steps — execute in order, verify each before continuing

### 1. Study existing patterns first
Before writing anything, read one complete example chain. Pick the most recent/complete entity:
- An Entity in `DataContext/Entities/`
- Its `*DB.cs` repository in `Models/`
- Its `I*DB` interface
- Its Service in `Services/`
- Its Controller in `Controllers/`
- Its DTOs in `Common/Models/Request/` and `Common/Models/Response/`

### 2. Create the Entity
- File: `IQQuantumVSMEAPI/DataContext/Entities/$ARGUMENTS.cs`
- Include: `int Id`, `Guid IdentifierGuid = Guid.NewGuid()`, `bool IsActive = true`, `byte[] Version` (Timestamp)
- Add domain-specific properties — ASK me what fields this entity needs

### 3. Update VSMEDbContext
- Add `DbSet<$ARGUMENTS>` to `VSMEDbContext.cs`
- Add relationships and indexes in `OnModelCreating` matching existing patterns

### 4. Create EF Migration
```bash
dotnet ef migrations add Add$ARGUMENTS --project IQQuantumVSMEAPI
```

### 5. Create DTOs in Common
- `Common/Models/Request/Create$ARGUMENTSRequest.cs`
- `Common/Models/Request/Update$ARGUMENTSRequest.cs`
- `Common/Models/Response/$ARGUMENTSResult.cs`
- Map `IdentifierGuid` in Result, never `int Id`

### 6. Create DB Repository
- `IQQuantumVSMEAPI/Models/I$ARGUMENTSDB.cs` (interface)
- `IQQuantumVSMEAPI/Models/$ARGUMENTSDB.cs` (implementation)
- Use primary constructor: `class $ARGUMENTSDB(VSMEDbContext db)`
- Filter by `IsActive` in all queries

### 7. Create Service
- `IQQuantumVSMEAPI/Services/I$ARGUMENTSService.cs` (interface)
- `IQQuantumVSMEAPI/Services/$ARGUMENTSService.cs` (implementation)
- Return `ResponseHelper<T>` with proper error codes
- Include ownership validation via `IHelperValidation`
- Wrap in try/catch → `.Fail(ex.Message)`

### 8. Create Controller
- `IQQuantumVSMEAPI/Controllers/$ARGUMENTSController.cs`
- `[Authorize]`, API versioning, routes use `{companyGuid:guid}`
- Thin layer: only calls Service and returns `ResponseHelper<T>.Return(this, response)`

### 9. Register DI
- Add `builder.Services.AddScoped<I$ARGUMENTSDB, $ARGUMENTSDB>()` in `Program.cs`
- Add `builder.Services.AddScoped<I$ARGUMENTSService, $ARGUMENTSService>()` in `Program.cs`

### 10. Verify
```bash
dotnet build
```
Fix any errors before presenting the result.

## IMPORTANT
- ASK me about the entity's fields before creating anything
(schema, naming and language conventions: see `CLAUDE.md`)
