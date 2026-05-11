# MCP.md

Registro central de conexiones MCP para NC Control Tower v2.

## Regla de seguridad

- Nunca guardar tokens reales en git.
- Usar placeholders en este archivo y cargar secretos desde tu entorno local.
- Guardar token real fuera del repo, por ejemplo en:
  `<LOCAL_PATH_TO_N8N_MCP_TOKEN_FILE_OUTSIDE_REPO>`

## MCP n8n

Endpoint MCP n8n:

`https://n8n-nc-n8n.wmd3t3.easypanel.host/mcp-server/http`

Nota de compatibilidad (OpenCode 1.14.41):

- El endpoint responde correctamente por `POST` (JSON-RPC streamable HTTP).
- `GET /mcp-server/http` devuelve 404 (`Cannot GET /mcp-server/http`).
- En esta version de OpenCode, `type: remote` intenta flujo SSE y puede fallar con `SSE error: Non-200 status code (404)`.

Configuracion base:

```json
{
  "mcpServers": {
    "n8n-mcp": {
      "type": "http",
      "url": "https://n8n-nc-n8n.wmd3t3.easypanel.host/mcp-server/http",
      "headers": {
        "Authorization": "Bearer <YOUR_ACCESS_TOKEN_HERE>"
      }
    }
  }
}
```

Configuracion recomendada (variable de entorno):

```json
{
  "mcpServers": {
    "n8n-mcp": {
      "type": "http",
      "url": "https://n8n-nc-n8n.wmd3t3.easypanel.host/mcp-server/http",
      "headers": {
        "Authorization": "Bearer ${N8N_MCP_TOKEN}"
      }
    }
  }
}
```

Configuracion real de OpenCode (clave correcta `mcp`):

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "n8n-mcp": {
      "type": "remote",
      "url": "https://n8n-nc-n8n.wmd3t3.easypanel.host/mcp-server/http",
      "headers": {
        "Authorization": "Bearer ${N8N_MCP_TOKEN}"
      },
      "enabled": true
    }
  }
}
```

## Verificacion rapida

- Sin token: debe responder `401 Unauthorized`.
- Con token valido: `POST /mcp-server/http` debe responder `200/202`.
- Si `GET /mcp-server/http` devuelve 404, la ruta existe pero no sirve SSE en GET.
- Si el token se expone: rotar inmediatamente en n8n.

## Diagnostico actual (2026-05-09)

- `opencode mcp auth n8n-mcp`: autenticacion correcta.
- `opencode mcp list`: `n8n-mcp` falla por `SSE error: Non-200 status code (404)`.
- Causa raiz probable: incompatibilidad de transporte OpenCode remote (SSE) vs n8n streamable HTTP (POST).
- Recomendacion: mantener config segura y usar bridge local `mcp-remote` o actualizar OpenCode cuando soporte completo streamable HTTP remoto.

## Uso

- Mantener aqui los endpoints MCP por herramienta.
- Mantener en secreto los tokens reales fuera del repositorio.

