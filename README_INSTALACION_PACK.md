# README_INSTALACION_PACK.md

# Pack spec-driven optimizado — NC Control Tower v2

Este pack prepara el workspace para trabajar con Antigravity/Gemini/MCP de forma controlada, con bajo consumo de tokens y sin salirse de fase.

---

## 1. Qué cambia

Antes:

```text
AGENTS.md demasiado largo o desalineado.
Rutas n8n con typos.
.gemini_instructions.md podía cargar skills automáticamente.
Skills disponibles, pero sin política clara.
Specs solo de 2A.
Futuro documentado de forma limitada.
```

Ahora:

```text
AGENTS.md = router mínimo.
TASK_SPEC = reglas completas de cada tarea.
ROADMAP_SPEC_DRIVEN_VIVO = futuro documentado sin ejecución.
01_TOOLING_IA_WORKFLOW = reglas de coordinación entre Antigravity/Gemini/MCP/skills.
MCP = limitado por READ_SET / WRITE_SET / DO_NOT_TOUCH.
Skills = cerrados por defecto, sugeribles cuando aporten valor.
```

---

## 2. Estructura esperada

```text
crm_nc_tower_v2/
├── AGENTS.md
├── .agents/
│   └── rules/
│       └── 00_NC_CONTROL_TOWER_RULES.md
├── .gemini_instructions.md
├── docs/
│   ├── 00_MASTER/
│   │   ├── 00_ROADMAP_SPEC_DRIVEN_VIVO.md
│   │   └── 01_TOOLING_IA_WORKFLOW.md
│   └── 01_ACTIVO_FASE_2A/
│       └── specs/
├── n8n_workflows/
├── public/
├── skills/
├── _archivo_DO_NOT_READ/
├── package.json
├── server.js
├── sheets.js
└── README_INSTALACION_PACK.md
```

---

## 3. Archivos a colocar en raíz

```text
AGENTS.md
.gemini_instructions.md
README_INSTALACION_PACK.md
```

---

## 4. Archivos a colocar en `.agents/rules/`

```text
.agents/rules/00_NC_CONTROL_TOWER_RULES.md
```

---

## 5. Archivos a colocar en `docs/00_MASTER/`

```text
docs/00_MASTER/00_ROADMAP_SPEC_DRIVEN_VIVO.md
docs/00_MASTER/01_TOOLING_IA_WORKFLOW.md
```

---

## 6. Archivos a colocar en `docs/01_ACTIVO_FASE_2A/specs/`

```text
00_TASKS_FASE2A_INDEX.md
00_TASK_SPEC_TEMPLATE.md
01_TASK_2A_00_AUDIT_WORKSPACE.md
02_TASK_2A_01_SUPABASE_SCHEMA.md
03_TASK_2A_02_BACKEND_MINIMO.md
04_TASK_2A_03_SEED_TEST_DATA.md
05_TASK_2A_04_DASHBOARD_READ_ONLY.md
06_TASK_2A_05_SMOKE_TESTS.md
99_PROMPTS_OPERATIVOS.md
```

Crear si no existe:

```text
docs/01_ACTIVO_FASE_2A/specs/reviews/
```

---

## 7. Qué NO se crea ahora

No crear ahora:

```text
02_SIGUIENTE_FASE_2B/specs/
03_SIGUIENTE_FASE_2C/specs/
FUTURO_FASE_3/specs/
```

Las fases futuras se documentan solo en:

```text
docs/00_MASTER/00_ROADMAP_SPEC_DRIVEN_VIVO.md
```

---

## 8. Política de skills

Los skills existen, pero no se leen por defecto.

Skills disponibles:

```text
skills/frontend-design/SKILL.md
skills/using-superpowers/SKILL.md
skills/using-superpowers/references/gemini-tools.md
```

Regla:

```text
Un agente puede sugerir un skill.
No puede leerlo ni usarlo sin aprobación.
El skill debe añadirse al READ_SET de la TASK_SPEC activa.
```

Uso típico:

```text
frontend-design → solo dashboard/UI/UX.
using-superpowers → solo configuración de herramientas/MCP/Gemini/Antigravity.
```

---

## 9. Primera acción recomendada

Usar el prompt:

```text
docs/01_ACTIVO_FASE_2A/specs/99_PROMPTS_OPERATIVOS.md
```

Sección:

```text
Prompt para ejecutar la primera tarea
```

Primera tarea:

```text
01_TASK_2A_00_AUDIT_WORKSPACE.md
```

---

## 10. Regla final

```text
No se ejecuta el PRD.
Se ejecutan TASK_SPEC pequeñas derivadas del PRD.
No se usan skills por curiosidad.
Se sugieren cuando aportan valor real.
```
