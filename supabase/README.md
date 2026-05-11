# Supabase - NC Control Tower v2

## Fase 2A - Laboratorio

Este directorio contiene las migraciones y seeds para el entorno de laboratorio de Supabase.

## Estructura

```
supabase/
├── migrations/
│   ├── 001_create_tables_p0.sql    -- Tablas P0 (obligatorias)
│   └── 002_create_tables_p1_optional.sql  -- Tablas P1 (opcionales)
└── seed/
    └── 001_test_leads.sql          -- Datos de prueba
```

## Tablas Creadas

### P0 (Obligatorias)

| Tabla | Descripción |
|---|---|
| `leads` | Tabla madre de leads |
| `lead_triage` | Clasificación IA (semáforo, riesgos) |
| `lead_status_history` | Historial de estados operativos |
| `lead_events` | Auditoría de eventos técnicos |
| `error_logs` | Registro de errores |
| `lead_notes` | Notas internas |

### P1 (Opcionales)

| Tabla | Descripción |
|---|---|
| `lead_duplicates` | Detección de duplicados |
| `integration_events` | Cola de integración con n8n |

## Cómo Aplicar Migraciones

### Opción 1: Supabase CLI

```bash
# Verificar conexión
supabase status

# Aplicar migraciones
supabase db push

# O aplicar un archivo específico
psql -h <host> -U <user> -d <database> -f migrations/001_create_tables_p0.sql
```

### Opción 2: Dashboard de Supabase

1. Ir al Dashboard de Supabase
2. Seleccionar el proyecto de laboratorio
3. Ir a SQL Editor
4. Copiar y ejecutar el contenido de `migrations/001_create_tables_p0.sql`
5. Ejecutar `migrations/002_create_tables_p1_optional.sql` (opcional)
6. Ejecutar `seed/001_test_leads.sql` para datos de prueba

### Opción 3: Script local

```bash
# Crear proyecto local de Supabase
supabase init
supabase start

# Aplicar migraciones
supabase db reset
```

## Variables de Entorno Requeridas

Para el backend de laboratorio:

```
SUPABASE_URL=<tu-supabase-url>
SUPABASE_ANON_KEY=<tu-anon-key>
# NO usar SERVICE_ROLE_KEY en frontend
```

## Verificación

Después de aplicar las migraciones, ejecutar:

```sql
-- Ver tablas creadas
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- Ver enums creados
SELECT typname FROM pg_type WHERE typtype = 'e';

-- Ver datos de prueba
SELECT l.lead_code, lt.semaforo_ia, l.nombre 
FROM leads l 
JOIN lead_triage lt ON l.id = lt.lead_id;
```

## Notas Importantes

- **No usar service_role_key en código de frontend**
- **Semáforo y estado están separados**: semáforo en `lead_triage`, estado en `lead_status_history`
- **Los leads de prueba tienen `es_test = true`**
- **Google Sheets sigue siendo la fuente operativa real**

## Rollback

Para hacer rollback en laboratorio:

```sql
-- Eliminar todas las tablas (cuidado: esto borra datos)
DROP TABLE IF EXISTS lead_notes CASCADE;
DROP TABLE IF EXISTS error_logs CASCADE;
DROP TABLE IF EXISTS lead_events CASCADE;
DROP TABLE IF EXISTS lead_status_history CASCADE;
DROP TABLE IF EXISTS lead_triage CASCADE;
DROP TABLE IF EXISTS leads CASCADE;
DROP TABLE IF EXISTS integration_events CASCADE;
DROP TABLE IF EXISTS lead_duplicates CASCADE;

-- Eliminar enums
DROP TYPE IF EXISTS event_type;
DROP TYPE IF EXISTS error_type;
DROP TYPE IF EXISTS estado_operativo;
DROP TYPE IF EXISTS semaforo;
```

## Siguiente Paso

Después de aplicar migraciones, ejecutar **TASK_2A_02_BACKEND_MINIMO** para crear la API que conecte con este esquema.