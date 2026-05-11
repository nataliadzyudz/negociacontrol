# 99_PROMPTS_OPERATIVOS.md

# Prompts operativos — Fase 2A spec-driven

---

## 1. Prompt para ORQUESTADOR

```text
Lee AGENTS.md.
Lee /docs/01_ACTIVO_FASE_2A/specs/00_TASKS_FASE2A_INDEX.md.

Estamos en Fase 2A.
Actúa como ORQUESTADOR spec-driven.

No escribas código.
No modifiques /public, /backend, /supabase, /n8n_workflows, /skills, archivos root ni docs maestros.

Tarea:
Crear o revisar la TASK_SPEC indicada por Natalia.

Obligatorio:
1. Definir READ_SET mínimo.
2. Definir WRITE_SET estricto.
3. Definir DO_NOT_TOUCH.
4. Definir SKILLS_ALLOWED.
5. Meter dentro de la TASK_SPEC las reglas específicas de esa tarea.
6. No cargar PRD maestro salvo duda crítica.
7. No cargar reglas IA salvo si la tarea toca IA/triaje.
8. No cargar skills salvo que Natalia lo apruebe.
9. Optimizar tokens.
10. Si aparece algo futuro, registrarlo como TODO_FUTURO, SPEC_SUGGESTION o SKILL_SUGGESTION en el roadmap vivo.

Primero devuelve PLAN.
No escribas código hasta aprobación.
```

---

## 2. Prompt para SUBAGENTE

```text
Lee AGENTS.md.
Lee SOLO esta TASK_SPEC:

/docs/01_ACTIVO_FASE_2A/specs/[NOMBRE_TASK_SPEC].md

Lee SOLO los archivos indicados en READ_SET.
No leas nada fuera del READ_SET.
No modifiques nada fuera del WRITE_SET.
No toques DO_NOT_TOUCH.
No uses /skills salvo que la TASK_SPEC lo permita y Natalia lo haya aprobado.

Usa MCP/herramientas solo dentro de esos límites.

Durante esta tarea, si detectas que hace falta una nueva TASK_SPEC, no la crees automáticamente y no la ejecutes.

Primero propónmela con este formato:

SPEC_SUGGESTION:
Nombre sugerido:
Fase:
Motivo:
READ_SET propuesto:
WRITE_SET propuesto:
DO_NOT_TOUCH propuesto:
Skills propuestos, si aplica:
Riesgo si se ejecuta dentro de la spec actual:
Recomendación:

Si detectas que hace falta un skill, no lo leas todavía. Propón:

SKILL_SUGGESTION:
Skill solicitado:
Tarea:
Motivo:
READ_SET adicional propuesto:
Riesgo de usarlo:
Riesgo de no usarlo:
Recomendación:

No construyas nada fuera de la TASK_SPEC activa.

Primero devuelve:
1. Fase detectada.
2. TASK_SPEC leída.
3. FILES_TO_READ.
4. FILES_TO_CHANGE.
5. SKILLS_REQUESTED.
6. PLAN.
7. RIESGOS.
8. ROLLBACK.

No escribas código hasta aprobación.
```

---

## 3. Prompt para ejecutar la primera tarea

```text
Lee AGENTS.md.
Lee /docs/01_ACTIVO_FASE_2A/specs/01_TASK_2A_00_AUDIT_WORKSPACE.md.

Actúa como ORQUESTADOR/AUDITOR.

Usa MCP solo dentro del READ_SET.
No modifiques nada fuera del WRITE_SET.
No leas DO_NOT_TOUCH.
No leas /skills.
No leas /n8n_workflows.
No leas /_archivo_DO_NOT_READ.

Objetivo:
Auditar el workspace real antes de construir Fase 2A.

Confirma especialmente:
1. que existe /n8n_workflows/ y está bloqueada;
2. que .gemini_instructions.md es mínimo y no carga skills automáticamente;
3. que package.json, server.js y sheets.js quedan como legado/read-only;
4. que los skills solo se sugieren si hacen falta.

Si detectas una tarea nueva, no la ejecutes.
Propón SPEC_SUGGESTION.
Si detectas que haría falta un skill, propón SKILL_SUGGESTION.
Si detectas algo de fase futura, regístralo solo como TODO_FUTURO o SPEC_SUGGESTION en el roadmap vivo.

Primero devuelve:
1. Fase detectada.
2. TASK_SPEC leída.
3. FILES_TO_READ.
4. FILES_TO_CHANGE.
5. SKILLS_REQUESTED.
6. PLAN.
7. RIESGOS.
8. ROLLBACK.

No escribas código hasta aprobación.
```

---

## 4. Prompt para registrar TODO_FUTURO

```text
Durante esta tarea ha aparecido un punto que pertenece a una fase futura.

No lo implementes.
No crees specs futuras.

Regístralo en:
/docs/00_MASTER/00_ROADMAP_SPEC_DRIVEN_VIVO.md

Formato:
[FECHA] [TAREA] Hallazgo:
Impacto:
Fase afectada:
Acción futura:
```

---

## 5. Prompt para proponer nueva TASK_SPEC

```text
Durante esta tarea has detectado que hace falta una nueva TASK_SPEC.

No la crees automáticamente.
No la ejecutes.
No modifiques AGENTS.md.

Devuelve solo esta propuesta:

SPEC_SUGGESTION:
Nombre sugerido:
Fase:
Motivo:
READ_SET propuesto:
WRITE_SET propuesto:
DO_NOT_TOUCH propuesto:
Skills propuestos, si aplica:
Riesgo si se ejecuta dentro de la spec actual:
Recomendación:

Después espera aprobación de Natalia.
```

---

## 6. Prompt para proponer uso de skill

```text
Durante esta tarea has detectado que podría ser útil usar un skill.

No leas el skill todavía.
No lo uses.
No modifiques la TASK_SPEC.

Devuelve solo esta propuesta:

SKILL_SUGGESTION:
Skill solicitado:
Tarea:
Motivo:
READ_SET adicional propuesto:
Riesgo de usarlo:
Riesgo de no usarlo:
Recomendación:

Después espera aprobación de Natalia.
```

---

## 7. Prompt para que el ORQUESTADOR cree una TASK_SPEC aprobada

```text
Lee AGENTS.md.
Lee /docs/01_ACTIVO_FASE_2A/specs/00_TASK_SPEC_TEMPLATE.md.
Lee la SPEC_SUGGESTION aprobada por Natalia.

Actúa como ORQUESTADOR.

Crea la TASK_SPEC aprobada en:
/docs/01_ACTIVO_FASE_2A/specs/

No escribas código.
No ejecutes la tarea.
No modifiques archivos fuera de /docs/01_ACTIVO_FASE_2A/specs/.

La TASK_SPEC debe incluir:
1. Objetivo.
2. READ_SET mínimo.
3. WRITE_SET estricto.
4. DO_NOT_TOUCH.
5. SKILLS_ALLOWED.
6. Reglas específicas.
7. Pasos.
8. Criterios de aceptación.
9. Definition of Done.
10. Rollback.
11. Entrega esperada.

Primero devuelve PLAN.
No crees el archivo hasta aprobación.
```
