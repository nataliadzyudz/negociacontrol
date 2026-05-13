# Skill: antigravity-agent-governance

## Cuándo usar esta skill
Usar al inicio de cada interacción compleja para definir roles, límites y flujos de trabajo entre subagentes de Antigravity.

## Objetivo
Evitar que los agentes actúen de forma caótica o como "God Agents", asegurando que cada uno tenga un propósito, alcance y supervisión claros.

## Inputs necesarios
- `AGENTS.md` (reglas de subagentes).
- `TASK_SPEC` activa.

## READ_SET recomendado
- `AGENTS.md`
- `.gemini_instructions.md`
- `docs/03_FASE_2C/AGENT_ROLES_AND_HANDOFFS_2C.md`

## WRITE_SET permitido
- Ninguno (Skill conceptual y de control).

## DO_NOT_TOUCH
- No modificar las reglas de gobierno sin aprobación de Natalia.

## Pasos
1. Definir los roles necesarios para la tarea (Explorer, Implementer, QA, etc.).
2. Establecer el `READ_SET` y `WRITE_SET` específico para cada subagente.
3. Definir los criterios de "Handoff" (cuándo un agente termina y qué entrega al siguiente).
4. **Verificar cumplimiento de la Regla de Eficiencia NC:** Antes de cualquier propuesta técnica, validar que es la solución más simple, barata y mantenible.
5. Asegurar que existe un agente de supervisión que valida el resultado final.

## Tools permitidas
- `view_file`

## Tools prohibidas
- No permitir que los subagentes expandan su propio `WRITE_SET` sin autorización.

## Riesgos
- Fragmentar demasiado la tarea, perdiendo contexto.
- Falta de coordinación que lleve a trabajos redundantes.

## Output obligatorio
- roles asignados
- permisos y límites por rol
- alcance de lectura (READ_SET) y escritura (WRITE_SET)
- objetos prohibidos (DO_NOT_TOUCH)
- criterios de cierre por subagente
- formato de entrega esperado

## Criterio de cierre
Protocolo de trabajo del equipo de agentes definido y aceptado por el supervisor.

## Siguiente paso real
Iniciar la ejecución de la tarea siguiendo el protocolo de gobernanza.
