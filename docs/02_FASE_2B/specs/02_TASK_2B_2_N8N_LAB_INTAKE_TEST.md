# 02_TASK_2B_2_N8N_LAB_INTAKE_TEST.md

**Fase:** 2B  
**Agente:** ORQUESTADOR / N8N LAB / AUDITOR  
**Estado:** COMPLETADA

---

## 1. Objetivo

Definir y validar un flujo n8n de laboratorio para procesar un lead test, sin tocar workflows productivos, sin Google Sheets, sin envios y sin automatizacion sensible.

Workflow original de referencia, solo para contexto funcional:

```text
https://n8n-nc-n8n.wmd3t3.easypanel.host/workflow/0UpQEVljD2UKesSe?projectId=LM4bjtMYou00H907&uiContext=workflow_list
```

El workflow original no se lee, no se modifica y no se ejecuta en esta TASK. Se crea una copia lab nueva y aislada.

Esta tarea solo puede avanzar si se mantiene el alcance:

```text
backend/Supabase test -> n8n lab controlado
```

No valida produccion. No activa operacion real.

---

## 2. Contexto Aprobado

Fase 2B ya valido:

```text
TASK_2B_1_BACKEND_INSERT_TEST_LEAD = COMPLETADA
```

Evidencia base:

- Backend inserta lead test via `POST /api/intake/test`.
- Lead queda `es_test=true`.
- Lead aparece en `/api/leads`.
- Estado inicial `NUEVO` creado.
- No se toco n8n ni Sheets.

Lead test de referencia:

```text
lead_code = L-2B1-015601
id = 9e562096-12ab-425f-99f3-19a9fc41e7ee
```

---

## 3. CORE_READ_SET

Lectura obligatoria minima:

```text
AGENTS.md
/docs/02_ACTIVO_FASE_2B/QUICK_START_FASE2B.md
/docs/02_ACTIVO_FASE_2B/specs/02_TASK_2B_2_N8N_LAB_INTAKE_TEST.md
/docs/02_ACTIVO_FASE_2B/specs/reviews/REVIEW_2B_1_BACKEND_INSERT_TEST_LEAD.md
```

---

## 4. CONDITIONAL_READ_SET

Leer solo si hay fallo, ambigüedad, validación específica o decisión técnica:

```text
/docs/02_ACTIVO_FASE_2B/specs/00_TASKS_FASE2B_INDEX.md
/docs/02_ACTIVO_FASE_2B/specs/01_TASK_2B_1_BACKEND_INSERT_TEST_LEAD.md
/backend/src/routes/leads.js
/backend/src/lib/supabase.js
/supabase/migrations/001_create_tables_p0.sql
```

n8n lab:

```text
/n8n_workflows/lab/NC_2B2_LAB_INTAKE_TEST.json
```

Regla:

```text
No leer /n8n_workflows/ completo.
No leer workflows productivos.
Solo leer una ruta concreta de workflow lab si Natalia la define o aprueba durante esta TASK.
Si no existe ruta lab, registrar CORREGIONES y proponer crear TASK separada para preparar carpeta/workflow lab.
```

---

## 5. WRITE_SET

Puede crear o modificar:

```text
/docs/02_ACTIVO_FASE_2B/specs/reviews/REVIEW_2B_2_N8N_LAB_INTAKE_TEST.md
/docs/02_ACTIVO_FASE_2B/specs/02_TASK_2B_2_N8N_LAB_INTAKE_TEST.md
/docs/02_ACTIVO_FASE_2B/specs/00_TASKS_FASE2B_INDEX.md
/n8n_workflows/lab/
/n8n_workflows/lab/NC_2B2_LAB_INTAKE_TEST.json
```

No modificar workflows n8n fuera de `/n8n_workflows/lab/NC_2B2_LAB_INTAKE_TEST.json`.

---

## 6. DO_NOT_TOUCH

No puede leer/modificar:

```text
/n8n_workflows/ productivo o completo
/n8n_worklows/
/n8n_workwolws/
/server.js
/sheets.js
/package.json
/skills/
/_archivo_DO_NOT_READ/
/docs/00_MASTER/
Google Sheets real
workflows n8n productivos
credenciales
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
No llamar Google Sheets.
No enviar WhatsApp.
No enviar email.
No crear calendario.
No probar pagos.
No activar automatizacion sensible.
No tocar n8n productivo.
Solo procesar leads con es_test=true.
```

La tarea debe detenerse si:

```text
1. No hay ruta n8n lab autorizada.
2. El workflow intenta usar Google Sheets.
3. El workflow intenta enviar mensajes.
4. El workflow no filtra es_test=true.
5. El workflow toca datos reales.
```

---

## 9. Pasos

```text
1. Crear carpeta lab si no existe.
2. Crear workflow lab nuevo y aislado.
3. Verificar que no es workflow productivo.
4. Verificar que no llama Google Sheets, WhatsApp, email, pagos ni calendario.
5. Verificar que el flujo acepta/procesa solo lead test con es_test=true.
6. No ejecutar en n8n remoto en esta TASK; dejar listo para importacion manual.
7. Registrar evidencia real del JSON creado.
8. Crear review.
9. Recomendar APROBAR / CORREGIONES.
```

---

## 10. Criterios De Aceptacion

| CA | Criterio | KPI de Exito | Metodo de Verificacion |
|---|---|---|---|
| CA-01 | Ruta lab autorizada | `/n8n_workflows/lab/NC_2B2_LAB_INTAKE_TEST.json` existe | Archivo creado |
| CA-02 | No productivo | Workflow marcado como lab/test | Revision de ruta/contenido autorizado |
| CA-03 | Solo `es_test=true` | Filtro o condicion test presente | Revision de workflow lab |
| CA-04 | No Sheets | 0 nodos/llamadas a Google Sheets | Revision de workflow lab |
| CA-05 | No envios | 0 nodos/llamadas WhatsApp/email | Revision de workflow lab |
| CA-06 | No automatizacion sensible | 0 pagos/calendario/produccion | Revision de workflow lab |
| CA-07 | Workflow listo para importacion | JSON n8n valido sin credenciales | Revision del archivo |
| CA-08 | Informe creado | Review existe en `specs/reviews/` | Archivo creado |
| CA-09 | SKILLS_USED = NO | No se cargan skills | Entrega final |

---

## 11. Validacion Real Obligatoria

Antes de marcar la tarea como `COMPLETADA`, debe existir evidencia real de revision/ejecucion lab. Si falta ruta lab autorizada, cerrar como `CORREGIONES`.

### Resultados De Validacion

| # | Prueba | Resultado | Evidencia |
|---|---|---|---|
| 1 | Ruta n8n lab autorizada | PASS | `/n8n_workflows/lab/NC_2B2_LAB_INTAKE_TEST.json` creado |
| 2 | Workflow no productivo | PASS | Workflow nuevo en carpeta `lab`, `active=false` |
| 3 | Filtro `es_test=true` | PASS | Nodo code valida `input.es_test === true || 'true'` |
| 4 | No Sheets/envios | PASS | Sin nodos Google Sheets, WhatsApp ni email |
| 5 | Workflow importable | PASS | JSON valido, 3 nodos, sin credenciales |

---

## 12. Definition Of Done

```text
Ruta n8n lab concreta autorizada.
Workflow revisado como laboratorio.
Solo es_test=true.
Sin Google Sheets.
Sin WhatsApp/email.
Sin pagos/calendario.
Sin workflows productivos.
Review creado.
Recomendacion APROBAR / CORREGIONES.
```

---

## 13. Rollback

Si solo se revisa documentación/workflow lab:

```text
No aplica rollback tecnico.
```

Si se ejecuta una prueba lab:

```text
Registrar ID de ejecucion y limpiar datos test generados si corresponde.
```

---

## 14. Closeout Obligatorio

Al cerrar esta TASK:

```text
1. Crear REVIEW_2B_2_N8N_LAB_INTAKE_TEST.md.
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
Ruta n8n lab autorizada o bloqueo.
Resultado de revision.
Resultado de prueba lab si aplica.
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
TASK_2B_3_IMPORTAR_Y_PROBAR_N8N_LAB
```

Objetivo futuro: importar manualmente el JSON en n8n lab y probar webhook con payload `es_test=true`, sin activar operacion real.
