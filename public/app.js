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
  }
};

let LEADS = [];
let API_AVAILABLE = false;

// --- ADAPTADOR DE DATOS (Backend → Frontend) ---
function adaptLeadFromBackend(lead) {
  const triage = lead.lead_triage || {};
  const statusHistory = lead.lead_status_history?.[0] || {};
  
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
    Semaforo_IA: triage.semaforo_ia || 'AMARILLO',
    Tipo_lead_IA: triage.tipo_lead_ia,
    Resumen_IA: triage.resumen_caso,
    Motivo_clasificacion: triage.motivo_clasificacion,
    Dato_faltante: triage.dato_critico_faltante,
    Riesgo_detectado: triage.riesgo_detectado,
    Tipo_riesgo: triage.tipo_riesgo,
    Accion_recomendada: triage.accion_recomendada,
    Siguiente_accion: triage.siguiente_accion,
    Respuesta_sugerida: triage.respuesta_sugerida,
    Requiere_revision: triage.requiere_revision_manual ? 'SI' : 'NO',
    Semaforo_final: triage.semaforo_final,
    Estado: statusHistory.estado_nuevo || 'NUEVO',
    Es_test: lead.es_test ? 'SÍ' : 'NO',
    Canal_origen: lead.canal_entrada,
    lead_triage: triage,
    lead_status_history: lead.lead_status_history,
    lead_notes: lead.lead_notes
  };
}

// --- CONFIGURACIÓN ---
const COLUMNS = [
  { id: 'NUEVO', label: 'Nuevo lead' },
  { id: 'EN_REVISION', label: 'En revisión' },
  { id: 'CONTACTADO', label: 'Contactado' },
  { id: 'DIAGNOSTICO_PROPUESTO', label: 'Diagnóstico propuesto' },
  { id: 'CLIENTE', label: 'Clientes' },
  { id: 'RECHAZADO', label: 'Rechazados' }
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
  card.className = `lead-card border-${(lead.Semaforo_IA || "VERDE").toUpperCase()}`;
  card.innerHTML = `
    <div class="card-top">
      <span class="lead-id">${lead.Lead_ID || "NC-L-XXXX"}</span>
      <div class="card-top-badges">
        <span class="tag tag-idioma">${langCode}</span>
        ${lead.Semaforo_IA !== 'ERROR_IA' 
          ? `<span class="semaforo-dot dot-${(lead.Semaforo_IA || "VERDE").toUpperCase()}" title="${lead.Semaforo_IA}"></span>`
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
function openDrawer(lead) {
  const drawer = document.getElementById('lead-drawer');
  
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
  const semaforoVal = (lead.Semaforo_IA || "VERDE").toUpperCase();
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
  
  // Consentimiento is string "He leído..." or boolean true in PRD. In sheet it's the text string. 
  // Let's assume truthy or length > 10.
  const hasConsent = lead.Consentimiento === true || (typeof lead.Consentimiento === 'string' && lead.Consentimiento.length > 5);
  
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

  if (lead.Riesgo_detectado && lead.Riesgo_detectado !== "Sin riesgo relevante" && lead.Riesgo_detectado !== "Sin riesgo") {
    const alert = document.createElement('div');
    alert.style = "background:#FEE2E2; color:#991B1B; padding:12px; border-radius:8px; margin-bottom:20px; font-size:13px; border-left:4px solid #991B1B;";
    alert.innerHTML = `<strong>🚨 RIESGO DETECTADO: ${lead.Tipo_riesgo || lead.Riesgo_detectado}</strong>`;
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
      </div>
      <div class="data-item" style="margin-top:12px;">
        <span class="data-label">Comentarios / Notas NC</span>
        <textarea style="width:100%; height:80px; padding:10px; border-radius:8px; border:1px solid var(--border-color); font-size:12px;" placeholder="Natalia, añade tus notas aquí...">${lead.Comentario_revision || ""}</textarea>
      </div>
    </section>
  `;

  drawer.classList.remove('hidden');
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
    
    const semaforo = (l.Semaforo_IA || "VERDE").toUpperCase();
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
  document.getElementById('stat-verdes').textContent = LEADS.filter(l => l.Semaforo_IA === 'VERDE').length.toString().padStart(2, '0');
  document.getElementById('stat-amarillos').textContent = LEADS.filter(l => l.Semaforo_IA === 'AMARILLO').length.toString().padStart(2, '0');
  document.getElementById('stat-rojos').textContent = LEADS.filter(l => l.Semaforo_IA === 'ROJO').length.toString().padStart(2, '0');
  document.getElementById('stat-error-ia').textContent = LEADS.filter(l => l.Semaforo_IA === 'ERROR_IA').length.toString().padStart(2, '0');
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
        document.getElementById('filter-estado').value = 'all';
        document.getElementById('filter-semaforo').value = 'all';
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
      // FASE 2A: Dashboard es READ-ONLY
      // No se permite escribir datos en laboratorio
      console.log('⚠️ READ-ONLY: Cambio de estado no permitido en Fase 2A');
      console.log('Lead:', currentLead.lead_code || currentLead.Lead_ID, 'Nuevo estado:', newEstado);
      
      // Restaurar valor original (no se permite cambio)
      const select = e.target;
      const estadoActual = currentLead.lead_status_history?.[0]?.estado_nuevo || currentLead.Estado || 'NUEVO';
      select.value = estadoActual;
      
      // Mostrar indicador visual de solo lectura
      alert('📖 Modo solo lectura (Fase 2A)\n\nEl cambio de estado estará disponible en Fase 2C.');
    }
  });
}
