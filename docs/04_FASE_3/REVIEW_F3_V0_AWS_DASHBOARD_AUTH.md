# REVIEW_F3_V0_AWS_DASHBOARD_AUTH

## Estado inicial

- Dashboard publico en `http://16.171.174.52:8080` sin autenticacion.
- API operativa via nginx en `http://16.171.174.52:8080/api/*`.
- Backend directo `:3001` ya bloqueado desde Internet por Security Group.

## Configuracion aplicada

- Se habilito Basic Auth en server block nginx de `:8080`.
- Archivo activo: `/etc/nginx/sites-enabled/nc-control-tower`.
- Directivas aplicadas:
  - `auth_basic "NC_Internal";`
  - `auth_basic_user_file /etc/nginx/.htpasswd_nc;`

## Ubicacion de credenciales (sin secreto)

- Archivo de credenciales: `/etc/nginx/.htpasswd_nc`
- Usuario configurado: `natalia`
- Password: **no expuesto** en logs ni documentacion.

## Backups creados

- `/home/ubuntu/backups_nginx_auth/20260512_003703/nc-control-tower.enabled.before_auth_enable_ascii.bak`
- Backups adicionales de intentos previos tambien preservados en `/home/ubuntu/backups_nginx_auth/`.

## Validacion nginx

- `sudo nginx -t` -> PASS
- Reload aplicado con `sudo nginx -s reload` (servicio no gestionado por `systemctl` en este host).

## Pruebas sin auth

- `GET http://16.171.174.52:8080` -> `401`
- `GET http://16.171.174.52:8080/api/health` -> `401`

## Pruebas con auth

- `GET http://16.171.174.52:8080` -> `200`
- `GET http://16.171.174.52:8080/api/health` -> `200`
- `GET http://16.171.174.52:8080/api/leads` -> `200`
- `POST /api/leads` via `:8080` con auth -> `201`
- `PATCH /api/leads/:id/status` via `:8080` con auth -> `200`
- `POST /api/leads/:id/interactions` via `:8080` con auth -> `201`
- Lead de evidencia API auth: `adf72cea-d6c1-468c-8c10-b02b9476fe42`

## Resultado visual

- Prueba visual por navegador queda `PENDIENTE` en esta corrida CLI (no bloquea hardening tecnico).
- Criterio esperado para cierre visual:
  - navegador solicita usuario/password,
  - tras autenticar carga dashboard,
  - leads visibles,
  - crear lead test / cambiar estado / registrar interaccion operativos.

## Riesgos restantes

- Autenticacion basica protege acceso, pero no reemplaza auth de aplicacion por usuario/rol.
- Credencial unica compartida (operacion interna V0); requiere politica de rotacion.
- HTTPS/dominio y control de sesiones pendientes antes de produccion real.

## Rollback

1. Restaurar backup nginx:
   - `sudo cp /home/ubuntu/backups_nginx_auth/20260512_003703/nc-control-tower.enabled.before_auth_enable_ascii.bak /etc/nginx/sites-enabled/nc-control-tower`
2. Validar config:
   - `sudo nginx -t`
3. Aplicar reload:
   - `sudo nginx -s reload`

## Recomendacion final

- `APROBAR hardening minimo V0` a nivel tecnico (auth en `:8080` + API protegida).
- Ejecutar y registrar prueba visual manual final para cierre operativo completo.
