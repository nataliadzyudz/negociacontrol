# Migration: lead_interactions

## Opción 1: Supabase Dashboard (Recomendado)

1. Ir a: https://supabase.com/dashboard
2. Seleccionar proyecto: njzvqyovopcwfgwvnqli
3. Ir a **SQL Editor**
4. Copiar y ejecutar el contenido de:
   `supabase/migrations/003_create_lead_interactions.sql`

## Opción 2: Supabase CLI

```bash
supabase migrations up
```

## Opción 3: Si tienes Docker local

```bash
docker exec -it supabase-db psql -U postgres -d postgres -f /path/to/003_create_lead_interactions.sql
```

---

## SQL a ejecutar:

```sql
-- Canales de interacción
CREATE TYPE interaction_channel AS ENUM (
    'WHATSAPP_MANUAL',
    'EMAIL_MANUAL', 
    'LLAMADA',
    'NOTA_INTERNA',
    'OTRO'
);

-- Tipos de interacción
CREATE TYPE interaction_type AS ENUM (
    'MENSAJE_ENVIADO_MANUAL',
    'RESPUESTA_RECIBIDA',
    'LLAMADA_REALIZADA',
    'SEGUIMIENTO',
    'CIERRE'
);

-- Tabla
CREATE TABLE lead_interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    canal interaction_channel NOT NULL,
    tipo_interaccion interaction_type NOT NULL,
    resumen TEXT NOT NULL,
    responsable VARCHAR(100) DEFAULT 'api',
    fecha TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE lead_interactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "allow_select" ON lead_interactions FOR SELECT USING (true);
CREATE POLICY "allow_insert" ON lead_interactions FOR INSERT WITH CHECK (true);
CREATE POLICY "allow_update" ON lead_interactions FOR UPDATE USING (true);
```

---

## Después de aplicar:

1. Test endpoint: POST /api/leads/:id/interactions
2. Verificar: SELECT * FROM lead_interactions
3. Update gate → APROBADO COMPLETO