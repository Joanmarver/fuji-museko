---
description: Add a new endpoint to an existing controller/service
argument-hint: [HTTP method + route + description, e.g. "POST /reports/{id}/submit - submit a report for review"]
---

Add a new endpoint: **$ARGUMENTS**

**Before starting, read these skills:**
- `.claude/skills/api-design/SKILL.md` — [API-DESIGN] endpoint conventions
- `.claude/skills/scaffolding/SKILL.md` — [SCAFFOLDING] template patterns
- `.claude/skills/error-handling/SKILL.md` — [ERROR-HANDLING] error & validation patterns

## Step 1 — Study the existing chain
Read the current Controller, Service, and *DB repo for this entity.
Understand the existing patterns before adding anything.

## Step 2 — Plan (ASK before coding)
Present:
- Route: `[method] api/v{version}/...`
- Request DTO needed? (new `*Request` in Common)
- Response DTO needed? (new `*Result` in Common)
- Business validations needed (ownership, state checks, role checks)
- DB query needed (new method in *DB repo?)

**Wait for my approval.**

## Step 3 — Create DTOs (if needed)
In `Common/Models/Request/` and/or `Common/Models/Response/`.
Match existing naming: `*Request`, `*Result`.

## Step 4 — Add DB method (if needed)
In the existing `*DB.cs` repository. Filter by `IsActive`.

## Step 5 — Add Service method
In the existing `*Service.cs`:
- Ownership validation via `IHelperValidation`
- Business logic validation (ASK if unclear)
- Return `ResponseHelper<T>`
- try/catch → `.Fail(ex.Message)`

## Step 6 — Add Controller action
In the existing `*Controller.cs`:
- `[Authorize]`, correct HTTP method attribute
- Route uses `IdentifierGuid`, not `int Id`
- Thin: call Service, return `ResponseHelper<T>.Return(this, response)`
- XML comment for Swagger (in Spanish)

## Step 7 — Verify
```bash
dotnet build
```
