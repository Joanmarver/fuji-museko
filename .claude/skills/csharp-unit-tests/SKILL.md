---
name: csharp-unit-tests
description: Generate generic unit tests for any C#/.NET project using an in-memory database (EF Core InMemory), xUnit, Moq, and the Builder pattern. All method names (production code, builders, helpers) are in English; only the test method's trailing description is in Spanish. Use when the user asks to create, add, or improve unit tests, test coverage, or a test project in this repo.
risk: unknown
source: project
---

## Use this skill when

- The user asks to create unit tests for a service, repository, controller, or class.
- The user wants a new test project set up from scratch.
- The user wants tests that use an in-memory database instead of a real SQL Server instance.
- The user asks to improve test coverage or refactor existing tests to follow better practices.

## Do not use this skill when

- The task is about integration/E2E tests against a real database or external system.
- The task is unrelated to .NET/C# testing.

## Instructions

1. Identify the target class(es) to test (service, repository, controller, etc.) and its dependencies.
2. If no test project exists yet, create one following the "Test Project Setup" section below.
3. Set up an in-memory `DbContext` fixture so each test suite/class gets an isolated, disposable database instance — never share state between tests.
4. For entities used as test data, create a **Builder** class (`XxxBuilder`) with sensible defaults and fluent `With...()` / `Build()` / `Default()` methods, in **English**, instead of hardcoding objects inline.
5. Write tests following the **Arrange / Act / Assert** pattern, one behavior per test.
6. Name every test method with the pattern `MethodUnderTest_condicionYResultadoEnEspañol` (see naming convention below): the leading segment is the **English** name of the method being tested (matching the real method name, `Async` suffix dropped); everything after the first underscore is a Spanish description of the condition and expected outcome. This is a hard requirement.
7. All other identifiers — class names, builder methods, helper methods, variables — stay in **English**, regardless of the surrounding codebase's language. Spanish only appears in the description portion of test method names.
8. Mock only **external dependencies** (HTTP clients, email/SMS providers, third-party APIs). Never mock the in-memory `DbContext` or repositories under test — exercise them for real against the in-memory database.
9. Cover: happy path, edge cases (null/empty/invalid input), not-found cases, and any branching business logic.
10. Use specific assertions (`Assert.Equal`, `Assert.Contains`, `Assert.Throws<T>`) — avoid generic `Assert.True(x == y)`.
11. Run `dotnet test` to confirm everything passes before reporting completion.

If detailed examples are required, open `resources/examples.md`.

## Test naming convention

Pattern: `MethodUnderTest_condicionYResultadoEsperadoEnEspañol`

- `MethodUnderTest` — English, matches the real method name being exercised (drop the `Async` suffix).
- Everything after the first `_` — Spanish, describing condition + expected result, using `Debe...` / `NoDebe...` phrasing.

Examples:
- `CreateCategory_ConDatosValidos_DebeInsertarEnLaBaseDatos`
- `CreateCategory_ConCodigoVacio_DebeLanzarArgumentException`
- `GetById_ConIdNoExistente_DebeRetornarNulo`
- `DeleteUser_ConIdExistente_DebeEliminarDeLaBaseDatos`
- `SendNotification_SiEmailFalla_DebeUsarSmsComoAlternativa`

## Checklist before reporting done

- [ ] All tests pass locally (`dotnet test`)
- [ ] Test names follow `MethodUnderTest_condicionYResultadoEnEspañol` (English method name, Spanish description)
- [ ] All other identifiers (classes, builders, helpers) are in English
- [ ] Arrange / Act / Assert clearly separated
- [ ] Test data built via Builders, not hardcoded inline
- [ ] In-memory database isolated per test (unique DB name / fresh context)
- [ ] Only external dependencies mocked, not the DB
- [ ] Specific assertions used, not generic boolean checks
- [ ] Edge cases and not-found paths covered, not just the happy path
