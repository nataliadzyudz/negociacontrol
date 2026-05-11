# TASK_2C_4_EVENTOS

**Fase:** 2C  
**Agente:** BACKEND / AUDITOR  
**Estado:** COMPLETADA

---

## 1. Objetivo

```text
Validar que el endpoint POST /api/leads/:id/events permite registrar eventos de auditoría y los persiste en lead_events.
```

---

## 2. CORE_READ_SET

```text
AGENTS.md
/docs/02_ACTIVO_FASE_2C/QUICK_START_FASE2C.md
/backend/src/routes/leads.js
/supabase/migrations/001_create_tables_p0.sql
```

---

## 3. CONDITIONAL_READ_SET

```text
None - tabla verificada en migrations
```

---

## 4. WRITE_SET

```text
/docs/02_ACTIVO_FASE_2C/specs/reviews/REVIEW_TASK_2C_4.md
/docs/02_ACTIVO_FASE_2C/specs/TASK_2C_4_EVENTOS.md
/backend/src/routes/leads.js (endpoint events agregado)
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
- event_type obligatorio
- Solo tipos válidos del enum event_type
```

---

## 8. Pasos

```text
1. Usar lead test existente (9e562096-12ab-425f-99f3-19a9fc41e7ee)
2. Llamar POST /api/leads/:id/events con event_type=NOTA_CREADA
3. Validar respuesta 201
4. Verificar registro en lead_events
5. Documentar resultado en REVIEW
```

---

## 9. Criterios De Aceptacion Con KPIs

| CA | Criterio | KPI de Exito | Metodo de Verificacion |
|---|---|---|---|
| CA-01 | POST /leads/:id/events retorna 201 | Status 201 | curl/PowerShell |
| CA-02 | JSON contiene event_type | tipo presente | Validar JSON |
| CA-03 | JSON contiene lead_id | ID presente | Validar JSON |
| CA-04 | Registro en lead_events | Evento persistido | GET lead_id/events |
| CA-05 | source presente | origen registrado | Validar JSON |

---

## 10. Validacion Real Obligatoria

### Checklist De Validacion

| # | Prueba | KPI de Exito | Metodo de Verificacion |
|---|---|---|---|
| 1 | POST /leads/:id/events | Status 201 | curl/PowerShell |
| 2 | event_type presente | tipo!=empty | Validar JSON |
| 3 | lead_id correcto | ID coincide | Validar JSON |
| 4 | Source registrado | source presente | Validar JSON |

### Resultados De Validacion

| Prueba | Resultado | Evidencia |
|---|---|---|
| | | |

---

## 11. Definition Of Done

```text
- Endpoint retorna 201
- Evento guardado en lead_events
- lead_id y event_type correctos
- Solo datos test
```

---

## 12. Rollback

```text
- No requiere rollback (es laboratorio)
- Endpoint agregado es controlado
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
FILES_READ: AGENTS.md, QUICK_START_FASE2C.md, leads.js, 001_create_tables_p0.sql
FILES_CHANGED: leads.js (endpoint events), REVIEW_TASK_2C_4.md
SKILLS_USED: Ninguno
ACCEPTANCE_CHECK: 5/5 CA pasando
RISKS: Ninguno
ROLLBACK: No aplica
NEXT_STEP: TASK_2C_5_ACCIONES_CONTROLADAS
```