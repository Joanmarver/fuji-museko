# Fuji Museko — Web del restaurante

## Qué es este proyecto

Web de presentación para el restaurante de sushi **Fuji Museko**: hero, carta/menú,
sección de reservas y footer. Es un sitio estático de una sola página (SPA sin
routing), sin backend propio: los datos de la carta viven en código.

## Stack

- **React 19** + **Vite 8** (`@vitejs/plugin-react`)
- **Tailwind CSS 3** (`tailwind.config.js`, `postcss.config.js`)
- **ESLint 10** (`eslint.config.js`) — `npm run lint`
- Sin TypeScript, sin router, sin librería de estado — todo es JS + hooks nativos de React

Scripts (`package.json`):
```
npm run dev       # servidor de desarrollo Vite
npm run build     # build de producción
npm run preview   # preview del build
npm run lint      # eslint .
```

## Estructura

```
src/
  App.jsx              # composición de la página: Navbar, Hero, Menu, Reserva, Footer
  main.jsx             # entry point
  index.css / App.css  # estilos globales + Tailwind
  assets/              # imágenes (logo, hero, fotos de sushi)
  components/
    Navbar.jsx
    Hero.jsx
    Menu.jsx           # renderiza menuCategories / menuItems desde data/menu.js
    Reserva.jsx
    Footer.jsx
  data/
    menu.js            # fuente de verdad de la carta: categorías + platos + precios
  hooks/
    useScrollReveal.js # hook custom para animaciones al hacer scroll
carta.xlsx             # carta en Excel (referencia/origen de los datos, no se lee en runtime)
```

### `src/data/menu.js`

Exporta:
- `menuCategories`: array de `{ key, label }` (pestañas del menú: Nigiris, Rolls, Especiales)
- `menuItems`: objeto `{ [categoryKey]: Array<{ name, desc, price, badge }> }`

`badge` es opcional (`null`, `'Especial'`, `'Chef'`, `'Firma'`, `'Temporada'`...) y se usa
para destacar platos en la UI. Al editar la carta, mantener esta forma de datos.

## Convenciones

- Componentes funcionales, un componente por archivo en `src/components/`.
- Precios como string con formato español: `"3,20 €"` (no números planos).
- Textos de la carta y UI en español.
- Los estilos van con clases de Tailwind directamente en el JSX; evitar CSS a medida
  salvo que Tailwind no lo resuelva bien (entonces va a `App.css`/`index.css`).

## Carpeta `.claude/` (agentes, skills y comandos)

⚠️ **Aviso:** la mayoría de este contenido en `.claude/` fue creado originalmente para
un proyecto backend distinto en **C#/.NET** (una API tipo "IQ Finance", con entidades,
EF Core, controllers). No encaja con este proyecto (React/Vite/JS, sin backend). Se
documenta aquí tal cual existe hoy, pero antes de usar cualquier pieza orientada a C#
en este repo, confirma que tiene sentido o adapta/crea versiones equivalentes para
JS/React.

### `.claude/settings.json` — hooks
- **PreToolUse (Bash):** bloquea comandos peligrosos (`DROP TABLE`, `TRUNCATE`,
  `rm -rf /`, `dotnet ef database update`).
- **Stop:** ejecuta `npm run build` al terminar una tarea y bloquea si falla, mostrando
  las primeras líneas de error (adaptado del `dotnet build` original del proyecto
  fuente, que no aplicaba a este repo).

### `.claude/agents/` (orientados a C#/.NET, no aplican directamente aquí)
| Agente | Para qué sirve |
|---|---|
| `architect` | Analiza arquitectura, revisa organización de código y decisiones de diseño (solo lectura) |
| `bug-hunter` | Investiga bugs siguiendo el flujo endpoint → base de datos (solo lectura) |
| `csharp-expert` | Desarrollo, refactor, testing y logging en C#/.NET, integra las skills locales de C# |
| `db-specialist` | Entity Framework Core, SQL Server, migraciones y queries |
| `refactorer` | Simplifica código C# sin cambiar comportamiento (pide confirmación antes de aplicar) |
| `reviewer` | Revisión de seguridad/performance/calidad de código C# (solo lectura) |

### `.claude/commands/` (comandos slash, pensados para el backend .NET)
| Comando | Qué hace |
|---|---|
| `/new-entity` | Scaffold de una entidad completa: Entity → DB repo → Service → Controller → DTOs |
| `/new-endpoint` | Añade un endpoint a un controller/service existente |
| `/fix-bug` | Investiga y arregla un bug con enfoque estructurado |
| `/read-contract` | Lee un contrato de API y lo resume de forma estructurada |
| `/docs-generator` | Genera/actualiza documentación XML para controllers, services y DTOs (Swagger) |
| `/review` | Revisión pre-commit |

### `.claude/skills/`
Genéricas (podrían reutilizarse tal cual en este proyecto):
- `git-conventions` — convenciones de commits y ramas
- `code-simplification` — reglas de clean code / refactor
- `security-checklist` — checklist de seguridad pre-entrega
- `caveman-mode` — modo de respuestas ultra-breves (activar con `/caveman`)

Específicas del backend .NET origen (no aplican a este repo tal cual):
- `api-contract`, `api-design` — convenciones de endpoints y contratos de API
- `csharp-code-style`, `csharp-pro`, `csharp-method-logging`, `csharp-unit-tests` —
  estilo, patrones modernos, logging y tests unitarios en C#
- `database-queries` — queries/migraciones/acceso a datos con EF Core
- `error-handling` — manejo de errores y validaciones de negocio
- `performance-review` — revisión de performance de backend
- `scaffolding` — generador de plantillas de código
- `testing-starter` — generador de tests base

### `.claude/INTERACTION-PATTERNS.md`
Guía de buenas prácticas para interactuar con Claude Code en este repo: planificar
antes de codear, una tarea a la vez, dar contexto en vez de instrucciones línea a
línea, usar los comandos slash, cuándo empezar una conversación nueva, y revisar
siempre los cambios antes de confiar en ellos. Estas reglas de interacción sí aplican
independientemente del stack.
