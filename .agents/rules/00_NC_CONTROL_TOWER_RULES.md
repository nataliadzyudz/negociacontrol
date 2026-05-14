# 00_NC_CONTROL_TOWER_RULES.md

## Regla puente de compatibilidad

Este archivo NO es la fuente principal de gobierno.
Su funcion es solo de puente para herramientas que leen `.agents/rules`.

## Fuentes oficiales de gobierno

Usar como fuente oficial, en este orden de prioridad:

1. TASK_SPEC activa
2. `ANTIGRAVITY_RULES_NC.md` (cuando se trabaje con Antigravity)
3. `AGENTS.md`
4. `PROJECT_STATE.md`
5. Este archivo

Si hay contradiccion, manda el orden anterior.

## Fase activa

- Este archivo NO decide la fase activa.
- La fase activa se lee siempre desde `PROJECT_STATE.md` y la TASK_SPEC activa.
- Estado conocido actual (referencial): `3_V0`.
- Si `PROJECT_STATE.md` cambia, manda `PROJECT_STATE.md`.

## Lectura minima para Antigravity

Antes de ejecutar tareas con Antigravity, leer primero:

1. `ANTIGRAVITY_RULES_NC.md`
2. TASK_SPEC activa
3. `PROJECT_STATE.md`

## DO_NOT_TOUCH estricto

- No backend.
- No n8n.
- No Supabase.
- No produccion.
- No secrets ni `.env`.
- No commit/push/deploy.
- No autoaprobacion.
