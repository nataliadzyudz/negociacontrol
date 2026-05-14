import { Router } from 'express';
import supabase from '../lib/supabase.js';
import { validateLeadInput, detectEsTest } from '../validators/lead.js';

const router = Router();

function generateLeadCode() {
  const stamp = Date.now().toString().slice(-8);
  return `NC-L-${stamp}`;
}

function pickFirst(...values) {
  for (const value of values) {
    if (value !== undefined && value !== null && value !== '') return value;
  }
  return null;
}

function toBool(value) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value === 1;
  if (typeof value === 'string') {
    const v = value.trim().toUpperCase();
    return ['SI', 'SÍ', 'YES', 'TRUE', '1'].includes(v);
  }
  return false;
}

function normalizeSemaforo(value) {
  if (!value) return null;
  const v = String(value).trim().toUpperCase();
  return ['VERDE', 'AMARILLO', 'ROJO'].includes(v) ? v : null;
}

function normalizeEstadoOperativoDiagnostico(input) {
  const hasErrorIA = toBool(input.error_ia) || toBool(input.Error_IA) || toBool(input.ia_json_valido === false) || String(input.ia_json_valido || input.IA_JSON_valido || '').trim().toUpperCase() === 'NO';
  if (hasErrorIA) return 'ERROR_IA';

  const riesgoDuro = toBool(input.riesgo_duro_detectado) || toBool(input.Riesgo_duro_detectado);
  if (riesgoDuro) return 'PENDIENTE_REVISION';

  const requiereRevision = toBool(input.requiere_revision_manual) || toBool(input.Requiere_revision_manual) || toBool(input.requiere_revision) || toBool(input.Requiere_revision);
  if (requiereRevision) return 'PENDIENTE_REVISION';

  const semaforoFinal = normalizeSemaforo(pickFirst(input.semaforo_final, input.Semaforo_final, input.semaforo_ia, input.Semaforo_IA, input.semaforo_preia, input.Semaforo_preIA));

  if (semaforoFinal === 'ROJO') return 'PENDIENTE_REVISION';
  if (semaforoFinal === 'AMARILLO') return 'FALTA_DATO';
  if (semaforoFinal === 'VERDE') return 'APTO_DIAGNOSTICO';

  return 'NUEVO';
}

function buildDiagnosticoLeadData(data) {
  return {
    lead_code: pickFirst(data.Lead_ID, data.lead_code, `DIAG-${Date.now()}`),
    fecha_entrada: pickFirst(data.Fecha, data.fecha_entrada),
    nombre: pickFirst(data.Nombre_y_apellidos, data.nombre, ''),
    email: pickFirst(data.Email, data.email),
    whatsapp: pickFirst(data.WhatsApp, data.whatsapp),
    idioma_preferido: pickFirst(data.Idioma, data.idioma_preferido),
    esta_en_espana: pickFirst(data.En_Espana, data.esta_en_espana),
    situacion_actual: pickFirst(data.Situacion_actual, data.situacion_actual),
    origen_ingresos: pickFirst(data.Origen_ingresos, data.origen_ingresos),
    duda_principal: pickFirst(data.Duda_principal, data.duda_principal),
    explicacion_caso: pickFirst(data.Resumen_caso, data.resumen_caso, data.Explicacion_caso, data.explicacion_caso),
    urgencia: pickFirst(data.Urgencia, data.urgencia),
    consentimiento_original: pickFirst(data.Consentimiento, data.consentimiento_original),
    consentimiento_valido: toBool(pickFirst(data.Consentimiento_valido, data.consentimiento_valido)),
    email_valido: toBool(pickFirst(data.Email_valido, data.email_valido)),
    whatsapp_valido: toBool(pickFirst(data.WhatsApp_valido, data.whatsapp_valido)),
    es_test: toBool(pickFirst(data.Es_test, data.es_test)) || detectEsTest(pickFirst(data.Nombre_y_apellidos, data.nombre, ''), pickFirst(data.Email, data.email, '')),
    canal_entrada: pickFirst(data.Canal_origen, data.canal_entrada, 'DIAGNOSTICO_WEBHOOK'),
    raw_payload: data
  };
}

function buildDiagnosticoTriageData(leadId, data) {
  const semaforoPreIA = normalizeSemaforo(pickFirst(data.Semaforo_preIA, data.semaforo_preia));
  const semaforoIA = normalizeSemaforo(pickFirst(data.Semaforo_IA, data.semaforo_ia));
  const semaforoFinal = normalizeSemaforo(pickFirst(data.Semaforo_final, data.semaforo_final, semaforoIA, semaforoPreIA));

  return {
    lead_id: leadId,
    semaforo_preia: semaforoPreIA,
    semaforo_ia: semaforoIA,
    semaforo_final: semaforoFinal,
    tipo_lead_ia: pickFirst(data.Tipo_lead_IA, data.tipo_lead_ia),
    resumen_caso: pickFirst(data.Resumen_IA, data.resumen_ia, data.Resumen_caso, data.resumen_caso),
    motivo_clasificacion: pickFirst(data.Motivo_clasificacion, data.motivo_clasificacion),
    dato_critico_faltante: pickFirst(data.Dato_faltante, data.dato_critico_faltante),
    riesgo_detectado: pickFirst(data.Riesgo_detectado, data.riesgo_detectado),
    tipo_riesgo: pickFirst(data.Tipo_riesgo, data.tipo_riesgo),
    riesgo_duro_detectado: toBool(pickFirst(data.Riesgo_duro_detectado, data.riesgo_duro_detectado)),
    riesgo_duro_motivo: pickFirst(data.Riesgo_duro_motivo, data.riesgo_duro_motivo),
    accion_recomendada: pickFirst(data.Accion_recomendada, data.accion_recomendada),
    siguiente_accion: pickFirst(data.Siguiente_accion, data.siguiente_accion),
    respuesta_sugerida: pickFirst(data.Respuesta_sugerida, data.respuesta_sugerida),
    requiere_revision_manual: toBool(pickFirst(data.Requiere_revision, data.requiere_revision, data.Requiere_revision_manual, data.requiere_revision_manual))
  };
}

function shouldPersistDiagnosticoTriage(data) {
  const trackedFields = [
    data.Semaforo_preIA, data.semaforo_preia,
    data.Semaforo_IA, data.semaforo_ia,
    data.Semaforo_final, data.semaforo_final,
    data.Tipo_lead_IA, data.tipo_lead_ia,
    data.Motivo_clasificacion, data.motivo_clasificacion,
    data.Riesgo_detectado, data.riesgo_detectado,
    data.Accion_recomendada, data.accion_recomendada,
    data.Siguiente_accion, data.siguiente_accion,
    data.Respuesta_sugerida, data.respuesta_sugerida,
    data.Requiere_revision, data.requiere_revision,
    data.Requiere_revision_manual, data.requiere_revision_manual,
    data.Riesgo_duro_detectado, data.riesgo_duro_detectado,
    data.Error_IA, data.error_ia,
    data.IA_JSON_valido, data.ia_json_valido
  ];
  return trackedFields.some((value) => value !== undefined && value !== null && value !== '');
}

router.get('/leads', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select(`
        *,
        lead_triage (*),
        lead_status_history (estado_nuevo, created_at)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      data: data || [],
      count: data?.length || 0
    });
  } catch (err) {
    console.error('Error fetching leads:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/leads/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data: lead, error } = await supabase
      .from('leads')
      .select(`
        *,
        lead_triage (*),
        lead_status_history (*),
        lead_notes (*),
        lead_interactions (*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!lead) {
      return res.status(404).json({ success: false, error: 'Lead no encontrado' });
    }

    res.json({ success: true, data: lead });
  } catch (err) {
    console.error('Error fetching lead:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/leads', async (req, res) => {
  try {
    const payload = req.body || {};

    if (!payload.nombre || payload.nombre.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'El nombre es obligatorio'
      });
    }

    const validation = validateLeadInput({
      ...payload,
      lead_code: payload.lead_code || 'AUTO'
    });

    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        error: 'Validación fallida',
        details: validation.errors
      });
    }

    const leadData = {
      lead_code: payload.lead_code || generateLeadCode(),
      nombre: payload.nombre,
      email: payload.email || null,
      whatsapp: payload.whatsapp || null,
      idioma_preferido: payload.idioma_preferido || null,
      duda_principal: payload.duda_principal || null,
      explicacion_caso: payload.explicacion_caso || null,
      urgencia: payload.urgencia || null,
      consentimiento_valido: payload.consentimiento_valido === true,
      email_valido: payload.email_valido === true,
      whatsapp_valido: payload.whatsapp_valido === true,
      es_test: payload.es_test !== false,
      canal_entrada: payload.canal_entrada || 'dashboard_v0',
      raw_payload: payload
    };

    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .insert([leadData])
      .select()
      .single();

    if (leadError) throw leadError;

    const { error: statusError } = await supabase
      .from('lead_status_history')
      .insert([{
        lead_id: lead.id,
        estado_anterior: null,
        estado_nuevo: 'NUEVO',
        motivo: 'Lead creado desde dashboard V0',
        changed_by: 'dashboard_v0'
      }]);

    if (statusError) throw statusError;

    res.status(201).json({ success: true, data: lead });
  } catch (err) {
    console.error('Error creating dashboard lead:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/intake/test', async (req, res) => {
  try {
    const leadData = req.body;

    const validation = validateLeadInput(leadData);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        error: 'Validación fallida',
        details: validation.errors
      });
    }

    leadData.es_test = detectEsTest(leadData.nombre, leadData.email);

    const { data, error } = await supabase
      .from('leads')
      .insert([leadData])
      .select()
      .single();

    if (error) throw error;

    await supabase.from('lead_status_history').insert([{
      lead_id: data.id,
      estado_anterior: null,
      estado_nuevo: 'NUEVO',
      motivo: 'Lead creado desde intake de laboratorio',
      changed_by: 'system'
    }]);

    res.status(201).json({ success: true, data });
  } catch (err) {
    console.error('Error creating lead:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/intake/diagnostico', async (req, res) => {
  try {
    const payload = req.body || {};
    const input = payload.body ?? payload;
    const data = input.data ?? input;

    const leadData = buildDiagnosticoLeadData(data);

    if (!leadData.fecha_entrada) {
      delete leadData.fecha_entrada;
    }

    if (!leadData.nombre) {
      return res.status(400).json({
        success: false,
        error: 'El nombre es obligatorio'
      });
    }

    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .insert([leadData])
      .select()
      .single();

    if (leadError) {
      if (leadError.code === '23505') {
        return res.status(409).json({
          success: false,
          error: 'Lead duplicado',
          lead_code: leadData.lead_code
        });
      }
      throw leadError;
    }

    const triageData = shouldPersistDiagnosticoTriage(data)
      ? buildDiagnosticoTriageData(lead.id, data)
      : null;

    const estadoSource = {
      ...data,
      semaforo_final: pickFirst(data.semaforo_final, data.Semaforo_final, triageData?.semaforo_final),
      Semaforo_final: pickFirst(data.Semaforo_final, data.semaforo_final, triageData?.semaforo_final),
      semaforo_ia: pickFirst(data.semaforo_ia, data.Semaforo_IA, triageData?.semaforo_ia),
      Semaforo_IA: pickFirst(data.Semaforo_IA, data.semaforo_ia, triageData?.semaforo_ia),
      semaforo_preia: pickFirst(data.semaforo_preia, data.Semaforo_preIA, triageData?.semaforo_preia),
      Semaforo_preIA: pickFirst(data.Semaforo_preIA, data.semaforo_preia, triageData?.semaforo_preia),
      requiere_revision_manual: pickFirst(
        data.requiere_revision_manual,
        data.Requiere_revision_manual,
        data.requiere_revision,
        data.Requiere_revision,
        triageData?.requiere_revision_manual
      ),
      Requiere_revision_manual: pickFirst(
        data.Requiere_revision_manual,
        data.requiere_revision_manual,
        data.Requiere_revision,
        data.requiere_revision,
        triageData?.requiere_revision_manual
      ),
      riesgo_duro_detectado: pickFirst(data.riesgo_duro_detectado, data.Riesgo_duro_detectado, triageData?.riesgo_duro_detectado),
      Riesgo_duro_detectado: pickFirst(data.Riesgo_duro_detectado, data.riesgo_duro_detectado, triageData?.riesgo_duro_detectado),
      error_ia: pickFirst(data.error_ia, data.Error_IA),
      Error_IA: pickFirst(data.Error_IA, data.error_ia),
      ia_json_valido: pickFirst(data.ia_json_valido, data.IA_JSON_valido),
      IA_JSON_valido: pickFirst(data.IA_JSON_valido, data.ia_json_valido)
    };

    const estadoInicial = normalizeEstadoOperativoDiagnostico(estadoSource);
    const { error: statusInsertError } = await supabase.from('lead_status_history').insert([{
      lead_id: lead.id,
      estado_anterior: null,
      estado_nuevo: estadoInicial,
      motivo: 'Lead creado desde DIAGNOSTICO webhook',
      changed_by: 'n8n_diagnostico'
    }]);
    if (statusInsertError) throw statusInsertError;

    if (triageData) {
      const { error: triageInsertError } = await supabase.from('lead_triage').insert([triageData]);
      if (triageInsertError) throw triageInsertError;
    }

    res.status(201).json({
      success: true,
      data: lead,
      message: 'Lead creado correctamente'
    });
  } catch (err) {
    console.error('Error en intake diagnostico:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/leads/:id/triage', async (req, res) => {
  try {
    const { id } = req.params;
    const triageData = req.body;

    if (!triageData.semaforo_ia) {
      return res.status(400).json({
        success: false,
        error: 'semaforo_ia es obligatorio'
      });
    }

    const { data, error } = await supabase
      .from('lead_triage')
      .insert([{
        lead_id: id,
        semaforo_ia: triageData.semaforo_ia,
        semaforo_final: triageData.semaforo_ia,
        tipo_lead_ia: triageData.tipo_lead_ia || null,
        resumen_caso: triageData.resumen_caso || null,
        motivo_clasificacion: triageData.motivo_clasificacion || null,
        dato_critico_faltante: triageData.dato_critico_faltante || null,
        riesgo_detectado: triageData.riesgo_detectado || null,
        tipo_riesgo: triageData.tipo_riesgo || null,
        accion_recomendada: triageData.accion_recomendada || null,
        siguiente_accion: triageData.siguiente_accion || null,
        respuesta_sugerida: triageData.respuesta_sugerida || null,
        requiere_revision_manual: triageData.requiere_revision_manual || false
      }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, data });
  } catch (err) {
    console.error('Error creating triage:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

router.patch('/leads/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { estado_nuevo, motivo } = req.body;

    if (!estado_nuevo) {
      return res.status(400).json({
        success: false,
        error: 'estado_nuevo es obligatorio'
      });
    }

    const { data: currentLead } = await supabase
      .from('lead_status_history')
      .select('estado_nuevo')
      .eq('lead_id', id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    const estadoAnterior = currentLead?.estado_nuevo || 'NUEVO';

    const { data, error } = await supabase
      .from('lead_status_history')
      .insert([{
        lead_id: id,
        estado_anterior: estadoAnterior,
        estado_nuevo: estado_nuevo,
        motivo: motivo || 'Cambio de estado desde API',
        changed_by: 'api'
      }])
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, data });
  } catch (err) {
    console.error('Error updating status:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/leads/:id/notes', async (req, res) => {
  try {
    const { id } = req.params;
    const { note, created_by } = req.body;

    if (!note || note.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Note es obligatorio'
      });
    }

    const { data, error } = await supabase
      .from('lead_notes')
      .insert([{
        lead_id: id,
        note: note,
        created_by: created_by || 'system'
      }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, data });
  } catch (err) {
    console.error('Error creating note:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/leads/:id/events', async (req, res) => {
  try {
    const { id } = req.params;
    const { event_type, event_detail, source } = req.body;

    if (!event_type) {
      return res.status(400).json({
        success: false,
        error: 'event_type es obligatorio'
      });
    }

    const { data, error } = await supabase
      .from('lead_events')
      .insert([{
        lead_id: id,
        event_type: event_type,
        event_detail: event_detail || null,
        source: source || 'api'
      }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, data });
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

router.patch('/leads/:id/semaforo', async (req, res) => {
  try {
    const { id } = req.params;
    const { semaforo_nuevo, motivo } = req.body;

    if (!semaforo_nuevo) {
      return res.status(400).json({
        success: false,
        error: 'semaforo_nuevo es obligatorio'
      });
    }

    const validSemaforos = ['VERDE', 'AMARILLO', 'ROJO'];
    if (!validSemaforos.includes(semaforo_nuevo)) {
      return res.status(400).json({
        success: false,
        error: 'semaforo_nuevo debe ser VERDE, AMARILLO o ROJO'
      });
    }

    const { data: currentTriage } = await supabase
      .from('lead_triage')
      .select('semaforo_final')
      .eq('lead_id', id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    const semaforoAnterior = currentTriage?.semaforo_final || null;

    const { data: triageData, error: triageError } = await supabase
      .from('lead_triage')
      .update({
        semaforo_final: semaforo_nuevo,
        semaforo_ia: semaforo_nuevo,
        updated_at: new Date().toISOString()
      })
      .eq('lead_id', id)
      .select()
      .single();

    if (triageError && triageError.code !== 'PGRST116') {
      throw triageError;
    }

    if (!currentTriage) {
      return res.status(404).json({
        success: false,
        error: 'No existe triage para este lead. Cree primero el triage.'
      });
    }

    await supabase.from('lead_events').insert([{
      lead_id: id,
      event_type: 'SEMAFORO_CHANGED',
      event_detail: {
        semaforo_anterior: semaforoAnterior,
        semaforo_nuevo: semaforo_nuevo,
        motivo: motivo || 'Cambio de semáforo manual'
      },
      source: 'api'
    }]);

    res.json({ success: true, data: triageData });
  } catch (err) {
    console.error('Error updating semaforo:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/leads/:id/interactions', async (req, res) => {
  try {
    const { id } = req.params;
    const { canal, tipo_interaccion, resumen, responsable } = req.body;

    if (!canal || !tipo_interaccion || !resumen) {
      return res.status(400).json({
        success: false,
        error: 'canal, tipo_interaccion y resumen son obligatorios'
      });
    }

    const validCanales = ['WHATSAPP_MANUAL', 'EMAIL_MANUAL', 'LLAMADA', 'NOTA_INTERNA', 'OTRO'];
    const validTipos = ['MENSAJE_ENVIADO_MANUAL', 'RESPUESTA_RECIBIDA', 'LLAMADA_REALIZADA', 'SEGUIMIENTO', 'CIERRE'];

    if (!validCanales.includes(canal) || !validTipos.includes(tipo_interaccion)) {
      return res.status(400).json({
        success: false,
        error: 'Canal o tipo no válido'
      });
    }

    const { error } = await supabase
      .from('lead_interactions')
      .insert([{
        lead_id: id,
        canal: canal,
        tipo_interaccion: tipo_interaccion,
        resumen: resumen,
        responsable: responsable || 'api',
        fecha: new Date().toISOString()
      }]);

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: 'Interaction created',
      lead_id: id,
      inserted: true
    });
  } catch (err) {
    console.error('Error creating interaction:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/leads/:id/interactions', async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('lead_interactions')
      .select('*')
      .eq('lead_id', id)
      .order('fecha', { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      data: data || [],
      count: data?.length || 0
    });
  } catch (err) {
    console.error('Error fetching interactions:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;

export {
  buildDiagnosticoLeadData,
  buildDiagnosticoTriageData,
  normalizeEstadoOperativoDiagnostico
};
