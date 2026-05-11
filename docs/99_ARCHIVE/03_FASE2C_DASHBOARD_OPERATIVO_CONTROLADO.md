# Fase 2C — Dashboard operativo controlado

## 1. Objetivo

Permitir que Natalia opere leads desde el dashboard sobre Supabase en modo piloto, sin automatización sensible.

## 2. Estado de fuentes

```text
Supabase = base operativa piloto.
Google Sheets = respaldo / exportación / puente.
Dashboard = operativo controlado.
n8n = orquestador auxiliar, no cerebro del CRM.
```

## 3. Principio operativo

```text
Natalia decide.
Dashboard ayuda.
Backend valida.
Supabase guarda.
n8n automatiza alrededor.
```

## 4. Regla anti-doble mando

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

## 5. Alcance incluido

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
Añadir nota interna
Registrar interacción simple
Marcar duplicado revisado
Archivar lead
Copiar respuesta sugerida
Marcar revisión humana
Registrar diagnóstico propuesto
Registrar diagnóstico reservado
```

### Auditoría obligatoria

Cada acción debe generar:

```text
lead_events
lead_status_history si cambia estado
lead_notes si es nota
lead_interactions si es contacto registrado
```

## 6. Alcance excluido

No permitir:

```text
Enviar WhatsApp automático
Enviar email automático
Borrar leads
Modificar en masa
Cambiar reglas IA desde UI
Dar asesoramiento fiscal automático
Activar pagos productivos
Activar calendario productivo obligatorio
Exponer claves privadas en frontend
Editar payload original
```

## 7. Tablas activas en Fase 2C

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

## 8. Estados operativos permitidos

```text
NUEVO
PENDIENTE_REVISION
FALTA_DATO
APTO_DIAGNOSTICO
DIAGNOSTICO_PROPUESTO
DIAGNOSTICO_RESERVADO
CLIENTE_ACTIVO
NO_ENCAJA
NO_CONTESTA
ERROR_IA
ARCHIVADO
```

## 9. Semáforo permitido

```text
VERDE
AMARILLO
ROJO
```

No se permite mezclar semáforo y estado.

Correcto:

```text
Semaforo_final = VERDE
Estado = DIAGNOSTICO_PROPUESTO
```

Incorrecto:

```text
Estado = VERDE_DIAGNOSTICO
```

## 10. lead_interactions simple

Campos mínimos:

```text
id
lead_id
fecha
canal
tipo_interaccion
resumen
responsable
created_at
```

Canales:

```text
WHATSAPP_MANUAL
EMAIL_MANUAL
LLAMADA
NOTA_INTERNA
OTRO
```

Tipos:

```text
MENSAJE_ENVIADO_MANUAL
RESPUESTA_RECIBIDA
LLAMADA_REALIZADA
SEGUIMIENTO
CIERRE
```

## 11. Funciones de dashboard

### Pipeline

Debe mostrar:

```text
total leads
verdes
amarillos
rojos
pendientes revisión
errores IA
tests
duplicados
```

Agrupación principal:

```text
Estado operativo
```

Visual secundario:

```text
Semaforo_final
```

### Ficha de lead

Debe mostrar:

```text
datos contacto
consentimiento
campos de caso
semáforo
estado
triaje IA
riesgo detectado
acción recomendada
respuesta sugerida
notas
eventos
errores
duplicados
```

### Errores

Debe mostrar:

```text
error_type
error_message
lead asociado
fecha
resolved
```

## 12. Backend obligatorio

El dashboard no escribe directamente en Supabase si la operación es crítica.

Debe usar backend para:

```text
cambio de estado
corrección de semáforo
notas
interacciones
duplicados
archivo
```

## 13. Criterios de aceptación

| ID | Criterio |
|---|---|
| CA-2C-01 | Natalia puede abrir pipeline por estado operativo. |
| CA-2C-02 | Cada tarjeta muestra semáforo separado. |
| CA-2C-03 | Natalia puede cambiar estado con motivo. |
| CA-2C-04 | Natalia puede corregir semáforo con motivo. |
| CA-2C-05 | Cada cambio crea evento. |
| CA-2C-06 | Cada cambio de estado queda en historial. |
| CA-2C-07 | Natalia puede añadir nota interna. |
| CA-2C-08 | Natalia puede copiar respuesta sugerida, pero no enviarla automáticamente. |
| CA-2C-09 | Los errores se ven en `/errores`. |
| CA-2C-10 | Duplicados se marcan, no se fusionan automáticamente. |
| CA-2C-11 | Google Sheets sigue disponible como respaldo/exportación. |
| CA-2C-12 | Hay rollback a Sheets si el dashboard falla. |

## 14. Definition of Done

Fase 2C termina cuando:

```text
Dashboard opera sin romper datos.
Natalia puede trabajar desde dashboard.
Los cambios quedan auditados.
Semáforo y estado siguen separados.
Sheets queda como respaldo/exportación.
No hay pérdida de leads.
No hay envío automático sensible.
Hay rollback claro.
```

## 15. Prompt recomendado para Antigravity

```text
Lee solo estos documentos:

/docs/03_FASE2C_DASHBOARD_OPERATIVO_CONTROLADO.md
/docs/05_CONTRATO_DATOS_IA_Y_MIGRACION.md
/docs/06_REGLAS_NO_NEGOCIABLES_NC.md

Actúa como arquitecto frontend/backend de dashboard operativo.

Objetivo:
Construir solo Fase 2C: dashboard operativo controlado sobre Supabase.

No construyas Fase 3.
No hagas Supabase fuente de verdad plena todavía.
No implementes WhatsApp automático, email automático, pagos ni calendario.

Primero entrega PLAN con:
1. pantallas;
2. endpoints necesarios;
3. acciones permitidas;
4. acciones bloqueadas;
5. auditoría;
6. rollback;
7. tests.
```
