  
\# Backlog Técnico Fase 1 — NC Lead Triage MVP v1.1

\#\# Objetivo de la Fase 1

Construir un sistema mínimo y seguro para:

\`\`\`text  
Tally → DIAGNOSTICO.json en n8n → hoja Diagnostico → dashboard read-only → revisión Natalia

La Fase 1 **no construye un CRM completo**. Construye un triaje seguro, trazable y revisable.

---

## **Reglas de gobierno del backlog**

### **Sí entra en Fase 1**

DIAGNOSTICO.json  
Hoja Google Sheets: Diagnostico  
Validaciones básicas  
Reglas duras pre-IA  
Clasificación IA  
Semaforo\_preIA / Semaforo\_IA / Semaforo\_final  
Estado operativo  
Es\_test  
Aviso interno  
Dashboard visual/read-only  
6 tests de aceptación

### **No entra en Fase 1**

CRM completo  
6 pestañas Google Sheets  
Historial avanzado  
Reportes avanzados  
CONFIG\_REGLAS  
PLANTILLAS\_RESPUESTA  
WhatsApp API  
Envío automático al lead  
Pasarela de pago  
Calendario integrado  
Dashboard editable  
Pipeline con escritura en Sheets

---

# **A. Preparación de archivos y entorno**

| ID | Tarea | Descripción | Prioridad | Dependencias | Herramienta | Criterio de aceptación | Estado |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| `SET-01` | Crear carpeta segura de trabajo | Crear carpeta `n8n_workflows` con `DIAGNOSTICO.json` y `DIAGNOSTICO.backup.json`. | P0 | Ninguna | Sistema / OpenCode | La carpeta contiene solo los archivos necesarios. | Pendiente |
| `SET-02` | Bloquear alcance de OpenCode | Indicar a OpenCode que solo puede trabajar dentro de `n8n_workflows`. | P0 | SET-01 | OpenCode | OpenCode no lee ni modifica otros archivos. | Pendiente |
| `SET-03` | Crear `README_CAMBIOS.md` | Documentar cambios realizados por OpenCode. | P1 | SET-01 | OpenCode | Existe un archivo con resumen de cambios, nodos tocados y riesgos. | Pendiente |

---

# **B. Hoja Google Sheets `Diagnostico`**

## **Decisión**

En Fase 1 habrá **una sola hoja principal**:

Diagnostico

No se crea todavía `LEADS_PRINCIPAL`, `HISTORIAL`, `REPORTES`, `CONFIG_REGLAS` ni `PLANTILLAS_RESPUESTA`.

## **Columnas mínimas Fase 1**

| ID | Tarea | Descripción | Prioridad | Dependencias | Herramienta | Criterio de aceptación | Estado |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| `GS-01` | Revisar hoja `Diagnostico` | Confirmar que existe la hoja operativa principal. | P0 | Ninguna | Google Sheets | Existe una pestaña llamada exactamente `Diagnostico`. | Pendiente |
| `GS-02` | Añadir columnas base del lead | Revisar o añadir columnas de entrada: `Lead_ID`, `Fecha`, `Nombre_y_apellidos`, `Email`, `WhatsApp`, `Idioma`, `En_Espana`, `Situacion_actual`, `Origen_ingresos`, `Duda_principal`, `Resumen_caso`, `Urgencia`, `Consentimiento`. | P0 | GS-01 | Google Sheets | Todas las columnas base existen y tienen nombre estable. | Pendiente |
| `GS-03` | Añadir columnas de validación | Añadir: `Consentimiento_valido`, `Email_valido`, `WhatsApp_valido`, `Es_test`, `Canal_origen`, `Campaña_origen`. | P0 | GS-02 | Google Sheets | Las columnas existen y n8n puede mapearlas. | Pendiente |
| `GS-04` | Añadir columnas de reglas pre-IA | Añadir: `Riesgo_duro_detectado`, `Riesgo_duro_motivo`, `Semaforo_preIA`, `Requiere_revision_preIA`. | P0 | GS-03 | Google Sheets | Las reglas duras pueden escribirse antes de IA. | Pendiente |
| `GS-05` | Añadir columnas IA | Añadir: `Semaforo_IA`, `Tipo_lead_IA`, `Resumen_IA`, `Motivo_clasificacion`, `Datos_faltantes`, `Riesgos_detectados`, `Accion_recomendada`, `Siguiente_accion`, `Requiere_revision`, `Respuesta_sugerida`, `Mensaje_interno_Natalia`. | P0 | GS-04 | Google Sheets | La salida IA puede guardarse completa. | Pendiente |
| `GS-06` | Añadir columnas finales | Añadir: `Semaforo_final`, `Estado`, `Error_tecnico`, `Notas_NC`, `Fecha_ultima_actualizacion`. | P0 | GS-05 | Google Sheets | Cada lead tiene decisión final, estado y trazabilidad mínima. | Pendiente |
| `GS-07` | Refrescar columnas en n8n | Después de modificar cabeceras, refrescar columnas en nodos Google Sheets. | P0 | GS-06 | n8n | n8n reconoce todas las columnas nuevas. | Pendiente |

---

# **C. Corrección de `DIAGNOSTICO.json`**

## **Flujo objetivo**

Webhook Tally  
→ extraer payload  
→ normalizar campos  
→ validar consentimiento/contacto  
→ detectar Es\_test  
→ aplicar reglas duras pre-IA  
→ generar Lead\_ID  
→ append inicial con Estado \= NUEVO  
→ si ROJO pre-IA / sin consentimiento → aviso interno y fin  
→ si no hay bloqueo → IA  
→ validar JSON IA  
→ aplicar reglas finales  
→ calcular Semaforo\_final  
→ actualizar fila en Diagnostico  
→ aviso interno si ROJO / ERROR\_IA / Requiere\_revision  
→ fin sin enviar nada al lead

## **Tareas n8n / `DIAGNOSTICO.json`**

| ID | Tarea | Descripción | Prioridad | Dependencias | Herramienta | Criterio de aceptación | Estado |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| `WF-01` | Validar importabilidad inicial | Comprobar que `DIAGNOSTICO.json` original es JSON válido antes de tocarlo. | P0 | SET-01 | OpenCode / n8n | El archivo original se puede leer y validar. | Pendiente |
| `WF-02` | Preservar backup | Confirmar que existe `DIAGNOSTICO.backup.json`. | P0 | WF-01 | OpenCode | Hay copia intacta del workflow original. | Pendiente |
| `WF-03` | Revisar Webhook Tally | Confirmar nodo de entrada desde Tally. | P0 | WF-01 | n8n | El webhook recibe payload de prueba. | Pendiente |
| `WF-04` | Reforzar extracción de payload | Asegurar que el flujo soporta `input.body`, `payload.data`, `fields` u otras variantes razonables de Tally. | P0 | WF-03 | n8n / JS | El flujo no falla si Tally cambia ligeramente la estructura. | Pendiente |
| `WF-05` | Normalizar campos | Mapear campos Tally a nombres NC usados en hoja `Diagnostico`. | P0 | WF-04 | n8n / JS | El JSON interno contiene los campos NC correctos. | Pendiente |
| `WF-06` | Validar consentimiento real | Considerar válido solo texto de aceptación real, no campo simplemente no vacío. | P0 | WF-05 | n8n / JS | Sin consentimiento válido, el lead no puede pasar a contacto comercial. | Pendiente |
| `WF-07` | Validar email | Comprobar formato razonable de email. | P0 | WF-05 | n8n / JS | `Email_valido` devuelve `SI` o `NO`. | Pendiente |
| `WF-08` | Validar WhatsApp | Limpiar teléfono y validar longitud/formato razonable. | P0 | WF-05 | n8n / JS | `WhatsApp_valido` devuelve `SI` o `NO`. | Pendiente |
| `WF-09` | Marcar contacto incompleto | Si no hay email válido ni WhatsApp válido, marcar amarillo. | P0 | WF-07, WF-08 | n8n / JS | Lead queda `AMARILLO` con dato faltante `Email o WhatsApp válido`. | Pendiente |
| `WF-10` | Detectar `Es_test` | Marcar test si nombre contiene `[TEST]`, `TEST`, `verde`, `amarillo` o `rojo`. También si email contiene `test` o dominio de prueba. | P0 | WF-05 | n8n / JS | Leads de prueba quedan `Es_test = SI`. | Pendiente |
| `WF-11` | Añadir `Canal_origen` | Fijar `Canal_origen = Tally` si no viene informado. | P0 | WF-05 | n8n / JS | Todo lead tiene canal de origen. | Pendiente |
| `WF-12` | Añadir `Estado = NUEVO` | Desde el primer append, todo lead debe guardarse con estado inicial `NUEVO`. | P0 | WF-05 | n8n / JS | Todo lead nuevo entra con `Estado = NUEVO`. | Pendiente |
| `WF-13` | Reglas duras pre-IA | Detectar palabras/frases de riesgo en español, inglés y ucraniano antes de llamar a IA. | P0 | WF-05 | n8n / JS | Riesgos claros se marcan antes de IA. | Pendiente |
| `WF-14` | Calcular `Semaforo_preIA` | Generar semáforo previo: `ROJO`, `AMARILLO` o vacío/pendiente según reglas duras. | P0 | WF-13 | n8n / JS | Existe `Semaforo_preIA` trazable. | Pendiente |
| `WF-15` | Crear ruta de bloqueo pre-IA | Si no hay consentimiento o hay riesgo rojo claro, evitar llamada innecesaria a IA si es posible. | P1 | WF-13, WF-14 | n8n | Casos bloqueados no dependen de IA. | Pendiente |
| `WF-16` | Append inicial en `Diagnostico` | Guardar lead inicial antes o durante la clasificación, sin perder casos rojos/errores. | P0 | GS-07, WF-12 | n8n / Sheets | Todo lead queda registrado, incluso incompleto o rojo. | Pendiente |
| `WF-17` | Clasificación IA condicionada | Ejecutar IA solo si no hay bloqueo pre-IA o si se decide mantener llamada con prioridad final de reglas duras. | P0 | WF-15, WF-16 | n8n / IA | IA clasifica solo dentro de límites seguros. | Pendiente |
| `WF-18` | Validar JSON IA | Comprobar que la IA devuelve JSON válido con campos mínimos. | P0 | WF-17 | n8n / JS | Si IA falla, el flujo no se rompe. | Pendiente |
| `WF-19` | Gestionar `ERROR_IA` | Si IA falla o devuelve texto no JSON, marcar `Estado = ERROR_IA`, `Requiere_revision = SI` y aviso interno. | P0 | WF-18 | n8n | Error IA queda visible y no rompe el flujo. | Pendiente |
| `WF-20` | Calcular `Semaforo_final` | Aplicar regla: si hay conflicto, gana el riesgo. | P0 | WF-14, WF-18 | n8n / JS | Existe `Semaforo_final` fiable. | Pendiente |
| `WF-21` | Separar semáforo y estado | Mantener semáforo como calidad/riesgo y estado como posición operativa. | P0 | WF-20 | n8n / Sheets | No se mezclan valores tipo `VERDE_DIAGNOSTICO` como semáforo. | Pendiente |
| `WF-22` | Actualizar fila final | Actualizar la fila del lead con IA, semáforo final, acción recomendada y mensaje interno. | P0 | WF-20 | n8n / Sheets | La fila queda completa tras el procesamiento. | Pendiente |
| `WF-23` | Crear aviso interno | Añadir nodo o placeholder `AVISO INTERNO - CONFIGURAR` para rojos, errores IA o revisión obligatoria. | P1 | WF-19, WF-20 | n8n | Natalia puede ser avisada sin enviar nada al lead. | Pendiente |
| `WF-24` | Bloquear envío automático al lead | Desactivar, eliminar o marcar como no usar cualquier nodo que envíe WhatsApp/email automático. | P0 | WF-01 | n8n | El workflow no contacta automáticamente al lead. | Pendiente |
| `WF-25` | Validar JSON final | Confirmar que `DIAGNOSTICO.json` modificado sigue siendo JSON válido e importable. | P0 | Todas WF | OpenCode / n8n | El workflow se importa sin error. | Pendiente |
| `WF-26` | Documentar cambios | Registrar en `README_CAMBIOS.md` nodos modificados, campos añadidos y riesgos manuales. | P1 | WF-25 | OpenCode | Existe documentación mínima de implementación. | Pendiente |

---

# **D. Dashboard read-only Fase 1**

## **Decisión de alcance**

El dashboard de Fase 1 **solo visualiza**. No decide, no envía, no escribe en Google Sheets.

Fuente de verdad:

Google Sheets → Diagnostico

El dashboard puede usar datos reales, export controlado o mock espejo. Pero no debe convertirse todavía en CRM productivo.

## **Tareas dashboard**

| ID | Tarea | Descripción | Prioridad | Dependencias | Herramienta | Criterio de aceptación | Estado |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| `FE-01` | Definir modo read-only | Bloquear escritura desde dashboard en Fase 1\. | P0 | Ninguna | HTML / JS | No existe botón que modifique Sheets. | Pendiente |
| `FE-02` | Conectar fuente de datos visual | Leer datos desde mock espejo, CSV exportado o conexión simple a Sheets si ya existe. | P1 | GS-06 | JS | El dashboard muestra leads de prueba o datos espejo. | Pendiente |
| `FE-03` | Mostrar contadores básicos | Total leads, verdes, amarillos, rojos, errores IA, urgentes. | P1 | FE-02 | JS | Los contadores coinciden con los datos cargados. | Pendiente |
| `FE-04` | Mostrar pipeline por estado | Agrupar tarjetas por `Estado`: `NUEVO`, `EN_REVISION`, `CONTACTADO`, `DIAGNOSTICO_PROPUESTO`, `CLIENTE`, `RECHAZADO`, `NO_CONTESTA`, `ERROR_IA`. | P1 | FE-02 | HTML / JS | Los leads aparecen en su columna correcta. | Pendiente |
| `FE-05` | Mostrar semáforo visual | Cada tarjeta debe mostrar `Semaforo_final` sin mezclarlo con `Estado`. | P1 | FE-04 | HTML / CSS | Verde, amarillo y rojo se distinguen visualmente. | Pendiente |
| `FE-06` | Añadir filtros básicos | Filtros por semáforo, estado, idioma, urgencia, `Es_test`. | P1 | FE-04 | JS | Natalia puede filtrar leads sin tocar la hoja. | Pendiente |
| `FE-07` | Crear drawer detalle read-only | Al abrir un lead, mostrar datos del caso, clasificación, riesgo, acción recomendada y respuesta sugerida. | P1 | FE-04 | JS | Se ve el detalle sin editar datos. | Pendiente |
| `FE-08` | Copiar respuesta sugerida | Botón para copiar `Respuesta_sugerida` al portapapeles. | P2 | FE-07 | JS | Copia texto, pero no abre ni envía WhatsApp/email. | Pendiente |
| `FE-09` | Añadir aviso doctrinal | Mostrar texto fijo: “La IA clasifica. NC decide.” | P0 | FE-01 | HTML | El aviso es visible en dashboard. | Pendiente |
| `FE-10` | Ocultar o marcar tests | Permitir filtrar o identificar `Es_test = SI`. | P1 | FE-06 | JS | Los datos de prueba se distinguen claramente. | Pendiente |

---

# **E. Tests de aceptación obligatorios**

Estos tests validan la Fase 1\. No se pasa a dashboard real ni a publicación sin completarlos.

| ID | Caso | Entrada de prueba | Resultado esperado | Prioridad | Estado |
| ----- | ----- | ----- | ----- | ----- | ----- |
| `TEST-01` | Verde normal | Lead con consentimiento válido, email válido, caso claro de alta autónomo. | `Semaforo_final = VERDE`, `Estado = NUEVO` o `EN_REVISION`, `Canal_origen = Tally`, `Es_test = NO`. | P0 | Pendiente |
| `TEST-02` | Sin consentimiento | Lead sin aceptación válida. | `Semaforo_final = ROJO` o bloqueo operativo, `Requiere_revision = SI`, no envío automático, aviso interno. | P0 | Pendiente |
| `TEST-03` | Riesgo Hacienda | Texto: “Tengo una multa de Hacienda”. | Regla dura pre-IA marca `ROJO`, `Riesgo_duro_detectado = SI`, aviso interno. | P0 | Pendiente |
| `TEST-04` | Sin contacto válido | Sin email válido ni WhatsApp válido. | `Semaforo_final = AMARILLO`, `Datos_faltantes = Email o WhatsApp válido`, no envío automático. | P0 | Pendiente |
| `TEST-05` | Lead de prueba | Nombre: `[TEST] Iryna` o `Iryna Verde`. | `Es_test = SI`. | P0 | Pendiente |
| `TEST-06` | Fallo IA | Simular respuesta IA no JSON o error. | `Estado = ERROR_IA`, `Requiere_revision = SI`, error visible, aviso interno, flujo no se rompe. | P0 | Pendiente |

---

# **F. Métrica mínima de baseline**

| ID | Tarea | Descripción | Prioridad | Dependencias | Herramienta | Criterio de aceptación | Estado |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| `MET-01` | Medir tiempo manual actual | Cronometrar cuánto tarda Natalia en revisar un lead manualmente de principio a fin. | P1 | Ninguna | Manual | Hay una cifra base en minutos por lead. | Pendiente |
| `MET-02` | Medir tiempo con MVP | Cronometrar revisión con lead ya clasificado por sistema. | P1 | TEST-01 a TEST-06 | Manual | Hay comparación antes/después. | Pendiente |
| `MET-03` | Registrar aprendizaje | Documentar si el MVP ahorra tiempo, reduce error o mejora prioridad. | P2 | MET-02 | README / Notion | Hay decisión clara de mejora o siguiente fase. | Pendiente |

---

# **G. Backlog futuro aparcado**

No se elimina. Se aparca.

| ID futuro | Tarea | Fase |
| ----- | ----- | ----- |
| `FUT-01` | Hoja `ERRORES` separada | Fase 1.5 |
| `FUT-02` | `HISTORIAL_INTERACCIONES` | Fase 2 |
| `FUT-03` | `REPORTES` semanales | Fase 2 |
| `FUT-04` | `CONFIG_REGLAS` editable | Fase 2 |
| `FUT-05` | `PLANTILLAS_RESPUESTA` | Fase 2 |
| `FUT-06` | Dashboard editable | Fase 2 |
| `FUT-07` | Integración calendario/pago | Fase 2/3 |
| `FUT-08` | WhatsApp Business API | Fase 3 |
| `FUT-09` | CRM completo / Supabase / Airtable | Fase 3 |
| `FUT-10` | Automatización de seguimiento | Fase 3 |

---

# **Orden exacto de ejecución**

1\. Preparar carpeta n8n\_workflows  
2\. Revisar hoja Diagnostico y columnas  
3\. Ejecutar OpenCode sobre DIAGNOSTICO.json en PLAN  
4\. Revisar plan  
5\. Ejecutar BUILD  
6\. Validar JSON  
7\. Importar en n8n como DIAGNOSTICO\_MVP\_TEST  
8\. Refrescar columnas Google Sheets  
9\. Ejecutar 6 tests  
10\. Ajustar errores  
11\. Activar dashboard read-only con datos de prueba/espejo  
12\. Medir baseline y ahorro

---

# **Definición de “hecho” para Fase 1**

La Fase 1 estará terminada cuando:

Todos los leads de prueba entran en Diagnostico.  
No se pierde ningún lead.  
Todo lead tiene Lead\_ID.  
Todo lead tiene Estado.  
Todo lead tiene Canal\_origen.  
Los tests se detectan con Es\_test.  
Los riesgos se detectan antes de IA.  
Los errores IA no rompen el flujo.  
No se envía nada automático al lead.  
Natalia puede revisar desde Sheets o dashboard read-only.  
El dashboard muestra información, pero no decide ni escribe.

---

# **Nombre recomendado del archivo**

technical\_backlog\_implementacion\_FASE1\_v1\_1.md

