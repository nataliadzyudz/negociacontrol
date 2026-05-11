# TASK_SPEC_DOC_2C_03_TRAZABILIDAD_LOGS.md

**Fase:** 2C  
**Estado:** COMPLETADA  
**Fecha:** 2026-05-11

---

## 1. Objetivo

Normalizar la trazabilidad minima de fase `2C_CIERRE_CONTROLADO` con tres registros operativos: MCP, runs de agentes y deuda tecnica.

## 2. Alcance

- Crear `MCP_STATUS.md`.
- Crear `AGENT_RUNS_LOG.md`.
- Crear `TECH_DEBT_REGISTER.md`.
- Referenciar estos logs en `AGENTS.md` y `QUICK_START_FASE2C.md`.
- Registrar DOC-03 en indice de tareas 2C.

## 3. Fuera de alcance

- Codigo de aplicacion.
- Supabase.
- Workflows n8n.
- Infraestructura.

## 4. READ_SET

- `AGENTS.md`
- `PROJECT_STATE.md`
- `docs/03_FASE_2C/QUICK_START_FASE2C.md`
- `docs/03_FASE_2C/SOP_OPERATIVO_TAREAS_2C.md`
- `docs/03_FASE_2C/specs/TASK_SPEC_DOC_2C_01_CANON_GOBERNANZA.md`
- `docs/03_FASE_2C/specs/TASK_SPEC_DOC_2C_02_SOP_OPERATIVO_TAREAS.md`
- `docs/03_FASE_2C/specs/reviews/REVIEW_TASK_SPEC_DOC_2C_01_CANON_GOBERNANZA.md`
- `docs/03_FASE_2C/specs/reviews/REVIEW_TASK_SPEC_DOC_2C_02_SOP_OPERATIVO_TAREAS.md`
- `docs/03_FASE_2C/specs/00_TASKS_FASE2C_INDEX.md`
- `docs/00_MASTER/00_ROADMAP_SPEC_DRIVEN_VIVO.md`

## 5. WRITE_SET

- `docs/03_FASE_2C/specs/TASK_SPEC_DOC_2C_03_TRAZABILIDAD_LOGS.md`
- `docs/03_FASE_2C/specs/reviews/REVIEW_TASK_SPEC_DOC_2C_03_TRAZABILIDAD_LOGS.md`
- `docs/03_FASE_2C/MCP_STATUS.md`
- `docs/03_FASE_2C/AGENT_RUNS_LOG.md`
- `docs/03_FASE_2C/TECH_DEBT_REGISTER.md`
- `AGENTS.md`
- `docs/03_FASE_2C/QUICK_START_FASE2C.md`
- `docs/03_FASE_2C/specs/00_TASKS_FASE2C_INDEX.md`

## 6. DO_NOT_TOUCH

- `backend/**`
- `supabase/**`
- `n8n_workflows/**`
- `server.js`
- `sheets.js`
- `package.json`

## 7. Criterios de aceptacion

| ID | Criterio | Resultado |
|---|---|---|
| CA-01 | Existe `docs/03_FASE_2C/MCP_STATUS.md` | PASS |
| CA-02 | Existe `docs/03_FASE_2C/AGENT_RUNS_LOG.md` | PASS |
| CA-03 | Existe `docs/03_FASE_2C/TECH_DEBT_REGISTER.md` | PASS |
| CA-04 | Existe `TASK_SPEC_DOC_2C_03_TRAZABILIDAD_LOGS.md` | PASS |
| CA-05 | Existe `REVIEW_TASK_SPEC_DOC_2C_03_TRAZABILIDAD_LOGS.md` | PASS |
| CA-06 | MCP_STATUS incluye error exacto, causa probable y prueba minima siguiente | PASS |
| CA-07 | AGENT_RUNS_LOG incluye run_id, task_spec, agente, permiso, resultado, evidencia y next_action | PASS |
| CA-08 | TECH_DEBT_REGISTER incluye impacto, riesgo, prioridad, estado y bloquea_gate | PASS |
| CA-09 | `AGENTS.md` referencia logs minimos | PASS |
| CA-10 | `QUICK_START_FASE2C.md` referencia logs minimos | PASS |
| CA-11 | `00_TASKS_FASE2C_INDEX.md` registra DOC-03 | PASS |
| CA-12 | No se modifica codigo | PASS |
| CA-13 | No se toca Supabase | PASS |
| CA-14 | No se toca n8n | PASS |
| CA-15 | No se exponen secretos | PASS |
| CA-16 | No se registran datos personales reales | PASS |

## 8. Riesgos

- Riesgo bajo de que parte del historico MCP quede incompleto; se marca evidencia conocida y pendientes.

## 9. Rollback

- Revertir: `AGENTS.md`, `docs/03_FASE_2C/QUICK_START_FASE2C.md`, `docs/03_FASE_2C/specs/00_TASKS_FASE2C_INDEX.md`.
- Eliminar: `docs/03_FASE_2C/MCP_STATUS.md`, `docs/03_FASE_2C/AGENT_RUNS_LOG.md`, `docs/03_FASE_2C/TECH_DEBT_REGISTER.md`, `docs/03_FASE_2C/specs/TASK_SPEC_DOC_2C_03_TRAZABILIDAD_LOGS.md`, `docs/03_FASE_2C/specs/reviews/REVIEW_TASK_SPEC_DOC_2C_03_TRAZABILIDAD_LOGS.md`.

## 10. Definition of Done

- Logs minimos creados, referenciados y auditables.
- Sin secretos ni datos personales reales.
- DOC-03 registrada en indice.
