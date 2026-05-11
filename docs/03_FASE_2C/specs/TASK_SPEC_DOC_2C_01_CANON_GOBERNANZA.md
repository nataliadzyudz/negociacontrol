# TASK_SPEC_DOC_2C_01_CANON_GOBERNANZA.md

**Fase:** 2C  
**Estado:** COMPLETADA  
**Fecha:** 2026-05-11

---

## 1. Objetivo

Unificar el canon documental operativo de cierre 2C para eliminar contradicciones entre fase activa, rutas, reglas de precedencia y estado de gate 2C_TO_3.

## 2. Alcance

- Alinear rutas reales de documentación de fase 2C (`docs/03_FASE_2C/...`).
- Declarar estado transicional explícito `2C_CIERRE_CONTROLADO`.
- Declarar interpretación canónica: pre-producción condicionada, no producción abierta.
- Consolidar precedencia normativa y protocolo mínimo de lectura/cierre.

## 3. Fuera de Alcance

- Código de backend/frontend.
- Supabase (DDL/DML/policies).
- Workflows n8n (lab o productivo).
- Infraestructura (EasyPanel/Traefik/servidores).
- Ejecución de Gate 2C_TO_3.

## 4. READ_SET

- `AGENTS.md`
- `PROJECT_STATE.md`
- `docs/03_FASE_2C/QUICK_START_FASE2C.md`
- `docs/03_FASE_2C/specs/00_TASKS_FASE2C_INDEX.md`
- `docs/00_MASTER/00_ROADMAP_SPEC_DRIVEN_VIVO.md`

## 5. WRITE_SET

- `AGENTS.md`
- `PROJECT_STATE.md`
- `docs/03_FASE_2C/QUICK_START_FASE2C.md`
- `docs/03_FASE_2C/specs/00_TASKS_FASE2C_INDEX.md`
- `docs/00_MASTER/00_ROADMAP_SPEC_DRIVEN_VIVO.md`
- `docs/03_FASE_2C/specs/reviews/REVIEW_TASK_SPEC_DOC_2C_01_CANON_GOBERNANZA.md`

## 6. DO_NOT_TOUCH

- `n8n_workflows/**`
- `backend/**`
- `supabase/**`
- `server.js`
- `sheets.js`
- `package.json`
- `_archivo_DO_NOT_READ/**`

## 7. Criterios de Aceptacion

| ID | Criterio | KPI | Resultado |
|---|---|---|---|
| CA-01 | Rutas 2C canonicas unificadas | 0 referencias activas a rutas 2C obsoletas en archivos del WRITE_SET | PASS |
| CA-02 | Estado transicional explicitado | `2C_CIERRE_CONTROLADO` declarado en `PROJECT_STATE.md` y/o `AGENTS.md` | PASS |
| CA-03 | Gate 2C_TO_3 interpretado de forma unica | Texto canonico "pre-produccion condicionada" en docs operativas | PASS |
| CA-04 | Precedencia normativa clara | Seccion de precedencia sin ambiguedad en `AGENTS.md` | PASS |
| CA-05 | Cierre documental trazable | Review creada con evidencias por archivo | PASS |

## 11. Resultado de Ejecucion

| ID | Resultado |
|---|---|
| CA-01 | PASS |
| CA-02 | PASS |
| CA-03 | PASS |
| CA-04 | PASS |
| CA-05 | PASS |

## 8. Riesgos

- Riesgo de inconsistencia residual si existen referencias fuera de WRITE_SET.
- Riesgo de ambiguedad de gate si no se fija semantica transicional en documentos fuente.

## 9. Rollback

- Revertir cambios documentales de esta tarea mediante restauracion de archivos en `WRITE_SET` al estado anterior.

## 10. Definition of Done

- Criterios CA-01 a CA-05 en estado PASS con evidencia textual verificable.
- Sin cambios fuera de `WRITE_SET`.
- Sin exposicion de secretos.
- `NEXT_STEP` propuesto y no ejecutado.
