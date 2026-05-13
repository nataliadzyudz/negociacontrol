# NC Control Tower - Decisions Canon

## 1. Decisiones activas

1. Endpoint canonico de entrada: `POST /api/leads`.
2. `POST /api/intake/diagnostico` queda legacy/deuda, no puerta canonica.
3. Arquitectura actual: produccion controlada V0 (manual + trazable).
4. Supabase es fuente tecnica operativa actual para leads V0.
5. Sheets permanece como legado temporal para respaldo/exportacion.
6. Produccion controlada no equivale a produccion abierta.

## 2. Decisiones pendientes

1. Aplicacion/validacion final de RLS en entorno objetivo.
2. Criterio formal de salida de modo hibrido hacia operacion plenamente canonica.
3. Politica final de retiro operativo de flujos legacy dependientes de Sheets.

## 3. Decisiones descartadas

1. Usar n8n como fuente unica de verdad del CRM.
2. Escribir directo desde frontend a base para operaciones criticas.
3. Abrir produccion masiva sin gate ni evidencia.

## 4. Deudas aceptadas (vigentes)

1. Deuda legacy de `/api/intake/diagnostico`.
2. Deuda de consolidacion documental de fases antiguas.
3. Deuda de homogeneizacion final de estado entre documentos historicos.

## 5. Principios de escalabilidad

- Escalar por evidencia, no por intuicion.
- Introducir automatizacion sensible solo con QA y rollback.
- Mantener contratos estables (API/datos) antes de ampliar capas.
- Preferir cambios pequenos, reversibles y auditables.
