**\# PRD — NC Lead Triage \+ Control Tower MVP**

\*\*Proyecto:\*\* NEGOCIA CONTROL    
\*\*Producto:\*\* Sistema de triage, gestión mínima y dashboard básico de leads    
\*\*Fase actual:\*\* MVP de aprendizaje y validación    
\*\*Responsable:\*\* Natalia    
\*\*Automatización:\*\* n8n    
\*\*Formulario:\*\* Tally    
\*\*Base operativa inicial:\*\* Google Sheets — hoja \`Diagnostico\`    
\*\*Interfaz visual:\*\* Dashboard tipo \`index.html\` — NC Control Tower    
\*\*Plataforma de construcción:\*\* Antigravity  

\---

\#\# 1\. Nombre del proyecto

\*\*NC Lead Triage \+ Control Tower MVP\*\*

Sistema mínimo para recibir, clasificar, visualizar y gestionar leads del servicio de entrada de NEGOCIA CONTROL:

\*\*Diagnóstico fiscal para empezar bien en España.\*\*

\---

\#\# 2\. El problema

NEGOCIA CONTROL está en fase de prelanzamiento. Su puerta comercial actual es la fiscalidad para personas migrantes, autónomos y pequeños negocios internacionales que quieren empezar bien en España.

Actualmente, la gestión de leads depende demasiado de revisión manual. Cuando una persona rellena el formulario o escribe, Natalia tiene que leer cada caso, detectar si faltan datos, valorar si encaja, identificar riesgos y decidir la siguiente acción.

Esta forma de trabajo genera una pérdida operativa clara:

\- \*\*Pérdida de tiempo:\*\* cada lead exige revisión manual desde cero.  
\- \*\*Pérdida de velocidad:\*\* si la respuesta tarda, el lead se enfría.  
\- \*\*Pérdida de oportunidades:\*\* algunos leads buenos pueden quedar sin seguimiento.  
\- \*\*Pérdida de control:\*\* no hay una vista clara del estado de cada lead.  
\- \*\*Pérdida de foco:\*\* Natalia dedica energía a ordenar información básica en vez de revisar con criterio.  
\- \*\*Pérdida de datos comerciales:\*\* no se sabe qué canal trae mejores leads ni qué tipo de casos convierten mejor.  
\- \*\*Riesgo profesional:\*\* automatizar sin filtros puede llevar casos sensibles hacia una respuesta comercial inadecuada.

El problema principal no es solo que el proceso sea manual. El verdadero problema es que, sin un sistema mínimo de triage y visualización, NEGOCIA CONTROL pierde tiempo, control y oportunidades comerciales, y además aumenta el riesgo de gestionar mal casos sensibles.

Por eso, la solución debe automatizar solo la parte segura del proceso: recibir, ordenar, validar, resumir, clasificar, registrar, visualizar y avisar.

La IA no debe tomar decisiones fiscales, legales ni migratorias. La IA solo ayuda a resumir, clasificar y detectar señales de riesgo. La decisión final sigue siendo humana y corresponde a Natalia.

\---

\#\# 3\. El usuario objetivo

La usuaria principal del sistema es \*\*Natalia\*\*, fundadora y responsable operativa de NEGOCIA CONTROL.

Natalia necesita una herramienta que le ayude a:

\- recibir leads de forma ordenada;  
\- revisar casos con menos carga manual;  
\- priorizar por semáforo;  
\- detectar datos faltantes;  
\- identificar riesgos;  
\- ver el estado de cada lead;  
\- decidir si contacta, pide más datos, propone diagnóstico o rechaza el caso;  
\- visualizar los leads en un dashboard básico.

Las personas que rellenan el formulario no son usuarias internas del sistema. Son leads o solicitantes. Aportan información inicial, pero no acceden a Google Sheets ni al dashboard interno.

\---

\#\# 4\. La solución propuesta

Construir un MVP funcional de aprendizaje y validación con este flujo:

\*\*Tally → n8n → IA → Google Sheets → Dashboard básico NC Control Tower → revisión Natalia\*\*

El proyecto se desarrollará en dos fases.

\#\#\# Fase 1 — MVP funcional de triage \+ gestión \+ dashboard básico

Objetivo:

Terminar un prototipo funcional que permita practicar durante el curso, validar la lógica del sistema y visualizar los leads de forma básica.

La Fase 1 incluye:

\- recepción de leads desde Tally;  
\- generación de \`Lead\_ID\`;  
\- registro de \`Fecha\`;  
\- captura de \`Canal\_origen\` y, si existe, \`Campaña\_origen\`;  
\- validación de consentimiento;  
\- validación de contacto;  
\- clasificación IA en verde / amarillo / rojo;  
\- aplicación de reglas duras de seguridad;  
\- detección de datos faltantes;  
\- detección de riesgos;  
\- registro en Google Sheets;  
\- dashboard básico tipo \`index.html\`;  
\- aviso interno a Natalia;  
\- revisión humana.

Estados del lead:

\- \`NUEVO\`  
\- \`EN\_REVISION\`  
\- \`CONTACTADO\`  
\- \`DIAGNOSTICO\_PROPUESTO\`  
\- \`CLIENTE\`  
\- \`RECHAZADO\`  
\- \`NO\_CONTESTA\`  
\- \`ERROR\_IA\`

Si la IA falla, el estado será \`ERROR\_IA\`.

\#\#\# Fase 2 — NC Control Tower avanzada

La Fase 2 solo se activará después de validar la lógica de Fase 1 con práctica durante el curso o con 50 a 100 leads reales.

Objetivo:

Convertir el dashboard básico en una herramienta más completa de control, métricas y mejora operativa.

Podrá incluir:

\- métricas por semáforo;  
\- métricas por estado;  
\- métricas por canal;  
\- métricas por campaña;  
\- funnel de conversión;  
\- alertas internas;  
\- tabla filtrable de leads;  
\- vista detalle de lead;  
\- comparación entre \`Semaforo\_IA\` y \`Semaforo\_final\`;  
\- mejora del formulario con datos reales.

\---

\#\# 5\. Funcionalidades clave

\#\#\# 1\. Recepción automática de leads

El sistema recibe datos desde Tally mediante Webhook en n8n.

Tally captura:

\- Nombre\_y\_apellidos  
\- Email  
\- WhatsApp  
\- Idioma  
\- En\_Espana  
\- Situacion\_actual  
\- Origen\_ingresos  
\- Duda\_principal  
\- Resumen\_caso  
\- Urgencia  
\- Consentimiento

n8n añade:

\- Lead\_ID  
\- Fecha

\#\#\# 2\. Validación básica y reglas duras

n8n valida:

\- consentimiento;  
\- contacto;  
\- campos mínimos;  
\- duplicado probable;  
\- si el registro es prueba o lead real.

Reglas duras:

\- sin consentimiento válido → rojo o bloqueo de contacto;  
\- contacto incompleto → amarillo;  
\- explicación demasiado corta → amarillo;  
\- palabras de riesgo → rojo;  
\- fallo de IA → \`ERROR\_IA\`;  
\- duda entre verde y amarillo → amarillo;  
\- duda entre amarillo y rojo → rojo;  
\- casos rojos nunca pasan a venta directa.

\#\#\# 3\. Clasificación con IA

La IA analiza el lead y devuelve:

\- \`Semaforo\_IA\`;  
\- \`Tipo\_lead\_IA\`;  
\- \`Resumen\_IA\`;  
\- \`Motivo\_clasificacion\`;  
\- \`Datos\_faltantes\`;  
\- \`Riesgos\_detectados\`;  
\- \`Accion\_recomendada\`;  
\- \`Requiere\_revision\_manual\`;  
\- \`Mensaje\_interno\_Natalia\`.

La IA no decide. Solo ayuda a clasificar, resumir y detectar señales de riesgo.

\#\#\# 4\. Registro en Google Sheets

Toda la información queda guardada en la hoja \`Diagnostico\`.

Campos principales:

\- datos originales del lead;  
\- canal y campaña de origen;  
\- clasificación IA;  
\- estado;  
\- decisión humana;  
\- notas internas;  
\- control técnico.

Google Sheets será la base operativa inicial del MVP.

\#\#\# 5\. Dashboard básico NC Control Tower

El dashboard tipo \`index.html\` forma parte de la Fase 1 como visualización mínima.

Debe incluir:

\- cabecera NEGOCIA CONTROL;  
\- buscador global por nombre o Lead\_ID;  
\- contador total de leads;  
\- contador de urgentes;  
\- contador de errores IA;  
\- contadores por semáforo: verdes, amarillos y rojos;  
\- flujo visual: Entrada → Revisión → Contacto → Diagnóstico → Cliente;  
\- filtros por urgencia, idioma, duda principal, semáforo y estado;  
\- pipeline operativo agrupado por estado;  
\- drawer lateral de detalle del lead;  
\- selector de estado;  
\- badges de estado, semáforo e idioma;  
\- aviso visible: \*\*“La IA clasifica. NC decide.”\*\*

En Fase 1, las acciones de WhatsApp o email pueden ser visuales o semimanuales. No se automatiza asesoramiento ni venta directa de casos sensibles.

\---

\#\# 6\. Herramientas a usar

El curso propone IA, Make y Antigravity. En este proyecto, la parte de automatización se adaptará usando \*\*n8n en lugar de Make\*\*, porque el workflow ya está iniciado en n8n y será la herramienta principal de automatización.

Herramientas:

\- \*\*Inteligencia artificial / modelo de lenguaje:\*\* resumen, clasificación y detección de riesgos.  
\- \*\*n8n:\*\* automatización principal, sustituyendo a Make.  
\- \*\*Tally:\*\* formulario de entrada.  
\- \*\*Google Sheets:\*\* base operativa inicial, hoja \`Diagnostico\`.  
\- \*\*Antigravity:\*\* plataforma de construcción y prototipado.  
\- \*\*HTML/CSS/JS:\*\* dashboard básico tipo \`index.html\`.

\---

\#\# 7\. Criterios de éxito

La Fase 1 se considera útil si:

\- el 100% de leads recibidos queda registrado en Google Sheets;  
\- todos los leads tienen \`Lead\_ID\`;  
\- todos los leads tienen \`Fecha\`;  
\- se captura \`Canal\_origen\`;  
\- la IA clasifica en verde / amarillo / rojo;  
\- los casos sin consentimiento se detectan;  
\- los casos rojos no pasan a venta directa;  
\- los errores IA quedan marcados como \`ERROR\_IA\`;  
\- los duplicados probables se identifican;  
\- los registros de prueba se pueden excluir con \`Es\_test\`;  
\- Natalia puede revisar más rápido;  
\- el dashboard muestra leads reales o datos espejo de la hoja;  
\- el dashboard permite buscar y filtrar leads;  
\- el dashboard muestra métricas básicas;  
\- el drawer permite revisar un lead sin leer toda la fila de Sheets;  
\- se puede comparar \`Semaforo\_IA\` con \`Semaforo\_final\`;  
\- la estructura queda preparada para Fase 2\.

Métrica pendiente de baseline:

\- tiempo medio actual de revisión manual por lead.

Esta métrica servirá para comparar el antes y después del MVP.

\---

\#\# 8\. Lo que el proyecto NO incluirá

La Fase 1 no incluirá:

\- CRM completo;  
\- dashboard avanzado;  
\- BI complejo;  
\- predicción automática de conversión;  
\- automatización total de WhatsApp;  
\- envío automático de asesoramiento fiscal;  
\- envío automático de asesoramiento migratorio;  
\- pasarela de pago;  
\- calendario integrado;  
\- portal de cliente;  
\- gestión documental avanzada;  
\- presentación de impuestos;  
\- resolución fiscal automática;  
\- resolución migratoria automática;  
\- decisiones profesionales tomadas por IA;  
\- venta del sistema a terceros.

La Fase 2 tampoco sustituirá la revisión humana. Solo añadirá más visibilidad, métricas, alertas y mejora del sistema con datos reales.

\---

\#\# Conclusión

El MVP correcto de NEGOCIA CONTROL no es un CRM completo.

El MVP correcto para esta entrega es:

\*\*formulario → n8n → IA → Google Sheets → dashboard básico → revisión humana\*\*

La Fase 1 permite practicar, validar y visualizar el flujo durante el curso.

La Fase 2 convierte ese prototipo en una NC Control Tower más completa, con métricas, alertas y decisiones basadas en datos reales.

La IA no decide.    
Natalia decide.    
n8n automatiza.    
Google Sheets guarda.    
Antigravity prototipa.    
El dashboard ayuda a ver y gestionar sin perder el control.  
