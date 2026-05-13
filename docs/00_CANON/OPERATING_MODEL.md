# NC Control Tower - Operating Model Canon

## 1. Principio rector

`Natalia decide. La IA clasifica. El backend valida. Supabase guarda. n8n automatiza. El dashboard opera.`

## 2. Regla operacional clave

- Semaforo IA y estado operativo son cosas distintas.
- El semaforo orienta riesgo.
- El estado marca fase operativa del lead.

## 3. Consentimiento y riesgo

- Sin consentimiento valido: no contacto automatico.
- Si hay conflicto, gana el riesgo.
- Casos rojos o sensibles requieren revision humana.

## 4. Limites IA

La IA puede:

- clasificar
- resumir
- proponer siguiente accion

La IA no puede:

- decidir legalmente
- prometer resultados
- ejecutar automatizacion sensible sin control humano

## 5. Modo V0 controlado

- Produccion controlada, no produccion abierta.
- Operacion con trazabilidad y rollback.
- Revision humana obligatoria en decisiones criticas.

## 6. Modelo hibrido actual

- Canon tecnico de entrada actual: backend `POST /api/leads`.
- Supabase es almacenamiento operativo.
- Sheets queda como legado temporal de respaldo/exportacion.

## 7. Flujo operativo lead (V0)

1. Entrada de lead.
2. Clasificacion IA.
3. Revision interna.
4. Accion manual priorizada.
5. Seguimiento y trazabilidad.

## 8. Prioridades de operacion diaria

1. Leads con riesgo/consentimiento pendiente.
2. Leads urgentes sin contacto.
3. Leads con siguiente accion bloqueada.
4. Leads listos para avance de estado.

## 9. No automatizacion sensible

No habilitar en V0 controlada:

- contacto sensible automatico
- respuestas definitivas sin revision
- acciones irreversibles sin validacion humana
