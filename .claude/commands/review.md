---
description: Pre-commit review — security, performance, and code quality checks
---

Run a full review of all modified files before committing.

**Before starting, read these skills:**
- `.claude/skills/security-checklist/SKILL.md` — [SECURITY] security review
- `.claude/skills/performance-review/SKILL.md` — [PERFORMANCE] performance checks
- `.claude/skills/code-simplification/SKILL.md` — [CODE-SIMPLIFICATION] code quality
- `.claude/skills/git-conventions/SKILL.md` — [GIT] commit conventions

## Step 1 — Identify what changed
```bash
git diff --name-only HEAD
git diff --cached --name-only
```

## Step 2 — Build check
```bash
dotnet build
```
If build fails, stop and fix before continuing.

## Step 3 — Security review (for each changed file)
Check:
- [ ] No hardcoded secrets, connection strings, or API keys
- [ ] All endpoints have `[Authorize]` where needed
- [ ] Ownership validation via `HelperValidation` is present (UsersCompanies check)
- [ ] No `int Id` exposed in API responses — only `IdentifierGuid`
- [ ] Input validation exists before business logic
- [ ] No raw SQL with string concatenation
- [ ] Sensitive data not logged (passwords, tokens)

## Step 4 — Performance review (for each changed file)
Check:
- [ ] No N+1 queries (loop querying inside a loop)
- [ ] List queries have pagination (no unbounded results)
- [ ] `IsActive` filter present in all queries
- [ ] No `SELECT *` when only a few fields are needed
- [ ] Async/await used correctly (no `.Result` or `.Wait()`)
- [ ] External calls have timeout handling

## Step 5 — Code quality
Check:
- [ ] Layering respected: Controller → Service → *DB → DbContext
- [ ] Services return `ResponseHelper<T>`, not raw entities
- [ ] Error handling: try/catch with `.Fail(ex.Message)`
- [ ] No commented-out code added
- [ ] No `console.log` / `Console.WriteLine` debugging left
- [ ] Comments are in Spanish

## Step 6 — Report
Present a summary:
- **✅ Passed**: items that are clean
- **⚠️ Warnings**: minor issues (suggest fix, ask if I want to apply)
- **❌ Blockers**: issues that MUST be fixed before commit

For each blocker/warning, explain: what the issue is, where it is, and the specific fix.
ASK before applying any fix.
