# Reglas no negociables NC — Desarrollo, IA, datos y operación

## 1. Principio rector

```text
Natalia decide.
La IA clasifica.
El backend valida.
Supabase guarda.
n8n automatiza.
El dashboard opera.
```

Ninguna herramienta sustituye el criterio de NEGOCIA CONTROL.

## 2. Alcance actual

La arquitectura NC evoluciona por fases:

```text
Fase 1 = Tally → n8n → Google Sheets → revisión Natalia.
Fase 2A = Supabase laboratorio.
Fase 2B = Supabase réplica.
Fase 2C = dashboard operativo controlado.
Fase 3 = Supabase fuente de verdad.
```

No saltar fases.

## 3. Prohibiciones absolutas

No construir:

```text
WhatsApp automático sensible
Email automático al lead
Pago automático productivo
Calendario productivo obligatorio
Portal cliente
Asesoramiento fiscal automático
Borrado automático de leads
Fusión automática de duplicados
Reglas IA editables sin control
Secretos en frontend
Service role en frontend
Dashboard escribiendo directo en base sin backend
```

## 4. Protección de Google Sheets

Durante Fase 2A:

```text
No tocar Google Sheets.
```

Durante Fase 2B:

```text
Google Sheets sigue mandando.
Supabase replica.
```

Durante Fase 2C:

```text
Supabase puede operar piloto.
Sheets queda respaldo/exportación.
```

Durante Fase 3:

```text
Supabase manda.
Sheets queda backup/exportación.
```

## 5. No doble fuente de verdad

No puede haber dos sistemas mandando sobre el mismo lead sin regla clara.

Incorrecto:

```text
Dashboard cambia estado en Supabase.
Natalia cambia otro estado en Sheets.
Nadie sabe cuál vale.
```

Correcto:

```text
Fase 2B: Sheets manda.
Fase 2C: Supabase manda para leads piloto.
Fase 3: Supabase manda.
```

## 6. Semáforo no es estado

Semáforo:

```text
VERDE
AMARILLO
ROJO
```

Estado:

```text
NUEVO
PENDIENTE_REVISION
FALTA_DATO
APTO_DIAGNOSTICO
DIAGNOSTICO_PROPUESTO
DIAGNOSTICO_RESERVADO
CLIENTE_ACTIVO
NO_ENCAJA
NO_CONTESTA
ERROR_IA
ARCHIVADO
```

No usar:

```text
VERDE_DIAGNOSTICO
AMARILLO_REVISAR
ROJO_NO_ENCAJA
```

## 7. Regla de riesgo

Si hay conflicto, gana el riesgo.

```text
Riesgo duro pre-IA > IA optimista.
Falta de consentimiento > cualquier oportunidad comercial.
ROJO > venta directa.
```

## 8. Regla de consentimiento

Sin consentimiento válido:

```text
registrar lead
marcar revisión
no contactar automáticamente
no enviar enlace
no vender
```

## 9. Regla de contacto

Sin email válido ni WhatsApp válido:

```text
marcar AMARILLO salvo riesgo rojo superior
pedir dato faltante
no automatizar respuesta
```

## 10. Regla de IA

La IA:

```text
clasifica
resume
propone
redacta borrador
```

La IA no:

```text
decide legalmente
promete resultados
asesora fiscalmente de forma cerrada
contacta automáticamente
actualiza producción sin validación
```

## 11. Regla del backend

El backend:

```text
valida payload
convierte tipos
aplica reglas finales
registra errores
escribe en Supabase
protege secretos
```

## 12. Regla del dashboard

El dashboard:

```text
muestra
ayuda a operar
permite notas
permite cambios auditados
permite copiar respuesta sugerida
```

El dashboard no:

```text
envía mensajes automáticos
borra leads
expone secretos
salta backend en operaciones críticas
```

## 13. Regla de n8n

n8n:

```text
orquesta automatizaciones
recibe Tally
ejecuta DIAGNOSTICO.json
replica datos
lanza avisos internos
consume eventos
```

n8n no debe convertirse en:

```text
CRM principal
fuente única de verdad
sistema de permisos
base de datos operativa final
```

## 14. Seguridad mínima

Obligatorio:

```text
variables de entorno
no service_role en frontend
RLS preparada
backend para escrituras críticas
logs de error
eventos auditados
mínimos datos necesarios
```

## 15. RGPD y prudencia operativa

Obligatorio:

```text
consentimiento visible
trazabilidad de tratamiento
minimización de datos
no automatizar respuestas sensibles
revisión humana en casos rojos
no prometer resultados
```

## 16. Rollback obligatorio

Toda fase debe tener rollback.

Fase 2B:

```text
desactivar réplica a Supabase
seguir con Sheets
```

Fase 2C:

```text
congelar dashboard operativo
volver a Sheets
revisar errores
```

Fase 3:

```text
congelar escrituras
exportar datos
revisar logs
activar operación mínima desde backup si hace falta
```

## 17. Regla económica

No usar el PRD maestro completo en cada prompt.

Usar solo:

```text
documento de fase actual
contrato de datos
reglas no negociables
```

Ejemplo:

```text
01_FASE2A + 05_CONTRATO + 06_REGLAS
```

No:

```text
todo el PRD v2 completo para cada tarea
```

## 18. Regla para Antigravity/OpenCode

Todo prompt debe incluir:

```text
Construye solo la fase indicada.
No construyas fases futuras.
Si algo pertenece a una fase posterior, documéntalo como TODO_FUTURO y no lo implementes.
No envíes mensajes automáticos.
No apagues Google Sheets salvo que la fase lo indique explícitamente.
No expongas secretos.
```

## 19. Definition of Done global

Una fase solo se considera terminada cuando:

```text
cumple criterios de aceptación
no rompe la fase anterior
tiene rollback
no abre automatizaciones sensibles
no mezcla semáforo y estado
no pierde leads
registra errores
mantiene trazabilidad
```

## 20. Frase de gobierno NC

```text
No migramos por ilusión técnica.
Migramos cuando el sistema demuestre control.
```
