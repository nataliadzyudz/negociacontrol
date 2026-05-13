# TASK_SPEC_F3_V0_SECRET_ROTATION_HARDENING_PENDING

## Estado

PENDIENTE_EJECUCION

## Objetivo

Rotar y retirar del repo las credenciales expuestas (prioridad: Supabase), actualizar runtime seguro y validar continuidad operativa en `:8080/api` sin abrir produccion.

## Contexto

- Se detectaron secretos en archivos versionados del backend.
- La cadena canonica operativa ya esta validada en V0 controlada (`/api/health` y `POST /api/leads`).
- El riesgo inmediato es de seguridad, no de funcionalidad del dashboard.

## Alcance permitido

1. Inventariar secretos expuestos en repo (sin imprimir valores).
2. Rotar claves en origen (Supabase) y revocar anteriores.
3. Actualizar secretos solo en runtime seguro (PM2/EasyPanel/entorno servidor).
4. Quitar secretos activos del repo y dejar placeholders seguros.
5. Revalidar operacion minima canónica:
   - `GET /api/health` por `:8080/api`
   - `POST /api/leads` por `:8080/api`
6. Registrar evidencia tecnica y estado final.

## Fuera de alcance

- No activar n8n productivo.
- No modificar workflow productivo.
- No tocar `/api/intake/diagnostico` en esta tarea.
- No cambiar schema/migraciones Supabase.
- No abrir puertos ni cambiar arquitectura de red salvo incidencia critica documentada.

## READ_SET

- `AGENTS.md`
- `PROJECT_STATE.md`
- `backend/ecosystem.config.js`
- `backend/src/lib/supabase.js`
- `backend/src/index.js`
- `backend/src/routes/leads.js`
- `docs/04_FASE_3/RUNBOOK_DEPLOY_AWS_V0.md`
- `docs/04_FASE_3/PROD_CONTROLADA_V0_CHECKLIST.md`
- `docs/04_FASE_3/REVIEW_F3_V0_OPERAR_LEADS_DASHBOARD_AWS.md`

## WRITE_SET propuesto

- `backend/ecosystem.config.js` (solo para eliminar hardcode de secreto)
- `backend/.env.example` (crear/ajustar placeholders si aplica)
- `docs/04_FASE_3/REVIEW_F3_V0_OPERAR_LEADS_DASHBOARD_AWS.md` (trazabilidad)

## Criterios de aceptacion

CA-01: No quedan secretos activos hardcodeados en archivos versionados del alcance backend.

CA-02: Claves antiguas revocadas y claves nuevas operativas en runtime seguro.

CA-03: `GET :8080/api/health` responde `200` tras rotacion.

CA-04: `POST :8080/api/leads` responde `201` con lead sintetico test.

CA-05: No se toca n8n productivo ni workflows productivos.

CA-06: Evidencia registrada con PASS/FAIL/PENDIENTE, riesgos y siguiente paso real.

## Pruebas obligatorias

1. Smoke backend post-rotacion:
   - `GET http://16.171.174.52:8080/api/health` -> `200`
2. Smoke escritura canónica:
   - `POST http://16.171.174.52:8080/api/leads` -> `201`
3. Verificacion DB via backend/supabase read-only:
   - confirmar `id`/`lead_code` del lead sintetico creado.

## Riesgos

- Desalineacion temporal entre clave nueva y servicios no reiniciados.
- Corte temporal de API si revocacion ocurre antes de actualizar runtime.

## Mitigacion

- Ejecutar rotacion en ventana unica controlada.
- Actualizar runtime y reiniciar procesos antes de revocar definitivamente.
- Tener rollback operativo listo.

## Rollback

1. Restaurar configuracion runtime previa (solo si la nueva falla).
2. Revalidar `GET /api/health` y `GET /api/leads`.
3. Mantener bloqueo de cambios adicionales hasta estabilizar.

## Seguridad

- No imprimir secretos en consola, docs ni commits.
- No subir claves nuevas al repo.
- Validar que logs no contengan valores sensibles.

## Resultado esperado

Entorno V0 controlado con credenciales rotadas, sin secretos expuestos en repo y operacion canonica backend confirmada.

## Siguiente paso real (tras ejecutar esta spec)

Retomar deuda no bloqueante de Google Sheets en workflow LAB en tarea separada.
