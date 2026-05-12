# TASK_SPEC_F3_V0_N8N_PRODUCTION_BRIDGE_CONTROLLED

## Objetivo

Preparar un puente controlado entre `n8n_workflows/DIAGNOSTICO.json` y backend NC Control Tower (`POST /api/intake/diagnostico`) sin activar producción, sin modificar workflow real y sin tocar credenciales.

## Diagnóstico del workflow real

Fuente principal revisada:
- `n8n_workflows/DIAGNOSTICO.json`
- Referencia obligatoria lab: `n8n_workflows/lab/NC_DIAGNOSTICO_SUPABASE_PARALLEL_TEST.json`

Flujo actual (`DIAGNOSTICO.json`):
1. `Webhook` (`POST`, path `ba45c6a8-a03c-4149-a0da-ec64be1751c6`).
2. `Code in JavaScript` normaliza payload y construye campos NC.
3. `Append row in sheet1` (Google Sheets).
4. `IF ROJO_PREIA` bifurca entre preclasificación roja o LLM.
5. `Basic LLM Chain` + `Traductor IA a Sheets`.
6. `Update row in sheet` (Google Sheets, campos IA).
7. `AVISO INTERNO - CONFIGURAR` (placeholder interno, sin envío al lead).

Observación clave:
- El workflow real no tiene `HTTP Request` a backend/Supabase.

## Referencia técnica lab vs real

Workflow lab comparado:
- `n8n_workflows/lab/NC_DIAGNOSTICO_SUPABASE_PARALLEL_TEST.json`

Diferencia principal:
- El lab añade nodo `HTTP Supabase Intake` (`n8n-nodes-base.httpRequest`) en paralelo desde `Code in JavaScript`.

Endpoint usado en lab:
- `http://16.171.174.52:3001/api/intake/diagnostico`

Endpoint objetivo controlado (actualizado para V0 seguro):
- `http://16.171.174.52:8080/api/intake/diagnostico`

Payload enviado por lab:
- `jsonBody: ={{ $json }}` (manda el objeto normalizado completo del nodo `Code in JavaScript`).

Partes reutilizables del lab:
- Nodo HTTP en paralelo al flujo Sheets.
- `continueOnFail: true` para no romper flujo principal durante validación.
- Timeout corto y respuesta completa para auditoría técnica.

Partes a corregir antes de usar como plantilla:
- URL de `:3001` (ya no debe usarse públicamente).
- Añadir marca forzada de validación (`es_test=true`) en la copia controlada.
- Añadir trazabilidad explícita de respuesta HTTP (status/code/body reducido).

## Mapa de campos (workflow -> backend)

El backend en `POST /api/intake/diagnostico` acepta aliases del payload DIAGNOSTICO, por ejemplo:
- `Nombre_y_apellidos` -> `nombre`
- `Email` -> `email`
- `WhatsApp` -> `whatsapp`
- `Idioma` -> `idioma_preferido`
- `Duda_principal` -> `duda_principal`
- `Resumen_caso` -> `explicacion_caso`
- `Urgencia` -> `urgencia`
- `Consentimiento_valido` -> `consentimiento_valido`
- `Semaforo_IA`/`Semaforo_preIA` -> triage semáforo
- `Motivo_clasificacion` -> `motivo_clasificacion`
- `Dato_faltante` -> `dato_critico_faltante`
- `Riesgo_detectado` -> `riesgo_detectado`
- `Accion_recomendada` -> `accion_recomendada`
- `Canal_origen` -> `canal_entrada`
- `Es_test` -> `es_test`

Nota:
- El backend también admite `data.*` y variantes `snake_case`/label para intake diagnóstico.

## Gaps detectados

1. **Endpoint desalineado en lab**: usa `:3001` en vez de `:8080/api`.
2. **`es_test` no forzado**: depende del payload entrante; en validación debe quedar forzado.
3. **Doble escritura**: paralelo Sheets + backend puede duplicar seguimiento operativo si no se etiqueta origen.
4. **Riesgo duplicados**: `lead_code` puede colisionar si reintentos no controlados; backend devuelve 409 en duplicado.
5. **Automatizaciones sensibles**: deben seguir OFF (sin WhatsApp/email automático).

## Estrategia recomendada (bridge controlado)

1. Mantener `DIAGNOSTICO.json` intacto.
2. Crear copia controlada (nuevo workflow lab) basada en la referencia `NC_DIAGNOSTICO_SUPABASE_PARALLEL_TEST.json`.
3. En la copia:
   - Cambiar endpoint a `http://16.171.174.52:8080/api/intake/diagnostico`.
   - Mantener ejecución paralela con Sheets solo como espejo temporal.
   - Forzar `es_test=true` antes del nodo HTTP.
   - Añadir tagging de origen (`canal_entrada=DIAGNOSTICO_WEBHOOK_LAB`).
   - Mantener `continueOnFail=true` y registrar respuesta HTTP.
4. No activar envíos automáticos a cliente (WhatsApp/email).

## Fuera de alcance

- Modificar `n8n_workflows/DIAGNOSTICO.json` real.
- Activar workflow productivo.
- Cambiar credenciales n8n, `.env`, MCP o schema Supabase.
- Cambios de AWS, nginx o backend en esta tarea.

## Criterios de aceptación

CA-01: Existe propuesta de copia controlada sin tocar workflow real.
CA-02: Endpoint propuesto usa `:8080/api/intake/diagnostico` (no `:3001`).
CA-03: Mapeo de campos documentado y compatible con backend intake.
CA-04: Riesgos de duplicado/doble escritura documentados con mitigación.
CA-05: Automatizaciones sensibles explícitamente desactivadas.

## Pruebas propuestas (siguiente ejecución controlada)

1. Ejecutar copia lab con payload test.
2. Verificar HTTP `201` en intake backend.
3. Verificar persistencia en `leads`, `lead_status_history` y (si aplica) `lead_triage`.
4. Confirmar que Sheets sigue recibiendo espejo sin bloquear flujo.
5. Verificar que no se dispara WhatsApp/email automático.

## Rollback

- Si falla, desactivar copia lab y volver a operar solo con `DIAGNOSTICO.json` + Sheets.
- No tocar real productivo ni credenciales.

## Go / No-Go

- **GO condicionado** para crear copia controlada de lab.
- **NO-GO** para tocar o activar `DIAGNOSTICO.json` real en este paso.

## Siguiente paso recomendado

Crear un TASK_SPEC de ejecución técnica para:
1) clonar workflow a variante controlada,
2) ajustar endpoint a `:8080/api/intake/diagnostico`,
3) forzar `es_test=true`,
4) ejecutar pruebas con payloads test y evidencia HTTP/DB.
