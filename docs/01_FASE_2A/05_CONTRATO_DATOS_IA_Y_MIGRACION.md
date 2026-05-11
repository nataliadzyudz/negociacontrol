# Contrato de datos IA, Sheets, Supabase y migración

## 1. Objetivo

Este documento fija nombres, campos y conversiones para evitar que Antigravity, n8n, Supabase o el dashboard inventen estructuras distintas.

Regla:

```text
Un campo.
Un significado.
Una conversión controlada.
```

## 2. Contrato IA actual

La IA debe devolver exactamente:

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

## 3. Campos que NO calcula la IA

Estos campos pertenecen a n8n/backend/reglas:

```text
Semaforo_preIA
Semaforo_final
Estado
Consentimiento_valido
Email_valido
WhatsApp_valido
Es_test
Canal_origen
Campaña_origen
Riesgo_duro_detectado
Riesgo_duro_motivo
Requiere_revision_preIA
Error_tecnico
Fecha_ultima_actualizacion
```

## 4. Jerarquía de decisión

```text
Reglas duras pre-IA > IA > reglas finales backend > revisión Natalia
```

## 5. Semáforos

Valores permitidos:

```text
VERDE
AMARILLO
ROJO
```

### Significado

```text
VERDE = puede pasar a diagnóstico inicial.
AMARILLO = necesita dato o aclaración.
ROJO = revisión humana antes de responder o fuera de automatización.
```

## 6. Estados operativos

Valores permitidos:

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

## 7. Separación obligatoria

Correcto:

```text
Semaforo_final = VERDE
Estado = DIAGNOSTICO_PROPUESTO
```

Incorrecto:

```text
Estado = VERDE_DIAGNOSTICO
```

## 8. Conversión SI/NO

| Texto | Boolean |
|---|---|
| `SI` | `true` |
| `NO` | `false` |

Aplicar a:

```text
Consentimiento_valido
Email_valido
WhatsApp_valido
Es_test
Riesgo_duro_detectado
Requiere_revision
Requiere_revision_preIA
```

## 9. Mapeo Sheets → Supabase

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
| `Consentimiento` | `leads.consentimiento_original` |
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
| `Notas_NC` | `lead_notes.note` |
| `Fecha_ultima_actualizacion` | `updated_at` |

## 10. Regla de conflicto

Si hay conflicto:

```text
Gana el riesgo.
```

Ejemplos:

```text
Semaforo_preIA = ROJO
Semaforo_IA = VERDE
Semaforo_final = ROJO
```

```text
Consentimiento_valido = NO
Semaforo_IA = VERDE
Semaforo_final = ROJO
```

```text
Email_valido = NO
WhatsApp_valido = NO
Semaforo_IA = VERDE
Semaforo_final = AMARILLO como mínimo
```

## 11. Regla de test

`Es_test = SI` si:

```text
Nombre contiene [TEST]
Nombre contiene TEST
Nombre contiene test
Nombre contiene verde
Nombre contiene amarillo
Nombre contiene rojo
Email contiene test
Email contiene dominio de prueba
```

Dominios de prueba:

```text
example.com
test.com
prueba.com
gmail.test
```

La detección debe ser case-insensitive.

## 12. Reglas duras pre-IA

Activan ROJO antes de la IA:

```text
no consentimiento válido
multa
deuda
inspección
sanción
denuncia
requerimiento
embargo
sin contrato
papeles caducados
situación irregular
fraude
ocultar ingresos
no declarar
dinero en negro
evitar impuestos
problemas con Hacienda
tax audit
tax debt
penalty
undeclared income
work without contract
штраф
борг
податкова перевірка
без контракту
прострочені документи
не декларувати
приховати доходи
```

## 13. Regla de contacto

Si:

```text
Email_valido = NO
WhatsApp_valido = NO
```

Entonces:

```text
Semaforo_final = AMARILLO
Dato_faltante = Email o WhatsApp válido
```

Salvo que exista riesgo rojo superior.

## 14. Backend como validador

La IA no escribe directamente en Supabase.

Flujo correcto:

```text
IA devuelve JSON.
Backend valida.
Backend convierte tipos.
Backend aplica reglas finales.
Backend escribe en Supabase.
```

## 15. Campos prohibidos inventados

No usar:

```text
semaforo
requiere_revision_manual como campo IA original
dato_critico_faltante en n8n
riesgo_detectado boolean generado por IA
VERDE_DIAGNOSTICO
AMARILLO_REVISAR
ROJO_NO_ENCAJA
```

Se pueden usar equivalencias en Supabase, pero el contrato IA y Sheets deben mantenerse estables.

## 16. Definition of Done del contrato

El contrato está cumplido cuando:

```text
n8n, backend, Supabase y dashboard usan los mismos nombres.
No se mezclan semáforo y estado.
SI/NO se convierte de forma controlada.
La IA no decide tipos de base de datos.
Los errores se registran.
No se pierde el lead.
```
