# REVIEW_2B_2_N8N_LAB_INTAKE_TEST.md

**Tarea:** TASK_2B_2_N8N_LAB_INTAKE_TEST  
**Fase:** 2B  
**Fecha:** 2026-05-08  
**Estado:** APROBADA COMO COPIA LAB IMPORTABLE

---

## 1. Resumen

Se creo una copia n8n lab nueva y aislada para validar intake test con filtro obligatorio `es_test=true`.

Resultado:

```text
APROBAR COMO COPIA LAB IMPORTABLE
```

No se leyo, modifico ni ejecuto el workflow original. El enlace original queda solo como referencia funcional.

---

## 2. Workflow Lab Creado

```text
/n8n_workflows/lab/NC_2B2_LAB_INTAKE_TEST.json
```

Workflow original de referencia:

```text
https://n8n-nc-n8n.wmd3t3.easypanel.host/workflow/0UpQEVljD2UKesSe?projectId=LM4bjtMYou00H907&uiContext=workflow_list
```

---

## 3. Estructura Del Workflow

| Nodo | Tipo | Funcion |
|---|---|---|
| Webhook Lab Intake | `n8n-nodes-base.webhook` | Recibir payload test por POST |
| Validate es_test Lab Only | `n8n-nodes-base.code` | Aceptar solo `es_test=true`; rechazar no-test |
| Respond Lab Result | `n8n-nodes-base.respondToWebhook` | Responder JSON lab controlado |

Estado del workflow:

```text
active = false
credentials = none
```

---

## 4. Validaciones Ejecutadas

Comando de validacion JSON:

```powershell
node -e "const fs=require('fs'); const p='n8n_workflows/lab/NC_2B2_LAB_INTAKE_TEST.json'; const w=JSON.parse(fs.readFileSync(p,'utf8')); console.log('JSON_VALID=true'); console.log('NAME='+w.name); console.log('ACTIVE='+w.active); console.log('NODES='+w.nodes.length); console.log('NODE_TYPES='+w.nodes.map(n=>n.type).join(',')); console.log('HAS_CREDENTIALS='+w.nodes.some(n=>n.credentials));"
```

Resultado:

```text
JSON_VALID=true
NAME=NC 2B2 LAB INTAKE TEST
ACTIVE=false
NODES=3
NODE_TYPES=n8n-nodes-base.webhook,n8n-nodes-base.code,n8n-nodes-base.respondToWebhook
HAS_CREDENTIALS=false
```

Busqueda sensible:

```text
No nodos Google Sheets.
No nodos WhatsApp.
No nodos email.
No nodos calendario.
No nodos pagos.
No credenciales.
```

Unica coincidencia de `GoogleSheets` esta en metadata declarativa `doesNotCallGoogleSheets=true`, no en un nodo ni credencial.

---

## 5. Filtro `es_test=true`

El nodo `Validate es_test Lab Only` contiene:

```javascript
const input = $json.body ?? $json;
const isTest = input.es_test === true || input.es_test === 'true';

if (!isTest) {
  return [{
    json: {
      ok: false,
      mode: 'lab',
      error: 'ONLY_ES_TEST_TRUE_ALLOWED',
      received_es_test: input.es_test ?? null,
      statusCode: 400
    }
  }];
}
```

Respuesta esperada para test valido:

```json
{
  "ok": true,
  "mode": "lab",
  "lead_code": "...",
  "es_test": true
}
```

---

## 6. Criterios De Aceptacion

| CA | Criterio | Resultado | Evidencia |
|---|---|---|---|
| CA-01 | Ruta lab autorizada | PASS | `/n8n_workflows/lab/NC_2B2_LAB_INTAKE_TEST.json` creado |
| CA-02 | No productivo | PASS | Workflow nuevo en carpeta `lab`, `active=false` |
| CA-03 | Solo `es_test=true` | PASS | Codigo valida `input.es_test === true || 'true'` |
| CA-04 | No Sheets | PASS | Sin nodos Google Sheets |
| CA-05 | No envios | PASS | Sin nodos WhatsApp/email |
| CA-06 | No automatizacion sensible | PASS | Sin pagos/calendario/produccion |
| CA-07 | Workflow listo para importacion | PASS | JSON valido, 3 nodos, sin credenciales |
| CA-08 | Informe creado | PASS | Este review |
| CA-09 | SKILLS_USED = NO | PASS | No se cargaron skills |

---

## 7. Riesgos Y Observaciones

| Riesgo / Observacion | Severidad | Mitigacion |
|---|---|---|
| No se ejecuto en n8n remoto | Media | Importar manualmente en entorno lab y ejecutar en TASK posterior si se aprueba |
| El workflow original no se exporto desde n8n | Baja | Se creo copia lab minima y segura, sin tocar original |
| La respuesta usa `Respond to Webhook` y requiere importacion compatible con version n8n | Baja | Validar tras importacion lab antes de activar |

---

## 8. Rollback

Eliminar si Natalia lo solicita:

```text
/n8n_workflows/lab/NC_2B2_LAB_INTAKE_TEST.json
```

No se generaron datos test ni ejecuciones remotas en esta TASK.

---

## 9. FILES_READ

CORE_READ_SET:

```text
AGENTS.md
/docs/02_ACTIVO_FASE_2B/QUICK_START_FASE2B.md
/docs/02_ACTIVO_FASE_2B/specs/02_TASK_2B_2_N8N_LAB_INTAKE_TEST.md
/docs/02_ACTIVO_FASE_2B/specs/reviews/REVIEW_2B_1_BACKEND_INSERT_TEST_LEAD.md
```

CONDITIONAL_READ_SET:

```text
/docs/02_ACTIVO_FASE_2B/specs/00_TASKS_FASE2B_INDEX.md — necesario para actualizar progreso al cierre.
```

---

## 10. FILES_CHANGED

```text
/docs/02_ACTIVO_FASE_2B/specs/02_TASK_2B_2_N8N_LAB_INTAKE_TEST.md
/docs/02_ACTIVO_FASE_2B/specs/00_TASKS_FASE2B_INDEX.md
/docs/02_ACTIVO_FASE_2B/specs/reviews/REVIEW_2B_2_N8N_LAB_INTAKE_TEST.md
/n8n_workflows/lab/NC_2B2_LAB_INTAKE_TEST.json
```

---

## 11. SKILLS_USED

```text
SKILLS_USED = NO
```

---

## 12. ACCEPTANCE_CHECK

```text
TASK_2B_2 = APROBADA COMO COPIA LAB IMPORTABLE
Workflow lab creado.
JSON valido.
Workflow inactivo.
Sin credenciales.
Sin Google Sheets.
Sin WhatsApp/email.
Sin pagos/calendario.
Filtro es_test=true presente.
No se toco workflow original.
No se ejecuto n8n remoto.
```

---

## 13. NEXT_STEP

Proponer, no ejecutar automaticamente:

```text
TASK_2B_3_IMPORTAR_Y_PROBAR_N8N_LAB
```

Objetivo sugerido: importar manualmente el JSON en n8n lab, ejecutar webhook con payload `es_test=true`, confirmar respuesta 200 y confirmar rechazo 400 para payload no-test.
