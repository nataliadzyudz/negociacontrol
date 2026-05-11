# Fase 3 — Supabase como fuente de verdad

## 1. Objetivo

Convertir Supabase en la fuente principal del CRM NC.

En Fase 3:

```text
Supabase = fuente de verdad.
Dashboard = herramienta diaria.
n8n = orquestador de automatizaciones.
Google Sheets = exportación / backup / reporte auxiliar.
```

## 2. Condiciones previas

No empezar Fase 3 hasta que Fase 2C cumpla:

```text
Dashboard opera sin romper datos.
Natalia trabaja desde dashboard.
Cambios auditados.
Errores controlados.
Duplicados controlados.
Rollback probado.
Sheets disponible como respaldo/exportación.
```

## 3. Arquitectura objetivo

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

## 4. Alcance incluido

- Tally/n8n escriben en Supabase.
- Google Sheets deja de ser fuente operativa.
- Dashboard gestiona estados, notas, semáforo e interacciones.
- n8n consume eventos desde `integration_events`.
- Avisos internos.
- Reporte semanal básico.
- Plantillas manuales o semiautomáticas.
- Exportación periódica a Google Sheets.
- Registro completo de errores.

## 5. Alcance excluido todavía

```text
WhatsApp automático sensible
Pago integrado productivo
Calendario productivo obligatorio
Portal cliente
Expedientes fiscales completos
Automatización de asesoramiento
Multiusuario avanzado salvo necesidad real
```

## 6. Tablas activas en Fase 3

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

## 7. Cambios respecto a Fase 2C

### Antes

```text
Google Sheets podía seguir siendo respaldo operativo.
```

### Ahora

```text
Supabase gobierna.
Google Sheets exporta o respalda.
```

## 8. n8n en Fase 3

n8n no decide el CRM.

n8n procesa eventos como:

```text
AVISO_INTERNO_ROJO
AVISO_ERROR_IA
EXPORT_SHEETS
REPORTE_SEMANAL
SEGUIMIENTO_MANUAL_PENDIENTE
```

Fuente de eventos:

```text
integration_events
```

## 9. response_templates

Entran como apoyo manual.

Regla:

```text
Plantilla sugerida.
Natalia revisa.
Natalia envía.
```

No envío automático sensible.

## 10. triage_rules

Solo entran si:

```text
Las reglas ya han sido probadas en código.
Natalia entiende qué reglas se pueden editar.
Hay control de cambios.
No se permite romper el sistema desde una tabla.
```

## 11. report_snapshots

Entran cuando hay volumen suficiente.

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

## 12. users_profiles

Versión básica:

```text
id
email
nombre
rol
activo
created_at
```

Roles iniciales:

```text
ADMIN
OPERADOR
LECTURA
```

No crear complejidad multiusuario si no hay equipo real operando.

## 13. Google Sheets en Fase 3

Google Sheets queda como:

```text
backup
exportación
reporte auxiliar
copia para revisión externa
```

No gobierna estado operativo.

## 14. Rollback Fase 3

Si algo falla:

```text
Congelar escritura desde dashboard.
Mantener Supabase en modo lectura.
Exportar datos a Sheets.
Revisar error_logs.
Revisar integration_events.
Restaurar operación mínima desde Sheets si hace falta.
```

## 15. Criterios de aceptación

| ID | Criterio |
|---|---|
| CA-3-01 | Un lead nuevo entra directamente en Supabase. |
| CA-3-02 | Google Sheets ya no gobierna estado operativo. |
| CA-3-03 | Dashboard muestra pipeline real. |
| CA-3-04 | Natalia puede operar leads reales desde dashboard. |
| CA-3-05 | Cada cambio queda auditado. |
| CA-3-06 | n8n consume eventos desde `integration_events`. |
| CA-3-07 | Google Sheets recibe exportación o backup. |
| CA-3-08 | Hay rollback definido. |
| CA-3-09 | No hay secretos en frontend. |
| CA-3-10 | No hay envío automático sensible al lead. |

## 16. Definition of Done

Fase 3 termina cuando:

```text
Supabase guarda leads reales.
Backend valida antes de escribir.
Dashboard opera sin romper datos.
Semáforo y estado están separados.
Natalia puede revisar y decidir.
Errores se registran.
Duplicados se marcan.
n8n automatiza alrededor.
Google Sheets queda como backup/exportación.
No hay envío automático sensible.
Hay rollback.
```

## 17. Prompt recomendado para Antigravity

```text
Lee solo estos documentos:

/docs/04_FASE3_PRODUCCION_SUPABASE.md
/docs/05_CONTRATO_DATOS_IA_Y_MIGRACION.md
/docs/06_REGLAS_NO_NEGOCIABLES_NC.md

Actúa como arquitecto de producción y orquestador técnico.

Objetivo:
Planificar Fase 3: Supabase como fuente de verdad.

No implementes nada hasta entregar PLAN.
No incluyas automatización sensible al lead.
No actives pagos ni calendario productivo.
No borres soporte de Google Sheets como backup/exportación.

Devuelve:
1. plan de corte a producción;
2. cambios backend;
3. cambios n8n;
4. cambios dashboard;
5. exportación a Sheets;
6. rollback;
7. checklist de seguridad;
8. criterios de aceptación.
```
