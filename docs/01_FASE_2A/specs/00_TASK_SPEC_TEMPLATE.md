# 00_TASK_SPEC_TEMPLATE.md

# TASK_[ID]_[NOMBRE]

**Fase:** [FASE]  
**Agente:** ORQUESTADOR / DB / BACKEND / DASHBOARD / AUDITOR  
**Estado:** BORRADOR / APROBADA / EN_BUILD / EN_REVISION / COMPLETADA / CORREGIONES

---

## 1. Objetivo

```text
Resultado técnico exacto.
```

---

## 2. CORE_READ_SET

Lectura obligatoria mínima:

```text
AGENTS.md
QUICK_START de la fase activa
TASK_SPEC activa
...
```

---

## 3. CONDITIONAL_READ_SET

Leer solo si hay fallo, ambigüedad, validación específica o decisión técnica:

```text
...
```

---

## 4. WRITE_SET

Solo puede crear/modificar:

```text
...
```

---

## 5. DO_NOT_TOUCH

No puede leer/modificar:

```text
...
```

---

## 6. Skills

Estado:

```text
SKILLS_ALLOWED = NO / SI_CON_APROBACION / SI
```

Skills permitidos, si aplica:

```text
/skills/...
```

Regla:

```text
No usar skills no listados.
Si hace falta un skill, proponer SKILL_SUGGESTION antes de leerlo.
```

---

## 7. Reglas específicas de esta tarea

```text
Reglas técnicas, seguridad, límites y decisiones que aplican solo aquí.
```

---

## 8. Pasos

```text
1.
2.
3.
```

---

## 9. Criterios de aceptación (con KPIs)

```text
CA-01 [nombre] - KPI: [métrica medible]
CA-02 [nombre] - KPI: [métrica medible]
CA-03 [nombre] - KPI: [métrica medible]
```

**Regla:** Cada CA debe tener un KPI quantifiable (status code, tiempo de respuesta, número de registros, etc.)

---

## 10. Validación Real Obligatoria

**Regla:** Antes de marcar la tarea como COMPLETADA, el subagente debe ejecutar las pruebas de validación y registrar los resultados.

### Checklist de Validación

| # | Prueba | KPI de Éxito | Método de Verificación |
|---|---|---|---|
| 1 | [Health/API] | Status 200, <500ms | curl/wget |
| 2 | [Inserción] | Registro creado en DB | Query directa |
| 3 | [Lectura] | Datos visibles via API | curl + validar JSON |
| 4 | [Dashboard] | Sin errores JS console | Browser check |
| 5 | [Read-only] | Botones escritura deshabilitados | UI inspection |

### Resultados de Validación

| Prueba | Resultado | Evidencia |
|---|---|---|
| | | |

**Nota:** Si una prueba no puede ejecutarse (ej: requiere credenciales), debe documentarse como "PENDIENTE" con razón.

---

## 11. Definition of Done

```text
Qué debe cumplirse para cerrar la tarea.
```

---

## 12. Rollback

```text
Cómo deshacer los cambios.
```

---

## 13. Closeout Obligatorio

Al completar la tarea:

```text
1. Crear/actualizar REVIEW si WRITE_SET lo permite.
2. Actualizar estado de esta TASK_SPEC si WRITE_SET lo permite.
3. Actualizar índice de fase si WRITE_SET lo permite.
4. Declarar FILES_READ.
5. Declarar FILES_CHANGED.
6. Declarar SKILLS_USED.
7. Declarar ACCEPTANCE_CHECK.
8. Proponer NEXT_STEP.
9. No ejecutar NEXT_STEP sin aprobación.
```

---

## 14. Entrega esperada

```text
FILES_READ
FILES_CHANGED
SKILLS_USED
ACCEPTANCE_CHECK
NEXT_STEP
```
