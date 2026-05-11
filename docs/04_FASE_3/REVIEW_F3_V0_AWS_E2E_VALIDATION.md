# REVIEW_F3_V0_AWS_E2E_VALIDATION

## Estado

- Fase: `FASE_3_PRODUCCION_CONTROLADA_V0_ACTIVA`
- Resultado: `APROBAR USO INTERNO CONTROLADO V0`

## Rutas AWS detectadas

- Backend deploy path: `/var/www/nc-backend`
- Frontend deploy path: `/var/www/nc-frontend`
- Frontend servido por nginx en `:8080`
- Backend activo en `:3001` por PM2 app `nc-backend`

## Archivos desplegados

- `/var/www/nc-backend/src/routes/leads.js`
- `/var/www/nc-frontend/index.html`
- `/var/www/nc-frontend/app.js`
- `/var/www/nc-frontend/styles.css`

## Backups creados

- Backup dir: `/home/ubuntu/backups_nc/20260511_232018`
- Archivos:
  - `leads.js.bak`
  - `index.html.bak`
  - `app.js.bak`
  - `styles.css.bak`

## Procesos / restart

- `pm2 restart nc-backend` ejecutado -> `online`.
- Nginx no modificado (sin cambio de config ni security group).

## Comandos y evidencia HTTP

- Smoke:
  - `GET http://16.171.174.52:3001/api/health` -> `200`
  - `GET http://16.171.174.52:3001/api/leads` -> `200`
  - `GET http://16.171.174.52:8080` -> `200`

- CA2 Crear lead test:
  - `POST /api/leads` -> `201`
  - `lead_id`: `31abf322-60a9-4fd4-ab75-a6e8e67c6394`
  - `lead_code`: `NC-L-34514458`

- CA3 Ver detalle:
  - `GET /api/leads/31abf322-60a9-4fd4-ab75-a6e8e67c6394` -> `200`
  - Datos base presentes (`nombre`, `email`, `whatsapp`).
  - `lead_interactions` presente como array.

- CA4 Cambio de estado:
  - `PATCH /api/leads/31abf322-60a9-4fd4-ab75-a6e8e67c6394/status` -> `200`
  - Estado aplicado: `DIAGNOSTICO_PROPUESTO`.

- CA5 Registrar interacción:
  - `POST /api/leads/31abf322-60a9-4fd4-ab75-a6e8e67c6394/interactions` -> `201`
  - `GET /api/leads/31abf322-60a9-4fd4-ab75-a6e8e67c6394/interactions` -> `200`, `count: 1`.

## Evidencia Supabase (via API)

- `leads`: fila creada (respuesta `POST /api/leads` con `id` y `lead_code`).
- `lead_status_history`: `GET /api/leads/:id` devuelve `status_rows=2` e incluye `DIAGNOSTICO_PROPUESTO`.
- `lead_interactions`: `GET /api/leads/:id/interactions` devuelve la interacción creada.

## Pendientes

- Verificación visual/manual en navegador de consola frontend (`:8080`) queda `PENDIENTE` en esta corrida CLI.
- Impacto: **no bloquea** CA2-CA5 API E2E, pero debe completarse antes de sesión demo final.

## Validación visual manual dashboard

Resultado: PASS

Checklist:
- [x] Dashboard carga en navegador.
- [x] Lead test creado desde UI.
- [x] Ficha de lead abre correctamente.
- [x] Cambio de estado desde UI funciona.
- [x] Interacción manual desde UI funciona.
- [x] Interacción queda visible.
- [x] No aparece bloqueo read-only Fase 2A.
- [x] No hay error crítico visible.

Decisión:
APROBADO USO INTERNO CONTROLADO V0.

## Riesgos restantes

- Puerto `3001` expuesto públicamente sin auth de aplicación (riesgo residual conocido V0).
- Producción abierta todavía bloqueada.
- Pendiente endurecimiento básico AWS.
- `PHASE` runtime backend reporta `2C` en logs PM2; no bloquea E2E de leads pero requiere alineación operativa documental.

## Rollback

1. Restaurar backups desde `/home/ubuntu/backups_nc/20260511_232018` a rutas productivas.
2. `pm2 restart nc-backend`.
3. Revalidar `GET /api/health`, `GET /api/leads`, `GET :8080`.

## Decisión

- `FINAL_RECOMMENDATION: APROBAR USO INTERNO CONTROLADO V0`
- Validación visual manual dashboard cerrada en PASS.
