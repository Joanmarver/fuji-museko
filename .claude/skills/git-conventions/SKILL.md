# [GIT] Commit & Branch Conventions

## Purpose
Maintain a clean, navigable git history. Every commit should be a logical unit of work
that can be understood, reviewed, and reverted independently.
**Always ask before changing the project's existing git conventions.**

## When to Use
- Before every commit Claude creates
- When the user asks to "commit this" or "save progress"
- At the end of any completed task

## Step 0 — Learn the project's git conventions

```bash
# Read existing commit history
git log --oneline -20

# Check for branch naming conventions
git branch -a | head -15

# Check for git hooks
ls .husky/ 2>/dev/null; ls .git/hooks/ 2>/dev/null | grep -v ".sample"
```

**If the project has conventions** → follow them exactly.
**If inconsistent or improvable, ASK first.**
**If no conventions** → suggest the defaults below and ask before applying.

## Default Commit Message Format

```
type(scope): short description
```

**Types:**
```
feat     — new feature or endpoint
fix      — bug fix
refactor — code change that doesn't add feature or fix bug
test     — adding or updating tests
docs     — documentation only
chore    — maintenance (dependencies, config, CI)
perf     — performance improvement
security — security fix or improvement
```

**Scope** = the module or area: `auth`, `users`, `orders`, `db`, `api`

**Examples:**
```
feat(users): add company membership validation
fix(orders): prevent cancellation of shipped orders
refactor(auth): extract token refresh to separate service
test(invoices): add tests for payment status transitions
chore(deps): update EF Core to 10.x
```

## When to Commit
One commit per logical change.
- Finished a function → commit
- Fixed a bug → commit (separate from feature work)
- Refactored → commit (separate from behavior changes)
- Added tests → commit (with the feature, or separate if retroactive)

## Pre-Commit Checklist
- [ ] `dotnet build` passes without errors
- [ ] No `Console.WriteLine` debugging left
- [ ] No commented-out code added
- [ ] No appsettings.json with real secrets staged
- [ ] Commit message follows the project's format

```bash
dotnet build
git diff --cached --name-only  # Review what's staged
```

## Anti-patterns
- Do NOT create "WIP" or "misc changes" commits
- Do NOT commit broken code that doesn't build
- Do NOT bundle unrelated changes in one commit
- Do NOT commit generated files (bin/, obj/, Migrations/ModelSnapshot if not needed)
- Do NOT amend or rebase pushed commits without asking
- Do NOT change the project's existing commit style without asking first
