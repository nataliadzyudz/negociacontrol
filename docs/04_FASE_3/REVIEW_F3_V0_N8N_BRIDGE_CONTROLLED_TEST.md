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
- Paso pendiente en n8n UI: vincular la credencial real existente.

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

- Preparación técnica: PASS.
- Activación/importación/ejecución en n8n: PENDIENTE.
