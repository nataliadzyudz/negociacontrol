# PRODUCCION_SEGURA_CHECKLIST.md

Checklist operativo para garantizar seguridad y estabilidad antes de activar Fase 3.

## 1) Secretos y credenciales

- [ ] No hay secretos en `git diff`, `git status` ni archivos versionados.
- [ ] Tokens MCP en almacenamiento local (fuera del repo) o variable de entorno.
- [ ] Token anterior revocado si fue expuesto.
- [ ] Supabase keys revisadas y principio de minimo privilegio aplicado.
- [ ] Credenciales AWS con acceso minimo requerido por servicio.

## 2) MCP seguro

- [ ] `MCP.md` contiene placeholders, nunca tokens reales.
- [ ] MCP n8n responde 401 sin token y responde con autenticacion valida.
- [ ] Cliente MCP reiniciado y servidor `n8n-mcp` en estado Connected.
- [ ] Registro de rotacion: fecha, owner y siguiente fecha de rotacion.

## 3) Backend/AWS

- [ ] Backend en PM2 online y con autorestart validado.
- [ ] Health endpoint y rutas criticas devuelven 200.
- [ ] Variables de entorno cargadas en runtime.
- [ ] Logs de error sin excepciones criticas repetitivas.
- [ ] Firewall/Security Group solo con puertos necesarios.

## 4) n8n y flujo DIAGNOSTICO

- [ ] Workflow de laboratorio validado end-to-end con `Es_test=true`.
- [ ] Insercion en Supabase confirmada.
- [ ] Duplicados retornan 409 en endpoint de intake.
- [ ] Politica para evitar doble accion en Sheets definida.
- [ ] Alertas internas configuradas para casos ROJO y errores IA.

## 5) Supabase y datos

- [ ] Estructura de tablas y constraints validadas.
- [ ] Backups activos y prueba de restauracion realizada.
- [ ] RLS/politicas revisadas para tablas con datos operativos.
- [ ] Auditoria basica de eventos y errores habilitada.

## 6) Gate de paso a produccion

Para mover Fase 2C -> Fase 3:

- [ ] Evidencias de cada criterio de aceptacion adjuntas.
- [ ] KPI de disponibilidad y errores en rango.
- [ ] Riesgos abiertos con plan de mitigacion y owner.
- [ ] Recomendacion final del Gate: APROBAR.

## 7) Rollback minimo

- [ ] Plan para volver a flujo anterior en menos de 30 min.
- [ ] Snapshot/backup previo al cambio en produccion.
- [ ] Contactos y orden de escalado definidos.

## 8) Ejecucion de verificacion (2026-05-08)

Estado comprobado en esta sesion:

- [x] Backend AWS responde `200` en `GET /api/leads` con datos (`count: 10`).
- [x] Endpoint MCP n8n accesible por HTTPS.
- [x] `MCP.md` sin token real (solo placeholder/variable de entorno).
- [x] Busqueda de secretos JWT en archivos `.md` del repo sin hallazgos activos.
- [ ] Cliente MCP reporta `Connected` en UI local (requiere validacion manual en tu equipo).
- [ ] Prueba end-to-end desde webhook n8n con evidencia de ejecucion (requiere UI n8n).
- [ ] Prueba de backup/restore documentada con timestamp.

## 9) Diagnostico MCP n8n (2026-05-09)

Estado comprobado en esta sesion:

- [x] `opencode --version` = `1.14.41`.
- [x] `opencode mcp auth n8n-mcp` ejecutado con exito.
- [x] `POST /mcp-server/http` con token valido responde `200` y `text/event-stream`.
- [x] `GET /mcp-server/http` responde `404` (no endpoint SSE en GET).
- [x] Logs Traefik muestran rutas MCP activas (`/.well-known/*`, `/mcp-oauth/token`, `POST /mcp-server/http`).
- [ ] `opencode mcp list` en modo `remote` sigue fallando por `SSE error: Non-200 status code (404)`.

Conclusion operativa:

- Auth/token: OK.
- Ruta/proxy: OK para streamable HTTP por POST.
- Bloqueo actual: compatibilidad de transporte OpenCode remote (SSE) con endpoint MCP de n8n.

Siguiente paso recomendado:

- Mantener `Authorization: Bearer ${N8N_MCP_TOKEN}`.
- No tocar workflow/backend/supabase.
- Evaluar bridge local `mcp-remote` o upgrade de OpenCode con soporte streamable HTTP remoto.
