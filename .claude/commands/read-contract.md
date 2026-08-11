---
description: Read an API contract and parse it into a structured summary
argument-hint: [file path to contract, or "swagger" to read from project's Swagger endpoint]
---

Read and analyze the API contract: **$ARGUMENTS**

**Before starting, read this skill:**
- `.claude/skills/api-contract/SKILL.md` — [API-CONTRACT] contract reading rules

## Steps

### 1. Identify the format
Is it a Markdown (.md) file? OpenAPI/Swagger JSON? YAML? Postman collection? PDF?

Markdown is the team's primary contract format. If it's a .md file:
- Read the ENTIRE file first
- Identify endpoint definitions (headers with HTTP methods and routes)
- Identify request/response schemas (JSON blocks, tables, or field lists)
- Identify status codes and error definitions
- Identify auth requirements
- Flag anything ambiguous or missing

### 2. Parse the full contract
Read the ENTIRE file before presenting anything.

### 3. Present structured summary
```
## Contract Summary

### Base URL: [url]
### Auth: [type]
### Endpoints: [count]

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| GET | /api/v1/... | ... | Yes/No |

### Models: [count]
- ModelName: { field (type, required/optional), ... }

### Ambiguities / Missing info:
- [anything unclear]
```

### 4. Ask what to do next
> "Contract parsed. What would you like to do?
> - Implement endpoints (one by one)
> - Validate existing code against this contract
> - Generate client/consumer code
> - Something else?"
