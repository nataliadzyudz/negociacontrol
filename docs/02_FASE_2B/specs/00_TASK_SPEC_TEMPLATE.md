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
/docs/[FASE]/QUICK_START_FASEX.md
/docs/[FASE]/specs/TASK_ACTIVA.md
...
```

Regla:

```text
Leer completo antes de ejecutar.
No sustituye la TASK_SPEC.
```

---

## 3. CONDITIONAL_READ_SET

Leer solo si hay fallo, ambigüedad, validación específica o decisión técnica:

```text
...
```

Regla:

```text
No leer por defecto.
Justificar en FILES_READ por qué se leyó.
```

---

## 4. WRITE_SET

Solo puede crear/modificar:

```text
...
```

Incluir cierre documental si aplica:

```text
/docs/[FASE]/specs/reviews/REVIEW_[TASK].md
/docs/[FASE]/specs/TASK_ACTIVA.md
/docs/[FASE]/specs/00_TASKS_FASEX_INDEX.md
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

## 7. Reglas Especificas De Esta Tarea

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

## 9. Criterios De Aceptacion Con KPIs

| CA | Criterio | KPI de Exito | Metodo de Verificacion |
|---|---|---|---|
| CA-01 | [nombre] | [metrica medible] | [metodo] |
| CA-02 | [nombre] | [metrica medible] | [metodo] |

Regla:

```text
Cada CA debe tener KPI cuantificable: status code, tiempo de respuesta, numero de registros, archivo creado, etc.
```

---

## 10. Validacion Real Obligatoria

Antes de marcar la tarea como `COMPLETADA`, ejecutar pruebas reales y registrar resultados.

### Checklist De Validacion

| # | Prueba | KPI de Exito | Metodo de Verificacion |
|---|---|---|---|
| 1 | [Health/API] | Status 200, <500ms | curl/PowerShell |
| 2 | [Insercion] | Registro creado | API/query lab |
| 3 | [Lectura] | Datos visibles via API | validar JSON |

### Resultados De Validacion

| Prueba | Resultado | Evidencia |
|---|---|---|
| | | |

Si una prueba no puede ejecutarse, registrar `PENDIENTE` con razón y recomendar `CORREGIONES` si bloquea un CA.

---

## 11. Definition Of Done

```text
Qué debe cumplirse para cerrar la tarea.
```

---

## 12. Rollback

```text
Cómo deshacer cambios o limpiar datos test.
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

## 14. Entrega Esperada

```text
FILES_READ
FILES_CHANGED
SKILLS_USED
ACCEPTANCE_CHECK
RISKS
ROLLBACK
NEXT_STEP
```
