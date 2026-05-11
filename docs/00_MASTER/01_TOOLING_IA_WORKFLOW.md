# 01_TOOLING_IA_WORKFLOW.md

# Workflow entre herramientas IA — NC Control Tower v2

**Estado:** referencia operativa  
**No es:** TASK_SPEC ejecutable  
**Leer solo si la tarea toca:** Antigravity, Gemini, MCP, skills, AGENTS.md, `.gemini_instructions.md` o configuración de editor IA.

---

## 1. Objetivo

Alinear Antigravity/Gemini/MCP para trabajar en modo spec-driven sin cargar contexto innecesario.

---

## 2. Jerarquía operativa

```text
AGENTS.md
→ TASK_SPEC activa
→ READ_SET de la tarea
→ documentos autorizados
→ skills autorizados, si aplica
```

No se construye desde:

```text
PRD completo
carpetas futuras
skills por defecto
_archivo_DO_NOT_READ
```

---

## 3. Roles

### Orquestador

```text
Divide tareas.
Propone o crea TASK_SPEC.
Propone uso de skills si procede.
No escribe código salvo documentación/specs.
```

### Subagente

```text
Ejecuta solo una TASK_SPEC.
Lee solo READ_SET.
Escribe solo WRITE_SET.
No amplía su propio alcance.
No usa skills sin autorización.
```

### Auditor

```text
Revisa seguridad, alcance, aceptación y rollback.
No implementa mejoras no pedidas.
```

---

## 4. Política de skills

Los skills son herramientas auxiliares. No son doctrina del proyecto.

Uso recomendado:

```text
frontend-design/SKILL.md
```

Solo para UI/UX/dashboard.

```text
using-superpowers/SKILL.md
using-superpowers/references/gemini-tools.md
```

Solo para configuración de herramientas, MCP, Gemini o Antigravity.

No usar skills para:

```text
Supabase schema básico
seed test data
backend mínimo estándar
auditoría inicial
smoke tests simples
n8n congelado
```

---

## 5. Formato SKILL_SUGGESTION

```text
SKILL_SUGGESTION:
Skill solicitado:
Tarea:
Motivo:
READ_SET adicional propuesto:
Riesgo de usarlo:
Riesgo de no usarlo:
Recomendación:
```

Una SKILL_SUGGESTION no autoriza lectura ni ejecución.

---

## 6. Flujo correcto por tarea

```text
1. Natalia indica tarea o TASK_SPEC.
2. Agente lee AGENTS.md.
3. Agente lee TASK_SPEC.
4. Agente declara FILES_TO_READ / FILES_TO_CHANGE / SKILLS_REQUESTED.
5. Agente devuelve PLAN.
6. Natalia aprueba.
7. Agente ejecuta.
8. Agente devuelve FILES_READ / FILES_CHANGED / SKILLS_USED / ACCEPTANCE_CHECK.
9. Auditor revisa.
10. Natalia decide.
```

---

## 7. Regla de freno

```text
Si una acción requiere salir de READ_SET o WRITE_SET, se para.
Se propone SPEC_SUGGESTION.
No se improvisa.
```

---

## 8. Checklist de verificación obligatoria

Antes de ejecutar cualquier tarea, el agente DEBE verificar:

### 8.1 Verificar estructura real

```text
1. Explorar /public/ - verificar si existe frontend
2. Buscar index.html - entrada web (siempre verificar antes de concluir "no existe")
3. Glob *.html - buscar cualquier entrada web
4. Verificar carpeta /backend/ existe
5. Verificar /supabase/ existe
```

### 8.2 Verificar docs de fase

```text
1. Leer AGENTS.md para confirmar fase activa
2. Leer QUICK_START de fase activa
3. Leer índice de tareas (00_TASKS_FASE*_INDEX.md)
```

### 8.3 Verificar docs futuros para contexto

```text
/docs/03_SIGUIENTE_FASE_2C/03_FASE2C_DASHBOARD_OPERATIVO_CONTROLADO.md
/docs/02_SIGUIENTE_FASE_2B/02_FASE2B_MIGRACION_SHEETS_SUPABASE.md
/docs/FUTURO_FASE_3/04_FASE3_PRODUCCION_SUPABASE.md
```

No construir desde estos docs. Solo leer para contexto.

### 8.4 Regla de confianza

```text
Si confidence < 5%:
- NO asumir.
- Preguntar.
- Pedir clarificación.
```

---

## 9. Actualizacion de documents

El ORQUESTADOR es responsable de mantener actualizados:

```text
00_TASKS_FASE*_INDEX.md - índice de tareas
QUICK_START_FASEX.md - inicio de fase
ROADMAP_SPEC_DRIVEN_VIVO.md - estado vivo
TASK_SPEC activa - con estado real
```
