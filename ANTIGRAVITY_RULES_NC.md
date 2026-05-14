# ANTIGRAVITY_RULES_NC

## 1) Rol de Antigravity

Antigravity se usa en NC solo para tareas de UI/UX/frontend en fase controlada:

- diseno visual y estructura operativa del dashboard,
- experiencia de uso en `public/*`,
- prototipo funcional y demo interna controlada.

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

## 5) Archivos permitidos para ejecucion UI

- `public/app.js`
- `public/styles.css`
- `public/index.html` solo si la TASK_SPEC activa lo autoriza expresamente.

## 6) DO_NOT_TOUCH estricto

- `backend/*`
- `n8n_workflows/*`
- `supabase/*`
- `.env`, credenciales, secrets
- produccion/AWS/PM2/nginx
- workflows n8n activos
- `master/main`

## 7) Trabajo por bloques (obligatorio)

- **BLOQUE 0:** Diagnostico de entorno y contrato.
- **BLOQUE 1:** TASK_SPEC UI aprobada.
- **BLOQUE 2:** Implementacion UI dentro de WRITE_SET.
- **BLOQUE 3:** QA visual y QA de contrato de datos.
- **BLOQUE 4:** Cierre con evidencia, rollback y siguiente paso.

## 8) Protocolo de cierre obligatorio

Todo cierre debe incluir:

- estado final `PASS` / `FAIL` / `PENDIENTE`,
- evidencia verificable,
- rollback,
- un unico `NEXT_STEP`.

## 9) Regla de seguridad y foco

- No exponer secretos.
- No ejecutar cambios fuera de la TASK_SPEC.
- No abrir frentes nuevos (backend/n8n/supabase) durante UI V0.1.
- Si aparece conflicto de contrato o alcance, cerrar en `PENDIENTE` y escalar.
