---
description: Generate or update XML documentation for controllers, services, and DTOs to improve Swagger output
argument-hint: [file or folder path, or "all" for entire project]
---

Generate/update XML documentation for: **$ARGUMENTS**

**Before starting, read these skills:**
- `.claude/skills/api-design/SKILL.md` — [API-DESIGN] endpoint conventions

## Step 0 — Understand the project's doc style

```bash
# Check if XML docs are enabled in csproj
grep -rn "GenerateDocumentationFile\|DocumentationFile" --include="*.csproj" | head -5

# Find existing XML comments to match the style
grep -B2 -A5 "/// <summary>" --include="*.cs" | head -40

# Find Swagger/OpenAPI config
grep -rn "SwaggerDoc\|AddSwaggerGen\|SwaggerGen\|OpenApi" --include="*.cs" | head -10
```

If XML docs are NOT enabled, ask:
> "XML documentation generation is not enabled in the .csproj.
> Want me to add `<GenerateDocumentationFile>true</GenerateDocumentationFile>`?"

## Step 1 — Read existing documentation style

Before writing any docs, read 2-3 already documented files and replicate:
- Language (Spanish / English — match existing)
- Level of detail (minimal vs verbose)
- Which tags are used (summary, param, returns, remarks, response, example)

**If styles are inconsistent, ask which to follow.**

## Step 2 — What to document

### Controllers (highest priority — this is what Swagger shows)
```csharp
/// <summary>
/// Obtiene todos los informes de una empresa.
/// </summary>
/// <param name="companyGuid">Identificador de la empresa.</param>
/// <param name="page">Número de página (default: 1).</param>
/// <param name="pageSize">Elementos por página (default: 20).</param>
/// <returns>Lista paginada de informes.</returns>
/// <response code="200">Lista de informes obtenida correctamente.</response>
/// <response code="403">El usuario no pertenece a la empresa.</response>
/// <response code="404">Empresa no encontrada.</response>
[HttpGet]
[ProducesResponseType(typeof(PaginatedResult<ReportResult>), 200)]
[ProducesResponseType(403)]
[ProducesResponseType(404)]
public async Task<IActionResult> GetAll(...)
```

### DTOs / Request / Response models
```csharp
/// <summary>
/// Datos necesarios para crear un informe.
/// </summary>
public class CreateReportRequest
{
    /// <summary>
    /// Período del informe (formato: "2024-Q1").
    /// </summary>
    [Required]
    public string Period { get; set; }

    /// <summary>
    /// Módulo del informe.
    /// </summary>
    /// <example>BASICO</example>
    public ModuleEnum Module { get; set; }
}
```

### Services (secondary — for developer reference, not Swagger)
```csharp
/// <summary>
/// Crea un nuevo informe para la empresa especificada.
/// Valida que el usuario pertenezca a la empresa y que no exista
/// un informe duplicado para el mismo período.
/// </summary>
```

### What NOT to document
- Private methods (unless complex logic)
- Obvious getters/setters
- Migration files
- Auto-generated code

## Step 3 — Generate the docs

For each file:
1. Read the complete file
2. Identify all public classes, methods, properties without XML docs
3. Generate docs matching the project's existing style
4. Present what you'll add and ASK before applying:
   > "I'll add XML docs to these members in [file]:
   > - [method 1]: summary + params + returns + response codes
   > - [method 2]: summary + params
   > - [property 1]: summary + example
   >
   > Apply?"

## Step 4 — Add Swagger attributes where missing

If controller methods lack `[ProducesResponseType]`, suggest adding them:
```csharp
[ProducesResponseType(typeof(ReportResult), StatusCodes.Status200OK)]
[ProducesResponseType(StatusCodes.Status404NotFound)]
[ProducesResponseType(StatusCodes.Status403Forbidden)]
```

## Step 5 — Verify
```bash
dotnet build
```
Check for warnings about missing XML docs (if enabled with `<NoWarn>` removed).

## Rules
- Match existing doc language (Spanish / English) — do NOT mix
- Do NOT over-document obvious things
- Do NOT change code logic while adding docs
- Do NOT remove existing docs — only add or improve
- Always ask before applying changes
