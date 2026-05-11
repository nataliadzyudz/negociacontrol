# 01_TASK_2A_00_AUDIT_WORKSPACE.md

**Fase:** 2A  
**Agente:** ORQUESTADOR + AUDITOR  
**Estado:** APROBADA

---

## 1. Objetivo

Auditar el workspace real antes de construir Fase 2A.

Resultado: un informe que clasifique qué existe, qué es legado, qué queda bloqueado y qué puede reutilizarse.

---

## 2. READ_SET

Solo puede leer:

```text
AGENTS.md
.gemini_instructions.md
README_INSTALACION_PACK.md
.agents/rules/00_NC_CONTROL_TOWER_RULES.md
/docs/01_ACTIVO_FASE_2A/
/public/
/package.json
/server.js
/sheets.js
estructura de carpetas de primer nivel
```

Puede comprobar existencia, sin leer contenido interno, de:

```text
/n8n_workflows/
/skills/
/_archivo_DO_NOT_READ/
```

---

## 3. WRITE_SET

Solo puede crear:

```text
/docs/01_ACTIVO_FASE_2A/specs/reviews/REVIEW_2A_00_WORKSPACE_AUDIT.md
```

---

## 4. DO_NOT_TOUCH

No puede modificar nada salvo crear el informe.

No puede leer:

```text
/n8n_workflows/
/n8n_worklows/
/n8n_workwolws/
/skills/
/_archivo_DO_NOT_READ/
/docs/00_MASTER/
/docs/02_SIGUIENTE_FASE_2B/
/docs/03_SIGUIENTE_FASE_2C/
/docs/FUTURO_FASE_3/
```

---

## 5. Skills

```text
SKILLS_ALLOWED = NO
```

Si el agente cree que necesita un skill, debe proponer SKILL_SUGGESTION y esperar aprobación.

---

## 6. Reglas específicas

```text
No arreglar.
No refactorizar.
No mover.
No borrar.
No renombrar.
Solo auditar y clasificar.
```

Clasificar cada archivo/carpeta como:

```text
ACTIVO_FASE_2A
READ_ONLY_LEGADO
BLOQUEADO
FUTURO
ARCHIVO
REVISAR_MANUAL
```

---

## 7. Pasos

```text
1. Listar estructura raíz.
2. Verificar que la carpeta n8n real se llama /n8n_workflows/.
3. Verificar que .gemini_instructions.md es mínimo y no carga skills automáticamente.
4. Verificar que package.json, server.js y sheets.js existen y quedan read-only/legado.
5. Revisar docs activos de Fase 2A.
6. Revisar public como referencia visual/legado técnico.
7. Crear informe.
8. Proponer la siguiente TASK_SPEC a ejecutar.
```

---

## 8. Criterios de aceptación

```text
CA-01 Existe REVIEW_2A_00_WORKSPACE_AUDIT.md.
CA-02 No se modifica código.
CA-03 No se lee n8n_workflows.
CA-04 No se lee skills.
CA-05 No se lee _archivo_DO_NOT_READ.
CA-06 Cada archivo raíz queda clasificado.
CA-07 Se recomienda siguiente tarea.
```

---

## 9. Definition of Done

```text
El informe permite decidir si se puede pasar a TASK_2A_01_SUPABASE_SCHEMA sin riesgo de arrastrar legado.
```

---

## 10. Rollback

Eliminar el informe creado.

---

## 11. Entrega esperada

```text
Resumen ejecutivo.
Tabla de archivos/carpeta.
Riesgos.
SKILLS_USED = NO.
Siguiente tarea recomendada.
Confirmación de que no se modificó código.
```
