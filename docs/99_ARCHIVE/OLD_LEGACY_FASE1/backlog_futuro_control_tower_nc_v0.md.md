# Backlog Técnico de Implementación — CRM NC Control Tower v1.0

Este backlog desglosa el PRD en tareas atómicas y secuenciales para construir el MVP operativo.

| ID Tarea | Nombre de Tarea | Descripción | Prioridad | Dependencias | Herramienta | Criterio de Aceptación | Estado |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **ST-01** | Estructura GSheets | Crear el Spreadsheet y las 6 pestañas con las cabeceras exactas del PRD. | P0 | Ninguna | Google Sheets | Se visualizan las 6 hojas con los nombres y columnas correctas. | Pendiente |
| **WF-01** | Webhook de Entrada | Crear el webhook en n8n para recibir el payload de Tally. | P0 | ST-01 | n8n | El nodo recibe datos de prueba y responde con 200 OK. | Pendiente |
| **WF-02** | Normalización de Datos | Nodo de código para mapear los nombres de campos de Tally a la nomenclatura interna NC. | P0 | WF-01 | n8n | El JSON de salida usa `nombre`, `email`, `whatsapp`, etc., sin espacios ni carácteres extraños. | Pendiente |
| **WF-03** | Generador de Lead ID | Crear lógica para generar un `lead_id` único (ej: `NC-L-AAAAMMDD-XXXX`). | P1 | WF-02 | n8n | Cada lead tiene un ID único y trazable. | Pendiente |
| **WF-04** | Validación de Consentimiento | Nodo IF para detectar si el consentimiento es FALSE y bloquear acciones comerciales. | P0 | WF-02 | n8n | Si no hay consentimiento, el lead se marca como `ERROR_CONSENTIMIENTO`. | Pendiente |
| **IA-01** | Prompteado Clasificador | Configurar el nodo de IA con el System Prompt operativo y las reglas de semáforo. | P0 | WF-02 | n8n / OpenAI | La IA devuelve un resumen, semáforo y motivo coherentes. | Pendiente |
| **IA-02** | Validador de Salida IA | Nodo de código para validar que la IA devolvió un JSON válido y completo. | P0 | IA-01 | n8n | Si la IA falla o da texto plano, se activa el estado `ERROR_IA` y semáforo amarillo. | Pendiente |
| **WF-05** | Escritura en GSheets | Nodo para insertar el lead en `LEADS_PRINCIPAL` y una entrada en `HISTORIAL`. | P0 | WF-04, IA-02 | n8n / GSheets | El lead aparece en la hoja de cálculo con todos sus campos de triaje. | Pendiente |
| **WF-06** | Gestor de Errores | Crear el workflow `n8n_leads_error_handler` para capturar cualquier fallo de nodo. | P1 | WF-01 | n8n | Cualquier fallo de nodo se registra en la pestaña `ERRORES` con el payload original. | Pendiente |
| **FE-01** | Maqueta Pipeline Bento | Crear la estructura HTML/CSS de la cuadrícula Kanban usando el diseño Warm Professional Bento. | P1 | ST-01 | HTML / CSS | Se visualizan las columnas del pipeline con el diseño premium crema/carbón. | Pendiente |
| **FE-02** | Conector de Datos FE | Implementar la lógica para leer los leads desde GSheets y pintarlos en sus columnas. | P1 | FE-01, WF-05 | JS (Vanilla) | Los leads de la hoja de cálculo aparecen como tarjetas en el pipeline. | Pendiente |
| **FE-03** | Detalle de Lead y Acciones | Crear el modal de ficha de lead con botones para WhatsApp Directo y Email. | P1 | FE-02 | JS (Vanilla) | Al hacer clic en un lead, se ve su detalle y el botón de WhatsApp abre `wa.me` con el texto. | Pendiente |
| **FE-04** | Dashboard de Reportes | Crear la vista de métricas básicas (Total, Verdes, Amarillos, Rojos, Errores). | P2 | FE-02 | JS (Vanilla) | Se visualizan los contadores agregados en la parte superior del CRM. | Pendiente |
