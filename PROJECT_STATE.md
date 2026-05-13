# PROJECT_STATE: NC CRM / Control Tower v2

## Estado actual

- Fase activa: `3_V0` (produccion controlada)
- Estado operativo: `ACTIVO_CONTROLADO`
- Produccion abierta: `NO`
- Cadena validada: `Tally real -> n8n -> backend /api/leads -> Supabase -> revision interna`

## Estado tecnico resumido

- Backend canonico: `PASS` (`/api/leads` operativo)
- Persistencia Supabase: `PASS`
- Hardening de secretos en repo/runtime: `PASS` (con evidencia en reviews)
- n8n LAB runtime: `PASS`
- Google Sheets LAB incidencia columnas: `RESUELTA`
- RLS final en proveedor: `PENDIENTE`

## Pendientes reales (bloqueantes y no bloqueantes)

### Bloqueante para madurez de seguridad

- Aplicar y validar RLS final en entorno objetivo de Supabase, con smoke posterior.

### No bloqueantes inmediatos

- Consolidacion documental de legacy 2A/2C hacia canon vivo.
- Separacion de deudas legacy en registro de decisiones.

---

## Estado del sistema (LIVE)

| Componente | Host | Puerto | Estado | Phase |
|---|---|---|---|---|
| Backend | 16.171.174.52 | 3001 | RUNNING | PHASE=3_V0 |
| Frontend | 16.171.174.52 | 8080 | RUNNING | - |
| n8n | 16.171.174.52 | 5678 | RUNNING | Lab/controlado |
| Supabase | njzvqyovopcwfgwvnqli | - | CONNECTED | test/controlado |

---

## Historial de fases

| Fase | Estado | Fecha cierre/activacion | Carpeta docs | Nota |
|---|---|---|---|---|
| 1 | LEGACY | - | - | Operacion inicial con Sheets |
| 2A | COMPLETADA | 2026-05-05 | `docs/01_FASE_2A/` | Base backend/supabase lab |
| 2B | COMPLETADA | 2026-05-06 | `docs/02_FASE_2B/` | Integracion intermedia |
| 2C | COMPLETADA | 2026-05-08 | `docs/03_FASE_2C/` | Cierre controlado (legacy historico) |
| 3_V0 | ACTIVA | 2026-05-11 | `docs/04_FASE_3/` | Produccion controlada, no abierta |

---

## Regla de lectura obligatoria por tarea

Antes de ejecutar cualquier tarea:

1. Leer `AGENTS.md`.
2. Leer `PROJECT_STATE.md`.
3. Leer `docs/00_CANON/README.md`.
4. Leer `TASK_SPEC` activa.
5. Ejecutar solo dentro de `READ_SET/WRITE_SET/DO_NOT_TOUCH`.

## Regla de cierre minimo

Toda tarea debe cerrar con:

- `PASS/FAIL/PENDIENTE`
- evidencia verificable
- riesgos residuales
- rollback
- `NEXT_STEP` unico
