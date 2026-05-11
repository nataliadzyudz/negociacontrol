# PRD v2 Técnico por fases — NC CRM / Control Tower

**Proyecto:** NEGOCIA CONTROL  
**Producto:** NC CRM / NC Control Tower  
**Versión:** v2.2 por fases  
**Estado:** Documento final pulido para evolución técnica posterior a MVP Fase 1  
**Arquitectura objetivo:** Google Sheets puente + Backend/API + Supabase + Dashboard operativo + n8n  
**Responsable operativa:** Natalia  
**Principio rector:** Natalia decide. La IA clasifica. El backend valida. Supabase guarda. n8n automatiza. El dashboard opera.

---

## 0. Contexto y regla de oro

Este PRD v2 **no sustituye de golpe** el MVP actual.

La transición correcta es:

```text
MVP Fase 1:
Tally → n8n / DIAGNOSTICO.json → Google Sheets Diagnostico → dashboard read-only → revisión Natalia

Fase 2:
Google Sheets sigue vivo como puente / respaldo.
Supabase se prepara, replica y se prueba.
Dashboard operativo se valida de forma controlada.

Fase 3:
Supabase pasa a fuente de verdad.
Google Sheets queda como exportación / backup.
Dashboard pasa a herramienta diaria.
```

La lógica de negocio no cambia. Cambia la infraestructura.

---

# 1. Necesidad de las tablas y prioridad

## 1.1 Criterio de priorización

No todas las tablas se construyen al mismo tiempo.

```text
P0 = imprescindible para no perder leads, clasificar, operar y auditar.
P1 = necesario para dashboard operativo controlado.
P2 = útil para optimización, reporting o automatización posterior.
P3 = avanzado; no entra hasta tener flujo estable.
```

La regla NC:

```text
Primero control.
Luego operación.
Después automatización.
Finalmente escala.
```

---

## 1.2 Tabla de decisión

| Tabla | Para qué sirve | Prioridad | Fase | Decisión |
|---|---|---:|---|---|
| `leads` | Guarda el lead base, contacto, consentimiento, canal, payload original. | P0 | 2A | Construir ya |
| `lead_triage` | Guarda clasificación preIA, IA y final, riesgos, resumen, acción recomendada. | P0 | 2A | Construir ya |
| `lead_status_history` | Guarda estado operativo y cambios auditados. | P0 | 2A | Construir ya |
| `lead_events` | Auditoría técnica: qué ocurrió, cuándo y por qué. | P0 | 2A | Construir ya |
| `error_logs` | Guarda errores sin perder payloads ni leads. | P0 | 2A | Construir ya |
| `lead_notes` | Notas internas de Natalia/revisión humana. | P0/P1 | 2A/2C | Construir simple ya |
| `lead_duplicates` | Detecta y relaciona duplicados sin borrar leads. | P1 | 2B | Construir en migración |
| `integration_events` | Cola/control de eventos con n8n. | P1 | 2B | Construir en migración |
| `lead_interactions` | Historial completo de contactos reales: WhatsApp, email, llamada. | P1/P2 | 2C/3 | Simple en 2C, completo en 3 |
| `triage_rules` | Configuración editable de reglas de triaje. | P2 | 3 | Aparcar hasta estabilizar reglas |
| `response_templates` | Plantillas por idioma/semáforo/escenario. | P2 | 3 | Aparcar hasta validar mensajes |
| `report_snapshots` | Fotos periódicas de métricas para reportes. | P3 | 3+ | No construir ahora |
| `users_profiles avanzado` | Roles, permisos, multiusuario, auditoría por usuario. | P3 | 3+ | Básico ahora, avanzado después |

---

## 1.3 Explicación tabla por tabla

### `leads` — P0

Es la tabla madre. Sin ella no existe CRM.

Debe guardar quién es el lead, cómo contactar, de dónde viene, consentimiento, payload original, si es test, si hay contacto válido y si puede ser duplicado.

**Por qué va primero:** si un lead no se guarda bien, todo lo demás es decoración.

### `lead_triage` — P0

Guarda la clasificación:

```text
Semaforo_preIA
Semaforo_IA
Semaforo_final
Riesgo_duro_detectado
Resumen_IA
Dato_faltante
Accion_recomendada
Respuesta_sugerida
```

**Por qué va primero:** es el corazón de la IA. Sin esta tabla no podemos medir si el triaje ayuda o falla.

### `lead_status_history` — P0

Guarda el estado operativo:

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
```

**Por qué va primero:** evita mezclar semáforo con proceso. El semáforo responde “qué tipo de lead es”; el estado responde “dónde está en el proceso”.

### `lead_events` — P0

Registra eventos técnicos y operativos:

```text
LEAD_CREATED
TRIAGE_CREATED
STATUS_CHANGED
SEMAFORO_CHANGED
MANUAL_REVIEW_REQUIRED
DUPLICATE_DETECTED
N8N_EVENT_SENT
```

**Por qué va primero:** permite auditar el sistema sin depender de memoria humana ni de mirar ejecuciones sueltas en n8n.

### `error_logs` — P0

Guarda errores:

```text
ERROR_PAYLOAD
ERROR_VALIDACION
ERROR_CONSENTIMIENTO
ERROR_IA
ERROR_SUPABASE
ERROR_N8N
ERROR_DUPLICADO
```

**Por qué va primero:** en NC un fallo no puede significar “lead perdido”. Si falla algo, se registra.

### `lead_notes` — P0/P1

Guarda notas internas de revisión.

**Por qué va pronto:** el CRM no debe ser solo automático. Debe conservar criterio humano.

### `lead_duplicates` — P1

Relaciona leads repetidos por email, WhatsApp, nombre/canal u otros criterios.

**Por qué no va antes:** primero hay que guardar bien los leads. Después se detectan duplicados de forma estructurada.

### `integration_events` — P1

Cola de integración con n8n:

```text
PENDING
SENT
FAILED
PROCESSED
SKIPPED
```

**Por qué no va antes:** en 2A estamos preparando Supabase. En 2B necesitamos controlar qué eventos n8n debe procesar.

### `lead_interactions` — P1/P2

Historial de contactos reales:

```text
WhatsApp enviado
Email enviado
Llamada hecha
Respuesta recibida
Seguimiento
Cierre
```

**Por qué no completa al inicio:** mientras no enviamos comunicaciones desde el sistema, basta con notas. Cuando el dashboard empieza a operar, ya tiene sentido registrar interacciones.

### `triage_rules` — P2

Permite mover reglas de código a tabla editable.

**Por qué se aparca:** ahora las reglas deben estar versionadas en backend/n8n. Hacerlas editables demasiado pronto puede crear caos operativo.

### `response_templates` — P2

Plantillas por idioma y escenario.

**Por qué se aparca:** no hay envío automático. Primero validamos qué mensajes convierten y cuáles evitan riesgos.

### `report_snapshots` — P3

Guarda fotos de métricas por día/semana.

**Por qué se aparca:** sin volumen de leads, los reportes son teatro. Primero datos reales; después reportes.

### `users_profiles avanzado` — P3

Roles y permisos avanzados.

**Por qué se aparca:** al inicio hay una usuaria operativa principal: Natalia. Se necesita auth básica, no una empresa multiusuario todavía.

---

# 2. Alcance por fases

## Fase 2A — Supabase + backend mínimo en laboratorio

### Objetivo

Crear la base técnica de Supabase y backend/API sin tocar producción.

### Estado de fuentes

```text
Google Sheets = fuente operativa actual.
Supabase = entorno de prueba.
Dashboard = conectado a Supabase con datos test.
```

### Incluye

- Crear proyecto Supabase.
- Crear tablas P0.
- Crear SQL base reducido.
- Crear backend/API mínimo.
- Crear endpoints de intake test.
- Insertar leads test.
- Validar semáforo separado de estado.
- Validar error logs.
- Validar eventos.
- Crear dashboard conectado a Supabase en modo prueba.
- Mantener Google Sheets intacto.

### No incluye

- Cortar Google Sheets.
- Usar Supabase como producción.
- WhatsApp automático.
- Pago.
- Calendario.
- Dashboard escribiendo sobre leads reales.
- Automatización comercial sensible.

### Tablas Fase 2A

```text
leads
lead_triage
lead_status_history
lead_events
error_logs
lead_notes
```

`lead_duplicates` e `integration_events` pueden crearse ya si el coste técnico es bajo, pero no deben bloquear la fase.

### Endpoints mínimos Fase 2A

```text
GET /api/health
POST /api/intake/test
GET /api/leads
GET /api/leads/:id
POST /api/leads/:id/triage
PATCH /api/leads/:id/status
POST /api/leads/:id/notes
```

### Criterios de aceptación Fase 2A

| ID | Criterio |
|---|---|
| CA-2A-01 | Supabase tiene tablas P0 creadas. |
| CA-2A-02 | Un lead test se inserta en `leads`. |
| CA-2A-03 | El lead recibe `lead_code` único. |
| CA-2A-04 | Se crea estado inicial `NUEVO`. |
| CA-2A-05 | Se guarda un triaje en `lead_triage`. |
| CA-2A-06 | `semaforo_final` no se mezcla con `estado_operativo`. |
| CA-2A-07 | Un error test se guarda en `error_logs`. |
| CA-2A-08 | Un evento test se guarda en `lead_events`. |
| CA-2A-09 | Dashboard puede leer leads desde Supabase. |
| CA-2A-10 | Google Sheets no se modifica ni se apaga. |

### Puerta de salida de Fase 2A

Se pasa a 2B solo cuando:

```text
Supabase funciona con datos test.
Backend valida operaciones críticas.
Dashboard lee datos sin exponer claves.
No hay secretos en frontend.
El modelo separa semáforo y estado.
```

---

## Fase 2B — Migración controlada en paralelo

### Objetivo

Replicar leads desde Google Sheets/n8n hacia Supabase sin cortar el flujo actual.

### Estado de fuentes

```text
Google Sheets = fuente operativa principal.
Supabase = base sombra / réplica controlada.
Dashboard = lectura y validación contra Supabase.
```

### Flujo recomendado

```text
Tally
→ n8n / DIAGNOSTICO.json
→ Google Sheets Diagnostico
→ Backend API
→ Supabase
→ Dashboard lectura/control
```

### Regla anti-caos

Durante 2B no hay dos cerebros.

```text
Google Sheets manda operativamente.
Supabase replica y valida.
```

Si hay diferencia entre Sheets y Supabase, se revisa antes de avanzar.

### Incluye

- Crear endpoint `POST /api/intake/from-n8n`.
- n8n envía copia del lead procesado a backend.
- Supabase guarda `raw_payload`.
- Supabase guarda triaje.
- Supabase guarda estado inicial.
- Supabase detecta posibles duplicados.
- Supabase registra errores de réplica.
- Dashboard muestra datos replicados.
- Comparación manual Sheets vs Supabase.
- Ajuste de mapeo de campos.

### Tablas Fase 2B

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

### Mapeo mínimo Sheets → Supabase

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
| `Consentimiento_valido` | `leads.consentimiento` |
| `Email_valido` | `leads.email_valido` |
| `WhatsApp_valido` | `leads.whatsapp_valido` |
| `Es_test` | `leads.es_test` |
| `Canal_origen` | `leads.canal_entrada` |
| `Semaforo_preIA` | `lead_triage.semaforo_preia` |
| `Semaforo_IA` | `lead_triage.semaforo_ia` |
| `Semaforo_final` | `lead_triage.semaforo_final` |
| `Resumen_IA` | `lead_triage.resumen_caso` |
| `Motivo_clasificacion` | `lead_triage.motivo_clasificacion` |
| `Dato_faltante` | `lead_triage.dato_critico_faltante` |
| `Riesgo_detectado` | `lead_triage.riesgo_detectado` |
| `Tipo_riesgo` | `lead_triage.tipo_riesgo` |
| `Riesgo_duro_detectado` | `lead_triage.riesgo_duro_detectado` |
| `Riesgo_duro_motivo` | `lead_triage.riesgo_duro_motivo` |
| `Accion_recomendada` | `lead_triage.accion_recomendada` |
| `Siguiente_accion` | `lead_triage.siguiente_accion` |
| `Respuesta_sugerida` | `lead_triage.respuesta_sugerida` |
| `Requiere_revision` | `lead_triage.requiere_revision_manual` |
| `Estado` | `lead_status_history.estado_operativo` |
| `Error_tecnico` | `error_logs.detalle_error` |

### Conversión de valores

El workflow Fase 1 puede usar texto:

```text
SI / NO
VERDE / AMARILLO / ROJO
```

Supabase puede guardar booleanos y enums.

El backend debe convertir:

```text
"SI" → true
"NO" → false
"VERDE" → enum VERDE
"AMARILLO" → enum AMARILLO
"ROJO" → enum ROJO
```

La IA no decide tipos de base de datos. El backend transforma y valida.

### Criterios de aceptación Fase 2B

| ID | Criterio |
|---|---|
| CA-2B-01 | n8n sigue escribiendo en Google Sheets. |
| CA-2B-02 | n8n replica a Supabase sin cortar el flujo. |
| CA-2B-03 | Si Supabase falla, el lead sigue en Sheets. |
| CA-2B-04 | Si Sheets falla, el error queda en `error_logs` o ejecución n8n revisable. |
| CA-2B-05 | 10-20 leads test se replican correctamente. |
| CA-2B-06 | 5-10 leads reales o simulados completos cuadran Sheets vs Supabase. |
| CA-2B-07 | Semáforo y estado no se mezclan. |
| CA-2B-08 | Duplicados se marcan, no se borran. |
| CA-2B-09 | Dashboard lee datos replicados. |
| CA-2B-10 | No hay envío automático al lead. |

### Puerta de salida de Fase 2B

Se pasa a 2C solo cuando:

```text
La réplica funciona.
Los datos cuadran.
Los errores quedan registrados.
El dashboard muestra lo mismo que la fuente operativa.
Natalia entiende qué lee y qué todavía no debe editar.
```

---

## Fase 2C — Dashboard operativo controlado

### Objetivo

Permitir operación limitada desde dashboard sobre Supabase, sin automatización sensible.

### Estado de fuentes

```text
Supabase = base operativa piloto.
Google Sheets = respaldo/exportación/puente.
Dashboard = operativo controlado.
```

### Regla de transición

En 2C se evita el doble mando.

Para leads piloto gestionados desde dashboard:

```text
Supabase manda.
Google Sheets queda como respaldo/exportación.
```

Para leads no migrados:

```text
Google Sheets sigue siendo referencia.
```

No mezclar ambos modos dentro del mismo lead.

### Incluye

- Dashboard `/pipeline`.
- Dashboard `/leads/:id`.
- Cambio de estado operativo con motivo.
- Corrección de semáforo con motivo.
- Añadir notas.
- Registrar interacción simple.
- Marcar duplicado revisado.
- Archivar lead.
- Copiar respuesta sugerida.
- Crear eventos auditados.
- Sin envío automático.

### Pantallas mínimas

```text
/pipeline
/leads/:id
/errores
```

### Acciones permitidas

```text
Cambiar estado operativo
Corregir semáforo con motivo
Añadir nota
Registrar interacción simple
Marcar duplicado revisado
Archivar lead
Copiar respuesta sugerida
Marcar revisión humana
Registrar diagnóstico reservado
```

### Acciones no permitidas

```text
Enviar WhatsApp automático
Enviar email automático
Borrar leads
Modificar en masa
Cambiar reglas IA desde UI
Dar asesoramiento fiscal automático
Activar pagos/calendario productivo
```

### Tablas Fase 2C

```text
leads
lead_triage
lead_status_history
lead_events
error_logs
lead_notes
lead_duplicates
integration_events
lead_interactions simple
```

### `lead_interactions` en 2C

En 2C no hace falta historial completo sofisticado.

Versión simple:

```text
lead_id
fecha
canal
tipo_interaccion
resumen
responsable
```

`respuesta_enviada` puede quedar opcional hasta Fase 3.

### Criterios de aceptación Fase 2C

| ID | Criterio |
|---|---|
| CA-2C-01 | Natalia puede abrir pipeline por estado operativo. |
| CA-2C-02 | Cada tarjeta muestra semáforo separado. |
| CA-2C-03 | Natalia puede cambiar estado con motivo. |
| CA-2C-04 | Natalia puede corregir semáforo con motivo. |
| CA-2C-05 | Cada cambio crea evento. |
| CA-2C-06 | Cada cambio de estado queda en `lead_status_history`. |
| CA-2C-07 | Natalia puede añadir nota interna. |
| CA-2C-08 | Natalia puede copiar respuesta sugerida, pero no enviarla automáticamente. |
| CA-2C-09 | Los errores se ven en `/errores`. |
| CA-2C-10 | Google Sheets sigue disponible como respaldo/exportación. |

### Puerta de salida de Fase 2C

Se pasa a Fase 3 solo cuando:

```text
Dashboard opera sin romper datos.
Natalia puede trabajar desde dashboard.
Los cambios quedan auditados.
La réplica/exportación a Sheets funciona o está claramente definida.
No hay pérdida de leads.
Hay rollback claro a Sheets.
```

---

# 3. Fase 3 — Supabase como fuente de verdad

## Objetivo

Convertir Supabase en la fuente principal del CRM NC.

## Estado de fuentes

```text
Supabase = fuente de verdad.
Dashboard = herramienta diaria.
n8n = orquestador de automatizaciones.
Google Sheets = exportación / backup / reporte auxiliar.
```

## Arquitectura Fase 3

```text
Tally
→ Backend API / n8n intake controlado
→ Supabase
→ Dashboard operativo
→ Natalia decide
→ integration_events
→ n8n procesa automatizaciones internas
→ Google Sheets export backup
```

## Incluye

- Tally/n8n escriben en Supabase.
- Google Sheets deja de ser fuente operativa.
- Dashboard gestiona estados, notas, semáforo e interacciones.
- n8n consume eventos desde `integration_events`.
- Avisos internos.
- Reporte semanal básico.
- Plantillas manuales o semiautomáticas.
- Exportación periódica a Google Sheets.
- Registro completo de errores.

## No incluye todavía

```text
WhatsApp automático sensible
Pago integrado productivo
Calendario productivo obligatorio
Portal cliente
Expedientes fiscales completos
Automatización de asesoramiento
Multiusuario avanzado salvo necesidad real
```

## Tablas Fase 3

```text
leads
lead_triage
lead_status_history
lead_events
error_logs
lead_notes
lead_duplicates
integration_events
lead_interactions completo
response_templates
triage_rules si las reglas ya están estables
report_snapshots básico si hay volumen
users_profiles básico/medio
```

## Rol de `triage_rules` en Fase 3

Solo entra cuando:

```text
Las reglas ya han sido probadas en código.
Natalia entiende qué reglas se pueden editar.
Hay control de cambios.
No se permite romper el sistema desde una tabla.
```

## Rol de `response_templates` en Fase 3

Entra como apoyo manual:

```text
Plantilla sugerida
Copiar texto
Natalia revisa
Natalia envía
```

No entra como envío automático.

## Rol de `report_snapshots`

Entra cuando hay volumen suficiente para reportes.

Métricas mínimas:

```text
leads por semana
verdes / amarillos / rojos
conversión verde → diagnóstico propuesto
diagnóstico propuesto → reservado
tiempo medio de revisión
errores IA
duplicados
canales de origen
```

## Criterios de aceptación Fase 3

| ID | Criterio |
|---|---|
| CA-3-01 | Un lead nuevo entra directamente en Supabase. |
| CA-3-02 | Google Sheets ya no gobierna el estado operativo. |
| CA-3-03 | Dashboard muestra pipeline real. |
| CA-3-04 | Natalia puede operar leads reales desde dashboard. |
| CA-3-05 | Cada cambio queda auditado. |
| CA-3-06 | n8n consume eventos desde `integration_events`. |
| CA-3-07 | Google Sheets recibe exportación o backup. |
| CA-3-08 | Hay rollback definido. |
| CA-3-09 | No hay secretos en frontend. |
| CA-3-10 | No hay envío automático sensible al lead. |

---

# 4. Contrato IA actualizado para v2

El PRD v2 adopta el contrato de IA Fase 1 v1.1.

La IA devuelve texto estructurado así:

```json
{
  "Lead_ID": "",
  "Semaforo_IA": "VERDE | AMARILLO | ROJO",
  "Tipo_lead_IA": "",
  "Resumen_IA": "",
  "Motivo_clasificacion": "",
  "Dato_faltante": "",
  "Riesgo_detectado": "",
  "Tipo_riesgo": "",
  "Accion_recomendada": "",
  "Siguiente_accion": "",
  "Respuesta_sugerida": "",
  "Requiere_revision": "SI | NO"
}
```

## Conversión backend → Supabase

| IA / n8n | Supabase |
|---|---|
| `Semaforo_IA` | `lead_triage.semaforo_ia` |
| `Resumen_IA` | `lead_triage.resumen_caso` |
| `Dato_faltante` | `lead_triage.dato_critico_faltante` |
| `Riesgo_detectado` texto | `lead_triage.riesgo_detectado` boolean + texto en motivo |
| `Tipo_riesgo` | `lead_triage.tipo_riesgo` |
| `Requiere_revision = SI` | `lead_triage.requiere_revision_manual = true` |
| `Requiere_revision = NO` | `lead_triage.requiere_revision_manual = false` |

La IA no escribe directamente en Supabase. El backend valida y transforma.

---

# 5. Reglas de migración y rollback

## 5.1 Nunca hay doble fuente de verdad plena

| Fase | Fuente operativa | Supabase | Sheets |
|---|---|---|---|
| 2A | Google Sheets | Test/laboratorio | Principal |
| 2B | Google Sheets | Shadow/réplica | Principal |
| 2C | Supabase para piloto | Operativo controlado | Backup/export |
| 3 | Supabase | Principal | Backup/export |

## 5.2 Rollback

Si algo falla en 2B:

```text
Se desactiva réplica a Supabase.
Google Sheets sigue operativo.
No se pierde el flujo comercial.
```

Si algo falla en 2C:

```text
Se vuelve a operar desde Google Sheets.
Supabase queda en revisión.
No se activa producción completa.
```

Si algo falla en Fase 3:

```text
Se conserva exportación/backup.
Se congela escritura desde dashboard.
Se revisan error_logs e integration_events.
```

---

# 6. Agentes responsables

## Agente Orquestador / Producto

Responsable: Natalia + IA asistente.

Funciones:

```text
mantener alcance
priorizar fases
validar decisiones
evitar dispersión
cerrar criterios de aceptación
```

## Agente Backend/API

Funciones:

```text
crear endpoints
validar secretos
transformar datos
aplicar reglas finales
escribir en Supabase
registrar errores
```

## Agente Supabase/DB

Funciones:

```text
crear migraciones
definir enums
crear tablas
crear índices
activar RLS
validar relaciones
```

## Agente n8n

Funciones:

```text
replicar desde DIAGNOSTICO.json
enviar payload al backend
gestionar avisos internos
no enviar mensajes automáticos sensibles
```

## Agente Frontend/Dashboard

Funciones:

```text
pipeline
ficha lead
notas
estado operativo
semáforo
errores
copiar respuesta sugerida
```

## Agente QA

Funciones:

```text
test 2A
test 2B
test 2C
test migración
comparar Sheets vs Supabase
validar rollback
```

## Agente Seguridad/RGPD

Funciones:

```text
no exponer service_role
validar consentimiento
minimizar datos
control de acceso
auditar eventos
```

---

# 7. Roadmap operativo final

## Fase 2A — Preparación Supabase sin producción

```text
Crear Supabase.
Crear SQL base P0.
Crear backend mínimo.
Insertar leads test.
Dashboard lee Supabase.
Sheets sigue producción.
```

## Fase 2B — Migración paralela

```text
n8n sigue escribiendo en Sheets.
n8n/backend replica a Supabase.
Comparar datos.
Validar 10-20 test.
Validar 5-10 reales o simulados completos.
Errores y duplicados visibles.
```

## Fase 2C — Dashboard operativo controlado

```text
Dashboard opera sobre Supabase en piloto.
Natalia cambia estado.
Natalia añade notas.
Natalia corrige semáforo con motivo.
Todo se audita.
Sheets queda respaldo/export.
```

## Fase 3 — Producción Supabase

```text
Supabase fuente de verdad.
Dashboard herramienta diaria.
n8n consume eventos.
Sheets backup/export.
Plantillas y reportes básicos.
Sin automatización sensible al lead.
```

---

# 8. Definición de hecho v2

La v2 se considera lista cuando:

```text
Supabase guarda leads reales.
El backend valida antes de escribir.
El dashboard opera sin romper datos.
Semáforo y estado están separados.
Natalia puede revisar y decidir.
Los errores se registran.
Los duplicados se marcan.
n8n automatiza alrededor, no gobierna el CRM.
Google Sheets queda como backup/exportación.
No hay envío automático sensible.
Hay rollback.
```

---

# 9. Conclusión operativa

Este PRD v2 por fases evita el salto peligroso de:

```text
Google Sheets → Supabase producción de golpe
```

y lo convierte en:

```text
Google Sheets operativo
→ Supabase laboratorio
→ Supabase shadow
→ dashboard piloto
→ Supabase producción
```

La decisión correcta para NC es:

```text
No migrar por ilusión técnica.
Migrar cuando el sistema demuestre control.
```

Primero control.  
Luego migración.  
Después operación.  
Finalmente escala.
