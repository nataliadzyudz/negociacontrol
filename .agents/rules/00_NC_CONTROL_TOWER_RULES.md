# 00_NC_CONTROL_TOWER_RULES.md

Regla para `.agents/rules`:

```text
Lee primero /AGENTS.md.
AGENTS.md manda.
No uses esta carpeta como fuente paralela de reglas.
```

Fase activa:

```text
FASE_ACTIVA = 2C
```

Modo:

```text
Spec-driven.
Una tarea cada vez.
Cada tarea define READ_SET, WRITE_SET y DO_NOT_TOUCH.
MCP solo puede operar dentro de esos límites.
```

Skills:

```text
No leer /skills por defecto.
Solo usar skills si la TASK_SPEC activa los incluye expresamente en READ_SET.
Si un agente cree que necesita un skill, debe proponer SKILL_SUGGESTION.
```

Bloqueos:

```text
No leer /_archivo_DO_NOT_READ.
No leer /n8n_workflows en Fase 2A salvo TASK_SPEC explícita.
No tocar Google Sheets.
No enviar mensajes automáticos.
No exponer secretos.
```

Regla de verificación obligatoria:

```text
Antes de decir "no existe", siempre verificar:
- /public/ (frontend puede existir)
- /index.html (entrada web)
- Docs futuros (02/03/04) para contexto
```
