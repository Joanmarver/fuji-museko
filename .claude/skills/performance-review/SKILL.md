# [PERFORMANCE] Backend Performance Review

## Purpose
Detect performance problems in backend code before they become production incidents.
Focus on the issues that actually matter: slow queries, unnecessary work, and unbounded operations.
**Always ask before applying optimizations.**

## When to Use
- After writing any database query or data processing logic
- User asks to "optimize", "speed up", or "review performance"
- Creating endpoints that handle lists or large datasets
- Before finishing features that involve external API calls

## Step 0 — Understand the project's tools

```bash
# Find caching setup
grep -rn "IMemoryCache\|IDistributedCache\|Redis\|AddMemoryCache\|AddStackExchange" \
  --include="*.cs" | grep -v obj | head -10

# Find pagination
grep -rn "Skip\|Take\|PageSize\|PageNumber\|paginate" --include="*.cs" | grep -v obj | head -10

# Find background jobs
grep -rn "IHostedService\|BackgroundService\|Hangfire\|Quartz\|IJobScheduler" \
  --include="*.cs" | grep -v obj | head -10
```

## Performance Issues to Detect

### Database — The #1 Source of Slowness

| Issue | How to spot | Solution |
|-------|------------|---------|
| **N+1 queries** | Loop that queries DB per item, or lazy loading in a list | `.Include()` / `.ThenInclude()` or batch with `.Where(x => ids.Contains(x.Id))` |
| **No pagination** | List query without `.Skip()/.Take()` | Add pagination parameters |
| **Premature ToList** | `.ToList()` before `.Where()` | Move filter before materialization |
| **SELECT *** | Returning full entities to API | Use `.Select()` to project to DTOs |
| **Missing index** | WHERE/ORDER BY on unindexed column | Add index via migration |
| **No AsNoTracking** | Read-only queries without `.AsNoTracking()` | Add it for read-only operations |
| **Heavy in-memory** | Loading entire table then filtering with LINQ-to-Objects | Move filter to the query (LINQ-to-Entities) |

### Application Code

| Issue | How to spot | Solution |
|-------|------------|---------|
| **Sequential HTTP calls** | Awaiting external calls one by one in a loop | `Task.WhenAll()` for parallel execution |
| **No timeout** | `HttpClient` calls without timeout | Configure `HttpClient.Timeout` |
| **Sync over async** | `.Result` or `.Wait()` on async methods | Use `await` properly |
| **Heavy work in request** | CPU-intensive task blocking the response | Move to `IHostedService` / background job |
| **Large serialization** | Returning entire entity graphs | Create lightweight DTOs |
| **Repeated computation** | Same expensive calculation done multiple times | Cache or compute once |

### Caching Opportunities
Flag to user — don't add caching silently:
> "This endpoint fetches [data] on every request but it changes rarely.
> Want me to add `IMemoryCache` with a [time] TTL?"

## How to Report

> **Performance issue:** [description]
> **Impact:** [what gets slow and when]
> **Suggestion:** [specific fix]
> **Effort:** [quick fix / needs refactor / needs infrastructure]
>
> Want me to fix this?

## Anti-patterns
- Do NOT add caching everywhere — only where the benefit is clear
- Do NOT optimize code that isn't slow — reason about scale first
- Do NOT add infrastructure (Redis, Hangfire) without asking
- Do NOT sacrifice code clarity for micro-optimizations
- Do NOT change existing patterns without asking
