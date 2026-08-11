# Interaction Patterns — How to Get the Best Results from Claude Code

## Rule #1 — Plan Before Code

For any task that touches more than one file, ALWAYS start with:

```
"Analyze [task]. Show me the plan of what files you'll create/modify and what changes
you'll make in each. Wait for my approval before writing any code."
```

This prevents Claude from going down the wrong path and wasting 200 lines of code.

**Exception:** trivial changes (rename a variable, fix a typo) → just do it.

## Rule #2 — One Task at a Time

BAD:
```
"Add the Invoice entity with CRUD endpoints, fix the bug in Reports, and also
refactor the auth middleware"
```

GOOD:
```
"Add the Invoice entity. Use /new-entity Invoice"
```
Then, in the SAME session after it's done:
```
"Now fix the bug in Reports: [description]. Use /fix-bug [description]"
```

Small tasks, verified one by one. If one fails, you know exactly what broke.

## Rule #3 — Give Context, Not Instructions

BAD (too vague):
```
"Make the report endpoint better"
```

BAD (too prescriptive, you're doing Claude's job):
```
"Add a try-catch in line 45 of ReportService.cs, then add a null check on line 32,
then change the return type to..."
```

GOOD (context + goal):
```
"The GET /reports endpoint returns 500 when the company has no reports instead of
an empty list. The issue is probably in ReportService.GetAll(). Fix it."
```

Tell Claude WHAT's wrong and WHERE, let it figure out HOW.

## Rule #4 — Use Your Commands

Instead of typing long prompts every time:

| Task | Command |
|------|---------|
| New entity + full chain | `/new-entity InvoiceLine` |
| New endpoint on existing entity | `/new-endpoint "PATCH /reports/{guid}/status - change report status"` |
| Fix a bug | `/fix-bug "Reports endpoint returns 500 for companies with no reports"` |
| Pre-commit check | `/review` |

## Rule #5 — When to Start a New Conversation

Start fresh when:
- The conversation exceeds ~30-40 messages (Claude starts "forgetting" earlier context)
- Claude repeats the same mistake after 2 corrections
- You switch to a completely unrelated task
- Claude seems confused about the current state of the code

When starting fresh, give a brief summary:
```
"I'm working on [task]. So far I've done [X, Y]. The current issue is [Z].
Files involved: [list]. Continue from here."
```

## Rule #6 — Review, Don't Trust Blindly

Always check: database/migration changes, security/ownership checks, and that
schema conventions from `CLAUDE.md` (soft-delete, IdentifierGuid) were respected.
These are the areas where AI mistakes cost the most.

## Rule #7 — Feedback Loop

When Claude makes a mistake, be specific:

BAD:
```
"That's wrong, try again"
```

GOOD:
```
"The query in ReportDB.GetByCompany() doesn't filter by IsActive. All queries
must filter IsActive == true. Fix it and check if other queries in the same file
have the same issue."
```

Specific feedback → Claude learns within the session and applies the correction everywhere.

## Daily Workflow Summary

```
1. Open Claude Code in your project
2. Claude auto-loads CLAUDE.md + skills
3. Start with your task → use /commands when they fit
4. Review the plan before Claude executes
5. After each change → hooks auto-run dotnet build
6. Before committing → /review
7. Commit with clear message → continue or new session
```

## Available Skills

See the `## Skills` section in `CLAUDE.md` for the full list and when to use each.
You can also tell Claude explicitly: *"Follow the [SECURITY] skill for this task"*
