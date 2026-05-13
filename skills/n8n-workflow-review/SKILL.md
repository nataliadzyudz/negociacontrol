# Skill: n8n-workflow-review

## Cuándo usar esta skill
Usar para auditar los flujos de automatización antes de promoverlos de "Lab" a "Producción" o al revisar fallos en la integración.

## Objetivo
Revisar la lógica de los workflows de n8n, detectar credenciales hardcodeadas, validar endpoints de webhook y asegurar la trazabilidad.

## Inputs necesarios
- Archivos JSON de exportación de workflows en `n8n_workflows/`.
- Acceso a `PROJECT_STATE.md` para validar endpoints de API.

## READ_SET recomendado
- `n8n_workflows/`
- `PROJECT_STATE.md`

## WRITE_SET permitido
- Ninguno (Prohibido modificar los JSON de workflows directamente).

## DO_NOT_TOUCH
- Instancia real de n8n (no usar la API de n8n para modificar).

## Pasos
1. Buscar archivos JSON en las carpetas `lab`, `candidato` y `produccion`.
2. Analizar los nodos de "HTTP Request" para ver a qué URLs apuntan.
3. Detectar uso de variables de entorno vs valores estáticos.
4. Verificar que el manejo de errores (Error handling) esté implementado en nodos críticos.

## Tools permitidas
- `view_file`
- `grep_search`

## Tools prohibidas
- `mcp_n8n-mcp_*` (prohibido modificar workflows reales).

## Riesgos
- Promover un flujo de lab que apunta a una base de datos de test a producción.
- No detectar falta de autenticación en webhooks de entrada.

## Output obligatorio
- workflows encontrados y su ubicación
- endpoints y servicios externos detectados
- clasificación (producción/candidato/lab)
- riesgos de seguridad o lógica
- propuesta de promoción segura

## Criterio de cierre
Reporte de auditoría de automatización entregado.

## Siguiente paso real
Importar el workflow validado en la instancia de n8n correspondiente mediante una TASK_SPEC de despliegue.
