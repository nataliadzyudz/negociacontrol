# PROD_CONTROLADA_V0_CHECKLIST — NC Control Tower

## 1) Estado previo

- Fase origen: 2C_CIERRE_CONTROLADO.
- Gate: APROBAR_CON_CONDICIONES.
- lead_interactions: RESUELTO (201/400 + persistencia).
- MCP n8n: BLOQUEANTE_AUTOMATIZACION (no bloquea runtime v0 con mitigacion).
- Produccion abierta: NO autorizada.

## 1.1 Verificacion tecnica registrada (2026-05-11)

- `/api/health` -> HTTP 200 (`service: nc-control-tower`).
- `/api/leads` -> HTTP 200.
- `POST /api/leads/:id/interactions` valido -> HTTP 201 + `success:true`.
- `POST /api/leads/:id/interactions` invalido -> HTTP 400.
- `lead_interactions` -> RESUELTO (evidencia en review tecnica).

## 2) Que permite PROD_CONTROLADA_V0

- Operacion manual/controlada del runtime app.
- Uso de backend + dashboard + Supabase bajo control humano.
- Validacion operativa con evidencia y rollback.

## 3) Que NO permite

- Produccion abierta.
- Automatizacion sensible.
- n8n productivo automatico.
- Escritura MCP amplia.
- Ejecucion sin trazabilidad.

## 4) Checklist tecnico pre-release

- [x] Backend online.
- [ ] `/health` PASS (no canonico, no requerido para decision v0).
- [x] `/api/health` PASS.
- [x] `/api/leads` PASS.
- [x] `POST /api/leads/:id/interactions` valido PASS (201).
- [x] `POST /api/leads/:id/interactions` invalido PASS (400).
- [x] Dashboard online.
- [x] Conexion Supabase PASS.
- [x] Variables de entorno configuradas.

## 5) Checklist seguridad

- [x] Secrets no expuestos.
- [x] Revisiones humanas activas en cambios criticos.
- [x] Sin claves en frontend/logs.

## 6) Checklist datos

- [x] Sin datos reales no autorizados.
- [x] Uso manual aprobado para cualquier excepcion.
- [x] Evidencia de trazabilidad en logs activos.

## 7) Checklist n8n/MCP

- [x] n8n productivo OFF o manual.
- [x] MCP escritura OFF.
- [x] Automatizaciones sensibles OFF.
- [x] Deuda MCP mantenida como pendiente de automatizacion Fase 3.

## 8) Checklist rollback

- [x] Rollback tecnico definido y probado en entorno controlado.
- [x] Rollback operativo documentado (quien, cuando, como).
- [x] Criterio de corte y retorno a estado seguro definido.

## 9) Decision Natalia

- Decision: [ ] APROBAR_V0  [x] APROBAR_V0_CON_CONDICIONES  [ ] CORREGIR  [ ] BLOQUEAR
- Fecha: 2026-05-11
- Condiciones aceptadas: operacion manual/controlada; no produccion abierta; MCP automatizacion pendiente.
- Riesgo residual aceptado: MCP n8n bloquea automatizacion avanzada, no runtime v0.

## 10) Siguiente paso operativo

- Si APROBAR_V0(_CON_CONDICIONES): ejecutar `docs/04_FASE_3/RUNBOOK_MANUAL_V0.md` con monitoreo y revision humana obligatoria.
- Si CORREGIR/BLOQUEAR: cerrar pendientes y revalidar checklist completa.
