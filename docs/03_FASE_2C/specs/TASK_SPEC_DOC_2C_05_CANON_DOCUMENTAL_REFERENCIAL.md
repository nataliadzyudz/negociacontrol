# TASK_SPEC_DOC_2C_05_CANON_DOCUMENTAL_REFERENCIAL.md

**Fase:** 2C  
**Estado:** COMPLETADA  
**Fecha:** 2026-05-11

---

## 1. Objetivo

Normalizar canon documental referencial de 2C para eliminar ambiguedades de nombres, rutas y fuentes de verdad.

## 2. Alcance

- Crear `CANON_DOCUMENTAL_REFERENCIAL_2C.md`.
- Corregir referencias rotas dentro de WRITE_SET.
- Referenciar canon desde `AGENTS.md` y `QUICK_START_FASE2C.md`.
- Registrar DOC-05 en indice y en `AGENT_RUNS_LOG.md`.
- Actualizar `TECH_DEBT_REGISTER.md` si corresponde deuda documental de alias.

## 3. Fuera de alcance

- Renombrar o mover docs master.
- Reescribir docs master completos.
- Cambios de codigo/Supabase/n8n.
- Crear specs de Fase 3.

## 4. READ_SET

- `AGENTS.md`
- `PROJECT_STATE.md`
- `docs/03_FASE_2C/QUICK_START_FASE2C.md`
- `docs/03_FASE_2C/SOP_OPERATIVO_TAREAS_2C.md`
- `docs/03_FASE_2C/AGENT_ROLES_AND_HANDOFFS_2C.md`
- `docs/03_FASE_2C/MCP_STATUS.md`
- `docs/03_FASE_2C/AGENT_RUNS_LOG.md`
- `docs/03_FASE_2C/TECH_DEBT_REGISTER.md`
- `docs/03_FASE_2C/GO_NOGO_FASE3.md`
- `docs/03_FASE_2C/specs/00_TASKS_FASE2C_INDEX.md`
- `docs/03_FASE_2C/specs/reviews/REVIEW_TASK_SPEC_DOC_2C_03B_AGENT_ROLES_AND_HANDOFFS.md`
- `docs/00_MASTER/00_ROADMAP_SPEC_DRIVEN_VIVO.md`
- `docs/00_MASTER/03_BASE_CONOCIMIENTO_ORQUESTACION_AGENTES_IA_NC.md`
- `docs/00_MASTER/04_BASE_CONOCIMIENTO_GOBERNANZA_AGENTICA_AGENTMD_SKILLS_CICD_NC.md`

## 5. WRITE_SET

- `docs/03_FASE_2C/specs/TASK_SPEC_DOC_2C_05_CANON_DOCUMENTAL_REFERENCIAL.md`
- `docs/03_FASE_2C/specs/reviews/REVIEW_TASK_SPEC_DOC_2C_05_CANON_DOCUMENTAL_REFERENCIAL.md`
- `docs/03_FASE_2C/CANON_DOCUMENTAL_REFERENCIAL_2C.md`
- `AGENTS.md`
- `docs/03_FASE_2C/QUICK_START_FASE2C.md`
- `docs/03_FASE_2C/AGENT_ROLES_AND_HANDOFFS_2C.md`
- `docs/03_FASE_2C/specs/00_TASKS_FASE2C_INDEX.md`
- `docs/03_FASE_2C/AGENT_RUNS_LOG.md`
- `docs/03_FASE_2C/TECH_DEBT_REGISTER.md`

## 6. Criterios de aceptacion

| ID | Criterio | Resultado |
|---|---|---|
| CA-01 | Existe `docs/03_FASE_2C/CANON_DOCUMENTAL_REFERENCIAL_2C.md` | PASS |
| CA-02 | Existe `TASK_SPEC_DOC_2C_05_CANON_DOCUMENTAL_REFERENCIAL.md` | PASS |
| CA-03 | Existe `REVIEW_TASK_SPEC_DOC_2C_05_CANON_DOCUMENTAL_REFERENCIAL.md` | PASS |
| CA-04 | Canon identifica documentos operativos activos 2C | PASS |
| CA-05 | Canon identifica documentos master canonicos | PASS |
| CA-06 | Canon registra alias/nombres alternos detectados | PASS |
| CA-07 | `AGENTS.md` referencia canon sin absorberlo | PASS |
| CA-08 | `QUICK_START_FASE2C.md` referencia canon | PASS |
| CA-09 | `AGENT_ROLES_AND_HANDOFFS_2C.md` no apunta a documentos inexistentes | PASS |
| CA-10 | `00_TASKS_FASE2C_INDEX.md` registra DOC-05 | PASS |
| CA-11 | `AGENT_RUNS_LOG.md` registra run DOC-05 | PASS |
| CA-12 | `TECH_DEBT_REGISTER.md` actualizado por deuda documental de alias | PASS |
| CA-13 | No se toca codigo/Supabase/n8n | PASS |
| CA-14 | No se exponen secretos | PASS |
| CA-15 | No se crean specs de Fase 3 | PASS |

## 7. Rollback

- Revertir `AGENTS.md`, `docs/03_FASE_2C/QUICK_START_FASE2C.md`, `docs/03_FASE_2C/AGENT_ROLES_AND_HANDOFFS_2C.md`, `docs/03_FASE_2C/specs/00_TASKS_FASE2C_INDEX.md`, `docs/03_FASE_2C/AGENT_RUNS_LOG.md`, `docs/03_FASE_2C/TECH_DEBT_REGISTER.md`.
- Eliminar `docs/03_FASE_2C/CANON_DOCUMENTAL_REFERENCIAL_2C.md`, `docs/03_FASE_2C/specs/TASK_SPEC_DOC_2C_05_CANON_DOCUMENTAL_REFERENCIAL.md`, `docs/03_FASE_2C/specs/reviews/REVIEW_TASK_SPEC_DOC_2C_05_CANON_DOCUMENTAL_REFERENCIAL.md`.
