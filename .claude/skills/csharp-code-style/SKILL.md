---
name: csharp-code-style
description: Enforce this project's C# formatting conventions (Allman braces, spacing around operators, blank-line separation between logical steps, guard-clause style, Spanish error/comment text). Use whenever writing or editing C# code in this repo, or when reviewing a diff for style.
risk: unknown
source: project
---

## Use this skill when

- Writing new C# code (classes, methods, controllers, services) in this repo.
- Editing existing C# files and adding non-trivial blocks.
- Reviewing a diff for style consistency before commit.

## Do not use this skill when

- Task is not C# (JS, n8n, docs, etc.).
- Only touching test files — follow [[csharp-unit-tests]] naming/structure rules instead (this skill's spacing rules still apply there too).

## Reference

Full worked example: `resources/example.cs`. Names in it (`ClassName`, `DoSomethingAsync`, `ResultType`, ...) are placeholders — copy the shape, swap in real names.

## Instructions

### Indentation and braces

- Tabs for indentation, not spaces.
- Allman style: opening `{` on its own line, for classes, methods, `if`, `foreach`, `try`/`catch`, `using`.

```csharp
public async Task<ResponseHelper<ResultType>> DoSomethingAsync(RequestType request)
{
	var response = new ResultType();
	...
}
```

### Spacing around operators — always, no exceptions

One space before and after `=`, `==`, `!=`, `&&`, `||`, `+`, arrow `=>`. Non-negotiable — inconsistent spacing (`_field=value;`, `Prop =value,`) has crept into parts of this codebase; don't add more of it.

```csharp
// Good
_dependency = dependency;
var entity = await _db.Entities.FirstOrDefaultAsync(x => x.Id == id);

// Bad — do not write this
_dependency=dependency;
Prop =value,
```

### Guard clauses — no braces for a single-statement if

Early-return checks stay on two lines, no braces, blank line before and after:

```csharp
var entity = await _db.Entities.FirstOrDefaultAsync(x => x.Id == id);

if (entity == null)
	return ResponseHelper<ResultType>.Incorrect("No se ha encontrado el registro solicitado");

var related = await _db.RelatedEntities...
```

Use braces only once the `if` body has more than one statement. Same rule for `foreach`: no braces for a single-statement loop, braces once it's multi-statement.

```csharp
// single statement — no braces
foreach (var item in items)
	ids.Add(item.Id);

// multi-statement — braces
foreach (var item in items)
{
	item.Processed = true;
	_db.Update(item);
}
```

### Blank lines separate logical steps

Insert one blank line between distinct steps of a method (a query, then a check on its result, then the next query) — not between every single line, but wherever a new "step" of the logic begins. A declaration immediately followed by its own guard clause gets no blank line between them; the blank line goes *after* the guard, before the next unrelated step.

### Object initializers

One property per line, trailing comma after the last property, closing `};` on its own line:

```csharp
var log = new LogEntity
{
	CreationDate = DateTime.Now,
	EntityId = entity.Id,
	Action = "Process",
	Detail = request.Detail,
};
```

### Naming

- Injected dependencies: `_camelCase` (`_db`, `_dependencyOne`).
- Constructor-computed / config fields (not injected as-is): `camelCase` no underscore (`configValue`, `testingMode`).
- Local variables: `var` by default.
- Lambda parameter for LINQ predicates: `x` (`x => x.Id == id`).
- Async methods: `Async` suffix.

### Comments and user-facing messages

- Comments in Spanish, explain *why*, placed on the line above the code they clarify — not restating what the code obviously does.
- Error messages returned to the caller (`ResponseHelper<T>.Incorrect(...)`, `.Conflict(...)`) are Spanish, user-facing sentences, e.g. `"No se ha encontrado el registro solicitado"`.
- `catch (Exception ex)` returns `.Conflict($"Error al <acción>: {ex.Message}")` — keep that phrasing pattern.

## Checklist before reporting done

- [ ] Tabs, Allman braces
- [ ] Space before and after every `=`, `==`, `&&`, `||`, `=>`
- [ ] Single-statement `if`/`foreach` have no braces; multi-statement ones do
- [ ] Blank line between logical steps, not between every line
- [ ] Object initializers: one property per line, trailing comma
- [ ] `_camelCase` for injected fields, `camelCase` for computed fields
- [ ] Spanish comments (why, not what) and Spanish user-facing error messages
