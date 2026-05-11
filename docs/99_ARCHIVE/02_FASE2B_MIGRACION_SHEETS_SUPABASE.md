# Fase 2B — Migración controlada Google Sheets → Supabase

## 1. Objetivo

Replicar leads desde Google Sheets/n8n hacia Supabase sin cortar el flujo actual.

La Fase 2B no migra producción todavía. Crea una réplica controlada.

## 2. Estado de fuentes

```text
Google Sheets = fuente operativa principal.
Supabase = base sombra / réplica controlada.
Dashboard = lectura y validación contra Supabase.
n8n = sigue escribiendo en Sheets y envía copia al backend.
```

## 3. Principio operativo

```text
No hay dos cerebros.
Durante Fase 2B, Google Sheets manda.
Supabase replica, compara y valida.
```

Si hay conflicto entre Sheets y Supabase:

```text
Se revisa.
No se avanza a 2C.
```

## 4. Flujo objetivo

```text
Tally
→ n8n / DIAGNOSTICO.json
→ Google Sheets Diagnostico
→ Backend API
→ Supabase
→ Dashboard lectura/control
```

## 5. Alcance incluido

- Crear endpoint `POST /api/intake/from-n8n`.
- Enviar desde n8n una copia del lead procesado.
- Guardar lead en Supabase.
- Guardar triaje en Supabase.
- Guardar estado inicial.
- Guardar eventos.
- Guardar errores de réplica.
- Detectar duplicados básicos.
- Comparar Sheets vs Supabase.
- Validar dashboard con datos replicados.

## 6. Alcance excluido

No construir:

```text
Supabase como fuente de verdad plena
Dashboard productivo total
Borrado de leads
WhatsApp automático
Email automático
Pago
Calendario
Plantillas automáticas
Reglas IA editables desde UI
```

## 7. Tablas activas en Fase 2B

```text
leads
lead_triage
lead_status_history
lead_events
error_logs
lead_notes
lead_duplicates
integration_events
```

## 8. Endpoint principal

### `POST /api/intake/from-n8n`

Recibe el lead ya normalizado y clasificado por `DIAGNOSTICO.json`.

Debe:

1. validar payload;
2. convertir tipos;
3. crear o actualizar lead;
4. guardar triaje;
5. crear estado inicial si no existe;
6. detectar duplicado;
7. registrar evento;
8. devolver resultado claro a n8n.

Respuesta esperada:

```json
{
  "ok": true,
  "lead_id": "uuid",
  "lead_code": "L-0001",
  "action": "created | updated | duplicate_flagged",
  "errors": []
}
```

## 9. Mapeo Google Sheets → Supabase

| Google Sheets `Diagnostico` | Supabase |
|---|---|
| `Lead_ID` | `leads.lead_code` |
| `Fecha` | `leads.fecha_entrada` |
| `Nombre_y_apellidos` | `leads.nombre` |
| `Email` | `leads.email` |
| `WhatsApp` | `leads.whatsapp` |
| `Idioma` | `leads.idioma_preferido` |
| `En_Espana` | `leads.esta_en_espana` |
| `Situacion_actual` | `leads.situacion_actual` |
| `Origen_ingresos` | `leads.origen_ingresos` |
| `Duda_principal` | `leads.duda_principal` |
| `Resumen_caso` | `leads.explicacion_caso` |
| `Urgencia` | `leads.urgencia` |
| `Consentimiento_valido` | `leads.consentimiento_valido` |
| `Email_valido` | `leads.email_valido` |
| `WhatsApp_valido` | `leads.whatsapp_valido` |
| `Es_test` | `leads.es_test` |
| `Canal_origen` | `leads.canal_entrada` |
| `Campaña_origen` | `leads.campaña_origen` |
| `Semaforo_preIA` | `lead_triage.semaforo_preia` |
| `Semaforo_IA` | `lead_triage.semaforo_ia` |
| `Semaforo_final` | `lead_triage.semaforo_final` |
| `Tipo_lead_IA` | `lead_triage.tipo_lead_ia` |
| `Resumen_IA` | `lead_triage.resumen_caso` |
| `Motivo_clasificacion` | `lead_triage.motivo_clasificacion` |
| `Dato_faltante` | `lead_triage.dato_critico_faltante` |
| `Riesgo_detectado` | `lead_triage.riesgo_detectado_texto` |
| `Tipo_riesgo` | `lead_triage.tipo_riesgo` |
| `Riesgo_duro_detectado` | `lead_triage.riesgo_duro_detectado` |
| `Riesgo_duro_motivo` | `lead_triage.riesgo_duro_motivo` |
| `Accion_recomendada` | `lead_triage.accion_recomendada` |
| `Siguiente_accion` | `lead_triage.siguiente_accion` |
| `Respuesta_sugerida` | `lead_triage.respuesta_sugerida` |
| `Requiere_revision` | `lead_triage.requiere_revision_manual` |
| `Estado` | `lead_status_history.estado_nuevo` |
| `Error_tecnico` | `error_logs.error_message` |

## 10. Conversión de valores

El backend debe convertir:

```text
"SI" → true
"NO" → false
"VERDE" → enum VERDE
"AMARILLO" → enum AMARILLO
"ROJO" → enum ROJO
"" → valor controlado, no null peligroso
```

## 11. Duplicados

Detectar posible duplicado por:

```text
email normalizado
whatsapp normalizado
lead_code repetido
nombre + teléfono
nombre + email
```

Regla:

```text
Duplicado se marca.
No se borra.
No se fusiona automáticamente.
Natalia decide.
```

## 12. integration_events

Crear eventos para orquestación:

```text
N8N_REPLICA_RECEIVED
N8N_REPLICA_PROCESSED
N8N_REPLICA_FAILED
DUPLICATE_FLAGGED
```

Estados:

```text
PENDING
PROCESSED
FAILED
SKIPPED
```

## 13. Criterios de aceptación

| ID | Criterio |
|---|---|
| CA-2B-01 | n8n sigue escribiendo en Google Sheets. |
| CA-2B-02 | n8n replica a Supabase sin cortar flujo. |
| CA-2B-03 | Si Supabase falla, el lead sigue en Sheets. |
| CA-2B-04 | Si el payload falla, se registra error. |
| CA-2B-05 | 10-20 leads test se replican correctamente. |
| CA-2B-06 | 5-10 leads reales/simulados completos cuadran Sheets vs Supabase. |
| CA-2B-07 | Semáforo y estado no se mezclan. |
| CA-2B-08 | Duplicados se marcan y no se borran. |
| CA-2B-09 | Dashboard lee datos replicados. |
| CA-2B-10 | No hay envío automático al lead. |
| CA-2B-11 | Hay rollback: desactivar réplica y seguir con Sheets. |

## 14. Definition of Done

Fase 2B termina cuando:

```text
La réplica funciona.
Los datos cuadran.
Los errores quedan registrados.
Los duplicados se marcan.
El dashboard muestra datos replicados.
Google Sheets sigue siendo operativo.
No hay automatización sensible.
```

## 15. Prompt recomendado para Antigravity

```text
Lee solo estos documentos:

/docs/02_FASE2B_MIGRACION_SHEETS_SUPABASE.md
/docs/05_CONTRATO_DATOS_IA_Y_MIGRACION.md
/docs/06_REGLAS_NO_NEGOCIABLES_NC.md

Actúa como arquitecto de migración y backend engineer.

Objetivo:
Implementar solo Fase 2B: réplica controlada desde n8n/Google Sheets hacia Supabase.

No construyas Fase 2C ni Fase 3.
No conviertas Supabase en fuente de verdad.
No apagues Google Sheets.
No implementes WhatsApp/email automático.

Primero entrega PLAN con:
1. endpoint from-n8n;
2. mapeo de campos;
3. validaciones;
4. tratamiento de errores;
5. rollback;
6. pruebas comparativas Sheets vs Supabase.
```
