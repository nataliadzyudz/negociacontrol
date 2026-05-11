-- 001_test_leads.sql
-- NC Control Tower v2 - Datos de prueba para laboratorio Fase 2A
-- Objetivo: Insertar leads test sin datos reales
-- Versión corregida: campana_origen sin ñ + limpieza previa

BEGIN;

-- ============================================
-- LIMPIEZA PREVIA PARA EVITAR DUPLICADOS
-- ============================================

DELETE FROM error_logs
WHERE lead_id IN (
    SELECT id FROM leads
    WHERE lead_code IN ('L-0021','L-0015','L-0018','L-0024','L-0025','L-0026','L-0027')
);

DELETE FROM lead_status_history
WHERE lead_id IN (
    SELECT id FROM leads
    WHERE lead_code IN ('L-0021','L-0015','L-0018','L-0024','L-0025','L-0026','L-0027')
);

DELETE FROM lead_triage
WHERE lead_id IN (
    SELECT id FROM leads
    WHERE lead_code IN ('L-0021','L-0015','L-0018','L-0024','L-0025','L-0026','L-0027')
);

DELETE FROM leads
WHERE lead_code IN ('L-0021','L-0015','L-0018','L-0024','L-0025','L-0026','L-0027');

-- ============================================
-- INSERTAR LEADS DE PRUEBA
-- ============================================

-- Lead 1: VERDE - Alta autónomo
INSERT INTO leads (
    lead_code, fecha_entrada, nombre, email, whatsapp, idioma_preferido,
    esta_en_espana, situacion_actual, origen_ingresos, duda_principal,
    explicacion_caso, urgencia, consentimiento_original, consentimiento_valido,
    email_valido, whatsapp_valido, es_test, canal_entrada, campana_origen
) VALUES (
    'L-0021', '2026-05-04T23:52:08.000Z', 'Marina Verde', 'marina.verde@gmail.com', '34650861462', 'Ucraniano',
    'Sí', 'Aún no lo tengo claro', 'España', 'Alta de autónomo',
    'Estoy viviendo en España y quiero empezar a trabajar como autónoma...', 'Este mes',
    'He leído y acepto que NEGOCIA CONTROL use mis datos...', true, true, true, true, 'Tally', NULL
);

-- Lead 2: AMARILLO - Falta información
INSERT INTO leads (
    lead_code, fecha_entrada, nombre, email, whatsapp, idioma_preferido,
    esta_en_espana, situacion_actual, origen_ingresos, duda_principal,
    explicacion_caso, urgencia, consentimiento_original, consentimiento_valido,
    email_valido, whatsapp_valido, es_test, canal_entrada, campana_origen
) VALUES (
    'L-0015', '2026-05-04T22:57:39.000Z', 'Oksana', 'OKSANA@GMAIL.COM', '34650861462', 'Inglés',
    'En proceso', 'Ya soy autónomo', 'Extranjero', 'Otro',
    'Quiero saber si tengo que declarar, tengo ingresos de fuera, pero no sé todavía cuánto ni desde qué país.', 'Solo estoy explorando',
    'He leído y acepto que NEGOCIA CONTROL use sus datos...', true, true, true, true, 'Tally', NULL
);

-- Lead 3: ROJO - Revisión humana obligatoria
INSERT INTO leads (
    lead_code, fecha_entrada, nombre, email, whatsapp, idioma_preferido,
    esta_en_espana, situacion_actual, origen_ingresos, duda_principal,
    explicacion_caso, urgencia, consentimiento_original, consentimiento_valido,
    email_valido, whatsapp_valido, es_test, canal_entrada, campana_origen
) VALUES (
    'L-0018', '2026-05-04T23:31:26.000Z', 'Nata Test Rojo', 'testrojo@gmail.com', '34650861462', 'Inglés',
    'Sí', 'Trabajo por cuenta ajena', 'Mixto', 'No sé por dónde empezar',
    'Tengo una multa, deuda con Hacienda o una inspección abierta.', 'Este mes',
    'He leído y acepto que NEGOCIA CONTROL use sus datos...', true, true, true, true, 'Tally', NULL
);

-- Lead 4: VERDE - Alta autónomo
INSERT INTO leads (
    lead_code, fecha_entrada, nombre, email, whatsapp, idioma_preferido,
    esta_en_espana, situacion_actual, origen_ingresos, duda_principal,
    explicacion_caso, urgencia, consentimiento_original, consentimiento_valido,
    email_valido, whatsapp_valido, es_test, canal_entrada, campana_origen
) VALUES (
    'L-0024', '2026-05-05T00:04:48.000Z', 'Iryna Verde UA', 'iryna.verde.ua@gmail.com', '34650861462', 'Ucraniano',
    'Sí', 'Aún no lo tengo claro', 'España', 'Alta de autónomo',
    'Я живу в Іспанії та хочу почати працювати як autónoma...', 'Este mes',
    'He leído y acepto que NEGOCIA CONTROL use sus datos...', true, true, true, true, 'Tally', NULL
);

-- Lead 5: AMARILLO - Ingresos extranjeros
INSERT INTO leads (
    lead_code, fecha_entrada, nombre, email, whatsapp, idioma_preferido,
    esta_en_espana, situacion_actual, origen_ingresos, duda_principal,
    explicacion_caso, urgencia, consentimiento_original, consentimiento_valido,
    email_valido, whatsapp_valido, es_test, canal_entrada, campana_origen
) VALUES (
    'L-0025', '2026-05-05T00:05:31.000Z', 'Carlos Amarillo ES', 'carlos.amarillo.es@gmail.com', '34650861462', 'Español',
    'En proceso', 'Ya soy autónomo', 'Extranjero', 'Ingresos del extranjero',
    'Trabajo con clientes de fuera de España y no tengo claro si tengo que declarar...', 'Solo estoy explorando',
    'He leído y acepto que NEGOCIA CONTROL use sus datos...', true, true, true, true, 'Tally', NULL
);

-- Lead 6: ROJO - Sin consentimiento válido
INSERT INTO leads (
    lead_code, fecha_entrada, nombre, email, whatsapp, idioma_preferido,
    esta_en_espana, situacion_actual, origen_ingresos, duda_principal,
    explicacion_caso, urgencia, consentimiento_original, consentimiento_valido,
    email_valido, whatsapp_valido, es_test, canal_entrada, campana_origen
) VALUES (
    'L-0026', '2026-05-05T10:00:00.000Z', 'Sin Consentimiento', 'sinconsentimiento@test.com', '34600000001', 'Español',
    'Sí', 'Trabajo por cuenta ajena', 'España', 'Alta de autónomo',
    'Quiero darme de alta como autónoma en España', 'Este mes',
    NULL, false, false, false, true, 'Tally', NULL
);

-- Lead 7: ERROR_IA - Simulación de error
INSERT INTO leads (
    lead_code, fecha_entrada, nombre, email, whatsapp, idioma_preferido,
    esta_en_espana, situacion_actual, origen_ingresos, duda_principal,
    explicacion_caso, urgencia, consentimiento_original, consentimiento_valido,
    email_valido, whatsapp_valido, es_test, canal_entrada, campana_origen
) VALUES (
    'L-0027', '2026-05-05T11:00:00.000Z', 'Error IA Test', 'error.ia@test.com', '34600000002', 'Español',
    'Sí', 'Aún no lo tengo claro', 'España', 'Otro',
    'Caso para probar manejo de errores de IA', 'Solo estoy explorando',
    'He leído y acepto que NEGOCIA CONTROL use sus datos...', true, true, true, true, 'Tally', NULL
);

-- ============================================
-- INSERTAR TRIAGE PARA CADA LEAD
-- ============================================

-- Lead 1: Marina Verde - VERDE
INSERT INTO lead_triage (
    lead_id, semaforo_preia, semaforo_ia, semaforo_final,
    tipo_lead_ia, resumen_caso, motivo_clasificacion,
    riesgo_detectado, tipo_riesgo, accion_recomendada, siguiente_accion,
    respuesta_sugerida, requiere_revision_manual
)
SELECT
    id, NULL::semaforo, 'VERDE'::semaforo, 'VERDE'::semaforo,
    'Alta autónomo', 'La lead necesita ayuda con la alta como autónoma...',
    'Tiene consentimiento, datos básicos suficientes...',
    'Sin riesgo relevante', 'Sin riesgo relevante',
    'Enviar enlace de reserva diagnóstico', 'Natalia puede enviar enlace de reserva',
    'Ви можете почати роботу як самостійний дизайнер...', false
FROM leads
WHERE lead_code = 'L-0021';

-- Lead 2: Oksana - AMARILLO
INSERT INTO lead_triage (
    lead_id, semaforo_preia, semaforo_ia, semaforo_final,
    tipo_lead_ia, resumen_caso, motivo_clasificacion, dato_critico_faltante,
    riesgo_detectado, tipo_riesgo, accion_recomendada, siguiente_accion,
    respuesta_sugerida, requiere_revision_manual
)
SELECT
    id, NULL::semaforo, 'AMARILLO'::semaforo, 'AMARILLO'::semaforo,
    'Fiscalidad migrante', 'Oksana busca asesoramiento sobre declaración de ingresos extranjeros en España...',
    'Falta información relevante sobre los ingresos extranjeros.',
    'Monto y país de origen de los ingresos extranjeros',
    'Sin riesgo relevante', 'Sin riesgo relevante',
    'Pedir información faltante', 'Enviar mensaje de aclaración',
    'Hola Oksana, gracias por considerar a NEGOCIA CONTROL...', false
FROM leads
WHERE lead_code = 'L-0015';

-- Lead 3: Nata Test Rojo - ROJO
INSERT INTO lead_triage (
    lead_id, semaforo_preia, semaforo_ia, semaforo_final,
    tipo_lead_ia, resumen_caso, motivo_clasificacion,
    riesgo_detectado, tipo_riesgo, accion_recomendada, siguiente_accion,
    respuesta_sugerida, requiere_revision_manual
)
SELECT
    id, NULL::semaforo, 'ROJO'::semaforo, 'ROJO'::semaforo,
    'Riesgo fiscal/legal', 'Tiene multa, deuda con Hacienda y quiere empezar como autónoma',
    'Multa, deuda con Hacienda y posible inspección',
    'Riesgo fiscal/legal', 'Inspección/Deuda',
    'Revisión humana antes de responder', 'Natalia debe revisar el caso',
    'Necesitamos revisar su caso con atención...', true
FROM leads
WHERE lead_code = 'L-0018';

-- Lead 4: Iryna Verde - VERDE
INSERT INTO lead_triage (
    lead_id, semaforo_preia, semaforo_ia, semaforo_final,
    tipo_lead_ia, resumen_caso, motivo_clasificacion,
    riesgo_detectado, tipo_riesgo, accion_recomendada, siguiente_accion,
    respuesta_sugerida, requiere_revision_manual
)
SELECT
    id, NULL::semaforo, 'VERDE'::semaforo, 'VERDE'::semaforo,
    'Alta autónomo', 'Iryna Verde UA quiere empezar a trabajar como autónoma en España...',
    'El caso encaja con diagnóstico fiscal inicial...',
    'Sin riesgo relevante', 'Sin riesgo relevante',
    'Enviar enlace de reserva diagnóstico', 'Natalia puede enviar enlace de reserva',
    'Вітаємо! Ми готові допомогти вам із реєстрацією...', false
FROM leads
WHERE lead_code = 'L-0024';

-- Lead 5: Carlos Amarillo - AMARILLO
INSERT INTO lead_triage (
    lead_id, semaforo_preia, semaforo_ia, semaforo_final,
    tipo_lead_ia, resumen_caso, motivo_clasificacion, dato_critico_faltante,
    riesgo_detectado, tipo_riesgo, accion_recomendada, siguiente_accion,
    respuesta_sugerida, requiere_revision_manual
)
SELECT
    id, NULL::semaforo, 'AMARILLO'::semaforo, 'AMARILLO'::semaforo,
    'Ingresos extranjero', 'El lead trabaja con clientes extranjeros y tiene dudas...',
    'Falta de información sobre el importe anual total...',
    'Importe anual total, residencia fiscal...',
    'Sin riesgo relevante', 'Falta información',
    'Pedir información faltante', 'Natalia debe pedir al lead que proporcione más información',
    'Estimado Carlos, gracias por contactarnos...', false
FROM leads
WHERE lead_code = 'L-0025';

-- Lead 6: Sin Consentimiento - ROJO directo
INSERT INTO lead_triage (
    lead_id, semaforo_preia, semaforo_ia, semaforo_final,
    tipo_lead_ia, resumen_caso, motivo_clasificacion,
    riesgo_detectado, tipo_riesgo, accion_recomendada, siguiente_accion,
    respuesta_sugerida, requiere_revision_manual
)
SELECT
    id, 'ROJO'::semaforo, 'ROJO'::semaforo, 'ROJO'::semaforo,
    'Sin consentimiento', 'El lead no ha dado consentimiento válido para contacto comercial',
    'Sin consentimiento no se puede procesar el lead',
    'Sin riesgo relevante', 'Consentimiento',
    'No contactar hasta validar consentimiento', 'Solicitar consentimiento al lead',
    'Por favor, confirme que ha leído y acepta nuestra política de privacidad...', true
FROM leads
WHERE lead_code = 'L-0026';

-- Lead 7: Error IA - simulación de error
INSERT INTO lead_triage (
    lead_id, semaforo_preia, semaforo_ia, semaforo_final,
    tipo_lead_ia, resumen_caso, motivo_clasificacion,
    riesgo_detectado, tipo_riesgo, accion_recomendada, siguiente_accion,
    respuesta_sugerida, requiere_revision_manual
)
SELECT
    id, NULL::semaforo, NULL::semaforo, 'AMARILLO'::semaforo,
    'Error IA', 'No se pudo procesar el lead con IA',
    'La IA no devolvió una clasificación válida. Requiere revisión manual.',
    'Error en clasificación IA', 'Error técnico',
    'Revisión humana obligatoria', 'Natalia debe clasificar manualmente',
    'Lamentamos los inconvenientes. Nuestro equipo revisará su caso manualmente.', true
FROM leads
WHERE lead_code = 'L-0027';

-- ============================================
-- INSERTAR ESTADO INICIAL PARA CADA LEAD
-- ============================================

INSERT INTO lead_status_history (
    lead_id,
    estado_anterior,
    estado_nuevo,
    motivo,
    changed_by
)
SELECT
    id,
    NULL::estado_operativo,
    'NUEVO'::estado_operativo,
    'Estado inicial por defecto',
    'system'
FROM leads
WHERE lead_code IN ('L-0021','L-0015','L-0018','L-0024','L-0025','L-0026','L-0027');

-- ============================================
-- INSERTAR ERROR LOG PARA LEAD ERROR_IA
-- ============================================

INSERT INTO error_logs (
    lead_id,
    error_type,
    error_message,
    error_detail,
    raw_payload
)
SELECT
    id,
    'ERROR_IA'::error_type,
    'La IA no devolvió clasificación válida',
    '{"error": "invalid_response", "code": "IA_TIMEOUT"}',
    '{"lead_code": "L-0027", "nombre": "Error IA Test"}'::jsonb
FROM leads
WHERE lead_code = 'L-0027';

-- ============================================
-- VERIFICACIÓN
-- ============================================

SELECT 'Seed data inserted successfully' AS status;

-- Conteo por semáforo IA
SELECT
    COALESCE(lt.semaforo_ia::text, 'NULL_ERROR_IA') AS semaforo_ia,
    COUNT(*) AS total
FROM leads l
JOIN lead_triage lt ON l.id = lt.lead_id
WHERE l.lead_code IN ('L-0021','L-0015','L-0018','L-0024','L-0025','L-0026','L-0027')
GROUP BY lt.semaforo_ia
ORDER BY semaforo_ia;

-- Total registros
SELECT COUNT(*) AS total_leads
FROM leads
WHERE lead_code IN ('L-0021','L-0015','L-0018','L-0024','L-0025','L-0026','L-0027');

SELECT COUNT(*) AS total_triage
FROM lead_triage
WHERE lead_id IN (
    SELECT id FROM leads
    WHERE lead_code IN ('L-0021','L-0015','L-0018','L-0024','L-0025','L-0026','L-0027')
);

SELECT COUNT(*) AS total_status
FROM lead_status_history
WHERE lead_id IN (
    SELECT id FROM leads
    WHERE lead_code IN ('L-0021','L-0015','L-0018','L-0024','L-0025','L-0026','L-0027')
);

SELECT COUNT(*) AS total_errors
FROM error_logs
WHERE lead_id IN (
    SELECT id FROM leads
    WHERE lead_code IN ('L-0021','L-0015','L-0018','L-0024','L-0025','L-0026','L-0027')
);

COMMIT;
