# MCP_STATUS — NC Control Tower

## Estado actual
- Fecha: 2026-05-11
- Responsable: Agent Supervisor + Documentation Agent
- Cliente MCP: OpenCode 1.14.41
- Servidor MCP: `supabase`, `n8n-mcp`, `n8n-mcp-bridge`
- Transporte: remoto HTTP/SSE (n8n-mcp), local stdio->remote HTTP via mcp-remote (n8n-mcp-bridge)
- Entorno: 2C_CIERRE_CONTROLADO (test/lab)
- Estado general: BLOQUEADO

## Clasificacion de impacto (2026-05-11)

- Clasificacion MCP: BLOQUEANTE_AUTOMATIZACION
- Runtime backend/app: NO_BLOQUEANTE_CON_MITIGACION
- Bloquea produccion controlada v0: No (si operacion manual/controlada)
- Bloquea automatizacion agentica/MCP sobre n8n: Si

## Ultimo intento
| Fecha | Accion | Resultado | Error exacto | Evidencia | Siguiente paso |
|---|---|---|---|---|---|
| 2026-05-08 | `opencode mcp list` con `n8n-mcp` remoto | FAIL | `SSE error: Non-200 status code (404)` | salida de CLI registrada en sesion | Validar endpoint MCP server-side en spec separada |
| 2026-05-08 | `opencode mcp debug n8n-mcp` | FAIL | `HTTP response: 401 Unauthorized` | salida de CLI registrada en sesion | Revisar auth/transporte en endpoint MCP |
| 2026-05-08 | `opencode mcp list` con `n8n-mcp-bridge` | FAIL | `MCP error -32000: Connection closed` | salida de CLI registrada en sesion | Diagnostico de ruta/transporte sin tocar produccion |

## Tools disponibles
| Tool | Tipo | Permiso | Probada | Resultado | Riesgo |
|---|---|---|---|---|---|
| supabase tools | lectura/escritura controlada | Segun TASK_SPEC | Si | PASS (conexion MCP) | Medio (si se usa fuera de spec) |
| n8n-mcp tools | lectura esperada | Solo diagnostico | No | PENDIENTE (sin conexion estable) | Alto (no trazabilidad MCP n8n) |
| n8n-mcp-bridge tools | lectura esperada | Solo diagnostico | No | PENDIENTE (bridge no conecta) | Alto |

## Errores abiertos
| Error | Causa probable | Estado | Accion recomendada | Bloquea gate |
|---|---|---|---|---|
| n8n MCP remoto responde 404 en SSE | Ruta/transporte no compatible con cliente | ABIERTO | Ejecutar TASK_SPEC de diagnostico MCP server-side | Si |
| n8n MCP responde 401 en debug/bridge | Auth valida no aceptada en flujo final o middleware proxy | ABIERTO | Validar contrato auth de endpoint MCP | Si |
| bridge local cierra conexion | Endpoint remoto no completa handshake util para OpenCode | ABIERTO | No insistir a ciegas, escalar por spec | Si |

## Riesgos
| Riesgo | Nivel | Mitigacion |
|---|---|---|
| Gate 2C->3 sin MCP n8n estable | Alto | Resolver diagnostico MCP con evidencia reproducible |
| Pruebas repetidas sin criterio | Medio | Aplicar SOP y regla 1 hipotesis = 1 prueba |
| Falsa percepcion de readiness | Alto | Mantener estado BLOQUEADO hasta PASS real |
| Confundir bloqueo MCP con bloqueo runtime app | Medio | Separar decision v0 runtime de decision automatizacion |

## Mitigacion para v0 (sin MCP n8n)

- n8n productivo OFF o manual.
- MCP escritura OFF.
- Automatizaciones sensibles OFF.
- Operacion manual/controlada.
- Revision humana obligatoria.
- Mantener MCP como deuda activa de Fase 3.

## Siguiente paso real

Ejecutar una TASK_SPEC separada de diagnostico MCP n8n (ruta/transporte/auth) con alcance de infraestructura controlada y rollback explicito.
