# REVIEW_F3_V0_N8N_BRIDGE_CONTROLLED_TEST

## Objetivo

Preparar el workflow lab `NC_DIAGNOSTICO_SUPABASE_PARALLEL_TEST.json` para probar puente n8n -> backend/Supabase en modo controlado V0, sin tocar workflow real `DIAGNOSTICO.json`.

## Cambios aplicados (solo lab)

- Archivo modificado: `n8n_workflows/lab/NC_DIAGNOSTICO_SUPABASE_PARALLEL_TEST.json`.
- Endpoint HTTP actualizado de `http://16.171.174.52:3001/api/intake/diagnostico` a:
  - `http://16.171.174.52:8080/api/intake/diagnostico`
- Payload del nodo `HTTP Supabase Intake` actualizado para forzar:
  - `Es_test: true`
  - `es_test: true`
  - `Canal_origen: "n8n_bridge_controlled_test"`
  - `canal_entrada: "n8n_bridge_controlled_test"`
- `continueOnFail: true` mantenido.
- Respuesta completa HTTP mantenida (`fullResponse: true`) para evidencia técnica.

## Basic Auth (sin secretos)

- Se configuró referencia de credencial n8n en el nodo HTTP:
  - `credentials.httpBasicAuth.id = "SET_IN_N8N_UI"`
  - `credentials.httpBasicAuth.name = "NC_DASHBOARD_BASIC_AUTH"`
- No se guardaron usuario/contraseña en JSON ni en documentación.
- La validación operativa confirmó funcionamiento con credencial `NC_DASHBOARD_BASIC_AUTH` en n8n UI.

## Incidencias detectadas y resolución

- Primer `400` (`El nombre es obligatorio`): causado por normalización incompleta cuando el webhook entregaba datos en `body` en lugar de payload plano. Resuelto ajustando `Code in JavaScript` para soportar `json`, `json.body` y `json.body.data`/`json.data`.
- `401` en intake: causado por credencial Basic Auth incorrecta o pendiente de asignar en n8n. Resuelto al vincular correctamente `NC_DASHBOARD_BASIC_AUTH`.
- `409` en intake: causado por duplicado de `Lead_ID` (`L-0001`) en pruebas repetidas. Mitigado usando ejecución limpia y validación con nuevo lead.

## Validación de cierre

- Endpoint validado: `http://16.171.174.52:8080/api/intake/diagnostico`.
- Resultado final PASS en nodo `HTTP Supabase Intake`:
  - `success=true`
  - `lead_code=L-0101`
  - `id=5f06458c-4684-47d0-9d7a-427bbfbc2c6a`
  - `nombre=Lead Test n8n Bridge UTF8`
  - `email=n8n.bridge.utf8@example.com`
  - `idioma=Español`
  - `esta_en_espana=Sí`
  - `duda_principal=Diagnóstico fiscal`
- UTF-8: PASS. Se validó envío correcto usando body como bytes UTF-8 desde PowerShell.

## Evidencia visual dashboard

- Estado: `PENDIENTE_VISUAL` (sin evidencia documentada en repo en este cierre).

## Comparación con DIAGNOSTICO real (solo lectura)

`DIAGNOSTICO.json` y el lab comparten:
- mismo webhook/path;
- misma normalización de campos en `Code in JavaScript`;
- misma lógica de pre-IA/LLM;
- misma escritura en Google Sheets.

Diferencia clave del lab:
- nodo extra `HTTP Supabase Intake` en paralelo tras `Code in JavaScript` para enviar al backend.

## Riesgos y controles

- Riesgo de doble escritura (Sheets + Supabase): **aceptado temporal** como espejo durante validación.
- Riesgo de reintentos duplicados: mitigar con revisión de `Lead_ID`/respuesta HTTP.
- Riesgo de activación accidental: no importar/activar workflow en esta tarea.
- No hay cambios en `DIAGNOSTICO.json`, `DIAGNOSTICO.backup.json`, credenciales reales ni producción.

## Plan de prueba (siguiente paso, no ejecutado aquí)

1. Importar/abrir workflow lab en n8n (sin activar real).
2. Asociar credencial Basic Auth `NC_DASHBOARD_BASIC_AUTH` en UI.
3. Ejecutar payload test por webhook del lab.
4. Verificar HTTP status del nodo intake (`201` esperado).
5. Verificar persistencia en backend/Supabase y espejo en Sheets.
6. Confirmar ausencia de envíos automáticos WhatsApp/email.

## Estado

- Puente lab n8n -> backend/Supabase: PASS.
- Decisión: puente lab aprobado para validación controlada.
- Pendiente: trasladar patrón probado a `DIAGNOSTICO.json` candidato productivo en TASK separada.
