---
name: csharp-method-logging
description: Add quality logging to a C# method using the project's LogHelper (IQInvoiceAPI/Helper/LogHelper.cs) — info logs tracing what's happening at each step, and exception logs that always pass the caught exception. Use when the user asks to add, create, or improve logging/logs for a method or class.
risk: unknown
source: project
---

## Use this skill when

- User asks to add/create logs for a method, service, or controller.
- User asks to improve traceability/observability of existing code.

## Do not use this skill when

- Task is unrelated to logging.
- User asks for a different logging library/approach explicitly (Serilog direct calls, etc.) — confirm first, this skill is specifically about `LogHelper`.

## LogHelper API

`IQInvoiceAPI/Helper/LogHelper.cs`:

```csharp
LogHelper.LogInfo(ILogger logger, List<string> logMessages);
LogHelper.LogException(ILogger logger, Exception ex, List<string> logMessages = null);
```

## Instructions

1. Class needs a logger dependency: `private readonly ILogger<ClassName> _logger;`, injected via constructor and assigned like every other field (see [[csharp-code-style]] for spacing/naming conventions).
2. Trace what's happening at every meaningful step with `LogHelper.LogInfo(_logger, new List<string> { "..." })` — not just entry/exit. Log:
   - Method entry, with the key input identifiers (id, cifnif, guid) — never secrets.
   - Before/after each significant DB call or external call whose outcome affects the flow.
   - Every early-return guard clause, right before the `return` — log *why* it's returning, matching the Spanish message already sent to the caller.
   - Branch decisions (`if/else`) that change behavior — log which branch was taken.
3. Every `catch (Exception ex)` block always calls `LogHelper.LogException(_logger, ex, logMessages)` — the exception is mandatory, never swallow it silently. `logMessages` is optional; pass context (which document/customer was being processed) when available.
4. Never log secrets: certificate passwords, tokens, full request bodies with credentials. Log identifiers (ids, guids, cifnif), not sensitive payload contents.
5. Log messages are Spanish, short, descriptive of the action/state — consistent with the project's Spanish comments/error-message convention.

## Example

Full worked example: `resources/example.cs`. Names in it (`ClassName`, `DoSomethingAsync`, `ResultType`, ...) are placeholders — copy the shape, swap in real names.

## Checklist before reporting done

- [ ] `ILogger<ClassName> _logger` injected and assigned
- [ ] `LogHelper.LogInfo` at entry, before each significant step/branch, and before every guard-clause early return
- [ ] `LogHelper.LogException` in every catch, exception always passed
- [ ] No secrets/credentials in any log message
- [ ] Log messages Spanish, short, include relevant identifiers
