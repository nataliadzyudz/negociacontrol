# 01_TASK_2B_1_BACKEND_INSERT_TEST_LEAD.md

**Fase:** 2B  
**Agente:** BACKEND / AUDITOR  
**Estado:** COMPLETADA

---

## 1. Objetivo

Validar insercion controlada de un lead de laboratorio via backend usando `POST /api/intake/test`, sin datos reales, sin Google Sheets y sin automatizacion sensible.

Esta tarea valida solo:

```text
backend -> Supabase
```

n8n queda fuera de ejecucion en esta TASK_SPEC. Si esta tarea pasa, se puede proponer una tarea separada para n8n lab.

---

## 2. Contexto Aprobado

Fase 2A dejo validado:

```text
TASK_GATE_2A_TO_2B = APROBADO PARA LECTURA BACKEND
```

Evidencia base:

- `/api/health` PASS.
- `/api/leads` PASS.
- 7 leads test visibles.
- Primer lead: `L-0021`.

Pendiente antes de avanzar:

- Validar escritura controlada de lead test.
- Confirmar que RLS/policies no permiten datos reales.

---

## 3. CORE_READ_SET

Lectura obligatoria mínima:

```text
AGENTS.md
/docs/02_ACTIVO_FASE_2B/QUICK_START_FASE2B.md
/docs/02_ACTIVO_FASE_2B/specs/01_TASK_2B_1_BACKEND_INSERT_TEST_LEAD.md
/backend/src/routes/leads.js
/backend/src/validators/lead.js
/backend/src/lib/supabase.js
```

---

## 4. CONDITIONAL_READ_SET

Leer solo si hay fallo, ambigüedad, validación específica o decisión técnica:

```text
/docs/01_ACTIVO_FASE_2A/specs/TASK_GATE_2A_TO_2B.md
/docs/02_ACTIVO_FASE_2B/specs/00_TASKS_FASE2B_INDEX.md
/backend/test-smoke.ps1
/supabase/migrations/001_create_tables_p0.sql
/supabase/seed/001_test_leads.sql
```

Regla:

```text
No leer estos archivos por defecto. Si se leen, declarar motivo en FILES_READ.
```

---

## 5. WRITE_SET

Puede crear o modificar:

```text
/docs/02_ACTIVO_FASE_2B/specs/reviews/REVIEW_2B_1_BACKEND_INSERT_TEST_LEAD.md
/docs/02_ACTIVO_FASE_2B/specs/01_TASK_2B_1_BACKEND_INSERT_TEST_LEAD.md
/docs/02_ACTIVO_FASE_2B/specs/00_TASKS_FASE2B_INDEX.md
```

No modificar codigo en esta TASK_SPEC salvo nueva aprobacion explicita de Natalia.

Uso permitido del WRITE_SET documental:

```text
Crear review.
Actualizar estado de esta TASK_SPEC a COMPLETADA o CORREGIONES.
Actualizar progreso del índice de Fase 2B.
```

---

## 6. DO_NOT_TOUCH

No puede leer/modificar:

```text
/n8n_workflows/
/n8n_worklows/
/n8n_workwolws/
/server.js
/sheets.js
/package.json
/skills/
/_archivo_DO_NOT_READ/
/docs/00_MASTER/
Google Sheets real
n8n productivo
datos reales
```

---

## 7. Skills

```text
SKILLS_ALLOWED = NO
```

---

## 8. Reglas Especificas

```text
No usar datos reales.
No llamar n8n.
No llamar Google Sheets.
No enviar mensajes.
No probar pagos ni calendario.
No activar automatizacion sensible.
Solo insertar leads con es_test=true.
```

Si `POST /api/intake/test` no fuerza `es_test=true`, la tarea debe detenerse y registrar `CORREGIONES`; no se debe parchear codigo sin nueva aprobacion.

---

## 9. Pasos

```text
1. Confirmar backend health.
2. Confirmar conteo inicial de /api/leads.
3. Enviar payload test controlado a POST /api/intake/test.
4. Confirmar respuesta 201 o exito equivalente.
5. Confirmar que el lead creado aparece en /api/leads.
6. Confirmar que el lead tiene es_test=true.
7. Confirmar que lead_status_history tiene estado inicial.
8. Registrar evidencia en review.
9. Recomendar APROBAR / CORREGIONES.
```

Payload sugerido:

```json
{
  "lead_code": "L-2B1-SMOKE-001",
  "nombre": "Smoke Test 2B1",
  "email": "smoke.2b1@example.com",
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

---

## 10. Criterios De Aceptacion

| CA | Criterio | KPI de Exito | Metodo de Verificacion |
|---|---|---|---|
| CA-01 | Health OK | Status 200, response < 500ms | `GET /api/health` |
| CA-02 | Insercion controlada | `POST /api/intake/test` devuelve 201 o `success=true` | curl/PowerShell contra backend local |
| CA-03 | Lead test guardado | Lead existe con `lead_code` test | `GET /api/leads` |
| CA-04 | `es_test=true` | Lead creado marcado como test | Respuesta JSON / Supabase lab |
| CA-05 | Estado inicial creado | `lead_status_history` contiene `NUEVO` | `GET /api/leads` o consulta lab autorizada |
| CA-06 | No datos reales | Payload usa dominio `example.com` y nombre test | Revision de payload |
| CA-07 | No n8n/Sheets | No se toca n8n ni Google Sheets | Review de DO_NOT_TOUCH |
| CA-08 | Sin automatizacion sensible | No mensajes, pagos ni calendario | Review de ejecucion |
| CA-09 | Informe creado | Review existe en `specs/reviews/` | Archivo creado |
| CA-10 | SKILLS_USED = NO | No se cargan skills | Entrega final |

---

## 11. Validacion Real Obligatoria

El resultado no puede aprobarse solo por inspeccion de codigo. Debe ejecutarse el endpoint real contra laboratorio y registrar evidencia.

### Resultados De Validacion

| # | Prueba | Resultado | Evidencia |
|---|---|---|---|
| 1 | Health endpoint | PASS | Status `ok`, 67 ms |
| 2 | POST intake test | PASS | `POST_SUCCESS=True`, 174 ms, `lead_code=L-2B1-015601` |
| 3 | Lectura posterior | PASS | `AFTER_COUNT=8`, `FOUND_IN_LEADS=True` |
| 4 | `es_test=true` | PASS | `POST_ES_TEST=True`, `FOUND_ES_TEST=True` |
| 5 | Estado inicial | PASS | `FOUND_STATUS=NUEVO` |

---

## 12. Definition Of Done

```text
Lead test insertado de forma controlada.
Lead visible en lectura backend.
Lead marcado es_test=true.
Estado inicial registrado.
Sin datos reales.
Sin n8n.
Sin Sheets.
Sin automatizacion sensible.
Review creado.
```

---

## 13. Rollback

Eliminar del entorno de laboratorio el lead con:

```text
lead_code = L-2B1-015601
id = 9e562096-12ab-425f-99f3-19a9fc41e7ee
```

Si el rollback requiere SQL directo, hacerlo solo en Supabase laboratorio y registrar la accion en el review.

---

## 14. Closeout Obligatorio

Al cerrar esta TASK:

```text
1. Crear REVIEW_2B_1_BACKEND_INSERT_TEST_LEAD.md.
2. Actualizar esta spec a COMPLETADA o CORREGIONES.
3. Actualizar 00_TASKS_FASE2B_INDEX.md si corresponde.
4. Declarar FILES_READ y motivo de cualquier CONDITIONAL_READ_SET leído.
5. Declarar FILES_CHANGED.
6. Declarar SKILLS_USED.
7. Declarar ACCEPTANCE_CHECK.
8. Proponer NEXT_STEP.
9. No ejecutar NEXT_STEP sin aprobación.
```

---

## 15. Entrega Esperada

```text
Resultado de pruebas.
Payload usado.
Respuesta del backend.
Evidencia de lectura posterior.
Errores si los hay.
Recomendacion: APROBAR / CORREGIONES.
FILES_READ.
FILES_CHANGED.
SKILLS_USED = NO.
ACCEPTANCE_CHECK.
RISKS.
ROLLBACK.
NEXT_STEP.
```

---

## 16. Siguiente Hito Si Pasa

Proponer, no ejecutar automaticamente:

```text
TASK_2B_2_N8N_LAB_INTAKE_TEST
```

Objetivo futuro: validar n8n lab con lead test sin tocar workflows productivos ni activar envios.
