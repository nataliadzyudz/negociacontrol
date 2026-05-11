# REVIEW_2B_1_BACKEND_INSERT_TEST_LEAD.md

**Tarea:** TASK_2B_1_BACKEND_INSERT_TEST_LEAD  
**Fase:** 2B  
**Fecha:** 2026-05-08  
**Estado:** APROBADA

---

## 1. Resumen

La insercion controlada de un lead test via backend fue validada correctamente contra Supabase laboratorio.

Resultado:

```text
APROBAR
```

---

## 2. Payload Usado

```json
{
  "lead_code": "L-2B1-015601",
  "nombre": "Smoke Test 2B1",
  "email": "smoke.2b1.L-2B1-015601@example.com",
  "whatsapp": "34600000201",
  "idioma_preferido": "Espanol",
  "esta_en_espana": "Si",
  "situacion_actual": "Aun no lo tengo claro",
  "origen_ingresos": "Espana",
  "duda_principal": "Alta de autonomo",
  "explicacion_caso": "Lead test controlado para validar insercion Fase 2B.1.",
  "urgencia": "Solo estoy explorando",
  "consentimiento_original": "Consentimiento test de laboratorio.",
  "consentimiento_valido": true,
  "email_valido": true,
  "whatsapp_valido": true
}
```

Nota: se uso un `lead_code` corto unico porque la columna `leads.lead_code` es `VARCHAR(20)`.

---

## 3. Evidencia Ejecutada

Comando ejecutado desde `/backend/`:

```powershell
Start-Job { powershell -NoProfile -ExecutionPolicy Bypass -File ".\run.ps1" }
Invoke-RestMethod http://localhost:3001/api/health
Invoke-RestMethod http://localhost:3001/api/leads
Invoke-RestMethod http://localhost:3001/api/intake/test -Method Post
Invoke-RestMethod http://localhost:3001/api/leads
```

Resultado real:

```text
HEALTH_STATUS=ok
HEALTH_MS=67
HEALTH_SERVICE=nc-control-tower-backend
HEALTH_PHASE=2A
BEFORE_COUNT=7
BEFORE_MS=237
POST_SUCCESS=True
POST_MS=174
POST_LEAD_CODE=L-2B1-015601
POST_ES_TEST=True
POST_ID=9e562096-12ab-425f-99f3-19a9fc41e7ee
AFTER_COUNT=8
AFTER_MS=111
FOUND_IN_LEADS=True
FOUND_ES_TEST=True
FOUND_STATUS=NUEVO
```

---

## 4. Criterios De Aceptacion

| CA | Criterio | Resultado | Evidencia |
|---|---|---|---|
| CA-01 | Health OK | PASS | Status `ok`, 67 ms |
| CA-02 | Insercion controlada | PASS | `POST_SUCCESS=True`, 174 ms |
| CA-03 | Lead test guardado | PASS | `POST_LEAD_CODE=L-2B1-015601` |
| CA-04 | `es_test=true` | PASS | `POST_ES_TEST=True`, `FOUND_ES_TEST=True` |
| CA-05 | Estado inicial creado | PASS | `FOUND_STATUS=NUEVO` |
| CA-06 | No datos reales | PASS | Payload test, dominio `example.com` |
| CA-07 | No n8n/Sheets | PASS | No se leyo ni ejecuto n8n/Sheets |
| CA-08 | Sin automatizacion sensible | PASS | No mensajes, pagos ni calendario |
| CA-09 | Informe creado | PASS | Este review |
| CA-10 | SKILLS_USED = NO | PASS | No se cargaron skills |

---

## 5. Riesgos Y Observaciones

| Riesgo / Observacion | Severidad | Mitigacion |
|---|---|---|
| Backend health reporta `phase=2A` aunque se ejecuta TASK 2B.1 | Baja | Registrar como deuda menor; no bloquea insercion test |
| `lead_code` tiene limite `VARCHAR(20)` | Baja | Usar codigos cortos en pruebas futuras |
| n8n no validado | Media | Crear TASK separada para n8n lab si se aprueba |

---

## 6. Rollback

Lead test creado para posible limpieza manual en Supabase laboratorio:

```text
lead_code = L-2B1-015601
id = 9e562096-12ab-425f-99f3-19a9fc41e7ee
```

No se ejecuto rollback porque la tarea requería validar persistencia y lectura posterior.

---

## 7. FILES_READ

CORE_READ_SET:

```text
AGENTS.md
/docs/02_ACTIVO_FASE_2B/QUICK_START_FASE2B.md
/docs/02_ACTIVO_FASE_2B/specs/01_TASK_2B_1_BACKEND_INSERT_TEST_LEAD.md
/backend/src/routes/leads.js
/backend/src/validators/lead.js
/backend/src/lib/supabase.js
```

CONDITIONAL_READ_SET:

```text
/docs/02_ACTIVO_FASE_2B/specs/00_TASKS_FASE2B_INDEX.md — necesario para actualizar progreso al cierre.
```

---

## 8. FILES_CHANGED

```text
/docs/02_ACTIVO_FASE_2B/specs/reviews/REVIEW_2B_1_BACKEND_INSERT_TEST_LEAD.md
/docs/02_ACTIVO_FASE_2B/specs/01_TASK_2B_1_BACKEND_INSERT_TEST_LEAD.md
/docs/02_ACTIVO_FASE_2B/specs/00_TASKS_FASE2B_INDEX.md
```

---

## 9. SKILLS_USED

```text
SKILLS_USED = NO
```

---

## 10. ACCEPTANCE_CHECK

```text
TASK_2B_1 = APROBADA
Backend inserta lead test controlado.
Lead queda es_test=true.
Lead aparece en lectura posterior.
Estado inicial NUEVO creado.
No se toco n8n.
No se toco Sheets.
No se activo automatizacion sensible.
```

---

## 11. NEXT_STEP

Proponer, no ejecutar automaticamente:

```text
TASK_2B_2_N8N_LAB_INTAKE_TEST
```

Objetivo sugerido: validar n8n lab con lead test sin tocar workflows productivos ni activar envios.
