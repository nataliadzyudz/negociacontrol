# TASK_2C_6_MIGRACION_DIAGNOSTICO_SUPABASE.md

**Fase:** 2C  
**Estado:** COMPLETADA  
**Fecha:** 2026-05-08

---

## 1. Objetivo

Migrar workflow DIAGNOSTICO para escribir en Supabase
manteniendo n8n como entrada y Google Sheets como salida paralela.

## 2. Configuración Confirmada

- Entrada: n8n Webhook (mantener existente)
- Salida 1: Supabase (leads table) - NUEVO
- Salida 2: Google Sheets (mantener)
- Modo: Test primero (Es_test=true)

---

## 3. READ_SET

- n8n_workflows/DIAGNOSTICO.json
- backend/routes/leads.js
- backend/.env
- backend/supabase.js

---

## 4. WRITE_SET

- backend/routes/leads.js (agregar endpoint para DIAGNOSTICO)
- n8n_workflows/lab/ (crear workflow test)

---

## 5. DO_NOT_TOUCH

- DIAGNOSTICO.json original (productivo)
- Sheets de producción
- Datos reales en Supabase

---

## 6. Criterios de Aceptación

| ID | Criterio | KPI | Resultado |
|----|---------|-----|-----------|
| CA-1 | n8n recibe lead | Webhook POST OK | PENDIENTE |
| CA-2 | Backend procesa | HTTP 200 OK | PENDIENTE |
| CA-3 | Escribe en Supabase | INSERT OK | PENDIENTE |
| CA-4 | Escribe en Sheets | Append OK | PENDIENTE |
| CA-5 | Es_test=true | Campo presente | PENDIENTE |
| CA-6 | Duplicado evitado | Lead_ID único | PENDIENTE |

---

## 7. Plan de Ejecución

### Paso 1: Adaptar backend
- Agregar endpoint POST /api/leads/diagnostico
- Aceptar formato DIAGNOSTICO
- Escribir en Supabase (Es_test=true)
- Devolver respuesta para n8n

### Paso 2: Crear n8n workflow test
- Copiar DIAGNOSTICO.json → lab/NC_DIAGNOSTICO_TEST.json
- Modificar nodes de salida: agregar HTTP Request a backend
- Mantener Google Sheets append

### Paso 3: Testing
- Enviar test lead via webhook
- Verificar Supabase: INSERT OK
- Verificar Sheets: Row added

---

## 8. RESULTADOS

| ID | Descripción | Resultado |
|----|-------------|----------|
| 1 | Endpoint POST /api/leads/diagnostico creado | ✅ COMPLETADO |
| 2 | Mapeo DIAGNOSTICO → Supabase schema | ✅ COMPLETADO |
| 3 | Detección de duplicados por lead_code | ✅ COMPLETADO |
| 4 | Es_test automático | ✅ COMPLETADO |
| 5 | Lead migrado a Fase 3 | ✅ LISTO |