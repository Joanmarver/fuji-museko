---
description: Investigate and fix a bug with structured approach
argument-hint: [description of the bug]
---

Fix the following bug: **$ARGUMENTS**

**Before starting, read these skills:**
- `.claude/skills/error-handling/SKILL.md` — [ERROR-HANDLING] error & validation patterns
- `.claude/skills/code-simplification/SKILL.md` — [CODE-SIMPLIFICATION] clean code rules

## Step 1 — Understand before touching
DO NOT start coding. First:
- Identify which endpoint/service/entity is involved
- Read the full request chain: Controller → Service → *DB
- Understand the expected behavior vs actual behavior

Present your analysis:
> "The bug is in [location]. The expected behavior is [X] but it does [Y] because [root cause]."

**Wait for my confirmation before proceeding.**

## Step 2 — Locate the root cause
```bash
# Search for related code
grep -rn "[relevant term]" --include="*.cs" IQQuantumVSMEAPI/
```
Read the relevant files completely, don't just skim.

## Step 3 — Propose the fix
Explain:
- What you'll change and why
- What side effects this could have
- Whether this affects the DB schema (needs migration?)

**Wait for my approval before applying.**

## Step 4 — Apply the fix
Make the minimal change needed. Do NOT:
- Refactor surrounding code
- "Improve" things you noticed while fixing
- Change method signatures unless absolutely necessary

## Step 5 — Verify
```bash
dotnet build
```

## Step 6 — Suggest a commit
Propose a commit message following the project's format:
```
fix(scope): description of what was fixed
```
