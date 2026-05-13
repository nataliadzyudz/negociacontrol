# TASK_SPEC_F3_V0_N8N_PRODUCTION_BRIDGE_CONTROLLED

## Estado

- Estado actual: `PASS` (evidencia runtime y persistencia cerradas)
- Canonica para continuidad V0: `SI`
- Documento de evidencia vinculado: `docs/04_FASE_3/REVIEW_F3_V0_OPERAR_LEADS_DASHBOARD_AWS.md`

## Objetivo operativo inmediato

Ejecutar la siguiente tarea tecnica de Fase 3 V0 sin improvisacion, con orquestacion explicita de subagentes, manteniendo operacion en modo piloto controlado y sin abrir produccion publica.

## Contexto validado

- Cadena canonica validada: `Tally real -> webhook controlado -> n8n -> POST /api/leads -> Supabase public.leads -> revision interna`.
- Evidencia final registrada:
  - `executionId=223`
  - `lead_code=NC-L-36990829`
  - `email=tally.real.controlled.test@example.com`
  - `nombre=Lead Test Tally Real Controlled`
  - `fecha_entrada=2026-05-13 01:49:51.453683+00`
- Endpoint canonico de entrada backend: `POST /api/leads`.
- `/api/intake/diagnostico` queda como legacy/deuda no canonica.
- No hay evidencia aprobada de escritura directa `n8n -> Supabase`.

## Subagentes obligatorios (Agent Supervisor)

1. `Explorer Agent`
2. `Contract Mapper / Spec Writer`
3. `Implementer Agent` (solo si la tarea lo requiere y esta en WRITE_SET)
4. `QA Agent`
5. `Security Reviewer`
6. `Documentation Agent`

## Permisos, limites, handoff y evidencia por subagente

### 1) Explorer Agent
- Permisos: lectura de documentos de fase y artefactos objetivo de la tarea.
- Limites: no edita; no toca backend/n8n/supabase/credenciales.
- Handoff: entrega mapa de archivos y dependencias exactas.
- Output obligatorio: `FILES_TO_READ` y riesgos de contexto.
- Cierre: `PASS/FAIL/PENDIENTE` con evidencia de rutas leidas.

### 2) Contract Mapper / Spec Writer
- Permisos: actualizar solo TASK_SPEC/review autorizados.
- Limites: sin cambios funcionales.
- Handoff: contrato operativo final para Implementer/QA.
- Output obligatorio: alcance, DO_NOT_TOUCH, pruebas, cierre y siguiente paso real.
- Cierre: `PASS` cuando elimina ambiguedad documental.

### 3) Implementer Agent
- Permisos: solo WRITE_SET explicito de la tarea activa.
- Limites: fuera de WRITE_SET = bloqueo y escalado.
- Handoff: diff minimo + trazabilidad de ejecucion.
- Output obligatorio: `FILES_CHANGED`, rollback y evidencia tecnica.
- Cierre: `PASS` solo con prueba ejecutada y evidencia verificable.

### 4) QA Agent
- Permisos: pruebas read-only o de smoke permitidas por spec.
- Limites: no inventar pruebas fuera de criterios de aceptacion.
- Handoff: matriz `CA -> evidencia -> resultado`.
- Output obligatorio: `PASS/FAIL/PENDIENTE` por criterio.
- Cierre: `PASS` solo si todos los CA obligatorios cierran.

### 5) Security Reviewer
- Permisos: validacion de secretos, superficie expuesta y cumplimiento de bloqueos.
- Limites: no imprimir secretos; no cambiar credenciales sin spec.
- Handoff: riesgos residuales y decision de continuidad.
- Output obligatorio: checklist de seguridad y hallazgos.
- Cierre: `PASS` sin exposicion nueva ni violacion de alcance.

### 6) Documentation Agent
- Permisos: actualizar review/spec de la tarea en curso.
- Limites: no crear documentacion duplicada.
- Handoff: cierre formal con evidencia y siguiente paso unico.
- Output obligatorio: registro `PASS/FAIL/PENDIENTE`, riesgos, rollback.
- Cierre: `PASS` cuando el repo queda como memoria suficiente para continuar.

## Tools permitidas y prohibidas

- Permitidas: lectura documental, inspeccion git read-only, parches minimos en spec/review.
- Prohibidas en esta spec base:
  - modificar backend/frontend funcional,
  - modificar n8n/workflows,
  - modificar Supabase schema,
  - tocar `.env`/credenciales,
  - deploy/migraciones/activaciones productivas.

## Fuera de alcance

- Produccion abierta.
- Campanas publicas o automatizacion masiva.
- Cambios tecnicos no autorizados por TASK_SPEC puntual.

## Pruebas minimas obligatorias (para cada siguiente tarea tecnica)

1. Verificacion de alcance contra `READ_SET/WRITE_SET/DO_NOT_TOUCH`.
2. Verificacion de cadena canonica (si la tarea toca flujo de leads): `POST /api/leads` como puerta.
3. Verificacion de no regresion de seguridad (sin secretos expuestos).
4. Verificacion documental de cierre: evidencia suficiente en review/spec.

## Evidencias obligatorias

- `FILES_READ`
- `FILES_CHANGED`
- `ACCEPTANCE_CHECK` por criterio
- `PASS/FAIL/PENDIENTE` final
- riesgos residuales
- rollback
- un unico `NEXT_STEP` real

## Rollback

1. Revertir solo archivos documentales tocados por la tarea.
2. Mantener sin cambios backend/n8n/supabase si no estaban en alcance.
3. Reabrir estado de la tarea como `PENDIENTE` con causa y evidencia.

## Criterio de cierre

- `PASS`: criterios completos con evidencia verificable y sin violar limites.
- `FAIL`: se ejecuto pero incumple criterios o rompe limites.
- `PENDIENTE`: bloqueo real (acceso, credencial, riesgo o decision humana obligatoria) con accion minima de desbloqueo.

## Riesgos

- deriva documental entre specs/reviews si no se mantiene una sola ruta canonica;
- relajacion operativa que derive en cambios fuera de alcance;
- confusion entre piloto controlado y produccion abierta.

## Siguiente paso real

Ejecutar la siguiente tarea tecnica de V0 solo con esta TASK_SPEC como contrato operativo base y registrar cierre con evidencia en el review correspondiente.

## Plantilla operativa estandar de arranque (reutilizable)

Principio rector:

`El repo es la fuente oficial de memoria tecnica. El agente solo la carga, la respeta y deja evidencia.`

Uso obligatorio para toda siguiente tarea tecnica:

1. Declarar una `TAREA CONCRETA` antes de actuar.
2. Leer obligatoriamente:
   - `AGENTS.md`
   - `PROJECT_STATE.md`
   - `docs/04_FASE_3/TASK_SPEC_F3_V0_N8N_PRODUCTION_BRIDGE_CONTROLLED.md`
   - `docs/04_FASE_3/REVIEW_F3_V0_OPERAR_LEADS_DASHBOARD_AWS.md`
3. Declarar orquestacion explicita de subagentes:
   - `Explorer Agent`
   - `Contract Mapper / Spec Writer` (si aplica)
   - `Implementer Agent` (solo con cambios autorizados)
   - `QA Agent`
   - `Security Reviewer`
   - `Documentation Agent`
4. Para cada subagente declarar: objetivo, permisos, limites, output esperado y criterio de cierre.
5. Antes de ejecutar, publicar: `FILES_TO_READ`, `FILES_TO_CHANGE`, `PLAN`, `RISKS`, `ROLLBACK`, `DO_NOT_TOUCH`.
6. Ejecutar solo dentro de `FILES_TO_CHANGE`.
7. Si algo cae fuera de alcance autorizado, marcar `PENDIENTE` y escalar.
8. Entregar QA obligatorio con matriz:

| CA | Evidencia | Resultado |
|---|---|---|

9. Estados permitidos: `PASS`, `FAIL`, `PENDIENTE`.
10. Prohibido cerrar con: `parece correcto`, `deberia funcionar`, `aparentemente`.
11. Confirmar seguridad en todo cierre:
   - secretos no expuestos,
   - productivo no tocado salvo autorizacion expresa,
   - campana publica no activada,
   - rollback claro,
   - revision humana mantenida.
12. Si hay cambios o decision operativa, actualizar documentacion existente adecuada.
13. Priorizar actualizacion en `docs/04_FASE_3/REVIEW_F3_V0_OPERAR_LEADS_DASHBOARD_AWS.md`.
14. Registrar siempre: fecha, objetivo, archivos leidos, archivos cambiados, evidencia, resultado, riesgos residuales, rollback y `NEXT_STEP` unico.
15. Formato final obligatorio de entrega:
   - Resumen ejecutivo
   - Orquestacion declarada
   - FILES_TO_READ
   - FILES_TO_CHANGE
   - PLAN ejecutado
   - Evidencias
   - Acceptance Check
   - Seguridad
   - Documentacion actualizada
   - Riesgos residuales
   - Rollback
   - Resultado final
   - NEXT_STEP
