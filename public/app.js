/**
 * NC Control Tower | CRM v2 - Dashboard Operativo
 * Consume datos del backend de laboratorio (Fase 2C)
 * Operaciones CRUD - cambio de estado, notas, eventos, semaforo
 */

const API_BASE = '/api';

// --- API CLIENT (Backend de Laboratorio) ---
const ApiClient = {
  // READ
  async getLeads() {
    const res = await fetch(`${API_BASE}/leads`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json.data || [];
  },

  async getLead(id) {
    const res = await fetch(`${API_BASE}/leads/${id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json.data;
  },

  async healthCheck() {
    try {
      const res = await fetch(`${API_BASE}/health`);
      return res.ok;
    } catch {
      return false;
    }
  },

  // WRITE - Estado operativo
  async updateStatus(leadId, estado_nuevo, motivo) {
    const res = await fetch(`${API_BASE}/leads/${leadId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado_nuevo, motivo })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json.data;
  },

  // WRITE - Notas internas
  async addNote(leadId, note, created_by) {
    const res = await fetch(`${API_BASE}/leads/${leadId}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ note, created_by })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json.data;
  },

  // WRITE - Eventos
  async addEvent(leadId, event_type, event_detail, source) {
    const res = await fetch(`${API_BASE}/leads/${leadId}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event_type, event_detail, source })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json.data;
  },

  // WRITE - Semáforo (añadir después de crear endpoint)
  async updateSemaforo(leadId, semaforo_nuevo, motivo) {
    const res = await fetch(`${API_BASE}/leads/${leadId}/semaforo`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ semaforo_nuevo, motivo })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json.data;
  },

  // WRITE - Interactions (añadir después de crear tabla)
  async addInteraction(leadId, canal, tipo_interaccion, resumen, responsable) {
    const res = await fetch(`${API_BASE}/leads/${leadId}/interactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ canal, tipo_interaccion, resumen, responsable })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json.data;
  },

  async getInteractions(leadId) {
    const res = await fetch(`${API_BASE}/leads/${leadId}/interactions`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json.data || [];
  },

  async createLead(payload) {
    const res = await fetch(`${API_BASE}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json.data;
  }
};

let LEADS = [];
let API_AVAILABLE = false;

// --- ADAPTADOR DE DATOS (Backend → Frontend) ---
function adaptLeadFromBackend(lead) {
  const triageRows = Array.isArray(lead.lead_triage) ? lead.lead_triage : (lead.lead_triage ? [lead.lead_triage] : []);
  const triage = triageRows.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))[0] || {};
  const statusRows = Array.isArray(lead.lead_status_history) ? lead.lead_status_history : (lead.lead_status_history ? [lead.lead_status_history] : []);
  const statusHistory = statusRows.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))[0] || {};
  const raw = lead.raw_payload || {};
  const iaJsonValidoRaw = raw.IA_JSON_valido ?? raw.ia_json_valido ?? null;
  
  return {
    Lead_ID: lead.lead_code,
    Lead_ID_original: lead.id,
    Fecha: lead.fecha_entrada,
    Nombre_y_apellidos: lead.nombre,
    Email: lead.email,
    WhatsApp: lead.whatsapp,
    Idioma: lead.idioma_preferido,
    En_Espana: lead.esta_en_espana,
    Situacion_actual: lead.situacion_actual,
    Origen_ingresos: lead.origen_ingresos,
    Duda_principal: lead.duda_principal,
    Resumen_caso: lead.explicacion_caso,
    Urgencia: lead.urgencia,
    Consentimiento: lead.consentimiento_original,
    Consentimiento_valido: lead.consentimiento_valido === true,
    Email_valido: lead.email_valido === true,
    WhatsApp_valido: lead.whatsapp_valido === true,
    Semaforo_preIA: triage.semaforo_preia,
    Semaforo_IA: triage.semaforo_ia || 'AMARILLO',
    Semaforo_final: triage.semaforo_final || triage.semaforo_ia || triage.semaforo_preia || 'AMARILLO',
    Tipo_lead_IA: triage.tipo_lead_ia,
    Resumen_IA: triage.resumen_caso,
    Motivo_clasificacion: triage.motivo_clasificacion,
    Dato_faltante: triage.dato_critico_faltante,
    Riesgo_detectado: triage.riesgo_detectado,
    Tipo_riesgo: triage.tipo_riesgo,
    Riesgo_duro_detectado: triage.riesgo_duro_detectado === true,
    Riesgo_duro_motivo: triage.riesgo_duro_motivo,
    Accion_recomendada: triage.accion_recomendada,
    Siguiente_accion: triage.siguiente_accion,
    Respuesta_sugerida: triage.respuesta_sugerida,
    Requiere_revision_manual: triage.requiere_revision_manual === true,
    Requiere_revision: triage.requiere_revision_manual ? 'SI' : 'NO',
    Error_IA: (raw.Error_IA ?? raw.error_ia ?? 'NO'),
    IA_JSON_valido: iaJsonValidoRaw,
    Estado: statusHistory.estado_nuevo || 'NUEVO',
    Es_test: lead.es_test ? 'SÍ' : 'NO',
    Canal_origen: lead.canal_entrada,
    lead_triage: triageRows,
    lead_status_history: statusRows,
    lead_notes: lead.lead_notes || []
  };
}

// --- CONFIGURACIÓN ---
const COLUMNS = [
  { id: 'NUEVO', label: 'Nuevo lead' },
  { id: 'PENDIENTE_REVISION', label: 'Pendiente revisión' },
  { id: 'FALTA_DATO', label: 'Falta dato' },
  { id: 'APTO_DIAGNOSTICO', label: 'Apto diagnóstico' },
  { id: 'DIAGNOSTICO_PROPUESTO', label: 'Diagnóstico propuesto' },
  { id: 'DIAGNOSTICO_RESERVADO', label: 'Diagnóstico reservado' },
  { id: 'CLIENTE_ACTIVO', label: 'Cliente activo' },
  { id: 'NO_ENCAJA', label: 'No encaja' },
  { id: 'NO_CONTESTA', label: 'No contesta' },
  { id: 'ERROR_IA', label: 'Error IA' },
  { id: 'ARCHIVADO', label: 'Archivado' }
];

// --- ESTADO DE LA APP ---
let filters = {
  search: '',
  estado: 'all',
  semaforo: 'all',
  urgencia: 'all',
  idioma: 'all',
  caso: 'all'
};
let currentLead = null;
let isLoading = true;

// --- INICIALIZACIÓN (carga desde backend) ---
async function initApp() {
  try {
    isLoading = true;
    const healthOk = await ApiClient.healthCheck();
    
    if (healthOk) {
      API_AVAILABLE = true;
      const rawLeads = await ApiClient.getLeads();
      LEADS = rawLeads.map(adaptLeadFromBackend);
      console.log('NC Control Tower cargado con', LEADS.length, 'leads (backend)');
    } else {
      console.warn('Backend no disponible - modo demo');
      LEADS = [];
    }
    
    renderPipeline();
    updateStats();
    setupEventListeners();
    isLoading = false;
  } catch (error) {
    console.error('Error cargando leads:', error);
    isLoading = false;
  }
}

document.addEventListener('DOMContentLoaded', initApp);

// --- DATOS PÚBLICOS (para debugging) ---
function getLeads() {
  return LEADS;
}

function refreshData() {
  return ApiClient.getLeads().then(data => {
    LEADS = data.map(adaptLeadFromBackend);
    renderPipeline();
    updateStats();
    return LEADS;
  }).catch(err => {
    console.error('Error refreshing:', err);
    return LEADS;
  });
}

// --- RENDERIZADO ---
function renderPipeline() {
  const canvas = document.getElementById('pipeline-canvas');
  canvas.innerHTML = '';

  const filteredLeads = applyFilters(LEADS);

  COLUMNS.forEach(col => {
    const columnLeads = filteredLeads.filter(l => (l.Estado || "NUEVO") === col.id);
    
    const colEl = document.createElement('div');
    colEl.className = 'pipeline-column';
    colEl.innerHTML = `
      <div class="column-header">
        <h3 class="column-title">${col.label} <span class="column-badge">${columnLeads.length}</span></h3>
      </div>
      <div class="column-content" id="col-${col.id}"></div>
    `;
    
    const contentEl = colEl.querySelector('.column-content');
    columnLeads.forEach(lead => {
      contentEl.appendChild(createLeadCard(lead));
    });
    
    canvas.appendChild(colEl);
  });
}

function createLeadCard(lead) {
  const langMap = { 'Español': 'ES', 'Ucraniano': 'UA', 'Inglés': 'EN' };
  const langCode = langMap[lead.Idioma] || (lead.Idioma || "ES").substring(0,2).toUpperCase();
  
  const card = document.createElement('div');
  card.className = `lead-card border-${(lead.Semaforo_final || "VERDE").toUpperCase()}`;
  card.innerHTML = `
    <div class="card-top">
      <span class="lead-id">${lead.Lead_ID || "NC-L-XXXX"}</span>
      <div class="card-top-badges">
        <span class="tag tag-idioma">${langCode}</span>
        ${lead.Semaforo_final !== 'ERROR_IA' 
          ? `<span class="semaforo-dot dot-${(lead.Semaforo_final || "VERDE").toUpperCase()}" title="Final: ${lead.Semaforo_final || 'N/A'} · IA: ${lead.Semaforo_IA || 'N/A'}"></span>`
          : `<span class="mini-badge incidencia-badge" style="font-size: 7px; padding: 2px 4px;">ERROR IA</span>`
        }
      </div>
    </div>
    <h4 class="lead-name">${lead.Nombre_y_apellidos || "Sin Nombre"}</h4>
    <div class="card-tags">
      <span class="tag tag-urgencia">${lead.Urgencia || "Normal"}</span>
      <span class="tag" style="background:#E2E8F0; color:#4B5A69;" title="${(lead.Tipo_lead_IA || lead.Duda_principal || 'General')}">${(lead.Tipo_lead_IA || lead.Duda_principal || "General").substring(0,22)}${(lead.Tipo_lead_IA || lead.Duda_principal || "General").length > 22 ? '...' : ''}</span>
    </div>
    <p class="card-desc">${(lead.Resumen_caso || "").substring(0, 60)}...</p>
    <div class="card-footer">
      <span class="next-action-tip">${lead.Siguiente_accion || lead.Accion_recomendada || "Pendiente de triaje"}</span>
    </div>
  `;
  
  card.addEventListener('click', () => openDrawer(lead));
  return card;
}

// --- DRAWER LOGIC ---
async function openDrawer(lead) {
  const drawer = document.getElementById('lead-drawer');
  try {
    const detailed = await ApiClient.getLead(lead.Lead_ID_original);
    lead = adaptLeadFromBackend(detailed);
  } catch (error) {
    console.warn('No se pudo cargar detalle completo del lead:', error.message);
  }
  
  // Helper para campos vacíos
  const getVal = (val, placeholder = "Pendiente") => {
    const isInvalid = val === undefined || val === null || val === "" || val === false;
    return isInvalid ? `<span class="text-muted" style="opacity:0.4;">${placeholder}</span>` : val;
  };

  // 1. Header & Identidad
  document.getElementById('drawer-lead-id').textContent = lead.Lead_ID || "NC-L-XXXX";
  document.getElementById('drawer-canal-entrada').textContent = lead.Canal_origen || "Web Tally";
  document.getElementById('drawer-lead-name').textContent = lead.Nombre_y_apellidos || "Sin Nombre";
  document.getElementById('drawer-lead-date').textContent = lead.Fecha ? new Date(lead.Fecha).toLocaleDateString() : "No informada";
  
  const estadoOperativo = lead.Estado || "NUEVO";
  document.getElementById('drawer-lead-status').textContent = estadoOperativo;
  
  const semaforoEl = document.getElementById('drawer-lead-semaforo');
  const semaforoVal = (lead.Semaforo_final || "VERDE").toUpperCase();
  semaforoEl.textContent = semaforoVal;
  semaforoEl.className = `semaforo-badge ${semaforoVal}`;
  
  document.getElementById('drawer-lead-idioma').textContent = (lead.Idioma || "ES").substring(0,2).toUpperCase();
  
  // Sincronizar Select de Estado
  const statusSelect = document.getElementById('drawer-status-select');
  statusSelect.value = estadoOperativo;
  statusSelect.className = `status-select-premium bg-status-${estadoOperativo}`;
  currentLead = lead;

  // 2. Alertas Críticas (Riesgo y Consentimiento)
  const alertsContainer = document.getElementById('drawer-alerts-container');
  alertsContainer.innerHTML = '';
  
  const consentimientoValido = lead.Consentimiento_valido === true;
  const emailValido = lead.Email_valido === true;
  const whatsappValido = lead.WhatsApp_valido === true;
  const riesgoDuroDetectado = lead.Riesgo_duro_detectado === true;
  const requiereRevisionManual = lead.Requiere_revision_manual === true;
  const errorIA = String(lead.Error_IA || '').toUpperCase() === 'SI';
  const iaJsonValido = lead.IA_JSON_valido;
  const iaJsonInvalido = iaJsonValido !== null && String(iaJsonValido).toUpperCase() === 'NO';
  const hasConsent = consentimientoValido || (lead.Consentimiento === true || (typeof lead.Consentimiento === 'string' && lead.Consentimiento.length > 5));
  
  // Desactivación de botones por consentimiento
  const btnWA = document.getElementById('btn-copy-wa');
  const btnMail = document.getElementById('btn-copy-mail');
  
  if (!hasConsent) {
    btnWA.classList.add('btn-disabled');
    btnMail.classList.add('btn-disabled');
    btnWA.title = "Falta consentimiento para contacto comercial";
    btnMail.title = "Falta consentimiento para contacto comercial";
  } else {
    btnWA.classList.remove('btn-disabled');
    btnMail.classList.remove('btn-disabled');
    btnWA.title = "";
    btnMail.title = "";
  }

  if (!hasConsent) {
    const alert = document.createElement('div');
    alert.className = 'consent-alert';
    alert.innerHTML = `<strong>⚠️ FALTA CONSENTIMIENTO</strong> <p style="font-size:12px;">No contactar por WhatsApp/Email hasta validación manual.</p>`;
    alertsContainer.appendChild(alert);
  }

  if (!emailValido) {
    const alert = document.createElement('div');
    alert.className = 'consent-alert';
    alert.innerHTML = `<strong>⚠️ EMAIL INVALIDO</strong> <p style="font-size:12px;">Revisar email antes de cualquier envio.</p>`;
    alertsContainer.appendChild(alert);
  }

  if (!whatsappValido) {
    const alert = document.createElement('div');
    alert.className = 'consent-alert';
    alert.innerHTML = `<strong>⚠️ WHATSAPP INVALIDO</strong> <p style="font-size:12px;">Validar numero antes de contacto.</p>`;
    alertsContainer.appendChild(alert);
  }

  if (lead.Riesgo_detectado && lead.Riesgo_detectado !== "Sin riesgo relevante" && lead.Riesgo_detectado !== "Sin riesgo") {
    const alert = document.createElement('div');
    alert.style = "background:#FEE2E2; color:#991B1B; padding:12px; border-radius:8px; margin-bottom:20px; font-size:13px; border-left:4px solid #991B1B;";
    alert.innerHTML = `<strong>🚨 RIESGO DETECTADO: ${lead.Tipo_riesgo || lead.Riesgo_detectado}</strong>`;
    alertsContainer.appendChild(alert);
  }

  if (riesgoDuroDetectado) {
    const alert = document.createElement('div');
    alert.style = "background:#FEE2E2; color:#991B1B; padding:12px; border-radius:8px; margin-bottom:20px; font-size:13px; border-left:4px solid #7F1D1D;";
    alert.innerHTML = `<strong>🚨 RIESGO DURO DETECTADO</strong> <p style="font-size:12px;">Requiere revision manual obligatoria.</p>`;
    alertsContainer.appendChild(alert);
  }

  if (requiereRevisionManual) {
    const alert = document.createElement('div');
    alert.className = 'consent-alert';
    alert.innerHTML = `<strong>⚠️ REVISION MANUAL REQUERIDA</strong>`;
    alertsContainer.appendChild(alert);
  }

  if (errorIA || iaJsonInvalido) {
    const alert = document.createElement('div');
    alert.style = "background:#E0E7FF; color:#312E81; padding:12px; border-radius:8px; margin-bottom:20px; font-size:13px; border-left:4px solid #4338CA;";
    alert.innerHTML = `<strong>⚠️ ERROR IA / JSON IA INVALIDO</strong> <p style="font-size:12px;">Escalar a revision manual antes de respuesta.</p>`;
    alertsContainer.appendChild(alert);
  }

  // 3. Bloques de Información (4 Secciones PRD)
  const container = document.getElementById('drawer-sections-container');
  container.innerHTML = `
    <!-- SECCIÓN 1: CONTACTO & ORIGEN -->
    <section class="drawer-section">
      <h4 class="section-title">1. Contacto y Origen</h4>
      <div class="data-grid">
        <div class="data-item"><span class="data-label">Email</span><span class="data-value">${getVal(lead.Email)}</span></div>
        <div class="data-item"><span class="data-label">WhatsApp</span><span class="data-value">${lead.WhatsApp ? '+' + lead.WhatsApp : getVal(null)}</span></div>
        <div class="data-item"><span class="data-label">Idioma</span><span class="data-value">${getVal(lead.Idioma)}</span></div>
        <div class="data-item"><span class="data-label">Canal</span><span class="data-value">${getVal(lead.Canal_origen)}</span></div>
      </div>
    </section>

    <!-- SECCIÓN 2: DATOS DEL FORMULARIO -->
    <section class="drawer-section">
      <h4 class="section-title">2. Datos del Formulario</h4>
      <div class="data-grid">
        <div class="data-item"><span class="data-label">En España</span><span class="data-value">${getVal(lead.En_Espana)}</span></div>
        <div class="data-item"><span class="data-label">Situación</span><span class="data-value">${getVal(lead.Situacion_actual)}</span></div>
        <div class="data-item"><span class="data-label">Origen Ingresos</span><span class="data-value">${getVal(lead.Origen_ingresos)}</span></div>
        <div class="data-item"><span class="data-label">Urgencia</span><span class="data-value">${getVal(lead.Urgencia)}</span></div>
      </div>
      <div class="data-item" style="margin-top:16px;">
        <span class="data-label">Duda Principal</span>
        <span class="data-value">${getVal(lead.Duda_principal)}</span>
      </div>
      <div class="data-item" style="margin-top:16px;">
        <span class="data-label">Explicación del Caso</span>
        <p style="font-size:14px; line-height:1.6; margin-top:8px;">"${getVal(lead.Resumen_caso)}"</p>
      </div>
    </section>

    <!-- SECCIÓN 3: ANÁLISIS IA (TRIAGE) -->
    <section class="drawer-section" style="background: #1e293b; border-radius: 8px; padding: 14px; color: #f8fafc; border: 1px solid #334155; margin-bottom: 16px;">
      <h4 class="section-title" style="color: #94a3b8; border-bottom: 1px solid #334155; padding-bottom: 8px; margin-bottom: 12px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">3. Análisis IA (Triage Operativo)</h4>
      
      <div class="data-item" style="border:none; padding:0; background:none; margin-bottom: 12px;">
        <span class="data-label" style="color: #cbd5e1; font-size: 11px;">Resumen IA</span>
        <p style="font-size:13px; font-weight:500; color: #f1f5f9; line-height: 1.5; margin-top: 4px;">${getVal(lead.Resumen_IA)}</p>
      </div>
      
      <div class="data-grid" style="margin-bottom: 14px; gap: 8px;">
        <div class="data-item" style="background: #0f172a; border-color: #334155; padding: 10px;"><span class="data-label" style="color: #94a3b8; font-size: 11px;">Motivo Clasificación</span><span class="data-value" style="color: #f1f5f9; font-size:12px;">${getVal(lead.Motivo_clasificacion)}</span></div>
        <div class="data-item" style="background: #0f172a; border-color: #334155; padding: 10px;"><span class="data-label" style="color: #94a3b8; font-size: 11px;">Dato Faltante</span><span class="data-value" style="color: #fca5a5; font-size:12px;">${getVal(lead.Dato_faltante, "Ninguno")}</span></div>
      </div>
      
      <!-- SUGGESTED RESPONSE -->
      <div class="data-item" style="background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 12px; position: relative;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span class="data-label" style="color: #38bdf8; margin-bottom: 0; font-size: 11px;">Respuesta Sugerida (Borrador IA)</span>
          <button onclick="navigator.clipboard.writeText(\`${(lead.Respuesta_sugerida || '').replace(/`/g, '\\`')}\`)" style="background: #0ea5e9; color: white; border: none; padding: 4px 10px; border-radius: 4px; font-size: 10px; font-weight: 600; cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='#0284c7'" onmouseout="this.style.background='#0ea5e9'">
            📋 Copiar
          </button>
        </div>
        <div style="font-size:12px; font-style:italic; color:#cbd5e1; line-height: 1.5; white-space: pre-wrap; background: #1e293b; padding: 10px; border-radius: 6px;">${getVal(lead.Respuesta_sugerida, "No se generó respuesta sugerida para este caso.")}</div>
      </div>

      <!-- ACTION BANNER -->
      <div style="margin-top: 14px; background: linear-gradient(90deg, #0ea5e9 0%, #0284c7 100%); padding: 12px; border-radius: 8px; display: flex; flex-direction: column; gap: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.15);">
        <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; color: #e0f2fe; font-weight: 600;">Siguiente Acción Operativa</span>
        <span style="font-size: 14px; font-weight: 700; color: white;">${getVal(lead.Siguiente_accion || lead.Accion_recomendada, "Revisión Manual Obligatoria")}</span>
      </div>
    </section>

    <!-- SECCIÓN 4: GESTIÓN COMERCIAL NC -->
    <section class="drawer-section">
      <h4 class="section-title">4. Gestión Comercial NC</h4>
      <div class="data-grid">
        <div class="data-item"><span class="data-label">Revisión Natalia</span><span class="data-value">${getVal(lead.Revision_Natalia, "Pendiente")}</span></div>
        <div class="data-item"><span class="data-label">Semaforo Final</span><span class="data-value">${getVal(lead.Semaforo_final, "Igual que IA")}</span></div>
        <div class="data-item"><span class="data-label">Semaforo IA (informativo)</span><span class="data-value">${getVal(lead.Semaforo_IA)}</span></div>
        <div class="data-item"><span class="data-label">Semaforo preIA (técnico)</span><span class="data-value">${getVal(lead.Semaforo_preIA, "N/A")}</span></div>
      </div>
      <div class="data-item" style="margin-top:12px;">
        <span class="data-label">Comentarios / Notas NC</span>
        <textarea style="width:100%; height:80px; padding:10px; border-radius:8px; border:1px solid var(--border-color); font-size:12px;" placeholder="Natalia, añade tus notas aquí...">${lead.Comentario_revision || ""}</textarea>
      </div>
      <div class="data-item" style="margin-top:12px;">
        <span class="data-label">Notas registradas</span>
        <div>${(lead.lead_notes || []).length ? (lead.lead_notes || []).map(n => `<p style="margin:4px 0;">- ${n.note}</p>`).join('') : '<span class="text-muted">Sin notas registradas.</span>'}</div>
      </div>
    </section>

    <section class="drawer-section">
      <h4 class="section-title">5. Registrar interacción manual</h4>
      <form id="interaction-form" class="interaction-form">
        <select name="canal" required>
          <option value="WHATSAPP_MANUAL">WHATSAPP_MANUAL</option>
          <option value="EMAIL_MANUAL">EMAIL_MANUAL</option>
          <option value="LLAMADA">LLAMADA</option>
          <option value="NOTA_INTERNA">NOTA_INTERNA</option>
          <option value="OTRO">OTRO</option>
        </select>
        <select name="tipo_interaccion" required>
          <option value="MENSAJE_ENVIADO_MANUAL">MENSAJE_ENVIADO_MANUAL</option>
          <option value="RESPUESTA_RECIBIDA">RESPUESTA_RECIBIDA</option>
          <option value="LLAMADA_REALIZADA">LLAMADA_REALIZADA</option>
          <option value="SEGUIMIENTO">SEGUIMIENTO</option>
          <option value="CIERRE">CIERRE</option>
        </select>
        <textarea name="resumen" required placeholder="Resumen de interacción"></textarea>
        <input name="responsable" placeholder="Responsable" value="Natalia">
        <button type="submit" class="btn-primary-compact">Guardar interacción</button>
      </form>
      <div id="interaction-list" class="interaction-list"></div>
    </section>
  `;

  bindInteractionForm(lead);
  loadInteractions(lead);

  drawer.classList.remove('hidden');
}

function renderInteractions(items) {
  const list = document.getElementById('interaction-list');
  if (!list) return;
  if (!items.length) {
    list.innerHTML = '<p class="text-muted">Sin interacciones registradas.</p>';
    return;
  }

  list.innerHTML = items.map(item => `
    <div class="interaction-item">
      <div><strong>${item.canal}</strong> · ${item.tipo_interaccion}</div>
      <div>${item.resumen}</div>
      <small>${item.responsable || 'api'} · ${new Date(item.fecha || item.created_at).toLocaleString()}</small>
    </div>
  `).join('');
}

async function loadInteractions(lead) {
  try {
    const items = await ApiClient.getInteractions(lead.Lead_ID_original);
    renderInteractions(items);
  } catch (error) {
    console.error('Error loading interactions:', error);
    renderInteractions([]);
  }
}

function bindInteractionForm(lead) {
  const form = document.getElementById('interaction-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    try {
      await ApiClient.addInteraction(
        lead.Lead_ID_original,
        data.get('canal'),
        data.get('tipo_interaccion'),
        data.get('resumen'),
        data.get('responsable')
      );
      alert('Interacción registrada');
      form.reset();
      await loadInteractions(lead);
      await refreshData();
    } catch (error) {
      alert(`Error registrando interacción: ${error.message}`);
    }
  });
}

function closeDrawer() {
  document.getElementById('lead-drawer').classList.add('hidden');
}

// --- FILTERS & STATS ---
function applyFilters(data) {
  return data.filter(l => {
    const searchVal = filters.search.toLowerCase();
    const nombre = (l.Nombre_y_apellidos || "").toLowerCase();
    const id = (l.Lead_ID || "").toLowerCase();
    const matchSearch = nombre.includes(searchVal) || id.includes(searchVal);
    
    const estado = l.Estado || "NUEVO";
    const matchEstado = filters.estado === 'all' || estado === filters.estado;
    
    const semaforo = (l.Semaforo_final || "VERDE").toUpperCase();
    const matchSemaforo = filters.semaforo === 'all' || semaforo === filters.semaforo;
    
    const urgencia = l.Urgencia || "";
    const matchUrgencia = filters.urgencia === 'all' || urgencia === filters.urgencia;
    
    const idioma = l.Idioma || "";
    const matchIdioma = filters.idioma === 'all' || idioma === filters.idioma;
    
    const caso = l.Duda_principal || l.Tipo_lead_IA || "";
    const matchCaso = filters.caso === 'all' || caso.includes(filters.caso);
    
    return matchSearch && matchEstado && matchSemaforo && matchUrgencia && matchIdioma && matchCaso;
  });
}

function updateStats() {
  // Primarios
  document.getElementById('stat-total').textContent = LEADS.length.toString().padStart(2, '0');
  document.getElementById('stat-urgentes').textContent = LEADS.filter(l => l.Urgencia === 'Esta semana').length.toString().padStart(2, '0');

  // Semáforo Comercial / Técnico
  document.getElementById('stat-verdes').textContent = LEADS.filter(l => l.Semaforo_final === 'VERDE').length.toString().padStart(2, '0');
  document.getElementById('stat-amarillos').textContent = LEADS.filter(l => l.Semaforo_final === 'AMARILLO').length.toString().padStart(2, '0');
  document.getElementById('stat-rojos').textContent = LEADS.filter(l => l.Semaforo_final === 'ROJO').length.toString().padStart(2, '0');
  document.getElementById('stat-error-ia').textContent = LEADS.filter(l => String(l.Error_IA || '').toUpperCase() === 'SI' || String(l.IA_JSON_valido || '').toUpperCase() === 'NO').length.toString().padStart(2, '0');
}

// --- EVENTS ---
function setupEventListeners() {
  document.querySelector('.btn-close-drawer').addEventListener('click', closeDrawer);
  document.querySelector('.drawer-overlay').addEventListener('click', closeDrawer);

  // Dashboard Filtering (Operativa)
  document.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('click', () => {
      const filter = card.getAttribute('data-filter');
      if (!filter) return;
      
      document.querySelectorAll('.stat-card, .stat-pill').forEach(c => c.classList.remove('active-filter'));
      
      if (filter === 'all') {
        filters.estado = 'all';
        filters.urgencia = 'all';
        filters.semaforo = 'all';
        card.classList.add('active-filter');
        // Reset dropdowns visual state
        const filterEstado = document.getElementById('filter-estado');
        const filterSemaforo = document.getElementById('filter-semaforo');
        if (filterEstado) filterEstado.value = 'all';
        if (filterSemaforo) filterSemaforo.value = 'all';
        document.getElementById('filter-urgencia').value = 'all';
      } else if (filter === 'urgente') {
        if (filters.urgencia === 'Esta semana') {
          filters.urgencia = 'all';
        } else {
          filters.urgencia = 'Esta semana';
          card.classList.add('active-filter');
          document.getElementById('filter-urgencia').value = 'Esta semana';
        }
      }
      renderPipeline();
    });
  });

  // Dashboard Filtering (Semáforo / Técnico)
  document.querySelectorAll('.stat-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const semaforo = pill.getAttribute('data-semaforo');
      const incidencia = pill.getAttribute('data-incidencia');
      const filterValue = semaforo || incidencia;

      document.querySelectorAll('.stat-card, .stat-pill').forEach(p => p.classList.remove('active-filter'));

      if (filters.semaforo === filterValue) {
        filters.semaforo = 'all';
      } else {
        filters.semaforo = filterValue;
        pill.classList.add('active-filter');
      }
      renderPipeline();
    });
  });

  document.getElementById('global-search').addEventListener('input', (e) => {
    filters.search = e.target.value;
    renderPipeline();
  });

  const clearActiveFilters = () => document.querySelectorAll('.stat-card, .stat-pill').forEach(c => c.classList.remove('active-filter'));

  document.getElementById('filter-urgencia').addEventListener('change', (e) => {
    filters.urgencia = e.target.value;
    clearActiveFilters();
    renderPipeline();
  });

  document.getElementById('filter-idioma').addEventListener('change', (e) => {
    filters.idioma = e.target.value;
    clearActiveFilters();
    renderPipeline();
  });

  document.getElementById('filter-caso').addEventListener('change', (e) => {
    filters.caso = e.target.value;
    clearActiveFilters();
    renderPipeline();
  });

  document.getElementById('drawer-status-select').addEventListener('change', async (e) => {
    if (currentLead) {
      const newEstado = e.target.value;

      const estadoActual = currentLead.Estado || 'NUEVO';
      if (newEstado === estadoActual) return;

      try {
        await ApiClient.updateStatus(currentLead.Lead_ID_original, newEstado, 'Cambio manual dashboard V0');
        alert('Estado actualizado correctamente');
        await refreshData();
        const updated = LEADS.find(l => l.Lead_ID_original === currentLead.Lead_ID_original);
        if (updated) {
          openDrawer(updated);
        }
      } catch (error) {
        e.target.value = estadoActual;
        alert(`Error actualizando estado: ${error.message}`);
      }
    }
  });

  const btnAddLead = document.getElementById('btn-add-lead');
  const modal = document.getElementById('new-lead-modal');
  const closeModal = () => modal.classList.add('hidden');

  btnAddLead.addEventListener('click', () => modal.classList.remove('hidden'));
  document.getElementById('btn-close-new-lead').addEventListener('click', closeModal);
  document.querySelector('#new-lead-modal .modal-overlay').addEventListener('click', closeModal);
  document.getElementById('btn-cancel-new-lead').addEventListener('click', closeModal);

  document.getElementById('new-lead-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const payload = {
      nombre: fd.get('nombre'),
      email: fd.get('email'),
      whatsapp: fd.get('whatsapp'),
      idioma_preferido: fd.get('idioma_preferido'),
      duda_principal: fd.get('duda_principal'),
      explicacion_caso: fd.get('explicacion_caso'),
      urgencia: fd.get('urgencia'),
      consentimiento_valido: true,
      email_valido: true,
      whatsapp_valido: true,
      es_test: true,
      canal_entrada: 'dashboard_v0'
    };

    try {
      await ApiClient.createLead(payload);
      alert('Lead creado correctamente');
      closeModal();
      e.target.reset();
      await refreshData();
    } catch (error) {
      alert(`Error creando lead: ${error.message}`);
    }
  });
}
