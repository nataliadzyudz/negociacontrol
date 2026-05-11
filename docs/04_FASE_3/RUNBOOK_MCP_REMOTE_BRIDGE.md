# RUNBOOK_MCP_REMOTE_BRIDGE.md

Runbook para habilitar un bridge local entre OpenCode y n8n MCP cuando el modo remote directo falla por transporte.

## Objetivo

Conseguir que `n8n-mcp` aparezca como `connected` en OpenCode sin exponer secretos y sin tocar produccion.

## Alcance

- No modifica workflows n8n.
- No modifica backend AWS.
- No modifica Supabase.
- Solo configura cliente local OpenCode + bridge local.

## Prerequisitos

- Token MCP n8n guardado fuera del repo.
- Node.js y `npx` disponibles en la maquina local.
- OpenCode instalado.

## 1) Cargar token en variable de entorno

PowerShell (usuario actual):

```powershell
$token = Get-Content "<LOCAL_PATH_TO_N8N_MCP_TOKEN_FILE_OUTSIDE_REPO>" -Raw
$token = $token.Trim()
[Environment]::SetEnvironmentVariable('N8N_MCP_TOKEN', $token, 'User')
$env:N8N_MCP_TOKEN = $token
```

Verificar:

```powershell
$env:N8N_MCP_TOKEN.Length
```

Debe devolver un numero mayor a 0.

## 2) Configurar OpenCode para bridge local

En `opencode.json` del proyecto, configurar `n8n-mcp` asi:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "n8n-mcp": {
      "type": "local",
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://n8n-nc-n8n.wmd3t3.easypanel.host/mcp-server/http",
        "--header",
        "Authorization: Bearer ${N8N_MCP_TOKEN}"
      ],
      "enabled": true
    }
  }
}
```

Nota: mantener tambien `supabase` en `mcp` si ya esta activo.

## 3) Reiniciar OpenCode

- Cerrar sesion actual.
- Abrir nueva sesion en el proyecto.

## 4) Validar estado MCP

```powershell
opencode mcp list
```

Esperado:

- `supabase` connected
- `n8n-mcp` connected

Si falla, ejecutar:

```powershell
opencode mcp debug n8n-mcp
```

## 5) Validar tools invocables

Objetivo minimo:

- listar tools de n8n MCP en sesion,
- ejecutar una tool de lectura segura (por ejemplo busqueda/listado de workflows).

## 6) Errores comunes y accion

- `npx.ps1` bloqueado por policy:
  - usar `npx.cmd` o abrir PowerShell con politica adecuada.
- `401 Unauthorized`:
  - token invalido/expirado, rotar token.
- `SSE error 404` en modo remote:
  - confirmar que estas en modo `local` bridge.
- `command not found mcp-remote`:
  - verificar salida a internet y npm cache.

## 7) Cierre de seguridad

- No guardar token real en `opencode.json` ni en docs del repo.
- Si el token se expone, rotarlo inmediatamente.
- Mantener `MCP.md` solo con placeholders/variables de entorno.

