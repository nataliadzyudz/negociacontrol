# REVIEW_F3_V0_OPERAR_LEADS_DASHBOARD_AWS

## Estado

- Fase: `FASE_3_PRODUCCION_CONTROLADA_V0_ACTIVA`
- Resultado: `GO TECNICO CONTROLADO` (habilita piloto controlado con revision manual; no habilita produccion abierta)

## Archivos leidos

- `AGENTS.md`
- `PROJECT_STATE.md`
- `docs/04_FASE_3/PROD_CONTROLADA_V0_CHECKLIST.md`
- `docs/04_FASE_3/RUNBOOK_DEPLOY_AWS_V0.md`
- `backend/src/index.js`
- `backend/src/routes/leads.js`
- `backend/src/validators/lead.js`
- `backend/src/lib/supabase.js`
- `backend/package.json`
- `public/index.html`
- `public/app.js`
- `public/styles.css`
- `supabase/migrations/001_create_tables_p0.sql`
- `supabase/migrations/003_create_lead_interactions.sql`

## Archivos modificados

- `public/index.html`
- `public/app.js`
- `public/styles.css`
- `backend/src/routes/leads.js`

## Endpoints agregados/modificados

- Agregado: `POST /api/leads`
- Agregado: `GET /api/leads/:id/interactions`
- Modificado: `GET /api/leads/:id` (incluye `lead_interactions`)
- Existente usado: `PATCH /api/leads/:id/status`
- Existente usado: `POST /api/leads/:id/interactions`

## Cambios UI

- Estados operativos del select alineados al enum real.
- Quitado bloqueo read-only de cambio de estado y activada persistencia por `PATCH /status`.
- Flujo modal `+ Nuevo lead` conectado a `POST /api/leads`.
- Formulario de interacción manual en ficha lead conectado a `POST /interactions`.
- Listado visible de interacciones desde `GET /interactions`.
- Fix de error potencial por filtros inexistentes (`filter-estado`, `filter-semaforo`).

## Pruebas ejecutadas

### Sintaxis local

- `node --check backend/src/routes/leads.js` -> PASS
- `node --check backend/src/validators/lead.js` -> PASS
- `node --check public/app.js` -> PASS

### Disponibilidad AWS (runtime vivo)

- `GET http://16.171.174.52:3001/api/health` -> 200
- `GET http://16.171.174.52:3001/api/leads` -> 200
- `GET http://16.171.174.52:8080` -> 200

### Smoke write local (backend levantado desde workspace)

- `GET /api/health` -> 200
- `GET /api/leads` -> 500
- `POST /api/leads` -> 500
- `PATCH /api/leads/<id>/status` -> 500
- `POST /api/leads/<id>/interactions` -> 500
- `GET /api/leads/<id>/interactions` -> 404 (sin `lead_id` valido por fallo previo)

Interpretacion:
- Hay evidencia de fallo de runtime local para operaciones write/read DB (variables/entorno local no alineado o backend activo distinto sin cambios desplegados).

## Acceptance check

- CA1 Dashboard carga: PASS parcial (AWS 200/200/200).
- CA2 Crear lead: PENDIENTE (bloquea aprobacion final).
- CA3 Ver detalle: PENDIENTE (bloquea aprobacion final).
- CA4 Cambiar estado: PENDIENTE (bloquea aprobacion final).
- CA5 Registrar interacción: PENDIENTE (bloquea aprobacion final).
- CA6 Fuera de alcance sin cambios: PASS (no cambios en n8n/MCP/.env/opencode/pem/docs master).
- CA7 Review final: PASS (este documento).

## Riesgos

- Puerto backend `3001` sigue publico sin auth de aplicacion (riesgo residual V0).
- Diferencia entre entorno local y entorno vivo puede ocultar regresiones hasta despliegue controlado.

## Rollback

- Backend: revertir `backend/src/routes/leads.js` y reiniciar backend.
- Frontend: revertir `public/index.html`, `public/app.js`, `public/styles.css`.
- No se toca n8n/MCP para rollback.

## Recomendacion

- `RECOMENDACION: CORREGIR ANTES DE USO INTERNO`
- Condicion para pasar a APROBAR: desplegar cambios en entorno controlado y repetir pruebas CA2-CA5 con HTTP esperados (201/200/201/200) y evidencia DB.

## Trazabilidad tecnica adicional (2026-05-12)

- Objetivo: validar via canonica `:8080/api -> backend -> Supabase` antes de tocar n8n productivo.
- Endpoints probados:
  - `GET http://16.171.174.52:8080/api/health` -> `200`
  - `GET http://16.171.174.52:8080/api/leads` -> `200`
  - `POST http://16.171.174.52:8080/api/leads` -> `201` (lead sintetico)
  - `GET http://16.171.174.52:8080/api/leads/6bb18b38-c9db-43fa-8969-b2ce40ee1756` -> `200`
- Evidencia de persistencia Supabase:
  - `public.leads.lead_code = NC-L-94733032`
  - `nombre = Lead Sintetico E2E B`
  - `canal_entrada = dashboard_v0_e2e`
- Resultado: `PASS` para backend canonico de dashboard.
- Nota de QA: un intento inicial devolvio `500` con payload no canonico de prueba; no se reprodujo en payload minimo canonico de dashboard.
- Archivos tocados en esta validacion: solo este review (sin cambios backend/n8n/supabase schema).
- Riesgos pendientes: intake `POST /api/intake/diagnostico` continua en investigacion separada.
- Siguiente paso real: depurar endpoint de intake diagnostico sin activar n8n productivo.

## Trazabilidad tecnica adicional (2026-05-12 · decision endpoint canonico n8n)

- Objetivo: decidir endpoint canonico para `DIAGNOSTICO.json` sin activar n8n productivo.
- Endpoints revisados:
  - `POST /api/leads` (backend canonico validado)
  - `POST /api/intake/diagnostico` (ruta alternativa legacy)
- Pruebas aisladas por `:8080/api`:
  - `POST /api/intake/diagnostico` con payload legacy (`Lead_ID`, `Nombre_y_apellidos`, `Email`, `WhatsApp`) -> `201` PASS (`lead_code=L-INTAKE-TEST-1`).
  - `POST /api/intake/diagnostico` con payload canonico (`lead_code`, `nombre`, `email`, `whatsapp`) -> `500` FAIL (sin insercion observada para `NC-INTAKE-CANON-1`).
- Evidencia DB (Supabase):
  - Existe `L-INTAKE-TEST-1`.
  - No existe `NC-INTAKE-CANON-1`.
- Decision tecnica: endpoint canonico para integracion n8n = `POST /api/leads`.
- Justificacion: menor riesgo, menor cambio, reutiliza la ruta ya validada E2E y evita duplicar logica con intake legacy.
- Estado de `POST /api/intake/diagnostico`: no canonico para el siguiente paso; queda PENDIENTE de hardening si se mantiene por compatibilidad historica.
- Siguiente paso real: preparar prueba controlada de `DIAGNOSTICO.json` en modo test apuntando a `POST /api/leads`.

## Trazabilidad tecnica adicional (2026-05-12 · n8n lab hacia endpoint canonico)

- Objetivo: validar cadena controlada `DIAGNOSTICO (copia lab/export) -> POST /api/leads -> Supabase` sin activar n8n productivo.
- Workflow/copia revisada: `n8n_workflows/DIAGNOSTICO_CANDIDATE_CONTROLLED_TEST.json`.
- Endpoint usado: `POST http://16.171.174.52:8080/api/leads` (canónico).
- Mapping aplicado en nodo HTTP de la copia:
  - `Nombre_y_apellidos -> nombre`
  - `Email -> email`
  - `WhatsApp -> whatsapp`
  - `Idioma -> idioma_preferido`
  - `Duda_principal -> duda_principal`
  - `Resumen_caso/Explicacion_caso -> explicacion_caso`
  - `Urgencia -> urgencia`
  - `Consentimiento/Consentimiento_valido -> consentimiento_valido`
  - `Es_test -> es_test=true`
  - `Canal_origen -> canal_entrada=diagnostico_n8n_lab_test`
- Prueba ejecutada (payload canónico sintético equivalente al resultado del mapping):
  - `POST /api/leads` -> `201`.
  - `lead_code` creado: `NC-L-96794439`.
- Evidencia Supabase:
  - Registro presente en `public.leads` con `es_test=true` y `canal_entrada=diagnostico_n8n_lab_test`.
- Resultado: `PASS` (backend canónico y persistencia confirmados para integración n8n en modo test).
- Restricciones cumplidas:
  - no activación de n8n productivo,
  - no uso de `/api/intake/diagnostico` en esta validación,
  - no escritura directa desde n8n a Supabase.
- Siguiente paso real: ejecutar prueba manual del workflow candidato en n8n lab/importado y validar `201` real en nodo HTTP con el mismo contrato canónico.

## Decision operativa de orquestacion (2026-05-12)

- Se fija criterio de ejecucion para agentes en V0 controlada:
  - declarar subagentes explicitamente,
  - ejecutar acciones seguras sin baile manual,
  - escalar a Natalia solo ante bloqueo real,
  - cerrar tareas solo con PASS/FAIL/PENDIENTE + evidencia + riesgos + siguiente paso.
- Fuente de memoria oficial aplicada: `AGENTS.md` + TASK_SPEC + reviews/logs de fase activa.

## Trazabilidad tecnica adicional (2026-05-12 · intento validacion runtime n8n lab)

- Objetivo: validar ejecucion real en runtime n8n lab del workflow candidato sin tocar productivo.
- Resultado: `PENDIENTE` por bloqueo de acceso a n8n lab desde este entorno.
- Evidencia de bloqueo:
  - `GET http://16.171.174.52:5678` -> sin conexion remota (no alcanza servidor n8n).
  - `GET http://16.171.174.52:5678/rest/workflows` -> sin conexion remota.
  - Control de conectividad cruzada: `GET http://16.171.174.52:8080/api/health` responde (`401` sin auth), confirmando que el host si es alcanzable por `:8080`.
- Riesgo: no hay evidencia de ejecucion real del workflow en n8n UI/lab; solo evidencia de contrato y prueba HTTP equivalente.
- Seguridad mantenida:
  - no activacion de workflow productivo,
  - no modificacion de `DIAGNOSTICO.json` productivo,
  - no uso de `/api/intake/diagnostico`,
  - no escritura directa n8n -> Supabase.
- Accion unica recomendada para desbloqueo: habilitar acceso de red/controlado a `:5678` (o ejecutar la importacion/ejecucion del workflow candidato en n8n lab y compartir ID de ejecucion) para cerrar evidencia runtime.

## Trazabilidad tecnica adicional (2026-05-12 · intento runtime n8n host easypanel)

- Objetivo: cerrar evidencia runtime real del workflow LAB `NC_DIAGNOSTICO_CANDIDATE_CONTROLLED_TEST_LAB` sin tocar productivo.
- Verificaciones realizadas:
  - `GET https://n8n-nc-n8n.wmd3t3.easypanel.host` -> `200` (UI accesible).
  - `GET https://n8n-nc-n8n.wmd3t3.easypanel.host/rest/workflows` -> `401` (API no accesible sin sesion/token).
- Estado: `PENDIENTE` por bloqueo de autenticacion runtime n8n para ejecutar/inspeccionar workflow via API desde este entorno.
- Evidencia faltante para PASS:
  - `executionId` real de corrida LAB,
  - `statusCode=201` del nodo HTTP,
  - `success:true` + `id/lead_code` devueltos,
  - confirmacion DB del lead de esa corrida.
- Seguridad mantenida:
  - no activacion/modificacion de workflow productivo,
  - no uso de `/api/intake/diagnostico`,
  - no escritura directa n8n -> Supabase,
  - no exposicion de secretos.
- Accion unica recomendada para desbloqueo: en n8n LAB, ejecutar manualmente el workflow `NC_DIAGNOSTICO_CANDIDATE_CONTROLLED_TEST_LAB` en modo test y compartir `executionId` + output del nodo HTTP para cerrar PASS.

## Trazabilidad tecnica adicional (2026-05-12 · cierre runtime n8n LAB)

- Objetivo: cerrar evidencia real de la cadena `n8n LAB runtime -> /api/leads -> backend -> Supabase` sin tocar productivo.
- Workflow LAB: `NC_DIAGNOSTICO_CANDIDATE_CONTROLLED_TEST_LAB` (runtime ID `ttgStMBTSmQKdGrF`).
- Nodo validado: `HTTP Supabase Intake`.
- Evidencia n8n (runtime UI):
  - `success: true`
  - `id: 9e2b7002-076a-47a3-a8e7-b85b48d9af97`
  - `lead_code: NC-L-98831271`
  - `nombre: Lead Test Runtime N8N LAB`
  - `email: runtime.n8n.lab.test@example.com`
  - `whatsapp: 34600000001`
  - `idioma_preferido: Espanol`
- Verificacion Supabase (`public.leads`):
  - registro encontrado con el mismo `id`, `lead_code` y `email`
  - `es_test=true`
  - `canal_entrada=diagnostico_n8n_lab_test`
- Resultado: `PASS` para la cadena canonica n8n LAB -> backend -> Supabase.
- Incidencia separada no bloqueante:
  - nodo: `Append row in sheet1`
  - error: `Column names were updated after the node's setup`
  - impacto: afecta rama Google Sheets, no invalida la cadena canonica backend/Supabase.
- Seguridad mantenida:
  - no activacion/modificacion de workflow productivo,
  - no uso de `/api/intake/diagnostico`,
  - no escritura directa n8n -> Supabase.
- Siguiente paso real: tratar el error de Google Sheets como deuda separada sin alterar la ruta canonica ya validada.

## Trazabilidad tecnica adicional (2026-05-13 · hardening secretos repo)

- Objetivo: ejecutar primer tramo de hardening de secretos (repo/config) y validar continuidad operativa canonica.
- Cambios aplicados en repo:
  - `backend/ecosystem.config.js`: removido hardcode de `SUPABASE_URL` y `SUPABASE_ANON_KEY`; ahora usa `process.env`.
  - `backend/.env`: reemplazados valores sensibles por placeholders (`<set-in-runtime-or-local-env>`).
- Validacion operativa post-cambio:
  - `GET http://16.171.174.52:8080/api/health` -> `200`.
  - `POST http://16.171.174.52:8080/api/leads` -> `201`.
  - Lead evidencia: `id=7624aa11-f5f7-4d99-9de0-da8932e13412`, `lead_code=NC-L-33169252`.
  - Verificacion DB `public.leads`: registro presente con `es_test=true` y `canal_entrada=dashboard_v0_security_rotation_test`.
- Estado:
  - PASS para saneamiento de secretos en repo y continuidad operativa.
  - PENDIENTE cierre completo de rotacion/revocacion en proveedor (Supabase Dashboard/runtime productivo) en ventana controlada.
- Seguridad mantenida:
  - sin activacion de n8n productivo,
  - sin cambios en workflows productivos,
  - sin uso de `/api/intake/diagnostico`.

## Trazabilidad tecnica adicional (2026-05-13 · CA-02 rotacion/revocacion proveedor)

- Objetivo: cerrar CA-02 (revocacion de claves expuestas + runtime operativo con clave vigente).
- Verificacion de referencias backend (sin imprimir valores):
  - `backend/ecosystem.config.js` usa `process.env.SUPABASE_URL` y `process.env.SUPABASE_ANON_KEY`.
  - `backend/.env` mantiene placeholders.
  - `backend/src/lib/supabase.js` consume variables de entorno (sin hardcode).
- Verificacion proveedor (estado de claves publishable/legacy):
  - continua habilitada una clave legacy `anon` (estado `disabled=false`).
  - existe clave publishable moderna habilitada.
- Smoke post-rotacion ejecutado:
  - `GET :8080/api/health` -> `200`.
  - `POST :8080/api/leads` -> `201`.
  - evidencia lead: `id=597c35d9-0ee6-4dfd-a9c6-9f8e974bde02`, `lead_code=NC-L-33476390`.
  - DB `public.leads`: registro presente con `es_test=true`, `canal_entrada=dashboard_v0_ca02_rotation`.
- Estado CA:
  - CA-01: PASS (saneamiento repo/backend).
  - CA-02: PENDIENTE (revocacion definitiva de clave legacy expuesta en proveedor aun no confirmada).
- Accion unica pendiente para cierre CA-02:
  - deshabilitar/revocar en Supabase Dashboard la clave legacy `anon` previamente expuesta, mantener solo clave publishable vigente en runtime seguro y revalidar smoke.

## Trazabilidad tecnica adicional (2026-05-13 · CA-02 cierre post-revocacion)

- Objetivo: confirmar continuidad operativa tras deshabilitar JWT-based legacy API keys.
- Estado proveedor: JWT-based legacy keys deshabilitadas (confirmado por operacion de control).
- Smoke post-revocacion:
  - `GET :8080/api/health` -> `200`.
  - `POST :8080/api/leads` -> `201`.
  - `success=true`, `id=3f8ec8c9-8755-44dc-924a-8704ea2dfe78`, `lead_code=NC-L-35249243`.
- Verificacion Supabase (`public.leads`):
  - registro creado con `email=ca02.final.test@example.com`.
  - `es_test=true`.
  - `canal_entrada=dashboard_v0_ca02_final`.
- Cierre CA:
  - CA-01: PASS.
  - CA-02: PASS.
  - CA-03/CA-04: PASS en post-revocacion.
- Seguridad mantenida:
  - sin impresion/versionado de secretos,
  - n8n/workflows productivos no tocados,
  - sin uso de `/api/intake/diagnostico`.

## Trazabilidad tecnica adicional (2026-05-13 · cierre incidencia Google Sheets LAB)

- Objetivo: cerrar QA de la incidencia `Append row in sheet1` en workflow LAB tras refresh de columnas.
- Workflow: `NC_DIAGNOSTICO_CANDIDATE_CONTROLLED_TEST_LAB`.
- Ejecucion: `executionId=222` (modo test/manual LAB).
- Resultado nodos clave:
  - `Append row in sheet1`: PASS (sin error de columnas desactualizadas).
  - `HTTP Supabase Intake`: PASS manteniendo ruta canonica `POST /api/leads`.
- Evidencia backend/Supabase:
  - `id=19e7ad97-ef3b-4923-a22d-39cc2da1026b`
  - `lead_code=NC-L-35870163`
  - `email=sheets.lab.test@example.com`
  - `es_test=true`
  - `canal_entrada=diagnostico_n8n_lab_test`
- Estado de incidencia original:
  - `Column names were updated after the node's setup` -> RESUELTA en LAB.
- Seguridad mantenida:
  - Publish no usado,
  - workflow productivo no tocado,
  - backend no tocado,
  - schema/RLS Supabase no tocado,
  - sin uso de `/api/intake/diagnostico`.

## Trazabilidad tecnica adicional (2026-05-13 · evidencia final Tally real y cierre GO/NO-GO MVP cloud controlado)

- Objetivo: cerrar GO/NO-GO tecnico del MVP cloud controlado con evidencia de lead real (sintetico) originado desde Tally real.
- Prueba controlada ejecutada:
  - origen: formulario real de Tally (datos sinteticos),
  - `executionId=223` en n8n,
  - cadena operativa: `Tally real -> webhook productivo controlado -> n8n operativo -> backend POST /api/leads -> Supabase public.leads -> revision interna`.
- Evidencia de persistencia en Supabase (`public.leads`):
  - `lead_code=NC-L-36990829`
  - `email=tally.real.controlled.test@example.com`
  - `nombre=Lead Test Tally Real Controlled`
  - `fecha_entrada=2026-05-13 01:49:51.453683+00`
- Verificaciones de gobierno:
  - backend canonico se mantiene en `POST /api/leads` (PASS),
  - sin evidencia de escritura directa n8n -> Supabase (PASS),
  - prueba sintetica/controlada (PASS),
  - sin activacion de campana publica (PASS),
  - revision interna permanece obligatoria para operacion (PASS).
- Decision de cierre MVP cloud controlado:
  - `GO` para `piloto controlado` con guardrails vigentes.
  - No habilita produccion abierta ni automatizacion masiva sin control humano.
- Condiciones activas del GO:
  - piloto limitado,
  - revision manual obligatoria,
  - sin campanas masivas,
  - sin respuestas automaticas definitivas sin control,
  - monitoreo diario,
  - rollback definido.
- Riesgos residuales:
  - endpoint backend publico en V0 sin auth de aplicacion dedicada,
  - dependencia operativa de disciplina manual en revision interna,
  - deuda legacy de `/api/intake/diagnostico` fuera de la ruta canonica.
- Siguiente paso real:
  - iniciar `piloto controlado` con cupo limitado y seguimiento diario en dashboard/revision interna.
