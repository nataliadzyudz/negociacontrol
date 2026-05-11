# RUNBOOK_DEPLOY_AWS_V0 — NC Control Tower

## 1) Objetivo del despliegue AWS V0

Documentar un despliegue repetible del estado vivo actual en AWS para `FASE_3_PRODUCCION_CONTROLADA_V0_ACTIVA`, manteniendo operacion manual/controlada y sin abrir produccion general.

## 2) Arquitectura actual

- Frontend estatico: `public/` servido en `http://16.171.174.52:8080`.
- Backend Node/Express: `http://16.171.174.52:3001`.
- Health canonico backend: `GET /api/health`.
- Datos de leads: `GET /api/leads`.
- Base de datos: Supabase (sin cambios de schema en este runbook).

## 3) Prechecks

- Instancia AWS accesible por SSH y con puertos requeridos habilitados.
- Node.js LTS y npm instalados en servidor.
- Codigo del proyecto disponible en servidor (rama/commit aprobado para V0).
- Variables de entorno backend configuradas (sin exponer secretos en consola/logs).
- Restriccion de fase vigente: produccion abierta NO autorizada.

## 4) Variables de entorno necesarias (sin secretos reales)

Definir en archivo de entorno del backend (ejemplo: `.env` en servidor):

```env
PORT=3001
SUPABASE_URL=<supabase_project_url>
SUPABASE_SERVICE_ROLE_KEY=<supabase_service_role_key>
PHASE=FASE_3_PRODUCCION_CONTROLADA_V0_ACTIVA
```

Notas:
- No guardar secretos en repositorio.
- No imprimir valores reales en terminal compartida.

## 5) Pasos de despliegue backend

1. Conectar por SSH a la instancia.
2. Ubicar el directorio del proyecto desplegado.
3. Instalar dependencias backend si aplica: `npm install`.
4. Verificar archivo `.env` con variables requeridas.
5. Levantar backend en puerto `3001` con proceso persistente (ver seccion 9).
6. Verificar health canonico local/remoto: `GET /api/health`.

## 6) Pasos de despliegue frontend

1. Confirmar que `public/` contiene build estatico esperado.
2. Servir frontend en puerto `8080` con proceso persistente (ver seccion 9).
3. Validar acceso remoto: `http://16.171.174.52:8080` retorna `200`.

## 7) Validacion PowerShell/curl

Ejecutar desde cliente autorizado:

```powershell
# Health backend
curl.exe -sS -o NUL -w "%{http_code}" "http://16.171.174.52:3001/api/health"

# Leads backend
curl.exe -sS -o NUL -w "%{http_code}" "http://16.171.174.52:3001/api/leads"

# Frontend
curl.exe -sS -o NUL -w "%{http_code}" "http://16.171.174.52:8080"
```

Esperado en V0:
- `/api/health` -> `200`
- `/api/leads` -> `200`
- `/` frontend en `:8080` -> `200`

## 8) Puertos / security group

- `22/tcp`: SSH (restringido por IP autorizada).
- `3001/tcp`: Backend HTTP V0 controlado (restringir origen cuando sea posible).
- `8080/tcp`: Frontend demo/controlado (restringir origen cuando sea posible).

No abrir puertos adicionales para esta fase.

## 9) PM2 o proceso persistente

Usar PM2 para persistencia basica de procesos.

Entrypoint real backend (repo actual):
- `backend/package.json` -> `start: node src/index.js`
- `backend/ecosystem.config.js` -> `script: src/index.js`

Comandos de referencia:

```bash
# Backend (recomendado: usar ecosystem existente y verificar cwd antes)
pm2 start ecosystem.config.js

# Backend alternativo directo (si no se usa ecosystem)
pm2 start src/index.js --name nc-backend --cwd /var/www/nc-backend

# Frontend estatico (ejemplo con serve)
pm2 start "npx serve public -l 8080" --name nc-frontend

# Estado y persistencia
pm2 status
pm2 save
```

Verificar antes de ejecutar:
- `cwd` real del backend en instancia.
- archivo `ecosystem.config.js` vigente y sin secretos hardcodeados.
- no mezclar gestores si ya existe otro mecanismo de proceso persistente.

## 10) Rollback

1. Detener publicacion activa (frontend/backend) si hay falla critica.
2. Restaurar ultima version estable conocida (codigo + env previo validado).
3. Reiniciar procesos persistentes.
4. Revalidar con checks de seccion 7.
5. Registrar incidente y accion aplicada.

## 11) Que no tocar

- No tocar MCP.
- No tocar n8n.
- No tocar schema/migraciones Supabase.
- No abrir produccion general.
- No usar datos reales sin aprobacion explicita.
- No introducir rutas/endpoints no canonicos.

## 12) Evidencias minimas

Registrar por cada despliegue/validacion:

- Fecha/hora.
- Commit/version desplegada.
- Resultado HTTP de `/api/health`, `/api/leads`, frontend `:8080`.
- Nombre de proceso persistente y estado (`pm2 status`).
- Incidentes/rollback (si aplica).

Estado objetivo V0:
- Sistema demostrable, operable manualmente, con seguridad y trazabilidad.
