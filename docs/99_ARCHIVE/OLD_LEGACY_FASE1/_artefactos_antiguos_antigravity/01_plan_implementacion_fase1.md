# Plan de Implementación — NC Lead Triage Fase 1
## Siguiente paso: Añadir IA al workflow DIAGNOSTICO en n8n

**Proyecto:** NC Lead Triage + Control Tower MVP  
**Fecha:** Mayo 2026  
**Estado:** 🟡 EN PROGRESO — pendiente de decisiones (ver abajo)

---

## Diagnóstico del estado actual

### ✅ Lo que YA funciona
| Componente | Estado |
|---|---|
| Webhook recibe datos de Tally | ✅ Funcionando |
| Code JS normaliza campos | ✅ Funcionando |
| Registro en Google Sheets (hoja `Diagnostico`) | ✅ Funcionando |
| Dashboard básico `index.html` | ✅ Construido |
| System Prompt IA clasificadora | ✅ Preparado en `docs/ia_classifier_prompt.md` |

### ❌ Lo que FALTA para cumplir el PRD Fase 1
| Gap | Impacto |
|---|---|
| Sin validación de consentimiento | Riesgo RGPD |
| Sin validación de contacto | Leads sin email/WhatsApp entran como válidos |
| Sin nodo IA clasificadora | Sin semáforo verde/amarillo/rojo |
| Sin reglas duras de seguridad | Casos sensibles sin detección |
| Sin campos IA en Google Sheets | Semaforo_IA, Resumen_IA, etc. no se guardan |
| Sin aviso interno a Natalia | No sabe cuando llega un lead rojo |

---

## Los 3 Pasos ordenados

> ⚠️ El orden es crítico. Cada paso habilita el siguiente.

---

### PASO 1 — Ampliar Google Sheets (30 min)
**Qué hay que hacer:** Añadir columnas nuevas en la hoja `Diagnostico`

| Columna nueva | Qué contendrá |
|---|---|
| `Semaforo_IA` | verde / amarillo / rojo / ERROR_IA |
| `Tipo_lead_IA` | Fiscalidad, Alta Autónomo, etc. |
| `Resumen_IA` | Resumen del caso en 2 frases |
| `Motivo_clasificacion` | Por qué recibió ese semáforo |
| `Dato_faltante` | Qué falta si es amarillo |
| `Riesgo_detectado` | TRUE / FALSE |
| `Tipo_riesgo` | Descripción o vacío |
| `Accion_recomendada` | Acción inmediata para Natalia |
| `Siguiente_accion` | Paso comercial propuesto |
| `Respuesta_sugerida` | Borrador WhatsApp/Email |
| `Requiere_revision` | TRUE / FALSE |
| `Semaforo_final` | Lo rellena Natalia manualmente |
| `Estado` | NUEVO por defecto |
| `Es_test` | TRUE si el lead es de prueba |
| `Canal_origen` | Tally, WhatsApp, Instagram... |

---

### PASO 2 — Añadir nodos IA al workflow DIAGNOSTICO en n8n (1-2h)

**Flujo objetivo:**
```
Webhook
  → Code JS (normalizar)
    → IF Consentimiento
        ✅ SÍ → IF Contacto válido
                  ✅ SÍ → IA Clasificar Lead
                            → Code JS (validar JSON IA)
                              → Google Sheets (guardar todo)
                  ❌ NO → marcar amarillo + guardar
        ❌ NO → marcar rojo + guardar
```

**Nodo 2.1 — `IF: Validar Consentimiento`**
- Tipo: `IF`
- Condición: `{{ $json.Consentimiento }}` es verdadero
- Rama FALSE → marcar rojo + bloquear

**Nodo 2.2 — `IF: Validar Contacto`**
- Condición: Email no vacío OR WhatsApp no vacío
- Rama FALSE → marcar amarillo, dato_faltante = "Sin contacto"

**Nodo 2.3 — `IA: Clasificar Lead`** ← EL NODO CENTRAL
- Tipo: OpenAI / Groq / Gemini (pendiente de decisión)
- System Message: contenido de `docs/ia_classifier_prompt.md`
- User Message:
```
Nombre: {{ $json.Nombre_y_apellidos }}
Email: {{ $json.Email }}
Idioma: {{ $json.Idioma }}
En España: {{ $json.En_Espana }}
Situación actual: {{ $json.Situacion_actual }}
Origen ingresos: {{ $json.Origen_ingresos }}
Duda principal: {{ $json.Duda_principal }}
Resumen caso: {{ $json.Resumen_caso }}
Urgencia: {{ $json.Urgencia }}
```

**Nodo 2.4 — `Code JS: Validar JSON de IA`**
- Si la IA devuelve JSON válido → mapear campos
- Si falla → marcar Estado = `ERROR_IA`

**Nodo 2.5 — `Google Sheets: Actualizar`**
- Guardar todos los campos originales + campos IA nuevos

---

### PASO 3 — Aviso interno a Natalia (30 min)

**Nodo 3.1 — `IF: ¿Es crítico?`**
- Condición: `Semaforo_IA == rojo` OR `Requiere_revision == true`

**Nodo 3.2 — `Notificar a Natalia`** (pendiente canal: Email / Telegram)
- Mensaje: Lead_ID + Nombre + Semáforo + Motivo + Acción recomendada

---

## ✅ Decisiones confirmadas

1. **Modelo de IA para el clasificador:**
   - ✅ **Groq llama-3.3-70b** — credenciales ya configuradas en n8n

2. **Canal de aviso a Natalia para leads rojos:**
   - ✅ **Telegram bot**

---

## ✅ Checklist de verificación final

- [ ] Lead de prueba llega desde Tally y aparece en Sheets
- [ ] El campo `Semaforo_IA` tiene verde/amarillo/rojo
- [ ] Lead sin consentimiento → marcado como rojo
- [ ] Lead con "fraude" → Riesgo_detectado = TRUE + rojo
- [ ] Lead con email vacío → marcado como amarillo
- [ ] Error de IA → Estado = ERROR_IA
- [ ] Dashboard muestra el semáforo correctamente
- [ ] Natalia recibe aviso cuando llega un rojo
