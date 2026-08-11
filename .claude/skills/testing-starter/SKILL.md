# [TESTING] Starter Test Generator

## Purpose
Lower the barrier to testing by generating basic tests alongside new code.
Not exhaustive test suites — just the essential cases that catch real bugs.
**Always ask before modifying existing tests or changing test framework.**

## When to Use
- After creating any new service method, controller, or utility
- User asks to "add tests" or "test this"
- When fixing a bug (write a test that reproduces it first)

## Step 0 — Check if the project has testing set up

```bash
# Find test projects
find . -name "*.csproj" | xargs grep -l "xunit\|nunit\|mstest\|Microsoft.NET.Test" 2>/dev/null

# Find existing tests
find . -name "*Test.cs" -o -name "*Tests.cs" -o -name "*Spec.cs" | grep -v obj | head -10

# Find test utilities, mocks, fixtures
find . -name "*Mock*" -o -name "*Fake*" -o -name "*Fixture*" -o -name "*Helper*" | grep -i test | head -10

# Find mocking framework
grep -rn "Moq\|NSubstitute\|FakeItEasy" --include="*.csproj" | head -5
```

**If tests exist** → read 2-3 examples and replicate exactly.
**If NO tests exist** → ask before setting anything up:
> "The project doesn't have tests yet. Want me to set up [xUnit/NUnit] with [Moq/NSubstitute]
> and start generating basic tests alongside new code?"

## The 3 Essential Test Cases

For every new service method, generate ONLY these 3:

### 1 — Happy path
```csharp
[Fact]
public async Task CreateUser_WithValidData_ReturnsSuccess()
```

### 2 — Invalid input
```csharp
[Fact]
public async Task CreateUser_WithMissingEmail_ReturnsValidationError()
```

### 3 — Business rule failure
```csharp
[Fact]
public async Task CreateUser_WhenUserNotInCompany_ReturnsForbidden()
```

Three tests. Not twenty.

## What to Mock, What Not to Mock

**Mock these** (external boundaries):
- DbContext / Repository layer (use InMemory DB or mock the interface)
- External HTTP calls (HttpClient, third-party APIs)
- File system operations
- Email / notification services
- ILogger (or just let it pass through)

**Do NOT mock these**:
- The function's own logic — that's what you're testing
- Simple utility methods with no side effects
- Mapping/transformation logic

## Bug Fix Testing
When fixing a bug:
1. Write a test that reproduces the bug FIRST (it should fail)
2. Fix the bug
3. Run the test (it should pass now)

## Anti-patterns
- Do NOT generate 20 tests per function — 3 essential cases is enough to start
- Do NOT test private methods — test through the public API
- Do NOT write tests that depend on execution order
- Do NOT mock everything — only external boundaries
- Do NOT modify or delete existing tests without asking first
- Do NOT change the testing framework or structure without asking
