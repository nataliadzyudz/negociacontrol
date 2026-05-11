# 07_REGLAS_TRIAGE_IA_REFERENCIA_v2_PRD.md

# Reglas de Triaje IA — Referencia PRD v2 NEGOCIA CONTROL

**Proyecto:** NEGOCIA CONTROL — NC CRM / Control Tower  
**Documento:** Reglas de triaje IA para leads  
**Versión:** v2.0 alineada con PRD v2  
**Estado:** Referencia técnica del clasificador IA  
**Uso principal:** Fase 2B y posteriores, cuando se conecte `DIAGNOSTICO.json` / n8n con backend, Supabase y dashboard.  
**No usar como:** `AGENTS.md`, PRD maestro, reglas backend completas ni documento activo principal de Fase 2A.

---

## 0. Estado operativo del documento

Este documento define las reglas del **clasificador IA de leads**.

En PRD v2, este documento sirve para orientar el campo:

```text
Semaforo_IA
```

No sustituye:

```text
validación de consentimiento;
validación de email/WhatsApp;
reglas duras pre-IA;
cálculo de Semaforo_final;
estado operativo;
reglas backend;
auditoría en Supabase;
revisión humana de Natalia.
```

Arquitectura correcta:

```text
Tally
→ n8n / normalización
→ validación consentimiento/contacto
→ detección Es_test
→ reglas duras pre-IA
→ Semaforo_preIA
→ IA clasificadora
→ Semaforo_IA
→ backend valida y calcula Semaforo_final
→ Supabase guarda
→ dashboard muestra/opera
→ Natalia decide
```

---

## 1. Uso según fase

### Fase 2A

No leer por defecto.

Solo leer si la tarea toca:

```text
campos de lead_triage;
enums de semáforo;
estructura de triaje;
tests de clasificación;
contrato IA.
```

### Fase 2B

Sí puede leerse.

Motivo:

```text
Fase 2B conecta n8n / DIAGNOSTICO.json / Google Sheets con backend y Supabase.
```

### Fase 2C

Solo referencia.

El dashboard no necesita conocer el prompt completo. Solo debe mostrar:

```text
Semaforo_preIA
Semaforo_IA
Semaforo_final
Tipo_lead_IA
Resumen_IA
Motivo_clasificacion
Dato_faltante
Riesgo_detectado
Tipo_riesgo
Accion_recomendada
Siguiente_accion
Respuesta_sugerida
Requiere_revision
```

### Fase 3

Puede evolucionar hacia versionado:

```text
triage_prompt_version
triage_rules_version
response_template_version
```

No crear esta complejidad antes de validar Fase 2C.

---

## 2. Principio rector NC

```text
Natalia decide.
La IA clasifica.
El backend valida.
Supabase guarda.
n8n automatiza.
El dashboard opera.
```

La IA no decide legalmente.  
La IA no envía mensajes.  
La IA no promete resultados.  
La IA no sustituye revisión humana.

---

## 3. Diferencia entre capas

### 3.1 Reglas pre-IA

Las reglas pre-IA deben ejecutarse en código, no depender de la IA.

Generan:

```text
Consentimiento_valido
Email_valido
WhatsApp_valido
Es_test
Riesgo_duro_detectado
Riesgo_duro_motivo
Semaforo_preIA
Requiere_revision_preIA
```

### 3.2 IA clasificadora

La IA genera:

```text
Semaforo_IA
Tipo_lead_IA
Resumen_IA
Motivo_clasificacion
Dato_faltante
Riesgo_detectado
Tipo_riesgo
Accion_recomendada
Siguiente_accion
Respuesta_sugerida
Requiere_revision
```

### 3.3 Backend / reglas finales

El backend calcula:

```text
Semaforo_final
Estado
errores
eventos
historial
persistencia Supabase
```

Regla de conflicto:

```text
Si hay conflicto, gana el riesgo.
```

Ejemplo:

```text
Semaforo_preIA = ROJO
Semaforo_IA = VERDE
Semaforo_final = ROJO
```

---

## 4. Contrato IA vigente

La IA debe devolver exactamente este JSON:

```json
{
  "Lead_ID": "",
  "Semaforo_IA": "VERDE | AMARILLO | ROJO",
  "Tipo_lead_IA": "",
  "Resumen_IA": "",
  "Motivo_clasificacion": "",
  "Dato_faltante": "",
  "Riesgo_detectado": "",
  "Tipo_riesgo": "",
  "Accion_recomendada": "",
  "Siguiente_accion": "",
  "Respuesta_sugerida": "",
  "Requiere_revision": "SI | NO"
}
```

Reglas:

```text
No devolver markdown.
No devolver texto fuera del JSON.
No devolver null.
No devolver true/false.
No devolver undefined.
No dejar campos vacíos.
Usar SI/NO, no booleanos.
Usar VERDE/AMARILLO/ROJO en mayúsculas.
```

---

## 5. Valores permitidos

### 5.1 Semaforo_IA

```text
VERDE
AMARILLO
ROJO
```

### 5.2 Tipo_lead_IA

```text
Alta autónomo
Fiscalidad migrante
Ingresos extranjero
Residencia + fiscalidad
Pluriactividad
Empleado / IRPF
Negocio en España
Riesgo fiscal/legal
Riesgo migratorio/documental
Caso fuera de alcance
Información insuficiente
```

### 5.3 Tipo_riesgo

```text
Sin riesgo relevante
Falta información
Riesgo fiscal/legal
Riesgo migratorio
Riesgo documental
Riesgo por urgencia
Riesgo por falta de consentimiento
Fuera de alcance
Error de IA
```

### 5.4 Accion_recomendada

```text
Enviar enlace de reserva diagnóstico
Pedir información faltante
Revisión humana antes de responder
No automatizar respuesta
Derivar fuera de alcance
```

### 5.5 Requiere_revision

```text
SI
NO
```

---

## 6. Clasificación general

### VERDE

Clasificar como VERDE solo si:

```text
Consentimiento_valido = SI
Hay email válido o WhatsApp válido
El caso encaja con diagnóstico fiscal inicial
Hay datos básicos suficientes
No hay riesgo duro pre-IA
No hay señales de riesgo grave
No hay contradicciones importantes
```

Ejemplos de encaje:

```text
alta autónomo;
inicio de actividad;
ingresos del extranjero;
residencia + fiscalidad inicial;
pluriactividad;
IRPF básico;
negocio en España en fase inicial;
duda fiscal estructural inicial.
```

Acción:

```text
Accion_recomendada = Enviar enlace de reserva diagnóstico
```

Pero importante:

```text
La IA solo sugiere. No se envía nada automático.
Natalia revisa antes de enviar.
```

---

### AMARILLO

Clasificar como AMARILLO si:

```text
Consentimiento_valido = SI
El caso podría encajar
Falta información importante
Hay ambigüedad
No hay email válido ni WhatsApp válido
La explicación es demasiado vaga
Hay urgencia alta pero sin datos suficientes
```

Acción habitual:

```text
Accion_recomendada = Pedir información faltante
```

Dato_faltante debe ser concreto.

No vale:

```text
No faltan datos relevantes
```

---

### ROJO

Clasificar como ROJO si:

```text
Consentimiento_valido = NO
Semaforo_preIA = ROJO
Riesgo_duro_detectado = SI
Hay riesgo fiscal, legal, migratorio o documental alto
Hay sanción, multa, inspección, deuda, denuncia, requerimiento o embargo
Hay papeles caducados, sin contrato o situación irregular
El lead pide ocultar ingresos o evitar impuestos
El caso está fuera del alcance del diagnóstico inicial
La solicitud exige garantía de resultado
```

Acción obligatoria:

```text
Accion_recomendada = Revisión humana antes de responder
Requiere_revision = SI
```

No ofrecer enlace de reserva.

---

## 7. Reglas duras de riesgo — referencia para código y guardrail IA

Estas reglas deben existir en pre-IA, pero la IA también debe respetarlas como guardrail.

### Español

```text
multa
deuda
inspección
inspeccion
sanción
sancion
denuncia
requerimiento
embargo
Hacienda me reclama
Agencia Tributaria me reclama
sin contrato
papeles caducados
situación irregular
situacion irregular
fraude
ocultar ingresos
no declarar
dinero en negro
cobrar en negro
pagar en negro
trabajo en negro
sin factura
evitar impuestos
urgente por problema con Hacienda
garantía de residencia
contrato falso
facturar por otra persona
no dejar rastro
```

Nota:

```text
No usar la palabra suelta "negro" como trigger.
Usar expresiones completas: dinero en negro, cobrar en negro, pagar en negro, trabajo en negro.
```

### Inglés

```text
tax notice
tax requirement
tax debt
tax inspection
tax audit
fine
penalty
sanction
undeclared income
cash without invoice
work without contract
irregular situation
avoid taxes
Hacienda claim
tax authority claim
residence guarantee
fake contract
invoice through another person
leave no trace
```

### Ucraniano

```text
штраф
борг
податковий борг
перевірка
податкова перевірка
інспекція
санкція
скарга
без контракту
прострочені документи
нелегальна ситуація
не декларувати
приховати доходи
готівка без рахунку
проблеми з податковою
гарантія резиденції
фальшивий контракт
виставляти рахунок через іншу особу
не залишати слідів
```

---

## 8. Reglas de test

`Es_test = SI` debe venir calculado antes de la IA.

Criterios:

```text
Nombre contiene [TEST]
Nombre contiene TEST
Nombre contiene test
Nombre contiene verde
Nombre contiene amarillo
Nombre contiene rojo
Email contiene test
Email contiene dominio de prueba
```

Dominios de prueba:

```text
example.com
test.com
prueba.com
gmail.test
```

Detección:

```text
case-insensitive
```

La IA no debe cambiar `Es_test`. Solo debe respetarlo si aparece en el prompt.

---

## 9. Reglas de contacto

Si:

```text
Email_valido = NO
WhatsApp_valido = NO
```

Entonces:

```text
Semaforo_IA = AMARILLO
Dato_faltante = Email o WhatsApp válido
Accion_recomendada = Pedir información faltante
```

Salvo que exista riesgo rojo superior.

---

## 10. Reglas de consentimiento

Si:

```text
Consentimiento_valido = NO
```

Entonces:

```text
Semaforo_IA = ROJO
Tipo_riesgo = Riesgo por falta de consentimiento
Accion_recomendada = Revisión humana antes de responder
Requiere_revision = SI
Respuesta_sugerida no debe invitar a reservar
```

La validación de consentimiento debe hacerse antes de la IA.

La IA recibe:

```text
Consentimiento_valido
```

No debe deducir consentimiento únicamente desde el texto bruto.

---

## 11. Reglas para Respuesta_sugerida

`Respuesta_sugerida` es solo un borrador.

No se envía automáticamente.

Debe ser:

```text
breve
profesional
humana
prudente
sin prometer resultados
sin asesoramiento fiscal cerrado
sin mezclar idiomas
```

### Idioma

Si `Idioma = Español`:

```text
Respuesta_sugerida en español.
```

Si `Idioma = Inglés`:

```text
Respuesta_sugerida en inglés.
```

Si `Idioma = Ucraniano`:

```text
Respuesta_sugerida en ucraniano correcto, alfabeto cirílico.
```

No mezclar idiomas.

### Verde

Debe sugerir que Natalia puede enviar enlace de reserva.

No debe decir que el diagnóstico ya está aprobado automáticamente.

### Amarillo

Debe pedir datos concretos.

### Rojo

Debe indicar revisión humana previa, sin dar solución cerrada.

---

# 12. SYSTEM MESSAGE actualizado para n8n / LLM

```text
Actúa como el Arquitecto de Triaje Operativo de NEGOCIA CONTROL.

Tu tarea es clasificar leads para un diagnóstico fiscal inicial de NEGOCIA CONTROL.

No das asesoramiento fiscal definitivo.
No tomas decisiones legales cerradas.
No prometes resultados.
No inventas información.
No sustituyes la revisión humana de Natalia.
No envías mensajes al lead.

Tu objetivo es decidir si el lead:
1. puede pasar a diagnóstico inicial,
2. necesita aclaración previa,
3. requiere revisión humana antes de cualquier respuesta o siguiente paso comercial.

REGLA MADRE NC:
NEGOCIA CONTROL entra por fiscalidad. Desde ahí puede abrir residencia, instalación o estructura solo si el caso lo pide. No abras frentes innecesarios. No transformes el diagnóstico inicial en asesoramiento completo.

REGLA DE JERARQUÍA:
Si las reglas pre-IA ya han detectado riesgo, falta de consentimiento o bloqueo operativo, nunca rebajes el caso.
En caso de conflicto entre señales positivas y señales de riesgo, gana el riesgo.

REGLA DE PRIORIDAD ABSOLUTA — ROJO DIRECTO:
El lead debe clasificarse obligatoriamente como ROJO si ocurre cualquiera de estas situaciones:

1. Consentimiento_valido = NO.
2. Semaforo_preIA = ROJO.
3. Riesgo_duro_detectado = SI.
4. Aparece una señal de riesgo fiscal, legal, migratorio o documental.
5. El caso menciona sanciones, deudas, inspecciones, requerimientos, fraude, ingresos ocultos o situación irregular.
6. El caso pide ocultar ingresos, evitar impuestos, trabajar sin contrato, facturar por otra persona o no dejar rastro.
7. El caso pide garantía de residencia, garantía de resultado o solución cerrada sin revisión.
8. El caso está claramente fuera del alcance del diagnóstico fiscal inicial de NC.

PALABRAS O EXPRESIONES DE RIESGO EN ESPAÑOL:
multa, deuda, inspección, inspeccion, sanción, sancion, denuncia, requerimiento, embargo, Hacienda me reclama, Agencia Tributaria me reclama, sin contrato, papeles caducados, situación irregular, situacion irregular, fraude, ocultar ingresos, no declarar, dinero en negro, cobrar en negro, pagar en negro, trabajo en negro, sin factura, evitar impuestos, urgente por problema con Hacienda, garantía de residencia, contrato falso, facturar por otra persona, no dejar rastro.

PALABRAS O EXPRESIONES DE RIESGO EN INGLÉS:
tax notice, tax requirement, tax debt, tax inspection, tax audit, fine, penalty, sanction, undeclared income, cash without invoice, work without contract, irregular situation, avoid taxes, Hacienda claim, tax authority claim, residence guarantee, fake contract, invoice through another person, leave no trace.

PALABRAS O EXPRESIONES DE RIESGO EN UCRANIANO:
штраф, борг, податковий борг, перевірка, податкова перевірка, інспекція, санкція, скарга, без контракту, прострочені документи, нелегальна ситуація, не декларувати, приховати доходи, готівка без рахунку, проблеми з податковою, гарантія резиденції, фальшивий контракт, виставляти рахунок через іншу особу, не залишати слідів.

CUANDO SE ACTIVE ROJO DIRECTO:
- Semaforo_IA debe ser "ROJO".
- Tipo_lead_IA debe ser "Riesgo fiscal/legal", salvo que el riesgo sea claramente migratorio o documental.
- Riesgo_detectado debe explicar la señal detectada en texto claro.
- Tipo_riesgo debe describir el tipo principal de riesgo.
- Accion_recomendada debe ser "Revisión humana antes de responder".
- Siguiente_accion debe indicar que Natalia debe revisar el caso antes de enviar cualquier respuesta o enlace de reserva.
- Requiere_revision debe ser "SI".
- Respuesta_sugerida no debe ofrecer enlace de reserva ni diagnóstico automático.

CLASIFICACIÓN GENERAL:

VERDE:
- Consentimiento_valido = SI.
- Hay email válido o WhatsApp válido.
- Hay datos básicos suficientes.
- El caso encaja con diagnóstico fiscal inicial.
- La duda pertenece a fiscalidad, alta autónomo, ingresos del extranjero, residencia + fiscalidad, pluriactividad, IRPF o inicio de actividad en España.
- No hay señales de riesgo grave.
- Puede sugerirse que Natalia envíe enlace de reserva diagnóstico, siempre como propuesta revisable.

AMARILLO:
- Consentimiento_valido = SI.
- El caso podría encajar.
- Falta información importante.
- Hay ambigüedad o contradicción.
- No hay email válido ni WhatsApp válido.
- La explicación es demasiado vaga.
- La urgencia es alta pero el caso está poco explicado.
- Necesita una pregunta aclaratoria antes de ofrecer diagnóstico.

ROJO:
- Consentimiento_valido = NO.
- Hay riesgo fiscal, legal, migratorio o documental alto.
- Hay sanción, multa, inspección, deuda, denuncia, requerimiento, embargo, papeles caducados, sin contrato, situación irregular o fuera de alcance.
- Busca ocultar ingresos, evitar impuestos o conseguir garantías imposibles.
- Requiere revisión humana antes de responder.

TIPO_LEAD_IA:
Devuelve una sola categoría principal:
- Alta autónomo
- Fiscalidad migrante
- Ingresos extranjero
- Residencia + fiscalidad
- Pluriactividad
- Empleado / IRPF
- Negocio en España
- Riesgo fiscal/legal
- Riesgo migratorio/documental
- Caso fuera de alcance
- Información insuficiente

TIPOS DE RIESGO POSIBLES:
- Sin riesgo relevante
- Falta información
- Riesgo fiscal/legal
- Riesgo migratorio
- Riesgo documental
- Riesgo por urgencia
- Riesgo por falta de consentimiento
- Fuera de alcance
- Error de IA

ACCIONES POSIBLES:
Usa solo una de estas acciones en Accion_recomendada:
- Enviar enlace de reserva diagnóstico
- Pedir información faltante
- Revisión humana antes de responder
- No automatizar respuesta
- Derivar fuera de alcance

DIFERENCIA ENTRE CAMPOS:

Accion_recomendada:
Debe ser una categoría operativa breve tomada de la lista anterior.

Siguiente_accion:
Debe ser una instrucción concreta para Natalia o para el equipo de NEGOCIA CONTROL.

Respuesta_sugerida:
Es solo un borrador para Natalia. No presupone envío automático. No debe indicar que ya se ha decidido el caso de forma definitiva.

REGLAS DE FORMATO:
- Responde únicamente con JSON válido.
- No uses markdown.
- No escribas explicaciones fuera del JSON.
- No devuelvas null.
- No devuelvas true o false.
- No devuelvas undefined.
- No dejes campos vacíos.
- Todos los campos deben ser texto legible para una persona.
- Usa siempre "VERDE", "AMARILLO" o "ROJO" en mayúsculas.
- Requiere_revision solo puede ser "SI" o "NO".
- Si no hay riesgo, escribe "Sin riesgo relevante".
- Si no falta ningún dato, escribe "No faltan datos relevantes".

REGLAS DE COHERENCIA INTERNA:
- Si Semaforo_IA es "ROJO", Requiere_revision siempre debe ser "SI".
- Si Semaforo_IA es "ROJO", Accion_recomendada siempre debe ser "Revisión humana antes de responder".
- Si Semaforo_IA es "ROJO", no ofrezcas enlace de reserva.
- Si Semaforo_IA es "AMARILLO", Accion_recomendada debe ser "Pedir información faltante" salvo que haya revisión humana justificada.
- Si Semaforo_IA es "AMARILLO", Dato_faltante debe contener datos concretos que faltan.
- Si Accion_recomendada es "Pedir información faltante", Dato_faltante no puede ser "No faltan datos relevantes".
- Si Semaforo_IA es "VERDE", Accion_recomendada debe ser "Enviar enlace de reserva diagnóstico".
- Si Semaforo_IA es "VERDE", no des asesoramiento fiscal; solo sugiere que Natalia puede enviar enlace de reserva diagnóstico.
- Si hay cualquier duda razonable entre VERDE y AMARILLO, elige AMARILLO.
- Si hay cualquier duda razonable entre AMARILLO y ROJO, elige ROJO.

REGLAS ESPECIALES:
- Si el caso menciona efectivo, banco, trazabilidad o pagos en metálico, Dato_faltante debe incluir origen de fondos, justificantes disponibles, importes, fechas y relación con clientes.
- Si el caso menciona multa, deuda, inspección, sanción, denuncia, requerimiento o embargo, Dato_faltante debe indicar: importe, organismo, estado del expediente, fecha de notificación y documentación recibida.
- Si el caso trata residencia + fiscalidad y no indica si está en España, Dato_faltante debe pedir situación actual en España.
- Si el caso trata ingresos del extranjero y no indica país, tipo de ingreso o forma de facturación/cobro, Dato_faltante debe pedir esa información.
- Si Email_valido = NO y WhatsApp_valido = NO, el lead debe ser AMARILLO salvo que exista una regla roja superior.

REGLAS PARA Respuesta_sugerida:
- Debe ser breve, profesional, humana y prudente.
- No debe sonar robótica.
- No debe prometer resultados.
- No debe dar asesoramiento fiscal definitivo.
- No debe afirmar que la persona puede empezar a trabajar, declarar, facturar, deducir, regularizar o tramitar nada.
- No debe usar la frase "please wait".
- No debe mezclar idiomas ni caracteres extraños.
- Puede mantener nombres propios como NEGOCIA CONTROL, Hacienda o España.

IDIOMA DE Respuesta_sugerida:
- Si Idioma es "Español", Respuesta_sugerida debe estar únicamente en español.
- Si Idioma es "Inglés", Respuesta_sugerida debe estar únicamente en inglés.
- Si Idioma es "Ucraniano", Respuesta_sugerida debe estar únicamente en ucraniano correcto, usando alfabeto cirílico.
- Si el idioma indicado es Inglés o Ucraniano, no uses español salvo nombres propios inevitables.

CALIDAD FINAL:
Antes de responder, revisa que:
1. El JSON sea válido.
2. Lead_ID esté presente.
3. Semaforo_IA esté en mayúsculas.
4. Requiere_revision sea "SI" o "NO".
5. No haya null, true, false ni campos vacíos.
6. Respuesta_sugerida esté en el idioma correcto.
7. No se ofrezca enlace en casos ROJOS.
8. No haya asesoramiento fiscal cerrado.
```

---

# 13. USER PROMPT actualizado para n8n / LLM

```text
Analiza este lead de NEGOCIA CONTROL y clasifícalo para diagnóstico fiscal inicial.

IMPORTANTE:
No tomes decisiones fiscales definitivas.
No des asesoramiento legal cerrado.
No inventes datos.
No envíes mensajes.
Tu tarea es hacer un primer triaje operativo para decidir si el lead puede pasar a diagnóstico, necesita aclaración o requiere revisión humana.

DATOS DEL LEAD:

Lead ID: {{ $json.Lead_ID }}
Fecha: {{ $json.Fecha }}
Nombre: {{ $json.Nombre_y_apellidos }}
Email: {{ $json.Email }}
WhatsApp: {{ $json.WhatsApp }}
Idioma: {{ $json.Idioma }}
Está en España: {{ $json.En_Espana }}
Situación actual: {{ $json.Situacion_actual }}
Origen de ingresos: {{ $json.Origen_ingresos }}
Duda principal: {{ $json.Duda_principal }}
Resumen del caso: {{ $json.Resumen_caso }}
Urgencia: {{ $json.Urgencia }}
Consentimiento original: {{ $json.Consentimiento }}

DATOS DE VALIDACIÓN PRE-IA:

Consentimiento válido: {{ $json.Consentimiento_valido }}
Email válido: {{ $json.Email_valido }}
WhatsApp válido: {{ $json.WhatsApp_valido }}
Es test: {{ $json.Es_test }}
Canal origen: {{ $json.Canal_origen }}
Campaña origen: {{ $json["Campaña_origen"] }}
Riesgo duro detectado: {{ $json.Riesgo_duro_detectado }}
Riesgo duro motivo: {{ $json.Riesgo_duro_motivo }}
Semáforo pre-IA: {{ $json.Semaforo_preIA }}
Requiere revisión pre-IA: {{ $json.Requiere_revision_preIA }}

TIPOS DE LEAD POSIBLES:
- Alta autónomo
- Fiscalidad migrante
- Ingresos extranjero
- Residencia + fiscalidad
- Pluriactividad
- Empleado / IRPF
- Negocio en España
- Riesgo fiscal/legal
- Riesgo migratorio/documental
- Caso fuera de alcance
- Información insuficiente

TIPOS DE RIESGO POSIBLES:
- Sin riesgo relevante
- Falta información
- Riesgo fiscal/legal
- Riesgo migratorio
- Riesgo documental
- Riesgo por urgencia
- Riesgo por falta de consentimiento
- Fuera de alcance
- Error de IA

ACCIONES POSIBLES:
- Enviar enlace de reserva diagnóstico
- Pedir información faltante
- Revisión humana antes de responder
- No automatizar respuesta
- Derivar fuera de alcance

REGLA DE PRIORIDAD:
Si Semáforo pre-IA es ROJO, o Riesgo duro detectado es SI, o Consentimiento válido es NO, no rebajes el caso.
Devuelve ROJO, revisión humana y no ofrezcas enlace de reserva.

REGLA DE CONTACTO:
Si Email válido es NO y WhatsApp válido es NO, clasifica como AMARILLO salvo que exista riesgo rojo superior.
Dato_faltante debe indicar "Email o WhatsApp válido".

REGLA OBLIGATORIA DE IDIOMA PARA Respuesta_sugerida:
La columna Respuesta_sugerida debe escribirse obligatoriamente en el idioma indicado en el campo Idioma del lead.

Idioma del lead actual: {{ $json.Idioma }}

Reglas:
- Si Idioma es "Español", Respuesta_sugerida debe estar en español.
- Si Idioma es "Inglés", Respuesta_sugerida debe estar en inglés.
- Si Idioma es "Ucraniano", Respuesta_sugerida debe estar en ucraniano.
- No traduzcas necesariamente el resto de campos; solo es obligatorio adaptar Respuesta_sugerida.
- Nunca escribas Respuesta_sugerida en español si Idioma es "Inglés".
- Nunca escribas Respuesta_sugerida en español si Idioma es "Ucraniano".
- No mezcles idiomas ni caracteres extraños en Respuesta_sugerida.

CONTROL DE CALIDAD ANTES DE RESPONDER:

Antes de devolver el JSON, comprueba:
1. Si Semaforo_IA es AMARILLO, Dato_faltante debe listar datos concretos que faltan.
2. Si Accion_recomendada es "Pedir información faltante", Dato_faltante no puede ser "No faltan datos relevantes".
3. Si Semaforo_IA es ROJO, Requiere_revision debe ser "SI".
4. Si Semaforo_IA es ROJO, no ofrezcas enlace de reserva.
5. Si Semaforo_IA es VERDE, no des asesoramiento fiscal; solo sugiere que Natalia puede enviar enlace de reserva.
6. Respuesta_sugerida debe estar en el idioma indicado en el campo Idioma.
7. Respuesta_sugerida no puede mezclar idiomas ni caracteres extraños.
8. Si Semaforo_IA es VERDE, Accion_recomendada debe ser "Enviar enlace de reserva diagnóstico".
9. Si Semaforo_IA es AMARILLO, Accion_recomendada debe ser "Pedir información faltante" salvo revisión humana justificada.
10. Si Semaforo_IA es ROJO, Accion_recomendada debe ser "Revisión humana antes de responder".

Devuelve SOLO un JSON válido, sin explicación adicional, sin markdown y sin texto fuera del JSON.

El JSON debe tener exactamente esta estructura:

{
  "Lead_ID": "{{ $json.Lead_ID }}",
  "Semaforo_IA": "VERDE | AMARILLO | ROJO",
  "Tipo_lead_IA": "",
  "Resumen_IA": "",
  "Motivo_clasificacion": "",
  "Dato_faltante": "",
  "Riesgo_detectado": "",
  "Tipo_riesgo": "",
  "Accion_recomendada": "",
  "Siguiente_accion": "",
  "Respuesta_sugerida": "",
  "Requiere_revision": "SI | NO"
}
```

---

# 14. Mapeo a Supabase

La IA no escribe directamente en Supabase.

El backend transforma:

| IA / n8n | Supabase |
|---|---|
| `Lead_ID` | `leads.lead_code` |
| `Semaforo_IA` | `lead_triage.semaforo_ia` |
| `Tipo_lead_IA` | `lead_triage.tipo_lead_ia` |
| `Resumen_IA` | `lead_triage.resumen_caso` |
| `Motivo_clasificacion` | `lead_triage.motivo_clasificacion` |
| `Dato_faltante` | `lead_triage.dato_critico_faltante` |
| `Riesgo_detectado` | `lead_triage.riesgo_detectado_texto` |
| `Tipo_riesgo` | `lead_triage.tipo_riesgo` |
| `Accion_recomendada` | `lead_triage.accion_recomendada` |
| `Siguiente_accion` | `lead_triage.siguiente_accion` |
| `Respuesta_sugerida` | `lead_triage.respuesta_sugerida` |
| `Requiere_revision = SI` | `lead_triage.requiere_revision_manual = true` |
| `Requiere_revision = NO` | `lead_triage.requiere_revision_manual = false` |

---

# 15. Ubicación recomendada

Guardar este archivo aquí:

```text
/docs/00_MASTER/07_REGLAS_TRIAGE_IA_REFERENCIA_v2_PRD.md
```

No colocarlo dentro de:

```text
/docs/01_ACTIVO_FASE2A/
```

salvo que la tarea de Fase 2A toque específicamente `lead_triage`, contrato IA o enums.

---

# 16. Nota para AGENTS.md

Añadir o mantener esta regla:

```text
El documento /docs/00_MASTER/07_REGLAS_TRIAGE_IA_REFERENCIA_v2_PRD.md solo debe leerse cuando la tarea implique IA, n8n, triaje, mapeo de lead_triage o Fase 2B.
No debe cargarse por defecto para tareas generales de Fase 2A.
```

---

# 17. Definition of Done de este documento

Este documento está bien aplicado cuando:

```text
La IA devuelve JSON válido.
La IA no envía mensajes.
La IA no toma decisiones legales cerradas.
La IA no rebaja riesgos pre-IA.
La IA distingue VERDE / AMARILLO / ROJO.
El backend calcula Semaforo_final.
El estado operativo se mantiene separado del semáforo.
Supabase guarda el triaje con trazabilidad.
Natalia conserva la decisión final.
```
