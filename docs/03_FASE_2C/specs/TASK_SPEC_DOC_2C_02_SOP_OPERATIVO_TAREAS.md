# TASK_SPEC_DOC_2C_02_SOP_OPERATIVO_TAREAS.md

**Fase:** 2C  
**Estado:** COMPLETADA  
**Fecha:** 2026-05-11

---

## 1. Objetivo

Estandarizar un SOP operativo minimo para inicio y cierre de tareas en estado `2C_CIERRE_CONTROLADO`.

## 2. Alcance

- Definir checklist de inicio (maximo 7 items).
- Definir checklist de cierre.
- Definir formato unico de entrega.
- Definir reglas operativas de parada, evidencia, READ_SET/WRITE_SET y escalado.
- Referenciar SOP desde `AGENTS.md` y `QUICK_START_FASE2C.md`.

## 3. Fuera de alcance

- Codigo de aplicacion.
- Supabase.
- Workflows n8n.
- Infraestructura.

## 4. READ_SET

- `AGENTS.md`
- `PROJECT_STATE.md`
- `docs/03_FASE_2C/QUICK_START_FASE2C.md`
- `docs/03_FASE_2C/specs/TASK_SPEC_DOC_2C_01_CANON_GOBERNANZA.md`
- `docs/03_FASE_2C/specs/reviews/REVIEW_TASK_SPEC_DOC_2C_01_CANON_GOBERNANZA.md`
- `docs/03_FASE_2C/specs/00_TASKS_FASE2C_INDEX.md`
- `docs/00_MASTER/00_ROADMAP_SPEC_DRIVEN_VIVO.md`

## 5. WRITE_SET

- `docs/03_FASE_2C/specs/TASK_SPEC_DOC_2C_02_SOP_OPERATIVO_TAREAS.md`
- `docs/03_FASE_2C/specs/reviews/REVIEW_TASK_SPEC_DOC_2C_02_SOP_OPERATIVO_TAREAS.md`
- `docs/03_FASE_2C/SOP_OPERATIVO_TAREAS_2C.md`
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
| CA-01 | Existe `docs/03_FASE_2C/SOP_OPERATIVO_TAREAS_2C.md` | PASS |
| CA-02 | Existe `TASK_SPEC_DOC_2C_02_SOP_OPERATIVO_TAREAS.md` | PASS |
| CA-03 | Existe `REVIEW_TASK_SPEC_DOC_2C_02_SOP_OPERATIVO_TAREAS.md` | PASS |
| CA-04 | Checklist de inicio maximo 7 items | PASS |
| CA-05 | Checklist de cierre incluye evidencia, rollback y siguiente paso real | PASS |
| CA-06 | `AGENTS.md` referencia el SOP | PASS |
| CA-07 | `QUICK_START_FASE2C.md` referencia el SOP | PASS |
| CA-08 | `00_TASKS_FASE2C_INDEX.md` registra DOC-02 | PASS |
| CA-09 | No se modifica codigo | PASS |
| CA-10 | No se toca Supabase | PASS |
| CA-11 | No se toca n8n | PASS |
| CA-12 | No se exponen secretos | PASS |

## 8. Riesgos

- Riesgo bajo de duplicidad con secciones previas de `QUICK_START_FASE2C.md`.

## 9. Rollback

- Revertir: `AGENTS.md`, `docs/03_FASE_2C/QUICK_START_FASE2C.md`, `docs/03_FASE_2C/specs/00_TASKS_FASE2C_INDEX.md`.
- Eliminar: `docs/03_FASE_2C/SOP_OPERATIVO_TAREAS_2C.md`, `docs/03_FASE_2C/specs/TASK_SPEC_DOC_2C_02_SOP_OPERATIVO_TAREAS.md`, `docs/03_FASE_2C/specs/reviews/REVIEW_TASK_SPEC_DOC_2C_02_SOP_OPERATIVO_TAREAS.md`.

## 10. Definition of Done

- SOP operativo creado y referenciado.
- Evidencias por archivo documentadas en review.
- CAs en PASS.
