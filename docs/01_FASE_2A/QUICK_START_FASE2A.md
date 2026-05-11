# QUICK_START_FASE2A.md

**Fase:** 2A - Laboratorio Supabase + Backend  
**Objetivo:** Preparar base técnica sin tocar producción  
**Estado:** 4/6 tareas completadas

---

## Objetivo de Fase 2A

Crear proyecto Supabase, schema P0, backend mínimo, datos test, dashboard read-only en laboratorio.

## Qué SE puede tocar

```
/supabase/migrations/
/supabase/seed/
/backend/
/docs/01_ACTIVO_FASE_2A/
```

## Qué NO se puede tocar

```
/n8n_workflows/
/skills/
/_archivo_DO_NOT_READ/
/server.js
/sheets.js
/public/
Google Sheets (producción)
WhatsApp automático
Email automático
Pagos
Calendario
```

## Orden de Tareas

| # | Tarea | Estado |
|---|---|---|
| 1 | TASK_2A_00 — AUDIT_WORKSPACE | ✅ COMPLETADA |
| 2 | TASK_2A_01 — SUPABASE_SCHEMA | ✅ COMPLETADA |
| 3 | TASK_2A_02 — BACKEND_MINIMO | ✅ COMPLETADA |
| 4 | TASK_2A_03 — SEED_TEST_DATA | ✅ COMPLETADA |
| 5 | TASK_2A_04 — DASHBOARD_READ_ONLY | ⏳ PENDIENTE |
| 6 | TASK_2A_05 — SMOKE_TESTS | ⏳ PENDIENTE |

## Tablas P0 Creadas

| Tabla | Descripción |
|---|---|
| leads | Tabla madre de leads |
| lead_triage | Clasificación IA (semáforo) |
| lead_status_history | Estados operativos |
| lead_events | Auditoría de eventos |
| error_logs | Registro de errores |
| lead_notes | Notas internas |

## Endpoints del Backend

| Método | Endpoint | Descripción |
|---|---|---|
| GET | /api/health | Estado del servicio |
| POST | /api/intake/test | Crear lead test |
| GET | /api/leads | Listar leads |
| GET | /api/leads/:id | Ver lead detalle |
| POST | /api/leads/:id/triage | Crear triaje IA |
| PATCH | /api/leads/:id/status | Cambiar estado |
| POST | /api/leads/:id/notes | Añadir nota |

## Regla de Skills

```
SKILLS_ALLOWED = NO por defecto
Solo si TASK_SPEC lo autoriza expresamente
```

## Clave: Contrato de Datos

Antes de tocar datos, revisar:
```
/docs/01_ACTIVO_FASE_2A/05_CONTRATO_DATOS_IA_Y_MIGRACION.md
```

## Regla de Semáforo/Estado

- **Semáforo** (VERDE/AMARILLO/ROJO) → En `lead_triage`
- **Estado** (NUEVO, DIAGNOSTICO_PROPUESTO, etc.) → En `lead_status_history`
- **NUNCA mezclar** en un solo campo

## Siguiente Tarea

**TASK_2A_04_DASHBOARD_READ_ONLY** — Conectar dashboard a backend/Supabase