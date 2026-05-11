# TASK_2C_FIX_LEAD_INTERACTIONS_GATE_8_8.md

**Fase:** 2C  
**Estado:** PROPUESTA_PENDIENTE_APROBACION  
**Fecha:** 2026-05-11

---

## 1. Objetivo

Resolver el bloqueo `lead_interactions` del Gate `2C_TO_3` para pasar de 7/8 a 8/8 con evidencia ejecutada, o excluir formalmente `lead_interactions` de `PRODUCCION_CONTROLADA_V0` con riesgo residual aceptado por Natalia.

## 2. Alcance

- Verificar estado real de migration `003_create_lead_interactions.sql` en entorno controlado.
- Revalidar endpoint `POST /api/leads/:id/interactions` en entorno test/lab.
- Unificar evidencia de gate para evitar contradiccion documental (8/8 vs pendiente).
- Actualizar documentos de gate y deuda solo con resultados reales.

## 3. Fuera de alcance

- Produccion abierta.
- n8n productivo.
- Datos reales.
- Cambios fuera de `lead_interactions`.

## 4. READ_SET

- `AGENTS.md`
- `PROJECT_STATE.md`
- `docs/03_FASE_2C/GO_NOGO_FASE3.md`
- `docs/03_FASE_2C/TECH_DEBT_REGISTER.md`
- `docs/03_FASE_2C/specs/00_TASKS_FASE2C_INDEX.md`
- `docs/03_FASE_2C/specs/TASK_GATE_2C_TO_3.md`
- `supabase/migrations/003_create_lead_interactions.sql`
- `supabase/MIGRATION_INSTRUCTIONS.md`
- `backend/src/routes/leads.js`

## 5. WRITE_SET

- `supabase/migrations/` (solo si aplica nueva migration correctiva)
- `backend/src/routes/leads.js` (solo si endpoint requiere correccion)
- `docs/03_FASE_2C/specs/reviews/REVIEW_TASK_2C_FIX_LEAD_INTERACTIONS_GATE_8_8.md`
- `docs/03_FASE_2C/TECH_DEBT_REGISTER.md`
- `docs/03_FASE_2C/GO_NOGO_FASE3.md`
- `docs/03_FASE_2C/specs/00_TASKS_FASE2C_INDEX.md`
- `docs/03_FASE_2C/specs/TASK_GATE_2C_TO_3.md`

## 6. DO_NOT_TOUCH

- `n8n_workflows/**`
- `server.js`
- `sheets.js`
- `package.json`
- Cualquier recurso productivo no-lab

## 7. Entorno

- Laboratorio / test (2C_CIERRE_CONTROLADO).
- Sin uso de datos reales.

## 8. Riesgos

- Riesgo alto de declarar 8/8 sin prueba ejecutada y trazable.
- Riesgo medio de drift documental por contradicciones previas en `TASK_GATE_2C_TO_3.md`.
- Riesgo medio de excluir `lead_interactions` sin validar impacto de auditoria.

## 9. Plan tecnico (dos rutas)

### Ruta A — Corregir
1. Validar si tabla/enum/policies existen en DB de lab.
2. Si no existen, aplicar migration en entorno controlado.
3. Ejecutar prueba endpoint `POST /api/leads/:id/interactions` con lead test.
4. Registrar evidencia (status, payload sintetico, fila insertada).
5. Actualizar gate/documentacion con 8/8 solo si prueba pasa.

### Ruta B — Excluir formalmente de V0
1. Confirmar que `lead_interactions` no bloquea core operativo minimo.
2. Declarar exclusion explicita de `PRODUCCION_CONTROLADA_V0`.
3. Mantener deuda abierta con bloqueo definido en gate.
4. Actualizar GO/NO-GO y gate como `APROBAR_CON_CONDICIONES` o `CORREGIR_ANTES_DE_AVANZAR` segun evidencia.

## 10. Pruebas

- Prueba 1: existencia de objetos DB (`lead_interactions`, enums, policies) en lab.
- Prueba 2: `POST /api/leads/:id/interactions` responde `201` con payload valido test.
- Prueba 3: lectura de fila insertada en tabla `lead_interactions` en lab.
- Prueba 4: repetir contra payload invalido y validar `400`.

## 11. Criterios de aceptacion

| ID | Criterio | KPI |
|---|---|---|
| CA-01 | Estado real de `lead_interactions` probado | Evidencia tecnica reproducible |
| CA-02 | Si ruta A: endpoint operativo | `POST /interactions` = 201 |
| CA-03 | Si ruta B: exclusion formal | Documento gate/go-no-go actualizado con riesgo residual |
| CA-04 | Gate coherente sin contradicciones | Sin 8/8 declarado sin prueba |
| CA-05 | Sin produccion abierta ni datos reales | Cumplimiento de reglas 2C |

## 12. Evidencia requerida

- Log de comandos/pruebas ejecutadas.
- Captura textual de respuestas HTTP.
- Evidencia de tabla/insert en entorno lab.
- Diff documental de gate/deuda tras resultado.

## 13. Rollback

- Si hay cambio DB: script de rollback documentado antes de aplicar.
- Si hay cambio backend: revertir archivo `backend/src/routes/leads.js`.
- Si hay cambio documental: revertir `TASK_GATE_2C_TO_3.md`, `GO_NOGO_FASE3.md`, `TECH_DEBT_REGISTER.md`, `00_TASKS_FASE2C_INDEX.md`, `REVIEW_*`.
