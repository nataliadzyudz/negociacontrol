# Fase 2A — Supabase + Backend mínimo en laboratorio

## 1. Objetivo

Preparar la base técnica de NC CRM v2 sin tocar producción.

La Fase 2A crea:

- proyecto Supabase;
- modelo de datos mínimo;
- migraciones SQL;
- backend/API mínimo;
- datos test;
- dashboard conectado en lectura;
- validación técnica inicial.

## 2. Estado de fuentes

```text
Google Sheets = fuente operativa actual.
Supabase = entorno de laboratorio.
Dashboard = conectado a Supabase con datos test.
n8n = no se modifica todavía salvo pruebas aisladas.
```

## 3. Principio operativo

```text
No migramos producción.
No apagamos Google Sheets.
No tocamos el flujo comercial real.
No escribimos leads reales en Supabase como fuente principal.
```

## 4. Alcance incluido

### Supabase

Crear tablas mínimas P0:

```text
leads
lead_triage
lead_status_history
lead_events
error_logs
lead_notes
```

Opcional si el coste técnico es bajo:

```text
lead_duplicates
integration_events
```

Pero no deben bloquear Fase 2A.

### Backend/API

Crear endpoints mínimos:

```text
GET /api/health
POST /api/intake/test
GET /api/leads
GET /api/leads/:id
POST /api/leads/:id/triage
PATCH /api/leads/:id/status
POST /api/leads/:id/notes
```

### Dashboard

Crear lectura mínima desde backend/Supabase:

```text
/pipeline
/leads/:id
/errores
```

En Fase 2A el dashboard puede leer, pero no debe operar producción.

## 5. Alcance excluido

No construir:

```text
WhatsApp automático
Email automático al lead
Pasarela de pago
Calendario
Portal cliente
Expedientes fiscales completos
Dashboard productivo
Dashboard editable sobre leads reales
Configuración editable de reglas IA
Reportes avanzados
Multiusuario avanzado
```

## 6. Tablas Fase 2A

### 6.1 `leads`

Finalidad: guardar el lead base.

Campos mínimos sugeridos:

```text
id
lead_code
fecha_entrada
nombre
email
whatsapp
idioma_preferido
esta_en_espana
situacion_actual
origen_ingresos
duda_principal
explicacion_caso
urgencia
consentimiento
consentimiento_valido
email_valido
whatsapp_valido
es_test
canal_entrada
campaña_origen
raw_payload
created_at
updated_at
```

### 6.2 `lead_triage`

Finalidad: guardar clasificación preIA, IA y final.

Campos mínimos sugeridos:

```text
id
lead_id
semaforo_preia
semaforo_ia
semaforo_final
tipo_lead_ia
resumen_caso
motivo_clasificacion
dato_critico_faltante
riesgo_detectado
tipo_riesgo
riesgo_duro_detectado
riesgo_duro_motivo
accion_recomendada
siguiente_accion
respuesta_sugerida
requiere_revision_manual
created_at
updated_at
```

### 6.3 `lead_status_history`

Finalidad: guardar cambios de estado operativo.

Estados mínimos:

```text
NUEVO
PENDIENTE_REVISION
FALTA_DATO
APTO_DIAGNOSTICO
DIAGNOSTICO_PROPUESTO
DIAGNOSTICO_RESERVADO
CLIENTE_ACTIVO
NO_ENCAJA
ERROR_IA
ARCHIVADO
```

Campos:

```text
id
lead_id
estado_anterior
estado_nuevo
motivo
changed_by
created_at
```

### 6.4 `lead_events`

Finalidad: auditoría técnica y operativa.

Eventos mínimos:

```text
LEAD_CREATED
TRIAGE_CREATED
STATUS_CHANGED
SEMAFORO_CHANGED
MANUAL_REVIEW_REQUIRED
ERROR_REGISTERED
NOTE_CREATED
DUPLICATE_DETECTED
```

Campos:

```text
id
lead_id
event_type
event_detail
source
created_at
```

### 6.5 `error_logs`

Finalidad: registrar errores sin perder información.

Tipos mínimos:

```text
ERROR_PAYLOAD
ERROR_VALIDACION
ERROR_CONSENTIMIENTO
ERROR_IA
ERROR_SUPABASE
ERROR_BACKEND
ERROR_N8N
ERROR_DUPLICADO
```

Campos:

```text
id
lead_id
error_type
error_message
error_detail
raw_payload
resolved
created_at
resolved_at
```

### 6.6 `lead_notes`

Finalidad: notas internas de Natalia/equipo.

Campos:

```text
id
lead_id
note
created_by
created_at
```

## 7. Reglas técnicas

### Separación semáforo / estado

```text
Semáforo = calidad/riesgo del lead.
Estado = posición operativa en el proceso.
```

No usar valores mezclados como:

```text
VERDE_DIAGNOSTICO
AMARILLO_REVISAR
ROJO_NO_ENCAJA
```

### Fuente de verdad en Fase 2A

```text
Google Sheets sigue siendo la fuente operativa.
Supabase solo laboratorio.
```

### Seguridad

```text
No exponer service_role en frontend.
No guardar secretos en archivos públicos.
No permitir escritura directa desde dashboard sin backend.
```

## 8. Criterios de aceptación

| ID | Criterio |
|---|---|
| CA-2A-01 | Supabase tiene tablas P0 creadas. |
| CA-2A-02 | Un lead test se inserta en `leads`. |
| CA-2A-03 | El lead recibe `lead_code` único. |
| CA-2A-04 | Se crea estado inicial `NUEVO`. |
| CA-2A-05 | Se guarda triaje en `lead_triage`. |
| CA-2A-06 | `semaforo_final` no se mezcla con estado operativo. |
| CA-2A-07 | Un error test se registra en `error_logs`. |
| CA-2A-08 | Un evento test se registra en `lead_events`. |
| CA-2A-09 | Dashboard puede leer leads desde Supabase. |
| CA-2A-10 | Google Sheets no se modifica ni se apaga. |
| CA-2A-11 | No hay claves sensibles en frontend. |
| CA-2A-12 | No hay envío automático al lead. |

## 9. Definition of Done

Fase 2A se considera terminada cuando:

```text
Supabase funciona con datos test.
Backend valida antes de escribir.
Dashboard lee datos sin escribir.
No hay secretos expuestos.
Semáforo y estado están separados.
Google Sheets sigue intacto.
No hay automatización sensible.
```

## 10. Prompt recomendado para Antigravity

```text
Lee solo estos documentos:

/docs/01_FASE2A_SUPABASE_BACKEND_LAB.md
/docs/05_CONTRATO_DATOS_IA_Y_MIGRACION.md
/docs/06_REGLAS_NO_NEGOCIABLES_NC.md

Actúa como arquitecto técnico senior y desarrollador backend/Supabase.

No construyas Fase 2B, 2C ni Fase 3.
No modifiques n8n.
No toques Google Sheets.
No implementes WhatsApp, email automático, pagos ni calendario.

Primero devuélveme un PLAN con:
1. archivos a crear;
2. migraciones SQL necesarias;
3. endpoints mínimos;
4. riesgos;
5. pruebas;
6. qué NO vas a construir.

No escribas código hasta que el plan esté aprobado.
```
