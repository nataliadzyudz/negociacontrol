# REVIEW_F3_V0_AWS_SECURITY_MINIMUM

## Estado inicial

- Runtime operativo V0 activo en AWS.
- Frontend en `:8080` y backend Node/Express en `:3001`.
- Nginx publica `/` y proxya `/api/` a `127.0.0.1:3001`.

## Riesgo detectado

- `3001/tcp` responde públicamente desde Internet: `GET http://16.171.174.52:3001/api/health -> 200`.
- Esto expone API backend directa fuera del canal preferente `:8080/api`.

## Diagnóstico ejecutado

- `GET http://16.171.174.52:3001/api/health` -> `200`
- `GET http://16.171.174.52:8080/api/health` -> `200`
- `GET http://16.171.174.52:8080/api/leads` -> `200`
- `pm2 status` -> `nc-backend online`
- `ss -tulpn` -> listeners en `0.0.0.0:8080` (nginx) y `0.0.0.0:3001` (node)
- `nginx -T` confirma `location /api/ { proxy_pass http://127.0.0.1:3001/api/; }`

## Decisión aplicada/recomendada

- Opción seleccionada: **C (aplicable ahora)**.
- Motivo: no hay credenciales IAM activas en instancia (`aws sts get-caller-identity` sin auth), por lo que no se puede cambiar Security Group desde servidor.
- Recomendación mínima para pasar a "uso interno controlado con datos limitados":
  1. En AWS Console > EC2 > Security Groups > `sg-0a6e33ad93fe8ad57`.
  2. Editar inbound rule `3001/tcp`.
  3. Preferido: eliminar regla `0.0.0.0/0` de `3001`.
  4. Alternativa temporal: limitar `3001` a IP fija de Natalia (`/32`).
  5. Mantener acceso API operativo por `http://16.171.174.52:8080/api/*`.

## Pruebas de no regresión (canal preferente nginx)

- `GET http://16.171.174.52:8080` -> `200`
- `GET http://16.171.174.52:8080/api/health` -> `200`
- `GET http://16.171.174.52:8080/api/leads` -> `200`
- `POST http://16.171.174.52:8080/api/leads` -> `201`
  - `lead_id`: `c2af7caf-a116-46f2-a154-1a2215f0f351`
- `PATCH /api/leads/:id/status` vía `:8080` -> `200`
- `POST /api/leads/:id/interactions` vía `:8080` -> `201`
- `GET /api/leads/:id/interactions` vía `:8080` -> `200` (`count: 1`)

## Cambios aplicados

- No se aplicaron cambios en nginx ni código.
- No se aplicaron cambios de Security Group desde servidor (falta auth IAM en instancia).

## Rollback

- Si se restringe `3001` en SG y se requiere reversión inmediata:
  1. Reabrir temporalmente `3001/tcp` solo a IP de operación.
  2. Validar `:8080/api/health` y `:8080/api/leads`.
  3. Volver al plan de cierre gradual por IP.

## Riesgo residual

- Mientras `3001` siga abierto público, persiste superficie de exposición.
- Riesgo mitigado parcialmente al usar `:8080/api` como ruta operativa principal.

## Recomendación final

- **CORREGIR (hardening SG) para cerrar riesgo crítico de exposición directa**.
- Tras aplicar restricción SG de `3001`, el estado objetivo queda: **APROBAR uso interno controlado con datos limitados**.

## Validación posterior al cierre de 3001

Resultado: PASS

Evidencia:
- `8080/api/health`: PASS
- `8080/api/leads`: PASS
- `3001/api/health` desde Internet: TIMEOUT / BLOQUEADO

Decisión:
APROBADO USO INTERNO CONTROLADO CON DATOS LIMITADOS.

Riesgos restantes:
- Dashboard `8080` sigue accesible públicamente si no hay auth.
- Producción abierta sigue bloqueada.
- Pendiente proteger dashboard `8080` con Basic Auth o IP allowlist.
- Puerto `3000` (EasyPanel) queda abierto de forma consciente para gestión de n8n y entorno de pruebas.
- `3000` se clasifica como riesgo aceptado temporal, no bloqueante para `AWS Controlled V0`.
- `3000` no debe usarse para producción abierta ni para operar datos sensibles.
- Puerto `22` abierto a `0.0.0.0/0` queda pendiente de revisión/endurecimiento en tarea separada.
- Pendiente HTTPS/dominio antes de producción real.

## Aclaración operativa sobre puerto 3000

- Servicio asociado: EasyPanel (administración de entorno de laboratorio/pruebas).
- Estado de riesgo: aceptado temporalmente para operación interna controlada V0.
- Estado de bloqueo: no bloquea el hito `AWS Controlled V0`.
- Restricción de uso: prohibido para producción abierta y para manejo de datos sensibles.
