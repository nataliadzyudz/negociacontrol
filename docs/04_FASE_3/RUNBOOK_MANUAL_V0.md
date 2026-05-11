# RUNBOOK_MANUAL_V0 — NC Control Tower

## 1) URL/backend base

- Backend: `http://16.171.174.52:3001`
- Frontend: `http://16.171.174.52:8080`

## 2) Checks antes de uso

- `GET /api/health` -> 200.
- `GET /api/leads` -> 200.
- `POST /api/leads/:id/interactions` valido -> 201.
- `POST /api/leads/:id/interactions` invalido -> 400.
- Confirmar logs activos y rollback disponible.

## 3) Flujo manual permitido

1. Abrir dashboard.
2. Consultar lead test/autorizado.
3. Operar cambios manuales via backend/dashboard.
4. Registrar evidencia de operacion.

## 4) Que no tocar

- No produccion abierta.
- No n8n productivo automatico.
- No automatizaciones sensibles.
- No escritura MCP amplia.
- No datos reales sin aprobacion expresa de Natalia.

## 5) Que registrar

- Fecha/hora de operacion.
- Endpoint/accion ejecutada.
- Resultado HTTP.
- Evidencia en logs/review.

## 6) Que hacer si falla

- Parar operacion manual.
- Registrar error exacto.
- Escalar a Natalia con impacto y siguiente prueba minima.

## 7) Rollback/parada

- Revertir ultimo cambio operativo permitido.
- Volver a estado seguro previo.
- Mantener bloqueo de nuevas acciones hasta validacion.

## 8) Siguiente mejora

- Resolver deuda MCP n8n para habilitar automatizacion avanzada de Fase 3.
