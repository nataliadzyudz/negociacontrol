# 03_TASK_2B_3_IMPORTAR_Y_PROBAR_N8N_LAB.md

**Fase:** 2B  
**Agente:** ORQUESTADOR / N8N LAB / AUDITOR  
**Estado:** COMPLETADA

---

## 1. Objetivo

Validar el workflow n8n lab importado usando el webhook real de laboratorio, con payloads controlados y sin activar operacion sensible.

Endpoint autorizado para esta TASK:

```text
POST https://n8n-nc-n8n.wmd3t3.easypanel.host/webhook/nc-2b2-lab-intake-test
```

---

## 2. Contexto Aprobado

Fase 2B ya valido:

```text
TASK_2B_1_BACKEND_INSERT_TEST_LEAD = COMPLETADA
TASK_2B_2_N8N_LAB_INTAKE_TEST = COMPLETADA
```

Workflow lab local:

```text
/n8n_workflows/lab/NC_2B2_LAB_INTAKE_TEST.json
```

El workflow fue importado por Natalia en n8n. Aunque usa `/webhook/` y no `/webhook-test/`, se trata como lab lógico porque la copia lab no contiene credenciales, Sheets, envios ni automatizaciones sensibles.

---

## 3. CORE_READ_SET

Lectura obligatoria minima:

```text
AGENTS.md
/docs/02_ACTIVO_FASE_2B/QUICK_START_FASE2B.md
/docs/02_ACTIVO_FASE_2B/specs/03_TASK_2B_3_IMPORTAR_Y_PROBAR_N8N_LAB.md
/docs/02_ACTIVO_FASE_2B/specs/reviews/REVIEW_2B_2_N8N_LAB_INTAKE_TEST.md
/n8n_workflows/lab/NC_2B2_LAB_INTAKE_TEST.json
```

---

## 4. CONDITIONAL_READ_SET

Leer solo si hay fallo, ambigüedad, validación específica o decisión técnica:

```text
/docs/02_ACTIVO_FASE_2B/specs/00_TASKS_FASE2B_INDEX.md
/docs/02_ACTIVO_FASE_2B/specs/02_TASK_2B_2_N8N_LAB_INTAKE_TEST.md
```

---

## 5. WRITE_SET

Puede crear o modificar:

```text
/docs/02_ACTIVO_FASE_2B/specs/reviews/REVIEW_2B_3_IMPORTAR_Y_PROBAR_N8N_LAB.md
/docs/02_ACTIVO_FASE_2B/specs/03_TASK_2B_3_IMPORTAR_Y_PROBAR_N8N_LAB.md
/docs/02_ACTIVO_FASE_2B/specs/00_TASKS_FASE2B_INDEX.md
```

No modificar workflows n8n en esta TASK.

---

## 6. DO_NOT_TOUCH

No puede leer/modificar:

```text
/n8n_workflows/ fuera de /n8n_workflows/lab/NC_2B2_LAB_INTAKE_TEST.json
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
No tocar workflow original.
No modificar workflow remoto.
Solo enviar payloads test controlados.
```

---

## 9. Pasos

```text
1. Validar el JSON lab local como referencia.
2. Enviar payload valido con es_test=true al webhook autorizado.
3. Registrar status code y body.
4. Enviar payload no-test con es_test=false.
5. Registrar status code y body.
6. Confirmar que el caso valido responde ok=true.
7. Confirmar que el caso no-test responde error ONLY_ES_TEST_TRUE_ALLOWED o status 400 equivalente.
8. Crear review.
9. Recomendar APROBAR / CORREGIONES.
```

---

## 10. Payloads De Prueba

Payload valido:

```json
{
  "lead_code": "L-2B3-LAB-001",
  "nombre": "Smoke Test 2B3",
  "email": "smoke.2b3@example.com",
  "es_test": true
}
```

Payload bloqueado:

```json
{
  "lead_code": "REAL-BLOCKED-001",
  "nombre": "No Test",
  "email": "not-real@example.com",
  "es_test": false
}
```

---

## 11. Criterios De Aceptacion

| CA | Criterio | KPI de Exito | Metodo de Verificacion |
|---|---|---|---|
| CA-01 | Workflow lab local valido | JSON valido, 3 nodos, sin credenciales | Node parse |
| CA-02 | Payload valido aceptado | HTTP 200 y `ok=true` | POST webhook |
| CA-03 | Payload valido mantiene modo lab | `mode=lab` | Body respuesta |
| CA-04 | Payload valido conserva lead_code | `lead_code=L-2B3-LAB-001` | Body respuesta |
| CA-05 | Payload no-test bloqueado | HTTP 400 o `ok=false` con error esperado | POST webhook |
| CA-06 | Sin servicios sensibles | No evidencia de Sheets/envios/pagos/calendario | Revision workflow lab |
| CA-07 | Informe creado | Review existe en `specs/reviews/` | Archivo creado |
| CA-08 | SKILLS_USED = NO | No se cargan skills | Entrega final |

---

## 12. Validacion Real Obligatoria

### Resultados De Validacion

| # | Prueba | Resultado | Evidencia |
|---|---|---|---|
| 1 | JSON lab local | PASS | `JSON_VALID=true`, `NODES=3`, `HAS_CREDENTIALS=false`, `BAD_NODE_TYPES=0` |
| 2 | POST es_test=true | PASS | HTTP 200, `ok=true`, `mode=lab`, `lead_code=L-2B3-LAB-001` |
| 3 | POST es_test=false | PASS | HTTP 400, payload bloqueado |
| 4 | Sin servicios sensibles | PASS | Sin credenciales ni nodos sensibles en workflow local |

---

## 13. Definition Of Done

```text
Webhook lab responde a payload test valido.
Webhook lab bloquea payload no-test.
No se tocan workflows productivos.
No se usan credenciales.
No se llama Sheets.
No se envian mensajes.
Review creado.
Recomendacion APROBAR / CORREGIONES.
```

---

## 14. Rollback

```text
No aplica rollback tecnico si solo se ejecutan POST test contra webhook lab.
Si se genera ejecucion remota, registrar hora y payload para auditoria.
```

---

## 15. Closeout Obligatorio

```text
1. Crear REVIEW_2B_3_IMPORTAR_Y_PROBAR_N8N_LAB.md.
2. Actualizar esta spec a COMPLETADA o CORREGIONES.
3. Actualizar 00_TASKS_FASE2B_INDEX.md si corresponde.
4. Declarar FILES_READ.
5. Declarar FILES_CHANGED.
6. Declarar SKILLS_USED.
7. Declarar ACCEPTANCE_CHECK.
8. Proponer NEXT_STEP.
9. No ejecutar NEXT_STEP sin aprobación.
```

---

## 16. Entrega Esperada

```text
Resultado payload valido.
Resultado payload bloqueado.
Status codes.
Bodies de respuesta.
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

## 17. Siguiente Hito Si Pasa

Proponer, no ejecutar automaticamente:

```text
TASK_GATE_2B_TO_2C
```

Objetivo futuro: evaluar cierre de Fase 2B con KPIs reales y decidir si se pasa a 2C.
