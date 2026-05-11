# CANON_DOCUMENTAL_REFERENCIAL_2C — NC Control Tower

## 1. Proposito

Definir que documentos son fuente de verdad, cuales son operativos, cuales son referencia y cuales son historicos en `2C_CIERRE_CONTROLADO`.

## 2. Jerarquia documental

| Nivel | Documento | Funcion | Cuando leer |
|---|---|---|---|
| 1 | `AGENTS.md` | Router minimo y reglas globales | Siempre |
| 2 | `PROJECT_STATE.md` | Estado global del sistema | Siempre |
| 3 | TASK_SPEC activa | Contrato de ejecucion | Siempre para ejecutar |
| 4 | `docs/03_FASE_2C/QUICK_START_FASE2C.md` | Arranque de fase | Siempre en fase 2C |
| 5 | `docs/03_FASE_2C/SOP_OPERATIVO_TAREAS_2C.md` | Inicio/cierre de tareas | Siempre en tareas 2C |
| 6 | `docs/03_FASE_2C/AGENT_ROLES_AND_HANDOFFS_2C.md` | Roles/subagentes | Cuando haya orquestacion |
| 7 | Logs 2C | Evidencia y trazabilidad | Cuando haya cierre, QA o gate |
| 8 | Docs master | Contexto amplio | Solo si TASK_SPEC lo autoriza |

## 3. Documentos operativos activos 2C

- `docs/03_FASE_2C/QUICK_START_FASE2C.md`
- `docs/03_FASE_2C/SOP_OPERATIVO_TAREAS_2C.md`
- `docs/03_FASE_2C/AGENT_ROLES_AND_HANDOFFS_2C.md`
- `docs/03_FASE_2C/MCP_STATUS.md`
- `docs/03_FASE_2C/AGENT_RUNS_LOG.md`
- `docs/03_FASE_2C/TECH_DEBT_REGISTER.md`
- `docs/03_FASE_2C/GO_NOGO_FASE3.md`
- `docs/03_FASE_2C/specs/00_TASKS_FASE2C_INDEX.md`

## 4. Documentos master canonicos

- `docs/00_MASTER/00_ROADMAP_SPEC_DRIVEN_VIVO.md`: backlog vivo de propuestas/dependencias.
- `docs/00_MASTER/03_BASE_CONOCIMIENTO_ORQUESTACION_AGENTES_IA_NC.md`: referencia de orquestacion de agentes.
- `docs/00_MASTER/04_BASE_CONOCIMIENTO_GOBERNANZA_AGENTICA_AGENTMD_SKILLS_CICD_NC.md`: referencia de gobernanza agentica.

## 5. Alias / nombres alternos detectados

| Nombre referenciado | Estado | Documento canonico equivalente | Accion |
|---|---|---|---|
| `03_RESUMEN_EJECUTABLE_ORQUESTACION_AGENTES_IA_NC.md` | No existe | `03_BASE_CONOCIMIENTO_ORQUESTACION_AGENTES_IA_NC.md` | Usar canonico |
| `04_MANUAL_GOBERNANZA_AGENTICA_AGENTMD_SKILLS_CICD_NC.md` | No existe | `04_BASE_CONOCIMIENTO_GOBERNANZA_AGENTICA_AGENTMD_SKILLS_CICD_NC.md` | Usar canonico |

## 6. Regla de lectura eficiente

No cargar docs master por defecto.

Leer docs master solo si:

- TASK_SPEC lo incluye en READ_SET;
- hay ambiguedad de gobernanza;
- hay tarea de orquestacion/agentes;
- hay tarea MCP;
- hay revision de seguridad o gate.

## 7. Regla de actualizacion documental

No actualizar todos los documentos por sistema.

Actualizar solo:

- el documento canonico afectado;
- las referencias rotas;
- el indice si procede;
- logs si hay run;
- review si hay TASK_SPEC.

## 8. Regla anti-divergencia

Si se detectan dos documentos que dicen cosas distintas:

1. No corregir ambos a ciegas.
2. Registrar conflicto.
3. Aplicar jerarquia documental.
4. Proponer `SPEC_SUGGESTION` si requiere decision.

## 9. Que queda prohibido

- Renombrar documentos master sin TASK_SPEC especifica.
- Crear duplicados.
- Copiar contenido master dentro de `AGENTS.md`.
- Leer toda la carpeta `docs/00_MASTER` por defecto.
- Crear specs de Fase 3 desde este documento.
