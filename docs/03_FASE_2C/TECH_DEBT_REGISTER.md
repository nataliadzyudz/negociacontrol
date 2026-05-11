# TECH_DEBT_REGISTER — NC Control Tower

| id | fecha | deuda | impacto | riesgo | prioridad | dueño | fase objetivo | estado | bloquea_gate | decision |
|---|---|---|---|---|---|---|---|---|---|---|
| TD-2C-0001 | 2026-05-11 | MCP n8n no conecta de forma estable (401/404/connection closed) | Bloquea automatizacion MCP y orquestacion avanzada sobre n8n | Alto | Alta | Orquestacion IA | 2C->3 | ABIERTA | No | Clasificado como BLOQUEANTE_AUTOMATIZACION; mantener mitigacion manual en v0 |
| TD-2C-0002 | 2026-05-11 | Prueba pendiente en gate (7/8) por `lead_interactions` | Gate condicionado y cierre 2C incompleto | Alto | Alta | Backend/DB | 2C->3 | RESUELTA | No | Validado en review `REVIEW_TASK_2C_FIX_LEAD_INTERACTIONS_GATE_8_8.md` (201/400 + persistencia) |
| TD-2C-0003 | 2026-05-11 | Trazabilidad documental recien normalizada (madurez inicial) | Riesgo de inconsistencia si no se mantiene | Medio | Media | Documentation | 2C | EN_CURSO | No | Mantener actualizacion en cada run |
| TD-2C-0004 | 2026-05-11 | Ambiguedad de alias documental en master 03/04 | Referencias inconsistentes entre nombres no canonicos y canonicos | Medio | Media | Governance Docs | 2C | RESUELTA | No | Fijar canon en `CANON_DOCUMENTAL_REFERENCIAL_2C.md` y usar nombres canonicos |
