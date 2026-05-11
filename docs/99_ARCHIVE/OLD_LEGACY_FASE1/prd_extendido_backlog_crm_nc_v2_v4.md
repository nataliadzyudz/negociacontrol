Aquí tienes la versión expandida con detalle operativo real, pensada para tu entrega de Antigravity/Stitch y alineada con NC + n8n + Tally + Google Sheets.
# Product Requirements Document (PRD)
## CRM de Gestión de Leads y Diagnóstico Inicial — NEGOCIA CONTROL

**Versión:** 1.0 — MVP Operativo  
**Fecha:** Abril 2026  
**Autor:** Arquitectura de Producto / NEGOCIA CONTROL  
**Estado:** Borrador para revisión  
**Regla de Oro:** Usa el PRD como única fuente de verdad. Construye por fases. No amplíes alcance sin justificarlo.

---

## Índice

1. [Resumen Ejecutivo](#1-resumen-ejecutivo)
2. [Contexto y Problema](#2-contexto-y-problema)
3. [Objetivos del Producto](#3-objetivos-del-producto)
4. [Alcance de la Versión 1.0](#4-alcance-de-la-versión-10)
5. [Usuarios y Roles](#5-usuarios-y-roles)
6. [Modelo de Datos](#6-modelo-de-datos)
7. [Reglas de Clasificación](#7-reglas-de-clasificación)
8. [Pantallas y Flujos](#8-pantallas-y-flujos)
9. [Workflow Operativo en n8n](#9-workflow-operativo-en-n8n)
10. [Requerimientos Funcionales](#10-requerimientos-funcionales)
11. [Requerimientos No Funcionales](#11-requerimientos-no-funcionales)
12. [Arquitectura Técnica](#12-arquitectura-técnica)
13. [Manejo de Errores](#13-manejo-de-errores)
14. [RGPD, Seguridad y Datos de Prueba](#14-rgpd-seguridad-y-datos-de-prueba)
15. [Criterios de Aceptación](#15-criterios-de-aceptación)
16. [Roadmap y Fases Futuras](#16-roadmap-y-fases-futuras)
17. [Supuestos y Restricciones](#17-supuestos-y-restricciones)
18. [Glosario](#18-glosario)

---

## 1. Resumen Ejecutivo

Se requiere construir un CRM ligero para NEGOCIA CONTROL, orientado a la gestión de leads interesados en servicios fiscales, alta de autónomo, residencia vinculada a fiscalidad, ingresos del extranjero, instalación en España y diagnóstico documental inicial.

El sistema debe permitir recibir leads desde un formulario Tally, procesarlos automáticamente en n8n, clasificarlos con apoyo de IA, registrarlos en Google Sheets y mostrar una estructura de pipeline que facilite la toma de decisiones comerciales.

La versión 1.0 será un MVP operativo basado en:

- Tally como formulario principal de entrada.
- n8n como orquestador único de automatización.
- Google Sheets como base de datos operativa inicial.
- IA dentro del flujo n8n como apoyo de clasificación.
- Stitch / interfaz CRM como prototipo visual del pipeline y ficha de lead.
- WhatsApp Business y email como canales posteriores de contacto, siempre con control humano y consentimiento.

El objetivo principal no es construir un CRM genérico, sino un sistema práctico para:

- reducir trabajo manual;
- clasificar leads con criterio;
- detectar casos prioritarios;
- evitar respuestas automáticas peligrosas;
- preparar la venta del diagnóstico inicial de NEGOCIA CONTROL;
- medir conversión y calidad de captación.

La filosofía del MVP es clara:

> Entrar por fiscalidad, ordenar el caso y convertir leads adecuados en diagnósticos iniciales.

---

## 2. Contexto y Problema

NEGOCIA CONTROL está en fase de prelanzamiento comercial y necesita una infraestructura mínima, estable y auditable para gestionar leads.

Los leads pueden llegar desde:

- Instagram.
- WhatsApp.
- Web / landing.
- Formulario Tally.
- Referidos.
- Eventos.
- Comunidad ucraniana / migrante.
- Contactos directos.

El público objetivo principal son personas migrantes, autónomos o futuros autónomos que necesitan claridad sobre fiscalidad, residencia, ingresos del extranjero, instalación en España y obligaciones administrativas.

Sin un CRM operativo:

- Los leads quedan dispersos entre WhatsApp, Instagram, formularios y notas sueltas.
- Natalia debe leer cada caso desde cero.
- No existe semáforo de prioridad.
- No se sabe qué lead encaja con el diagnóstico inicial.
- No se identifican rápido los casos delicados.
- No queda trazabilidad de por qué un lead fue aceptado, rechazado o marcado para revisión.
- No hay métrica real de conversión.
- No se sabe qué canal trae mejores leads.
- No se puede escalar el proceso sin caos.

El CRM debe resolver este problema creando una fuente única de verdad, con datos mínimos, clasificación inicial, seguimiento y reportes.

---

## 3. Objetivos del Producto

| # | Objetivo | Métrica de éxito |
|---|---|---|
| 1 | Centralizar todos los leads del formulario en un sistema único | 100% de respuestas Tally registradas en Google Sheets |
| 2 | Clasificar cada lead con semáforo | 100% de leads con verde / amarillo / rojo o error visible |
| 3 | Reducir revisión manual inicial | Natalia revisa primero verdes prioritarios, amarillos y rojos |
| 4 | Detectar datos faltantes | Cada lead amarillo debe indicar qué dato falta |
| 5 | Preparar siguiente acción comercial | Cada lead debe tener `accion_recomendada` y `siguiente_accion` |
| 6 | Evitar automatización peligrosa | Casos de riesgo nunca reciben respuesta automática cerrada |
| 7 | Medir conversión a diagnóstico | Reporte semanal con leads, semáforos y diagnósticos reservados |
| 8 | Proteger datos personales | Ninguna comunicación automática si falta consentimiento |
| 9 | Crear base escalable | El modelo debe poder migrar a Airtable, Notion, Supabase o CRM futuro |
| 10 | Mantener trazabilidad | Cada lead debe conservar motivo de clasificación, estado y fecha |

---

## 4. Alcance de la Versión 1.0

### 4.1 Incluido en v1.0

La versión 1.0 incluye:

- Formulario Tally como entrada principal.
- Webhook n8n para recibir respuestas.
- Normalización de datos.
- Validación de campos obligatorios.
- Generación automática de `lead_id`.
- Clasificación IA del lead.
- Semáforo verde / amarillo / rojo.
- Detección de datos faltantes.
- Detección de casos de riesgo.
- Registro en Google Sheets.
- Hoja de errores.
- Hoja de historial de interacciones.
- Hoja de reportes básicos.
- Pipeline visual tipo Kanban.
- Ficha individual de lead.
- Respuesta sugerida para WhatsApp/email.
- Bloqueo de automatización si falta consentimiento.
- Revisión manual para casos sensibles.
- Uso obligatorio de datos de prueba en demo.
- Documentación del flujo n8n.
- Criterios de aceptación para validar el proyecto.

---

### 4.2 Excluido de v1.0

Queda fuera de la versión 1.0:

- Make.com.
- CRM comercial pesado.
- Supabase.
- Backend propio.
- Base SQL productiva.
- App móvil.
- Portal privado de cliente.
- Firma de contratos.
- Pasarela de pago.
- WhatsApp Business API automatizada.
- Envío automático de campañas comerciales.
- Gestión documental avanzada.
- Expedientes fiscales completos.
- Presentación de modelos tributarios.
- Automatización de asesoramiento fiscal cerrado.
- Resolución automática de casos complejos.
- Sustitución del criterio profesional humano.
- Integración con calendario en producción.
- Gestión multiusuario avanzada.
- Auditoría legal completa.

---

### 4.3 Principio de alcance

El MVP debe ser pequeño, útil y controlable.

No se añadirá una herramienta nueva si no cumple al menos una de estas condiciones:

- reduce error operativo;
- ahorra tiempo real;
- mejora trazabilidad;
- aumenta conversión;
- facilita revisión humana;
- mejora seguridad del dato.

---

## 5. Usuarios y Roles

## 5.1 Natalia / Operadora principal NC

Natalia es la usuaria principal del sistema.

### Responsabilidades

- Revisar leads.
- Validar o corregir clasificación IA.
- Priorizar casos.
- Decidir si un lead recibe diagnóstico.
- Enviar respuesta final.
- Registrar notas internas.
- Cambiar estado del lead.
- Marcar casos como ganados, perdidos o archivados.
- Consultar reportes.
- Detectar ajustes necesarios en el sistema.

### Permisos

| Acción | Natalia |
|---|---|
| Ver pipeline | Sí |
| Ver ficha completa | Sí |
| Editar lead | Sí |
| Cambiar semáforo | Sí |
| Cambiar estado | Sí |
| Añadir notas internas | Sí |
| Registrar interacción | Sí |
| Copiar respuesta sugerida | Sí |
| Enviar respuesta manual | Sí |
| Archivar lead | Sí |
| Ver errores | Sí |
| Consultar reportes | Sí |
| Corregir reglas | Sí |

---

## 5.2 IA Clasificadora

La IA no es un usuario humano. Es una capa de apoyo operativo.

### Puede

- Leer los datos enviados por el lead.
- Resumir el caso.
- Detectar la duda principal.
- Proponer semáforo.
- Identificar dato crítico faltante.
- Detectar señales de riesgo.
- Sugerir siguiente acción.
- Redactar una respuesta inicial sugerida.

### No puede

- Tomar decisiones fiscales finales.
- Prometer resultados.
- Confirmar derechos, obligaciones o soluciones sin revisión.
- Enviar asesoramiento jurídico/fiscal cerrado.
- Automatizar respuestas en casos delicados.
- Sustituir la revisión humana.
- Modificar datos estructurales sin validación.

### Regla central

> La IA clasifica. NEGOCIA CONTROL decide.

---

## 5.3 Futuro asistente / colaborador NC

No forma parte completa de v1.0, pero se contempla para fases posteriores.

### Podrá

- Ver leads asignados.
- Añadir notas.
- Preparar borradores.
- Marcar seguimiento realizado.
- Registrar interacciones.

### No podrá

- Cambiar reglas de clasificación.
- Enviar respuestas sensibles sin revisión.
- Modificar estructura de base de datos.
- Borrar leads sin permiso.
- Cambiar configuración de n8n.

---

## 6. Modelo de Datos

La base operativa inicial será Google Sheets.

Hojas mínimas:

```text
LEADS_PRINCIPAL
HISTORIAL_INTERACCIONES
ERRORES
REPORTES
CONFIG_REGLAS
PLANTILLAS_RESPUESTA


6.1 Hoja LEADS_PRINCIPAL
Esta hoja será la fuente principal de verdad del CRM.
Campo
Tipo
Obligatorio
Origen
Descripción
lead_id
Texto
Sí
n8n
Identificador único del lead
fecha_entrada
Fecha/hora
Sí
n8n
Fecha de recepción
canal_entrada
Texto
Sí
n8n/Tally
Tally, WhatsApp, Instagram, web, referido
nombre
Texto
Sí
Tally
Nombre del lead
email
Email
No
Tally
Email del lead
whatsapp
Texto
No
Tally
Número de WhatsApp
idioma_preferido
Select
Sí
Tally
ES / UA / EN
esta_en_espana
Select
Sí
Tally
Sí / No / En proceso
situacion_actual
Select
Sí
Tally
Empleado / Autónomo / Mixto / Aún no he empezado / Otro
origen_ingresos
Select
Sí
Tally
España / Extranjero / Mixto / Aún no facturo
duda_principal
Select
Sí
Tally
Alta autónomo / Impuestos / Residencia + fiscalidad / etc.
explicacion_caso
Texto largo
Sí
Tally
Descripción libre del caso
urgencia
Select
Sí
Tally
Esta semana / Este mes / Solo explorando
consentimiento
Boolean/Text
Sí
Tally
Aceptación de uso de datos
semaforo
Select
Sí
IA/n8n
Verde / Amarillo / Rojo
resumen_caso
Texto largo
Sí
IA
Resumen operativo del caso
motivo_clasificacion
Texto largo
Sí
IA
Por qué recibe ese semáforo
dato_faltante
Texto
No
IA
Dato crítico que falta
riesgo_detectado
Boolean
Sí
IA/n8n
Sí/No
tipo_riesgo
Texto
No
IA
Sanción, deuda, fraude, residencia delicada, etc.
accion_recomendada
Texto
Sí
IA
Acción inmediata sugerida
respuesta_sugerida
Texto largo
No
IA
Mensaje propuesto para WhatsApp/email
estado
Select
Sí
n8n/Natalia
Estado operativo
siguiente_accion
Texto
No
IA/Natalia
Próxima acción comercial
fecha_siguiente_accion
Fecha
No
n8n/Natalia
Fecha límite de seguimiento
responsable
Texto
Sí
Sistema/Natalia
Persona responsable
diagnostico_reservado
Boolean
No
Natalia
Sí/No
fecha_diagnostico
Fecha
No
Natalia
Fecha si reserva diagnóstico
importe_estimado
Número
No
Natalia
Valor potencial
motivo_perdida
Texto
No
Natalia
Si no convierte
notas_nc
Texto largo
No
Natalia
Notas internas
created_at
Fecha/hora
Sí
n8n
Fecha de creación
updated_at
Fecha/hora
Sí
n8n/Natalia
Última actualización


6.2 Hoja HISTORIAL_INTERACCIONES
Registra cada contacto, nota o acción importante.
Campo
Tipo
Obligatorio
Origen
Descripción
id
Texto
Sí
n8n
ID de interacción
lead_id
Texto
Sí
Sistema
Relación con lead
fecha
Fecha/hora
Sí
Sistema
Fecha de interacción
canal
Select
Sí
Natalia/n8n
WhatsApp / email / llamada / Instagram / sistema
tipo_interaccion
Select
Sí
Natalia/n8n
Alta, respuesta, seguimiento, nota, cierre
resumen
Texto largo
Sí
Natalia/IA
Resumen de lo ocurrido
respuesta_enviada
Texto largo
No
Natalia
Mensaje enviado
responsable
Texto
Sí
Natalia
Quién gestionó
created_at
Fecha/hora
Sí
Sistema
Fecha registro


6.3 Hoja ERRORES
Registra fallos del sistema.
Campo
Tipo
Obligatorio
Origen
Descripción
id
Texto
Sí
n8n
ID del error
fecha
Fecha/hora
Sí
n8n
Fecha del error
workflow
Texto
Sí
n8n
Nombre del workflow
nodo
Texto
Sí
n8n
Nodo donde ocurrió
lead_id
Texto
No
n8n
Lead afectado, si existe
tipo_error
Select
Sí
n8n
PAYLOAD / VALIDACION / IA / SHEETS / ENVIO
detalle_error
Texto largo
Sí
n8n
Descripción técnica
payload_original
Texto largo
No
n8n
Datos recibidos, si procede
estado_revision
Select
Sí
n8n/Natalia
Pendiente / Revisado / Resuelto
accion_correctiva
Texto largo
No
Natalia
Qué se hizo
created_at
Fecha/hora
Sí
n8n
Fecha creación


6.4 Hoja REPORTES
Agrupa métricas semanales.
Campo
Tipo
Descripción
semana
Texto
Semana analizada
total_leads
Número
Leads recibidos
verdes
Número
Leads verdes
amarillos
Número
Leads amarillos
rojos
Número
Leads rojos
errores
Número
Errores técnicos
diagnosticos_reservados
Número
Diagnósticos cerrados
conversion_diagnostico
Porcentaje
Diagnósticos / leads
canal_principal
Texto
Canal con más leads
mejor_canal_conversion
Texto
Canal con mejor conversión
principal_motivo_amarillo
Texto
Dato que más falta
principal_motivo_rojo
Texto
Riesgo o no encaje más común
tiempo_estimado_ahorrado
Número
Minutos estimados ahorrados
updated_at
Fecha/hora
Actualización


6.5 Hoja CONFIG_REGLAS
Permite documentar reglas sin tocarlas directamente en el flujo.
Campo
Tipo
Descripción
regla_id
Texto
ID de regla
categoria
Texto
Semáforo / riesgo / canal / urgencia
condicion
Texto
Condición que activa la regla
resultado
Texto
Resultado esperado
prioridad
Número
Orden de aplicación
activa
Boolean
Sí/No
notas
Texto
Comentario operativo

Ejemplo:
regla_id
categoria
condicion
resultado
R-001
riesgo
menciona fraude u ocultación
rojo + revisión manual
R-002
amarillo
falta explicación del caso
falta dato
R-003
verde
autónomo + impuestos + datos completos
verde diagnóstico
R-004
consentimiento
consentimiento ausente
bloquear comunicación


6.6 Hoja PLANTILLAS_RESPUESTA
Guarda respuestas base para WhatsApp/email.
Campo
Tipo
Descripción
plantilla_id
Texto
ID de plantilla
idioma
Select
ES / UA / EN
semaforo
Select
Verde / Amarillo / Rojo
escenario
Texto
Diagnóstico, falta dato, no encaja, revisión
texto_base
Texto largo
Mensaje base
requiere_revision
Boolean
Si debe revisarse antes de enviar
activa
Boolean
Sí/No


6.7 Estados operativos del lead
Estado interno
Descripción
Acción típica
NUEVO
Lead recibido
Procesar
VALIDADO
Datos mínimos correctos
Clasificar
FALTA_DATO
Falta dato crítico
Pedir aclaración
VERDE_DIAGNOSTICO
Encaja con diagnóstico
Enviar enlace / propuesta
DIAGNOSTICO_RESERVADO
Diagnóstico agendado
Preparar caso
PROPUESTA_SERVICIO
Puede pasar a servicio posterior
Preparar oferta
CLIENTE_ACTIVO
Cliente confirmado
Gestionar servicio
AMARILLO_REVISAR
Requiere revisión
Natalia decide
ROJO_NO_ENCAJA
No encaja o riesgo
Cierre prudente
ARCHIVADO
Cerrado sin acción
Sin seguimiento
ERROR_PAYLOAD
Error de entrada
Revisar webhook
ERROR_CONSENTIMIENTO
Falta consentimiento
No contactar comercialmente
ERROR_IA
Fallo IA
Revisión manual
ERROR_SHEETS
Fallo guardado
Recuperar lead
ERROR_ENVIO
Fallo comunicación
Reintentar/manual


6.8 Máquina de estados
NUEVO
    → VALIDADO
        → VERDE_DIAGNOSTICO
            → DIAGNOSTICO_RESERVADO
                → PROPUESTA_SERVICIO
                    → CLIENTE_ACTIVO

NUEVO
    → VALIDADO
        → AMARILLO_REVISAR
            → FALTA_DATO
                → VERDE_DIAGNOSTICO
                → ROJO_NO_ENCAJA
                → ARCHIVADO

NUEVO
    → ERROR_PAYLOAD
        → AMARILLO_REVISAR

NUEVO
    → ERROR_CONSENTIMIENTO
        → AMARILLO_REVISAR

NUEVO
    → ERROR_IA
        → AMARILLO_REVISAR

NUEVO
    → VALIDADO
        → ROJO_NO_ENCAJA
            → ARCHIVADO

Regla operativa:
Ningún estado de error debe eliminar el lead. El lead se conserva y se marca para revisión.

7. Reglas de Clasificación
7.1 Semáforo verde
Un lead puede ser verde si cumple la mayoría de estas condiciones:
Tiene datos mínimos suficientes.
Tiene consentimiento aceptado.
Explica el caso con claridad.
Su necesidad encaja con el diagnóstico inicial de NC.
La duda pertenece a fiscalidad, alta autónomo, ingresos extranjeros, residencia + fiscalidad o instalación en España.
No hay señales de fraude, urgencia judicial o expectativa de resultado garantizado.
Puede avanzar hacia diagnóstico pagado o revisión inicial.
Ejemplos de verde:
Persona que quiere darse de alta como autónoma y no sabe por dónde empezar.
Autónomo migrante con dudas sobre ingresos de España y extranjero.
Persona que quiere ordenar fiscalidad antes de solicitar residencia.
Cliente que necesita saber qué obligaciones tiene antes de facturar.
Persona con pluriactividad que necesita orientación inicial.
Acción recomendada:
Enviar propuesta/enlace de diagnóstico inicial, previa revisión y consentimiento.


7.2 Semáforo amarillo
Un lead debe ser amarillo si:
Falta un dato crítico.
La explicación es insuficiente.
Hay contradicción entre campos.
No queda claro si está en España.
No queda claro si ya factura.
No queda claro el origen de ingresos.
El caso puede encajar, pero necesita revisión.
La urgencia es alta pero el caso no está bien explicado.
La IA no puede clasificar con seguridad.
Hay error técnico no grave.
Ejemplos de amarillo:
Dice “tengo ingresos del extranjero”, pero no explica de qué país ni cómo factura.
Marca “autónomo”, pero en el texto dice que todavía no ha empezado.
Quiere residencia + fiscalidad, pero no indica si está ya en España.
Escribe solo “quiero ayuda” sin explicar el caso.
Falta WhatsApp o email válido.
La IA devuelve una salida incompleta.
Acción recomendada:
Pedir dato faltante o revisar manualmente antes de ofrecer diagnóstico.


7.3 Semáforo rojo
Un lead debe ser rojo si:
No encaja con la oferta actual.
Busca una garantía de resultado.
Pide ocultar ingresos.
Menciona fraude, simulación o evasión.
Tiene una sanción grave sin contexto suficiente.
Tiene un problema judicial o administrativo delicado.
Presenta una situación de residencia irregular compleja.
Pide “arreglar papeles” sin información suficiente.
Busca asesoría fuera del alcance de NC.
No acepta consentimiento.
El riesgo reputacional o legal es alto.
Ejemplos de rojo:
“Quiero no declarar ingresos.”
“Necesito que me garanticéis que me aprueban la residencia.”
“Tengo una sanción y quiero que desaparezca.”
“Estoy irregular y necesito contrato falso.”
“Quiero facturar por otra persona.”
“No quiero dejar rastro.”
Acción recomendada:
No automatizar. Pasar a revisión manual o cierre prudente.


7.4 Regla de conflicto
Si hay conflicto entre señales positivas y señales de riesgo, gana el riesgo.
Ejemplo:
Caso aparentemente fiscal + mención a ocultar ingresos = rojo.


7.5 Regla de consentimiento
Si no hay consentimiento válido:
No se envía comunicación comercial automática.
El lead puede guardarse, pero queda bloqueado para contacto comercial.


7.6 Regla de dato faltante
Si falta un dato crítico, el lead no puede ser verde aunque parezca encajar.
Ejemplo:
Quiere diagnóstico fiscal, pero no indica si está en España ni origen de ingresos.
Resultado: amarillo.


7.7 Contrato de salida IA
La IA debe devolver siempre JSON estructurado.
{
  "resumen_caso": "string",
  "duda_principal_detectada": "string",
  "semaforo": "verde | amarillo | rojo",
  "motivo_clasificacion": "string",
  "dato_critico_faltante": "string | null",
  "riesgo_detectado": true,
  "tipo_riesgo": "string | null",
  "accion_recomendada": "string",
  "siguiente_accion": "string",
  "respuesta_sugerida": "string",
  "requiere_revision_manual": true
}

Reglas técnicas:
Si no devuelve JSON válido → ERROR_IA.
Si falta semaforo → ERROR_IA.
Si semaforo no es verde/amarillo/rojo → ERROR_IA.
Si riesgo_detectado = true → revisión manual obligatoria.
Si dato_critico_faltante no es null → semáforo mínimo amarillo.
Si consentimiento no es válido → bloquear comunicación automática.

8. Pantallas y Flujos
8.1 Pantalla /pipeline
Propósito
Vista principal del CRM para ver todos los leads por etapa.
Columnas
Nuevo
Falta dato
Apto diagnóstico
Diagnóstico reservado
Propuesta / Servicio
Cliente activo
No encaja / Cerrado
Errores / Revisión

Tarjeta de lead
Cada tarjeta debe mostrar:
Nombre
Idioma
Situación actual
Origen de ingresos
Duda principal
Semáforo
Urgencia
Próxima acción
Fecha límite
Canal de entrada

Indicadores visuales
Indicador
Uso
Verde
Apto para diagnóstico
Amarillo
Falta dato / revisión
Rojo
No encaja / riesgo
Naranja
Acción vence hoy
Rojo intenso
Acción vencida
Gris
Archivado o cerrado

Acciones rápidas
Abrir ficha.
Cambiar estado.
Copiar respuesta sugerida.
Marcar como revisado.
Archivar.
Crear nota.
Filtros
Semáforo.
Estado.
Idioma.
Situación actual.
Origen de ingresos.
Urgencia.
Canal.
Fecha de entrada.
Próxima acción.
Riesgo detectado.
Responsable.
Búsqueda
Debe buscar por:
nombre;
email;
WhatsApp;
duda principal;
texto del caso;
lead_id.

8.2 Pantalla /leads/:id
Propósito
Ficha completa del lead.
Cabecera
Debe mostrar:
Nombre.
Lead ID.
Semáforo.
Estado.
Urgencia.
Canal.
Fecha de entrada.
Responsable.
Botón volver al pipeline.

Sección A — Contacto
Campo
Editable
Validación
Nombre
Sí
Obligatorio
Email
Sí
Formato email si existe
WhatsApp
Sí
Formato revisable
Idioma
Sí
ES / UA / EN
Canal
Sí
Select
Consentimiento
Sí
Obligatorio para contacto comercial


Sección B — Caso
Campo
Editable
Validación
Está en España
Sí
Obligatorio
Situación actual
Sí
Obligatorio
Origen de ingresos
Sí
Obligatorio
Duda principal
Sí
Obligatorio
Explicación del caso
Sí
Obligatorio
Urgencia
Sí
Obligatorio


Sección C — Clasificación IA
Debe mostrar:
Resumen del caso.
Duda detectada.
Semáforo propuesto.
Motivo.
Dato faltante.
Riesgo detectado.
Tipo de riesgo.
Acción recomendada.
Respuesta sugerida.
Indicador de revisión manual.
Botones:
Aceptar clasificación
Cambiar semáforo
Pedir dato faltante
Enviar enlace diagnóstico
Copiar respuesta
Marcar revisión manual
Archivar lead

Texto fijo:
La IA clasifica. NC decide.


Sección D — Seguimiento
Campos:
Estado.
Siguiente acción.
Fecha siguiente acción.
Responsable.
Diagnóstico reservado.
Fecha diagnóstico.
Motivo pérdida.
Notas internas.

Sección E — Historial
Debe listar:
fecha;
canal;
tipo de interacción;
resumen;
responsable;
respuesta enviada.

8.3 Pantalla /leads/nuevo
Propósito
Alta manual de leads que llegan por WhatsApp, Instagram, llamada o referido.
Comportamiento
Estado inicial: NUEVO.
Canal: seleccionado manualmente.
Semáforo inicial: vacío o AMARILLO_REVISAR.
Responsable: Natalia.
Al guardar, aparece en pipeline.

8.4 Pantalla /reportes
Propósito
Medir funcionamiento comercial y operativo.
Métricas principales
Total de leads.
Leads por semáforo.
Leads por canal.
Leads por idioma.
Leads por urgencia.
Diagnósticos reservados.
Conversión a diagnóstico.
Tasa de amarillos.
Tasa de rojos.
Errores técnicos.
Motivos principales de amarillo.
Motivos principales de rojo.
Tiempo manual estimado ahorrado.
Visualización recomendada
Tarjetas resumen tipo Bento.
Tabla semanal.
Gráfico por semáforo.
Gráfico por canal.
Lista de leads prioritarios.
Lista de errores pendientes.

9. Workflow Operativo en n8n
9.1 Workflow principal
Nombre recomendado:
n8n_leads_tally_to_sheets_triage_nc

Flujo general
1. Webhook Tally
2. Extraer payload
3. Normalizar campos
4. Validar obligatorios
5. Validar consentimiento
6. Generar lead_id
7. Detectar duplicados
8. Clasificar con IA
9. Validar JSON IA
10. Aplicar reglas duras NC
11. Decidir estado
12. Guardar en Google Sheets
13. Registrar historial inicial
14. Preparar respuesta sugerida
15. Actualizar reportes


9.2 Nodo 1 — Webhook Tally
Objetivo
Recibir respuestas del formulario.
Entrada
Payload enviado por Tally.
Salida
JSON bruto.
Errores posibles
Payload vacío.
Estructura distinta.
Campos renombrados.
Webhook mal configurado.
Acción si falla
Registrar en ERRORES como ERROR_PAYLOAD.

9.3 Nodo 2 — Extraer payload
Objetivo
Localizar los datos reales dentro del objeto recibido.
Lógica
El nodo debe contemplar variaciones:
const input = items[0].json;
const payload = input.body ?? input;
const data = payload.data ?? payload;
return [{ json: data }];

Salida
Objeto limpio base.

9.4 Nodo 3 — Normalizar campos
Objetivo
Convertir campos de Tally a nombres internos NC.
Transformaciones
Tally
Campo interno
Nombre
nombre
Email
email
WhatsApp
whatsapp
Idioma preferido
idioma_preferido
¿Estás ya en España?
esta_en_espana
Situación actual
situacion_actual
Origen de ingresos
origen_ingresos
Tu duda principal hoy
duda_principal
Explícame tu caso en 5–7 líneas
explicacion_caso
Urgencia
urgencia
Consentimiento
consentimiento

Normalización
Nombre: trim + formato legible.
Email: lowercase + trim.
WhatsApp: eliminar espacios innecesarios.
Idioma: mapear a ES / UA / EN.
Consentimiento: convertir a boolean lógico.
Campos vacíos: convertir a null.

9.5 Nodo 4 — Validar obligatorios
Campos críticos
nombre;
idioma_preferido;
esta_en_espana;
situacion_actual;
origen_ingresos;
duda_principal;
explicacion_caso;
urgencia;
consentimiento.
Regla
Si falta campo crítico:
estado = FALTA_DATO
semaforo = amarillo
requiere_revision_manual = true

El lead se guarda igualmente.

9.6 Nodo 5 — Validar consentimiento
Objetivo
Impedir comunicaciones no permitidas.
Regla
Si consentimiento no es válido:
estado = ERROR_CONSENTIMIENTO
bloquear_envio = true
semaforo = amarillo

El lead se guarda, pero no se prepara envío automático.

9.7 Nodo 6 — Generar lead_id
Formato recomendado:
NC-L-0001
NC-L-0002
NC-L-0003

Alternativa más robusta:
NC-L-20260430-0001

Regla:
Debe ser único.
No debe depender solo del nombre.
Debe poder rastrearse en Sheets, errores e historial.

9.8 Nodo 7 — Detectar duplicados
Criterios de posible duplicado
mismo email;
mismo WhatsApp;
mismo nombre + mismo canal en menos de 7 días.
Si hay duplicado
No borrar.
Marcar:
posible_duplicado = true
lead_relacionado = lead_id anterior
estado = AMARILLO_REVISAR


9.9 Nodo 8 — Clasificación IA
Objetivo
Generar triage inicial.
Prompt operativo
La IA debe actuar como clasificador operativo de NEGOCIA CONTROL, no como asesor fiscal final.
Debe devolver solo JSON válido con:
resumen_caso;
duda_principal_detectada;
semaforo;
motivo_clasificacion;
dato_critico_faltante;
riesgo_detectado;
tipo_riesgo;
accion_recomendada;
siguiente_accion;
respuesta_sugerida;
requiere_revision_manual.
Prohibiciones
La IA no debe:
prometer resultados;
decir “tienes derecho a” sin revisión;
confirmar obligaciones definitivas;
recomendar ocultar información;
cerrar jurídicamente el caso;
enviar mensajes agresivos o comerciales sin prudencia.

9.10 Nodo 9 — Validar JSON IA
Objetivo
Evitar que una respuesta mal formada rompa el flujo.
Validaciones
Es JSON válido.
Tiene semaforo.
Semáforo está en verde/amarillo/rojo.
Tiene motivo_clasificacion.
Tiene accion_recomendada.
Si falla
estado = ERROR_IA
semaforo = amarillo
requiere_revision_manual = true
accion_recomendada = Revisar manualmente porque la IA no devolvió salida válida.


9.11 Nodo 10 — Aplicar reglas duras NC
Este nodo corrige la IA si hace falta.
Reglas
Si falta consentimiento → no puede ser verde operativo.
Si hay riesgo_detectado → revisión manual.
Si hay dato crítico faltante → amarillo.
Si menciona fraude/ocultación → rojo.
Si pide garantía de resultado → rojo.
Si no hay explicación del caso → amarillo.
Si no hay contacto válido → amarillo.

9.12 Nodo 11 — Decidir estado
Tabla de decisión:
Condición
Estado
Semáforo verde + consentimiento + sin riesgo
VERDE_DIAGNOSTICO
Semáforo amarillo
AMARILLO_REVISAR
Falta dato crítico
FALTA_DATO
Semáforo rojo
ROJO_NO_ENCAJA
Error IA
ERROR_IA
Error payload
ERROR_PAYLOAD
Falta consentimiento
ERROR_CONSENTIMIENTO


9.13 Nodo 12 — Guardar en Google Sheets
Objetivo
Registrar lead en LEADS_PRINCIPAL.
Requisito
El guardado debe hacerse aunque el lead sea amarillo, rojo o tenga error.
Si falla Google Sheets
Registrar error en ERRORES.
Si el lead no puede guardarse, conservar payload en el error.

9.14 Nodo 13 — Registrar historial inicial
Crear una línea en HISTORIAL_INTERACCIONES.
Ejemplo:
Lead recibido desde Tally. Clasificación inicial: amarillo. Acción recomendada: pedir dato faltante.


9.15 Nodo 14 — Preparar respuesta sugerida
Solo se prepara como borrador.
En v1.0:
No enviar automáticamente mensajes sensibles.
Natalia revisa antes de enviar.


9.16 Nodo 15 — Actualizar reportes
Puede ser inmediato o mediante workflow separado.
Métricas:
total leads;
verdes;
amarillos;
rojos;
errores;
conversión;
canal;
idioma.

10. Requerimientos Funcionales
RF-01 Entrada de leads
RF-01.1 El sistema debe recibir leads desde Tally mediante webhook.
RF-01.2 El sistema debe permitir alta manual futura.
RF-01.3 Cada lead debe tener lead_id.
RF-01.4 Cada lead debe registrar fecha y canal.
RF-01.5 El sistema debe conservar payload si ocurre error.

RF-02 Normalización
RF-02.1 El sistema debe mapear campos Tally a campos NC.
RF-02.2 El sistema debe normalizar email, WhatsApp y texto.
RF-02.3 El sistema debe convertir consentimiento a valor evaluable.
RF-02.4 El sistema debe evitar columnas duplicadas innecesarias.
RF-02.5 El sistema debe marcar datos vacíos como null o vacío controlado.

RF-03 Validación
RF-03.1 El sistema debe validar campos obligatorios.
RF-03.2 El sistema debe detectar contacto incompleto.
RF-03.3 El sistema debe detectar consentimiento ausente.
RF-03.4 El sistema debe permitir guardar leads incompletos.
RF-03.5 Los leads incompletos deben ir a revisión.

RF-04 Clasificación IA
RF-04.1 La IA debe devolver JSON.
RF-04.2 La IA debe proponer semáforo.
RF-04.3 La IA debe explicar motivo.
RF-04.4 La IA debe detectar dato faltante.
RF-04.5 La IA debe detectar riesgo.
RF-04.6 La IA debe sugerir siguiente acción.
RF-04.7 La IA debe generar respuesta sugerida.
RF-04.8 Si falla, el sistema debe marcar ERROR_IA.

RF-05 Reglas duras
RF-05.1 El sistema debe corregir la IA si hay contradicción.
RF-05.2 Si hay riesgo, debe activar revisión manual.
RF-05.3 Si falta dato, no puede quedar verde.
RF-05.4 Si falta consentimiento, no puede enviarse comunicación comercial.
RF-05.5 Si se menciona fraude, debe marcarse rojo.

RF-06 Google Sheets
RF-06.1 El sistema debe guardar leads en LEADS_PRINCIPAL.
RF-06.2 Debe registrar errores en ERRORES.
RF-06.3 Debe registrar interacción inicial en HISTORIAL_INTERACCIONES.
RF-06.4 Debe alimentar REPORTES.
RF-06.5 Las columnas deben mantener nombres estables.

RF-07 Pipeline
RF-07.1 El sistema debe mostrar leads por estado.
RF-07.2 Cada columna debe mostrar contador.
RF-07.3 Cada lead debe mostrar semáforo.
RF-07.4 Deben existir filtros.
RF-07.5 Debe poder abrirse ficha de lead.
RF-07.6 Debe visualizarse urgencia y próxima acción.

RF-08 Ficha de lead
RF-08.1 Debe mostrar datos de contacto.
RF-08.2 Debe mostrar datos del caso.
RF-08.3 Debe mostrar clasificación IA.
RF-08.4 Debe permitir editar estado.
RF-08.5 Debe permitir cambiar semáforo manualmente.
RF-08.6 Debe permitir añadir notas.
RF-08.7 Debe permitir archivar.
RF-08.8 Debe mostrar historial.

RF-09 Comunicación
RF-09.1 El sistema debe generar respuesta sugerida.
RF-09.2 En v1.0, el envío será manual o revisado.
RF-09.3 No debe enviarse nada sin consentimiento.
RF-09.4 Casos rojos no deben recibir respuesta automática estándar.
RF-09.5 La respuesta debe poder copiarse para WhatsApp/email.

RF-10 Reportes
RF-10.1 Debe contar leads totales.
RF-10.2 Debe contar semáforos.
RF-10.3 Debe contar diagnósticos reservados.
RF-10.4 Debe calcular conversión.
RF-10.5 Debe listar errores pendientes.
RF-10.6 Debe mostrar motivos principales de amarillo y rojo.

11. Requerimientos No Funcionales
ID
Categoría
Requerimiento
RNF-01
Simplicidad
La solución debe evitar herramientas innecesarias
RNF-02
Arquitectura
n8n será el orquestador único del MVP
RNF-03
Velocidad
El registro del lead debe completarse en menos de 10 segundos
RNF-04
Claridad
Natalia debe entender el estado de un lead en menos de 30 segundos
RNF-05
Trazabilidad
Todo lead debe tener estado, semáforo, motivo y siguiente acción
RNF-06
Seguridad
No usar datos reales en pruebas o clase
RNF-07
RGPD
No contactar comercialmente sin consentimiento
RNF-08
Mantenibilidad
Nombres de nodos, columnas y estados deben ser claros
RNF-09
Escalabilidad
Debe poder migrarse a Notion, Airtable, Supabase o CRM futuro
RNF-10
Robustez
Si falla IA, Sheets o envío, el lead no se pierde
RNF-11
Auditoría
Errores y decisiones deben quedar registradas
RNF-12
Bajo coste
La solución debe funcionar con herramientas económicas
RNF-13
Operabilidad
Debe poder mantenerse sin equipo técnico grande
RNF-14
Modularidad
Cada workflow debe tener responsabilidad clara


12. Arquitectura Técnica
12.1 Stack v1.0
Capa
Tecnología
Uso
Captura
Tally
Formulario de entrada
Automatización
n8n
Orquestación completa
IA
Nodo IA/API en n8n
Clasificación y resumen
Base operativa
Google Sheets
Registro inicial
Visualización
Stitch/prototipo CRM
Pipeline y ficha
Comunicación
WhatsApp/email
Contacto posterior
Documentación
Antigravity
Diseño, lógica y apoyo técnico


12.2 Decisión sobre Make
Make.com no se usará en el MVP.
Motivos:
Evita duplicar lógica.
Reduce dispersión.
Facilita depuración.
Centraliza errores.
Mejora trazabilidad.
Alinea el proyecto con la decisión técnica de NC.
Regla:
Si puede resolverse en n8n de forma simple, estable y auditable, se hace en n8n.


12.3 Convención de nombres
Workflows n8n
n8n_leads_tally_to_sheets_triage_nc
n8n_leads_error_handler_nc
n8n_leads_reportes_semanales_nc
n8n_leads_respuesta_borrador_nc

Nodos
webhook_recibir_tally
code_extraer_payload
code_normalizar_campos
code_validar_obligatorios
code_generar_lead_id
sheets_buscar_duplicado
ia_clasificar_lead
code_validar_json_ia
code_aplicar_reglas_nc
switch_decidir_estado
sheets_guardar_lead
sheets_registrar_historial
sheets_registrar_error

Hojas Google Sheets
LEADS_PRINCIPAL
HISTORIAL_INTERACCIONES
ERRORES
REPORTES
CONFIG_REGLAS
PLANTILLAS_RESPUESTA


13. Manejo de Errores
13.1 Principio
Un CRM que falla en silencio es peor que no tener CRM.
Todo error debe:
registrarse;
conservar datos;
indicar nodo;
indicar tipo;
permitir revisión;
no eliminar el lead.

13.2 Tipos de error
Error
Causa
Acción
ERROR_PAYLOAD
Tally envía estructura inesperada
Guardar payload en ERRORES
ERROR_VALIDACION
Faltan campos críticos
Guardar lead como amarillo
ERROR_CONSENTIMIENTO
No acepta consentimiento
Bloquear comunicación
ERROR_IA
IA falla o no devuelve JSON
Marcar revisión manual
ERROR_SHEETS
Fallo al escribir en Sheets
Guardar error con payload
ERROR_ENVIO
Fallo en comunicación
No reintentar sin revisión
ERROR_DUPLICADO
Posible lead repetido
Marcar revisión


13.3 Error Trigger en n8n
Debe existir un workflow específico:
n8n_leads_error_handler_nc

Función:
recibir errores de workflows principales;
registrar error;
asociar lead_id si existe;
guardar payload si procede;
marcar estado pendiente de revisión.

13.4 Reglas de recuperación
Situación
Recuperación
IA falla
Guardar lead y marcar amarillo
Sheets falla
Guardar payload en error
Falta dato
Pedir aclaración
Consentimiento inválido
No contactar comercialmente
Duplicado
No borrar, marcar revisión
Riesgo detectado
Revisión manual obligatoria


14. RGPD, Seguridad y Datos de Prueba
14.1 Consentimiento
El formulario debe incluir consentimiento claro para:
recibir la solicitud;
valorar si el caso encaja;
responder al lead;
registrar datos mínimos necesarios.
Texto recomendado:
Acepto que NEGOCIA CONTROL use mis datos para responder a mi solicitud y valorar si mi caso encaja con el diagnóstico inicial. Entiendo que este formulario no sustituye una consulta profesional completa.


14.2 Minimización de datos
Solo deben recogerse datos necesarios para triage inicial.
No se solicitarán en v1.0:
documentos oficiales;
NIE/pasaporte;
datos bancarios;
declaraciones completas;
contratos;
información sensible no necesaria.

14.3 Datos de prueba
Durante desarrollo y presentación:
usar siempre datos ficticios;
marcar leads como [TEST];
no mostrar datos reales de clientes;
no enseñar WhatsApps reales;
no exponer emails reales;
no usar casos sensibles en clase.
Ejemplos:
Nombre: [TEST] Ana Demo
Email: test01@crm-demo.com
WhatsApp: +34 000 000 001
Situación: Autónomo
Origen ingresos: Mixto
Duda: Alta autónomo
Caso: Quiero empezar a facturar en España y no sé qué pasos seguir.


14.4 Accesos
Las credenciales de n8n no se escriben en prompts.
Tokens y claves deben estar en credenciales internas de n8n.
Google Sheets debe compartirse solo con cuentas autorizadas.
El documento de demo debe estar limpio de datos reales.

14.5 Comunicación
No se enviará comunicación automática si:
no hay consentimiento;
el caso es rojo;
hay riesgo;
la IA no clasificó bien;
falta dato crítico;
el mensaje contiene asesoramiento sensible.

15. Criterios de Aceptación
CA-01 Entrada desde Tally
DADO que una persona rellena el formulario Tally
CUANDO pulsa enviar
ENTONCES n8n recibe el payload
Y genera un lead_id
Y registra el lead en Google Sheets


CA-02 Normalización
DADO un payload de Tally con campos originales
CUANDO pasa por el nodo de normalización
ENTONCES los campos quedan convertidos al modelo NC
Y no se guarda ResponseID si no aporta valor operativo


CA-03 Campos obligatorios
DADO un lead con explicación de caso vacía
CUANDO n8n valida campos
ENTONCES se guarda como FALTA_DATO
Y semáforo amarillo
Y requiere revisión manual


CA-04 Consentimiento
DADO un lead sin consentimiento válido
CUANDO el sistema prepara respuesta
ENTONCES bloquea comunicación automática
Y marca ERROR_CONSENTIMIENTO o AMARILLO_REVISAR


CA-05 Clasificación IA correcta
DADO un lead con datos completos y caso fiscal claro
CUANDO IA analiza el caso
ENTONCES devuelve JSON válido
Y semáforo verde
Y acción recomendada hacia diagnóstico


CA-06 Fallo IA
DADO que IA devuelve texto no JSON
CUANDO n8n valida la respuesta
ENTONCES marca ERROR_IA
Y guarda el lead
Y lo manda a revisión manual


CA-07 Lead amarillo
DADO un lead con posible encaje pero información insuficiente
CUANDO se clasifica
ENTONCES queda como AMARILLO_REVISAR
Y el sistema indica qué dato falta


CA-08 Lead rojo
DADO un lead que menciona fraude, ocultación o garantía de resultado
CUANDO se procesa
ENTONCES se marca ROJO_NO_ENCAJA
Y no se genera envío automático


CA-09 Duplicado
DADO un lead con el mismo WhatsApp que otro lead reciente
CUANDO se procesa
ENTONCES no se borra
Y queda marcado como posible duplicado
Y requiere revisión


CA-10 Google Sheets
DADO un lead procesado correctamente
CUANDO termina el workflow
ENTONCES existe una fila en LEADS_PRINCIPAL
Y una línea en HISTORIAL_INTERACCIONES


CA-11 Error Sheets
DADO que Google Sheets no responde
CUANDO n8n intenta guardar
ENTONCES el error queda registrado en ERRORES
Y el payload no se pierde


CA-12 Pipeline
DADO que existen leads con distintos estados
CUANDO Natalia abre el pipeline
ENTONCES ve cada lead en su columna
Y puede identificar semáforo, urgencia y siguiente acción


CA-13 Reportes
DADO que han entrado leads durante la semana
CUANDO se consulta reportes
ENTONCES se muestran total, verdes, amarillos, rojos, errores y conversión


CA-14 Revisión humana
DADO un caso con riesgo detectado
CUANDO el sistema lo procesa
ENTONCES queda marcado como requiere_revision_manual = true
Y Natalia debe revisarlo antes de responder


16. Roadmap y Fases Futuras
v1.0 — MVP Operativo
Objetivo:
Capturar, clasificar y registrar leads sin perder control.

Incluye:
Tally.
n8n.
Google Sheets.
IA clasificadora.
Semáforo.
Pipeline básico.
Reportes mínimos.
Revisión manual.

v1.1 — Mejora comercial
Objetivo:
Convertir mejor los leads verdes y recuperar amarillos.

Incluye:
Mensajes WhatsApp preaprobados.
Secuencia manual asistida.
Registro de diagnóstico reservado.
Motivos de pérdida.
Priorización por urgencia.
Plantillas ES/UA.

v1.2 — Métricas y aprendizaje
Objetivo:
Saber qué canal, mensaje y lead magnet funcionan mejor.

Incluye:
Métricas por canal.
Métricas por idioma.
Conversión por duda principal.
Detección de objeciones.
Reporte semanal automático.

v2.0 — CRM más sólido
Objetivo:
Pasar de hoja operativa a sistema CRM más robusto.

Opciones:
Airtable.
Notion avanzado.
Supabase.
App interna simple.
Incluye:
Roles.
Historial completo.
Tareas.
Calendario.
Mejor dashboard.

v3.0 — Automatización avanzada
Objetivo:
Reducir seguimiento manual sin perder control.

Incluye:
WhatsApp Business API.
Recordatorios automáticos.
Scoring avanzado.
Segmentación por servicio.
Integración documental.
Envíos bajo reglas estrictas.

v4.0 — Sistema NC escalable
Objetivo:
Convertir NC en una operación profesional repetible.

Incluye:
Expedientes por cliente.
Portal interno.
Base de conocimiento.
SOPs conectadas.
Plantillas fiscales.
Panel de negocio.
Sistema replicable para otros servicios.

17. Supuestos y Restricciones
17.1 Supuestos
El volumen inicial de leads será manejable en Google Sheets.
Natalia será la operadora principal.
Tally será la entrada estructurada principal.
n8n tendrá acceso a Tally, Google Sheets e IA.
La IA se usará como apoyo, no como decisión final.
El diagnóstico fiscal seguirá siendo revisado por NC.
El sistema se construye en fase de prelanzamiento.
La prioridad es validar flujo, oferta y conversión.

17.2 Restricciones
No se usará Make.com.
No se automatizarán decisiones fiscales cerradas.
No se enviará comunicación comercial sin consentimiento.
No se usarán datos reales en pruebas.
No se añadirá CRM complejo antes de validar.
No se integrará WhatsApp API en v1.0.
No se prometerán resultados desde IA.
No se tratarán casos delicados sin revisión humana.
No se recogerán documentos sensibles en formulario inicial.
No se multiplicarán herramientas sin necesidad.

17.3 Riesgos del MVP
Riesgo
Impacto
Mitigación
IA clasifica mal
Alto
Reglas duras + revisión manual
Tally cambia payload
Medio
Nodo de extracción defensivo
Sheets falla
Medio
Hoja ERRORES + payload guardado
Datos incompletos
Medio
Semáforo amarillo + pedir dato
Falta consentimiento
Alto
Bloqueo automático
Exceso de herramientas
Alto
n8n como orquestador único
Leads reales en demo
Alto
Usar datos [TEST]
Automatizar demasiado pronto
Alto
Mensajes sensibles con revisión


18. Glosario
Término
Definición
Lead
Persona interesada en servicios de NC
Diagnóstico inicial
Servicio de entrada para analizar y ordenar el caso
Semáforo
Clasificación verde / amarillo / rojo
Verde
Lead apto para diagnóstico
Amarillo
Lead que puede encajar pero necesita dato o revisión
Rojo
Lead que no encaja o presenta riesgo
Triage
Clasificación inicial del lead
n8n
Herramienta de automatización usada como orquestador único
Tally
Formulario de entrada
Google Sheets
Base de datos operativa inicial
Payload
Datos recibidos desde formulario
Webhook
Punto automático de entrada de datos
Consentimiento
Aceptación del lead para uso de datos y contacto
Revisión manual
Validación humana antes de actuar
Acción recomendada
Próximo paso sugerido
Pipeline
Proceso visual de gestión del lead
Kanban
Vista por columnas
IA Clasificadora
Capa que resume y propone clasificación
Error Trigger
Workflow de n8n que captura fallos
Dato crítico
Información mínima necesaria para decidir siguiente paso
Riesgo detectado
Señal que exige revisión humana
Diagnóstico reservado
Lead que ha aceptado avanzar al servicio inicial
Cliente activo
Lead convertido en cliente


Conclusión Operativa
El CRM de NEGOCIA CONTROL v1.0 debe funcionar como una infraestructura mínima de control comercial:
Captar → ordenar → clasificar → priorizar → revisar → convertir.

El sistema no pretende resolver fiscalmente los casos, sino preparar una entrada ordenada hacia el diagnóstico inicial.
La clave del MVP es no perder leads, no automatizar de más y construir una base fiable para escalar.
Regla final:
Sistema simple, trazable y útil. Primero control. Luego escala.


Documento preparado para revisión. Versión 1.0 sujeta a cambios tras validación operativa de NEGOCIA CONTROL.
