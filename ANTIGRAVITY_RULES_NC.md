# ANTIGRAVITY_RULES_NC

## 1) Rol de Antigravity

Antigravity se usa en NC solo para tareas de UI/UX/frontend en fase controlada:

- diseno visual y estructura operativa del dashboard,
- experiencia de uso en `public/*`,
- prototipo funcional y demo interna controlada,
- alineación con `docs/00_CANON/brand/BRAND_UI_TOKENS_NC.md` (con `BRANDINGBOOK_V3.pdf` como fuente canónica).

Fuera de alcance de Antigravity en este proyecto:

- backend,
- Supabase,
- n8n,
- produccion,
- infraestructura AWS/PM2/nginx.

## 2) Principio NC (obligatorio)

- Natalia decide.
- El dashboard permite operar.
- Los agentes ayudan; no gobiernan decisiones de negocio.

## 3) Reglas de contrato de datos para UI

- `Estado` gobierna pipeline/columnas y posicion operativa del lead.
- `Semaforo_final` gobierna prioridad visual operativa.
- `Semaforo_IA` y `Semaforo_preIA` son datos informativos/auditoria.
- Prohibido mezclar estado operativo con semaforo.

## 4) Fuente vigente para Dashboard UI V0.1

- Baseline E2E runtime AWS validado en F3_V0:
  - `T260514_V02` VERDE -> `APTO_DIAGNOSTICO`
  - `T260514_V03` AMARILLO sin revision -> `FALTA_DATO`
  - `T260514_V04` AMARILLO con revision -> `PENDIENTE_REVISION`
  - `T260514_V05` ROJO riesgo duro -> `PENDIENTE_REVISION`
  - `T260514_V06` ERROR_IA -> `ERROR_IA`
- Endpoint canonico de entrada DIAGNOSTICO: `POST /api/intake/diagnostico`.
- Referencias antiguas que marcan `/api/leads` como canonico de DIAGNOSTICO no gobiernan UI V0.1.

## 5) Diseño, Tono y Límites de Marca

- `docs/00_CANON/brand/BRANDINGBOOK_V3.pdf` es la fuente canónica e indiscutible de diseño.
- Para ejecución técnica de UI, usar los mapeos de `docs/00_CANON/brand/BRAND_UI_TOKENS_NC.md`.
- Antigravity no alterará la paleta de colores ni la jerarquía visual sin justificación funcional aprobada.

## 6) Archivos permitidos para ejecucion UI

- `public/app.js`
- `public/styles.css`
- `public/index.html` solo si la TASK_SPEC activa lo autoriza expresamente.

## 7) DO_NOT_TOUCH estricto

- `backend/*`
- `n8n_workflows/*`
- `supabase/*`
- `.env`, credenciales, secrets
- produccion/AWS/PM2/nginx
- workflows n8n activos
- `master/main`

## 8) Trabajo por bloques (obligatorio)

- **BLOQUE 0:** Diagnostico de entorno y contrato.
- **BLOQUE 1:** TASK_SPEC UI aprobada.
- **BLOQUE 2:** Implementacion UI dentro de WRITE_SET.
- **BLOQUE 3:** QA visual y QA de contrato de datos.
- **BLOQUE 4:** Cierre con evidencia, rollback y siguiente paso.

## 9) Protocolo de cierre obligatorio

Todo cierre debe incluir:

- estado final `PASS` / `FAIL` / `PENDIENTE`,
- evidencia verificable,
- rollback,
- un unico `NEXT_STEP`.

## 10) Regla de seguridad y foco

- No exponer secretos.
- No ejecutar cambios fuera de la TASK_SPEC.
- No abrir frentes nuevos (backend/n8n/supabase) durante UI V0.1.
- Si aparece conflicto de contrato o alcance, cerrar en `PENDIENTE` y escalar.

## 11) Regla anti-autoaprobacion

Antigravity no puede declararse a si mismo:

- `COMPLETADO`
- `APROBADO`
- `PASS` final
- `READY_FOR_COMMIT`
- `READY_FOR_PUSH`
- `READY_FOR_DEPLOY`

cuando Antigravity fue el implementador del cambio.

Antigravity solo puede declarar estados intermedios:

- `IMPLEMENTADO_PENDIENTE_QA`
- `PENDIENTE_QA`
- `PENDIENTE_APROBACION`

La aprobacion final corresponde a Natalia / ChatGPT supervisor / OpenCode QA.

Antigravity no puede modificar sin autorizacion explicita:

- `TASK_SPEC`
- reglas de gobierno
- documentacion de canon
- estado de hito
- commit
- push
- deploy

Si Antigravity necesita tocar algo fuera del `WRITE_SET`, debe detenerse y devolver:

- `PENDIENTE`
- motivo
- archivo requerido
- riesgo
- propuesta
