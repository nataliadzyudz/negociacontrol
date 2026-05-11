# TASK_2C_1_FICHA_LEAD

**Fase:** 2C  
**Agente:** BACKEND / AUDITOR  
**Estado:** COMPLETADA

---

## 1. Objetivo

```text
Validar que el endpoint GET /api/leads/:id retorna la ficha completa de un lead test incluyendo triage, status_history y notes.
```

---

## 2. CORE_READ_SET

```text
AGENTS.md
/docs/02_ACTIVO_FASE_2C/QUICK_START_FASE2C.md
/backend/src/routes/leads.js
```

---

## 3. CONDITIONAL_READ_SET

```text
/supabase/migrations/*.sql (solo si hay fallo de schema)
```

---

## 4. WRITE_SET

```text
/docs/02_ACTIVO_FASE_2C/specs/reviews/REVIEW_TASK_2C_1.md
/docs/02_ACTIVO_FASE_2C/specs/TASK_2C_1_FICHA_LEAD.md
```

---

## 5. DO_NOT_TOUCH

```text
/server.js
/sheets.js
/package.json
/skills/
/n8n_workflows/productivo
Google Sheets real
datos reales
```

---

## 6. Skills

```text
SKILLS_ALLOWED = NO
```

---

## 7. Reglas Especificas De Esta Tarea

```text
- Solo leads con es_test=true
- Solo en laboratorio
- No modificar estado ni notas
- Solo lectura de ficha completa
```

---

## 8. Pasos

```text
1. Verificar que existe un lead test en Supabase (L-2B1-015601 o crear uno)
2. Llamar GET /api/leads/:id con el ID del lead test
3. Validar respuesta 200 con JSON conteniendo:
   - datos principales del lead
   - lead_triage (si existe)
   - lead_status_history
   - lead_notes
4. Documentar resultado en REVIEW
```

---

## 9. Criterios De Aceptacion Con KPIs

| CA | Criterio | KPI de Exito | Metodo de Verificacion |
|---|---|---|---|
| CA-01 | GET /leads/:id retorna 200 | Status 200 | curl/PowerShell |
| CA-02 |JSON contiene datos principales |nombre, email, telefono visibles|Validar JSON|
| CA-03 |JSON contiene lead_triage |array o null presente|Validar JSON|
| CA-04 |JSON contiene lead_status_history|array presente|Validar JSON|
| CA-05 |JSON contiene lead_notes|array presente|Validar JSON|

---

## 10. Validacion Real Obligatoria

### Checklist De Validacion

| # | Prueba | KPI de Exito | Metodo de Verificacion |
|---|---|---|---|
| 1 | GET /api/leads/:id | Status 200, <500ms | curl/PowerShell |
| 2 | Estructura JSON completa | 5 campos presentes | parse JSON |

### Resultados De Validacion

| Prueba | Resultado | Evidencia |
|---|---|---|
| | | |

---

## 11. Definition Of Done

```text
- Endpoint retorna 200
- JSON contiene lead completo con todas las relaciones
- Solo datos test
- Sin exponer datos reales
```

---

## 12. Rollback

```text
- No requiere rollback (solo lectura)
- Si no hay lead test, usar datos de TASK_2B_1
```

---

## 13. Closeout Obligatorio

```text
1. Crear REVIEW si WRITE_SET lo permite
2. Actualizar estado de TASK_SPEC
3. Declarar FILES_READ
4. Declarar FILES_CHANGED
5. Declarar SKILLS_USED
6. Proponer NEXT_STEP
```

---

## 14. Entrega Esperada

```text
FILES_READ: AGENTS.md, QUICK_START_FASE2C.md, leads.js
FILES_CHANGED: REVIEW_TASK_2C_1.md (creado)
SKILLS_USED: Ninguno
ACCEPTANCE_CHECK: 5/5 CA pasando
RISKS: Ninguno
ROLLBACK: No aplica
NEXT_STEP: TASK_2C_2_ESTADO_OPERATIVO
```