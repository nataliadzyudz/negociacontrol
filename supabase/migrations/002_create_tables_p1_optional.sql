-- 002_create_tables_p1_optional.sql
-- NC Control Tower v2 - Fase 2A - Tablas P1 opcionales
-- Objetivo: Detección de duplicados e integración con n8n

-- ============================================
-- TABLA: lead_duplicates (Detección de duplicados)
-- ============================================

CREATE TABLE lead_duplicates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id_a UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    lead_id_b UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    match_type VARCHAR(50) NOT NULL, -- 'email', 'whatsapp', 'nombre_canal', 'similar'
    match_score DECIMAL(3,2), -- 0.00 a 1.00
    reviewed BOOLEAN DEFAULT false,
    reviewed_by VARCHAR(100),
    resolution VARCHAR(50), -- 'MERGED', 'KEPT_A', 'KEPT_B', 'DUPLICATE'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    reviewed_at TIMESTAMPTZ
);

-- Índices
CREATE INDEX idx_lead_duplicates_lead_a ON lead_duplicates(lead_id_a);
CREATE INDEX idx_lead_duplicates_lead_b ON lead_duplicates(lead_id_b);
CREATE INDEX idx_lead_duplicates_reviewed ON lead_duplicates(reviewed);

-- ============================================
-- TABLA: integration_events (Cola de integración n8n)
-- ============================================

CREATE TABLE integration_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    event_name VARCHAR(100) NOT NULL,
    payload JSONB,
    status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, SENT, PROCESSED, FAILED, SKIPPED
    retry_count INTEGER DEFAULT 0,
    max_retries INTEGER DEFAULT 3,
    last_error TEXT,
    sent_at TIMESTAMPTZ,
    processed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_integration_events_lead_id ON integration_events(lead_id);
CREATE INDEX idx_integration_events_status ON integration_events(status);
CREATE INDEX idx_integration_events_created_at ON integration_events(created_at);

-- ============================================
-- VERIFICACIÓN
-- ============================================

SELECT 'P1 tables created' AS status;
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('lead_duplicates', 'integration_events');