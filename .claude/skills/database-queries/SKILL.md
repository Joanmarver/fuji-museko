# [DATABASE] Queries, Migrations & Data Access Patterns

## Purpose
Generate consistent, performant database operations by learning the project's existing
data access patterns. Detect common problems and flag them before they reach production.
**Always ask before correcting or changing existing patterns.**

## When to Use
- Creating new tables, entities, or migrations
- Writing queries, repository methods, or data access logic
- User asks for CRUD operations or data-related features
- Reviewing existing database code

## Step 0 — Learn the project's DB patterns FIRST

```bash
# Find DbContext
find . -name "*DbContext.cs" -o -name "*Context.cs" | grep -v obj | head -5

# Find entities
find . -name "*.cs" -path "*/Entities/*" -o -name "*.cs" -path "*/Models/*" | grep -v obj | head -15

# Find repositories / data access layer
find . -name "*Repository.cs" -o -name "*Repo.cs" -o -name "*DB.cs" | grep -v obj | head -10

# Find migration files
find . -path "*/Migrations/*.cs" | head -5

# Find how queries are written (EF Core patterns)
grep -rn "Include\|ThenInclude\|Where\|Select\|FirstOrDefault\|ToListAsync\|FindAsync" \
  --include="*.cs" | grep -v obj | head -15

# Find transaction usage
grep -rn "BeginTransaction\|SaveChangesAsync\|ExecutionStrategy" --include="*.cs" | grep -v obj | head -10
```

**Adopt the existing approach. If you spot issues, ASK before changing.**

## Rules for New Database Code

### 1 — Migrations
- Match the project's existing migration naming convention
- Every schema change needs a migration — never modify DB manually
- One logical change per migration
- Always run after creating:
```bash
dotnet ef migrations add <Name>
# Ask before running: dotnet ef database update
```

### 2 — Queries (EF Core)
- Follow the project's existing query style
- Always paginate list endpoints — never return unbounded result sets
- Use `Select()` to project only needed fields when returning DTOs
- Never concatenate user input into raw SQL — use parameterized queries
- Use `AsNoTracking()` for read-only queries
- Use async methods: `ToListAsync()`, `FirstOrDefaultAsync()`, `SaveChangesAsync()`

### 3 — Transactions
- Wrap multi-table writes in a transaction or rely on single `SaveChangesAsync()`
- Keep transaction scope short — do validation BEFORE the transaction
- Handle concurrency conflicts (`DbUpdateConcurrencyException`)

### 4 — Relationships & Loading
- Match the project's loading strategy (eager `.Include()` vs explicit vs lazy)
- Avoid N+1: don't query inside a loop — use `.Include()` or batch with `.Where(x => ids.Contains(x.Id))`

## Problem Detection — Flag These

| Problem | Sign | Ask the user |
|---------|------|-------------|
| N+1 query | Query inside a foreach/loop | "This queries the DB N times in a loop. Refactor to a single query?" |
| No pagination | List query without `.Take()`/`.Skip()` | "This returns all results with no limit. Add pagination?" |
| Missing index | WHERE/ORDER on an unindexed column | "Column X is filtered but has no index. Add a migration for it?" |
| Premature ToList | `.ToList()` before `.Where()` | "This loads the entire table then filters in memory. Move the filter before ToList?" |
| No soft-delete filter | Query returns inactive records | "This doesn't filter inactive records. Should it?" |
| No transaction | Multiple SaveChanges in one operation | "These writes should probably be atomic. Wrap in a transaction?" |

**Always ask — never auto-fix database issues silently.**

## Anti-patterns
- Do NOT change the ORM patterns the project already uses
- Do NOT create raw SQL if the project uses EF Core (or vice versa)
- Do NOT skip migrations and modify schema directly
- Do NOT write queries that return unlimited rows for list endpoints
- Do NOT use string concatenation for query values
- Do NOT run `dotnet ef database update` without asking
