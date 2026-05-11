# REVIEW_F3_V0_OPERAR_LEADS_DASHBOARD_AWS

## Estado

- Fase: `FASE_3_PRODUCCION_CONTROLADA_V0_ACTIVA`
- Resultado: `CORREGIR ANTES DE USO INTERNO` (pendiente validar flujos write en entorno con backend actualizado y variables correctas)

## Archivos leidos

- `AGENTS.md`
- `PROJECT_STATE.md`
- `docs/04_FASE_3/PROD_CONTROLADA_V0_CHECKLIST.md`
- `docs/04_FASE_3/RUNBOOK_DEPLOY_AWS_V0.md`
- `backend/src/index.js`
- `backend/src/routes/leads.js`
- `backend/src/validators/lead.js`
- `backend/src/lib/supabase.js`
- `backend/package.json`
- `public/index.html`
- `public/app.js`
- `public/styles.css`
- `supabase/migrations/001_create_tables_p0.sql`
- `supabase/migrations/003_create_lead_interactions.sql`

## Archivos modificados

- `public/index.html`
- `public/app.js`
- `public/styles.css`
- `backend/src/routes/leads.js`

## Endpoints agregados/modificados

- Agregado: `POST /api/leads`
- Agregado: `GET /api/leads/:id/interactions`
- Modificado: `GET /api/leads/:id` (incluye `lead_interactions`)
- Existente usado: `PATCH /api/leads/:id/status`
- Existente usado: `POST /api/leads/:id/interactions`

## Cambios UI

- Estados operativos del select alineados al enum real.
- Quitado bloqueo read-only de cambio de estado y activada persistencia por `PATCH /status`.
- Flujo modal `+ Nuevo lead` conectado a `POST /api/leads`.
- Formulario de interacción manual en ficha lead conectado a `POST /interactions`.
- Listado visible de interacciones desde `GET /interactions`.
- Fix de error potencial por filtros inexistentes (`filter-estado`, `filter-semaforo`).

## Pruebas ejecutadas

### Sintaxis local

- `node --check backend/src/routes/leads.js` -> PASS
- `node --check backend/src/validators/lead.js` -> PASS
- `node --check public/app.js` -> PASS

### Disponibilidad AWS (runtime vivo)

- `GET http://16.171.174.52:3001/api/health` -> 200
- `GET http://16.171.174.52:3001/api/leads` -> 200
- `GET http://16.171.174.52:8080` -> 200

### Smoke write local (backend levantado desde workspace)

- `GET /api/health` -> 200
- `GET /api/leads` -> 500
- `POST /api/leads` -> 500
- `PATCH /api/leads/<id>/status` -> 500
- `POST /api/leads/<id>/interactions` -> 500
- `GET /api/leads/<id>/interactions` -> 404 (sin `lead_id` valido por fallo previo)

Interpretacion:
- Hay evidencia de fallo de runtime local para operaciones write/read DB (variables/entorno local no alineado o backend activo distinto sin cambios desplegados).

## Acceptance check

- CA1 Dashboard carga: PASS parcial (AWS 200/200/200).
- CA2 Crear lead: PENDIENTE (bloquea aprobacion final).
- CA3 Ver detalle: PENDIENTE (bloquea aprobacion final).
- CA4 Cambiar estado: PENDIENTE (bloquea aprobacion final).
- CA5 Registrar interacción: PENDIENTE (bloquea aprobacion final).
- CA6 Fuera de alcance sin cambios: PASS (no cambios en n8n/MCP/.env/opencode/pem/docs master).
- CA7 Review final: PASS (este documento).

## Riesgos

- Puerto backend `3001` sigue publico sin auth de aplicacion (riesgo residual V0).
- Diferencia entre entorno local y entorno vivo puede ocultar regresiones hasta despliegue controlado.

## Rollback

- Backend: revertir `backend/src/routes/leads.js` y reiniciar backend.
- Frontend: revertir `public/index.html`, `public/app.js`, `public/styles.css`.
- No se toca n8n/MCP para rollback.

## Recomendacion

- `RECOMENDACION: CORREGIR ANTES DE USO INTERNO`
- Condicion para pasar a APROBAR: desplegar cambios en entorno controlado y repetir pruebas CA2-CA5 con HTTP esperados (201/200/201/200) y evidencia DB.
