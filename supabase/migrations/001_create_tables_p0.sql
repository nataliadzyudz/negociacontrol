-- 001_create_tables_p0.sql
-- NC Control Tower v2 - Fase 2A - Tablas P0 para laboratorio
-- Objetivo: Crear esquema Supabase sin datos reales

-- ============================================
-- ENUMS
-- ============================================

-- Semáforo: calidad/riesgo del lead
CREATE TYPE semaforo AS ENUM ('VERDE', 'AMARILLO', 'ROJO');

-- Estado operativo: posición en el proceso
CREATE TYPE estado_operativo AS ENUM (
    'NUEVO',
    'PENDIENTE_REVISION',
    'FALTA_DATO',
    'APTO_DIAGNOSTICO',
    'DIAGNOSTICO_PROPUESTO',
    'DIAGNOSTICO_RESERVADO',
    'CLIENTE_ACTIVO',
    'NO_ENCAJA',
    'NO_CONTESTA',
    'ERROR_IA',
    'ARCHIVADO'
);

-- Tipo de evento para auditoría
CREATE TYPE event_type AS ENUM (
    'LEAD_CREATED',
    'TRIAGE_CREATED',
    'STATUS_CHANGED',
    'SEMAFORO_CHANGED',
    'MANUAL_REVIEW_REQUIRED',
    'ERROR_REGISTERED',
    'NOTE_CREATED',
    'DUPLICATE_DETECTED'
);

-- Tipo de error
CREATE TYPE error_type AS ENUM (
    'ERROR_PAYLOAD',
    'ERROR_VALIDACION',
    'ERROR_CONSENTIMIENTO',
    'ERROR_IA',
    'ERROR_SUPABASE',
    'ERROR_BACKEND',
    'ERROR_N8N',
    'ERROR_DUPLICADO'
);

-- ============================================
-- TABLA: leads (Tabla madre)
-- ============================================

CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_code VARCHAR(20) UNIQUE NOT NULL,
    fecha_entrada TIMESTAMPTZ DEFAULT NOW(),
    
    -- Contacto
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    whatsapp VARCHAR(50),
    idioma_preferido VARCHAR(50),
    
    -- Datos del formulario
    esta_en_espana VARCHAR(50),
    situacion_actual VARCHAR(255),
    origen_ingresos VARCHAR(100),
    duda_principal VARCHAR(255),
    explicacion_caso TEXT,
    urgencia VARCHAR(50),
    
    -- Validaciones
    consentimiento_original TEXT,
    consentimiento_valido BOOLEAN DEFAULT false,
    email_valido BOOLEAN DEFAULT false,
    whatsapp_valido BOOLEAN DEFAULT false,
    es_test BOOLEAN DEFAULT false,
    
    -- Origen
    canal_entrada VARCHAR(100),
    campaña_origen VARCHAR(255),
    
    -- Raw payload (para debug/auditoría)
    raw_payload JSONB,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índice para búsquedas frecuentes
CREATE INDEX idx_leads_lead_code ON leads(lead_code);
CREATE INDEX idx_leads_estado ON leads(id); -- FK reference
CREATE INDEX idx_leads_email ON leads(email) WHERE email IS NOT NULL;
CREATE INDEX idx_leads_whatsapp ON leads(whatsapp) WHERE whatsapp IS NOT NULL;
CREATE INDEX idx_leads_es_test ON leads(es_test);
CREATE INDEX idx_leads_canal_entrada ON leads(canal_entrada);

-- ============================================
-- TABLA: lead_triage (Clasificación IA)
-- ============================================

CREATE TABLE lead_triage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    
    -- Semáforos (separados del estado operativo)
    semaforo_preia semaforo,
    semaforo_ia semaforo,
    semaforo_final semaforo,
    
    -- Clasificación IA
    tipo_lead_ia VARCHAR(255),
    resumen_caso TEXT,
    motivo_clasificacion TEXT,
    dato_critico_faltante TEXT,
    
    -- Riesgos
    riesgo_detectado TEXT,
    tipo_riesgo VARCHAR(100),
    riesgo_duro_detectado BOOLEAN DEFAULT false,
    riesgo_duro_motivo TEXT,
    
    -- Recomendaciones
    accion_recomendada TEXT,
    siguiente_accion TEXT,
    respuesta_sugerida TEXT,
    requiere_revision_manual BOOLEAN DEFAULT false,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_lead_triage_lead_id ON lead_triage(lead_id);
CREATE INDEX idx_lead_triage_semaforo_ia ON lead_triage(semaforo_ia);
CREATE INDEX idx_lead_triage_semaforo_final ON lead_triage(semaforo_final);
CREATE INDEX idx_lead_triage_requiere_revision ON lead_triage(requiere_revision_manual);

-- ============================================
-- TABLA: lead_status_history (Historial de estados)
-- ============================================

CREATE TABLE lead_status_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    estado_anterior estado_operativo,
    estado_nuevo estado_operativo NOT NULL,
    motivo TEXT,
    changed_by VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_lead_status_history_lead_id ON lead_status_history(lead_id);
CREATE INDEX idx_lead_status_history_created_at ON lead_status_history(created_at);

-- ============================================
-- TABLA: lead_events (Auditoría de eventos)
-- ============================================

CREATE TABLE lead_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    event_type event_type NOT NULL,
    event_detail JSONB,
    source VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_lead_events_lead_id ON lead_events(lead_id);
CREATE INDEX idx_lead_events_type ON lead_events(event_type);
CREATE INDEX idx_lead_events_created_at ON lead_events(created_at);

-- ============================================
-- TABLA: error_logs (Registro de errores)
-- ============================================

CREATE TABLE error_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    error_type error_type NOT NULL,
    error_message TEXT NOT NULL,
    error_detail JSONB,
    raw_payload JSONB,
    resolved BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ
);

-- Índices
CREATE INDEX idx_error_logs_lead_id ON error_logs(lead_id);
CREATE INDEX idx_error_logs_type ON error_logs(error_type);
CREATE INDEX idx_error_logs_resolved ON error_logs(resolved);
CREATE INDEX idx_error_logs_created_at ON error_logs(created_at);

-- ============================================
-- TABLA: lead_notes (Notas internas)
-- ============================================

CREATE TABLE lead_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    note TEXT NOT NULL,
    created_by VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_lead_notes_lead_id ON lead_notes(lead_id);
CREATE INDEX idx_lead_notes_created_at ON lead_notes(created_at);

-- ============================================
-- Trigger para updated_at automático
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar a todas las tablas con updated_at
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lead_triage_updated_at BEFORE UPDATE ON lead_triage
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- COMENTARIOS PARA DOCUMENTACIÓN
-- ============================================

COMMENT ON TABLE leads IS 'Tabla madre de leads. Contiene datos de contacto, formulario y validaciones.';
COMMENT ON TABLE lead_triage IS 'Clasificación IA: semáforo, riesgos, recomendaciones. Separado del estado operativo.';
COMMENT ON TABLE lead_status_history IS 'Historial de cambios de estado operativo. Auditoría de transiciones.';
COMMENT ON TABLE lead_events IS 'Eventos técnicos y operativos para auditoría del sistema.';
COMMENT ON TABLE error_logs IS 'Registro de errores sin perder información del lead.';
COMMENT ON TABLE lead_notes IS 'Notas internas de Natalia/equipo.';

COMMENT ON COLUMN leads.semaforo IS 'NO USAR - El semáforo está en lead_triage';
COMMENT ON COLUMN leads.estado IS 'NO USAR - El estado operativo está en lead_status_history';

-- ============================================
-- VERIFICACIÓN
-- ============================================

SELECT 'Tables created successfully' AS status;
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('leads', 'lead_triage', 'lead_status_history', 'lead_events', 'error_logs', 'lead_notes');