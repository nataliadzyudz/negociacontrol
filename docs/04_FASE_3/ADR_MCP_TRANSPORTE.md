# ADR_MCP_TRANSPORTE.md

## Estado

Propuesto (2026-05-09)

## Contexto

- OpenCode esta configurado con `mcp.n8n-mcp` en modo `remote` hacia:
  `https://n8n-nc-n8n.wmd3t3.easypanel.host/mcp-server/http`.
- La autenticacion MCP con token funciona (`opencode mcp auth n8n-mcp`).
- Pruebas directas muestran:
  - `POST /mcp-server/http` responde correctamente (`200` con `text/event-stream`).
  - `GET /mcp-server/http` devuelve `404`.
- `opencode mcp list` falla para `n8n-mcp` con:
  `SSE error: Non-200 status code (404)`.

## Problema

Hay incompatibilidad de transporte entre el modo `remote` de OpenCode (en esta version)
y el endpoint MCP de n8n expuesto en EasyPanel/Traefik.

## Decision

Mantener configuracion segura sin hardcode de secretos y adoptar una de estas rutas:

1. Ruta preferida a medio plazo:
   - Actualizar OpenCode cuando soporte streamable HTTP remoto completo para este endpoint MCP.

2. Ruta operativa inmediata:
   - Usar bridge local `mcp-remote` para adaptar transporte sin cambiar n8n ni proxy de produccion.

## Consecuencias

### Positivas

- Se mantiene seguridad de secretos (`${N8N_MCP_TOKEN}` por entorno).
- No se requiere tocar workflows, backend ni Supabase.
- Se evita cambiar proxy en caliente sin necesidad.

### Negativas

- Con `remote` directo actual, tools de n8n MCP no quedan invocables en OpenCode.
- Con bridge local, hay un componente adicional que mantener.

## Evidencia

- `opencode --version`: `1.14.41`.
- `opencode mcp auth n8n-mcp`: autenticacion exitosa.
- `opencode mcp list`: `n8n-mcp failed (SSE 404)`.
- Curl con token:
  - `GET /mcp-server/http` -> `404`.
  - `POST initialize /mcp-server/http` -> `200` + respuesta MCP valida.
- Logs Traefik:
  - `POST /mcp-server/http` 200/202.
  - `GET /mcp-server/http` 404.

## Proximo paso aprobado

Implementar bridge local `mcp-remote` fuera del repositorio y revalidar:

- `opencode mcp list` -> `n8n-mcp connected`.
- Invocacion de tool de lectura MCP n8n (por ejemplo `search_workflows`).
