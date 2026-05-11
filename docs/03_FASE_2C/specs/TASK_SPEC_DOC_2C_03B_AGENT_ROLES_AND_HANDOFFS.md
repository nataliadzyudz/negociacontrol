# TASK_SPEC_DOC_2C_03B_AGENT_ROLES_AND_HANDOFFS.md

**Fase:** 2C  
**Estado:** COMPLETADA  
**Fecha:** 2026-05-11

---

## 1. Objetivo

Definir responsabilidades, limites, permisos y handoffs de subagentes para ejecucion controlada en `2C_CIERRE_CONTROLADO`.

## 2. Alcance

- Crear `AGENT_ROLES_AND_HANDOFFS_2C.md`.
- Referenciarlo desde `AGENTS.md` y `QUICK_START_FASE2C.md`.
- Registrar DOC-03B en indice y en `AGENT_RUNS_LOG.md`.

## 3. Fuera de alcance

- Codigo, Supabase, n8n, infra.
- Specs ejecutables de Fase 3.

## 4. READ_SET

- `AGENTS.md`
- `PROJECT_STATE.md`
- `docs/03_FASE_2C/QUICK_START_FASE2C.md`
- `docs/03_FASE_2C/SOP_OPERATIVO_TAREAS_2C.md`
- `docs/03_FASE_2C/MCP_STATUS.md`
- `docs/03_FASE_2C/AGENT_RUNS_LOG.md`
- `docs/03_FASE_2C/TECH_DEBT_REGISTER.md`
- `docs/03_FASE_2C/specs/00_TASKS_FASE2C_INDEX.md`
- `docs/00_MASTER/03_BASE_CONOCIMIENTO_ORQUESTACION_AGENTES_IA_NC.md`
- `docs/00_MASTER/04_BASE_CONOCIMIENTO_GOBERNANZA_AGENTICA_AGENTMD_SKILLS_CICD_NC.md`

## 5. WRITE_SET

- `docs/03_FASE_2C/specs/TASK_SPEC_DOC_2C_03B_AGENT_ROLES_AND_HANDOFFS.md`
- `docs/03_FASE_2C/specs/reviews/REVIEW_TASK_SPEC_DOC_2C_03B_AGENT_ROLES_AND_HANDOFFS.md`
- `docs/03_FASE_2C/AGENT_ROLES_AND_HANDOFFS_2C.md`
- `AGENTS.md`
- `docs/03_FASE_2C/QUICK_START_FASE2C.md`
- `docs/03_FASE_2C/specs/00_TASKS_FASE2C_INDEX.md`
- `docs/03_FASE_2C/AGENT_RUNS_LOG.md`

## 6. Criterios de aceptacion

| ID | Criterio | Resultado |
|---|---|---|
| CA-01 | Existe `docs/03_FASE_2C/AGENT_ROLES_AND_HANDOFFS_2C.md` | PASS |
| CA-02 | Existe `TASK_SPEC_DOC_2C_03B_AGENT_ROLES_AND_HANDOFFS.md` | PASS |
| CA-03 | Existe `REVIEW_TASK_SPEC_DOC_2C_03B_AGENT_ROLES_AND_HANDOFFS.md` | PASS |
| CA-04 | Documento define 8 subagentes principales | PASS |
| CA-05 | Cada subagente incluye responsabilidad, permiso, puede/no puede, input, output, parada | PASS |
| CA-06 | `AGENTS.md` referencia documento sin absorber doctrina | PASS |
| CA-07 | `QUICK_START_FASE2C.md` referencia documento | PASS |
| CA-08 | `00_TASKS_FASE2C_INDEX.md` registra DOC-03B | PASS |
| CA-09 | `AGENT_RUNS_LOG.md` registra run DOC-03B | PASS |
| CA-10 | No se modifica codigo/Supabase/n8n | PASS |
| CA-11 | No se exponen secretos | PASS |

## 7. Rollback

- Revertir `AGENTS.md`, `docs/03_FASE_2C/QUICK_START_FASE2C.md`, `docs/03_FASE_2C/specs/00_TASKS_FASE2C_INDEX.md`, `docs/03_FASE_2C/AGENT_RUNS_LOG.md`.
- Eliminar `docs/03_FASE_2C/AGENT_ROLES_AND_HANDOFFS_2C.md`, `docs/03_FASE_2C/specs/TASK_SPEC_DOC_2C_03B_AGENT_ROLES_AND_HANDOFFS.md`, `docs/03_FASE_2C/specs/reviews/REVIEW_TASK_SPEC_DOC_2C_03B_AGENT_ROLES_AND_HANDOFFS.md`.
