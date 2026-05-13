# NC Control Tower - Diagnostico fiscal con IA

## Objetivo
Prototipo/PoC para reducir friccion real en captacion, clasificacion y operacion de leads del diagnostico fiscal de NEGOCIA CONTROL.

## Arquitectura canonica
Tally
-> n8n
-> Google Sheets como espejo operativo/QA temporal
-> Backend `POST /api/intake/diagnostico`
-> Supabase (`leads`, `lead_triage`, `lead_status_history`)
-> Dashboard operativo

## Separacion de responsabilidades
- Natalia decide
- IA clasifica
- Backend valida
- Supabase guarda
- n8n automatiza
- Dashboard permite operar

## Estado actual
- Fase 3 V0 / produccion controlada en preparacion.
- Arquitectura documental consolidada.
- Fase 2 tecnica pendiente: backend intake completo + n8n candidate post-IA + dashboard minimo Semaforo_final.

## Uso responsable
- No automatiza decisiones fiscales definitivas.
- Requiere revision humana.
- No usa datos reales en pruebas publicas.
- No expone credenciales.

## Documentacion relevante
- `AGENTS.md`
- `PROJECT_STATE.md`
- `docs/04_FASE_3/`
- `docs/00_CANON/README.md`

## Nota sobre historico
`docs/99_ARCHIVE` contiene material legacy/historico y no representa necesariamente la arquitectura activa.
