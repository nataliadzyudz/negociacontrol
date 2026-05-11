-- 003_create_lead_interactions.sql
-- NC Control Tower v2 - Fase 2C - Tabla lead_interactions
-- Objetivo: Registrar interacciones manuales con leads

-- ============================================
-- ENUMS
-- ============================================

-- Canal de interacción
CREATE TYPE interaction_channel AS ENUM (
    'WHATSAPP_MANUAL',
    'EMAIL_MANUAL',
    'LLAMADA',
    'NOTA_INTERNA',
    'OTRO'
);

-- Tipo de interacción
CREATE TYPE interaction_type AS ENUM (
    'MENSAJE_ENVIADO_MANUAL',
    'RESPUESTA_RECIBIDA',
    'LLAMADA_REALIZADA',
    'SEGUIMIENTO',
    'CIERRE'
);

-- ============================================
-- TABLA: lead_interactions
-- ============================================

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

-- Índices
CREATE INDEX idx_lead_interactions_lead_id ON lead_interactions(lead_id);
CREATE INDEX idx_lead_interactions_canal ON lead_interactions(canal);
CREATE INDEX idx_lead_interactions_fecha ON lead_interactions(fecha DESC);

-- Comentario
COMMENT ON TABLE lead_interactions IS 'Registro de interacciones manuales con leads para auditoría.';
COMMENT ON COLUMN lead_interactions.canal IS 'Canal usado: WHATSAPP_MANUAL, EMAIL_MANUAL, LLAMADA, NOTA_INTERNA, OTRO';
COMMENT ON COLUMN lead_interactions.tipo_interaccion IS 'Tipo: MENSAJE_ENVIADO_MANUAL, RESPUESTA_RECIBIDA, LLAMADA_REALIZADA, SEGUIMIENTO, CIERRE';

-- RLS (mismo que otras tablas)
ALTER TABLE lead_interactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "允许读取lead_interactions" ON lead_interactions
    FOR SELECT USING (true);

CREATE POLICY "允许插入lead_interactions" ON lead_interactions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "允许更新lead_interactions" ON lead_interactions
    FOR UPDATE USING (true);