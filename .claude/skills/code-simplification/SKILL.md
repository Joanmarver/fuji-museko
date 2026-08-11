# [CODE-SIMPLIFICATION] Clean Code & Refactoring Rules

## Purpose
Write the simplest possible code that solves the problem. When refactoring,
reduce complexity without changing behavior. Prioritize readability over cleverness.
**Always ask before changing existing code.**

## When to Use
- Writing any new code (apply these rules by default)
- User says "simplify", "clean up", "refactor", or "make it simpler"
- Reviewing code and spotting unnecessary complexity

## Step 0 — Understand the user's style FIRST

```bash
# Read a few representative files
find . -name "*.cs" -not -path "*/Migrations/*" -not -path "*/obj/*" -not -path "*/bin/*" | head -5 | xargs head -80
```

**If the user's code doesn't follow the rules below, DO NOT auto-correct. Ask first:**
> "I notice you use [pattern]. Would you like me to simplify this, or keep your current style?"

**The rules below apply to NEW code by default. For EXISTING code, always ask.**

## Rules — Apply in Order (for new code)

### 1 — Early returns over nesting
```csharp
// BAD
public User GetUser(int id)
{
    if (id > 0)
    {
        var user = _db.Find(id);
        if (user != null)
        {
            if (user.IsActive)
                return user;
            else
                return null;
        }
        else return null;
    }
    else return null;
}

// GOOD
public User GetUser(int id)
{
    if (id <= 0) return null;
    var user = _db.Find(id);
    if (user is null || !user.IsActive) return null;
    return user;
}
```

### 2 — One method, one job
Signs a method does too much:
- Name uses "And" (e.g. `ValidateAndSave`)
- Longer than ~30 lines
- More than 3-4 parameters
- You need `#region` or comments to separate "sections"

### 3 — Name things by what they ARE
```csharp
// BAD
var data = GetData();
var result = Process(items);
var temp = Calculate();

// GOOD
var unpaidInvoices = GetUnpaidInvoices();
var activeUsers = FilterActiveUsers(allUsers);
var monthlyRevenue = CalculateMonthlyRevenue();
```

### 4 — Remove dead code, don't comment it out
If it's in git, it's recoverable. Commented-out code is noise.
**Before deleting, ask:**
> "I found commented-out code in [file]. Want me to remove it?"

### 5 — Flatten data transformations
```csharp
// BAD
var ids = new List<int>();
foreach (var user in users)
{
    if (user.IsActive)
        ids.Add(user.Id);
}

// GOOD
var ids = users.Where(u => u.IsActive).Select(u => u.Id).ToList();
```
Use LINQ when it's shorter AND clearer. If the chain becomes complex,
use intermediate variables with descriptive names.

### 6 — Avoid premature abstraction
Do NOT create:
- A base class with only one subclass
- A factory for only one type
- A generic utility used in only one place
- An interface implemented by only one class (unless needed for DI/testing)

### 7 — Constants over magic values
```csharp
// BAD
if (user.RoleId == 3)
if (retryCount > 5)

// GOOD
if (user.RoleId == Roles.Admin)
if (retryCount > MaxRetries)
```

### 8 — Reduce scope of variables
Declare variables as close as possible to where they're used.
Use `var` when the type is obvious from the right side.

## Refactoring Workflow (existing code)
1. **Read the whole file first**
2. **Run `dotnet build`** — make sure it passes before touching anything
3. **Propose changes before applying:**
   > "I'd suggest these simplifications for [file]:
   > - [change 1]: [why]
   > - [change 2]: [why]
   > Apply all, some, or none?"
4. **Simplify in small steps** — verify after each
5. **Do NOT change behavior** — simplification preserves functionality
6. **Run `dotnet build` after each change**

## Anti-patterns
- Do NOT make code "clever" — if it needs a comment to explain the trick, rewrite it
- Do NOT over-abstract to reduce duplication — small duplication beats bad abstraction
- Do NOT refactor outside the scope of what was asked
- Do NOT change method signatures without checking all call sites
- Do NOT auto-correct the user's existing style without asking first
