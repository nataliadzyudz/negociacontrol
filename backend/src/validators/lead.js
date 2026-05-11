const TEST_KEYWORDS = ['test', 'tester', 'prueba', 'verde', 'amarillo', 'rojo'];
const TEST_DOMAINS = ['example.com', 'test.com', 'prueba.com', 'gmail.test'];

export function validateLeadInput(data, isUpdate = false) {
  const errors = [];

  if (!isUpdate) {
    if (!data.nombre || data.nombre.trim() === '') {
      errors.push('El nombre es obligatorio');
    }

    if (!data.lead_code) {
      errors.push('El lead_code es obligatorio');
    }
  }

  if (data.email && !isValidEmail(data.email)) {
    errors.push('Email inválido');
  }

  if (data.whatsapp && !isValidWhatsApp(data.whatsapp)) {
    errors.push('WhatsApp inválido');
  }

  if (data.semaforo_ia && !['VERDE', 'AMARILLO', 'ROJO'].includes(data.semaforo_ia)) {
    errors.push('Semaforo_ia debe ser VERDE, AMARILLO o ROJO');
  }

  if (data.estado_nuevo && !isValidEstado(data.estado_nuevo)) {
    errors.push('Estado inválido');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export function detectEsTest(nombre, email) {
  const lowerNombre = (nombre || '').toLowerCase();
  const lowerEmail = (email || '').toLowerCase();

  if (TEST_KEYWORDS.some(k => lowerNombre.includes(k))) return true;
  if (TEST_KEYWORDS.some(k => lowerEmail.includes(k))) return true;
  if (TEST_DOMAINS.some(d => lowerEmail.includes(d))) return true;

  return false;
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function isValidWhatsApp(whatsapp) {
  const digits = whatsapp.replace(/\D/g, '');
  return digits.length >= 8 && digits.length <= 15;
}

function isValidEstado(estado) {
  const estadosValidos = [
    'NUEVO', 'PENDIENTE_REVISION', 'FALTA_DATO', 'APTO_DIAGNOSTICO',
    'DIAGNOSTICO_PROPUESTO', 'DIAGNOSTICO_RESERVADO', 'CLIENTE_ACTIVO',
    'NO_ENCAJA', 'NO_CONTESTA', 'ERROR_IA', 'ARCHIVADO'
  ];
  return estadosValidos.includes(estado);
}