# Skill: backend-api-contract

## Cuándo usar esta skill
Usar al crear nuevos endpoints, modificar la lógica del backend o integrar el frontend/n8n con la API.

## Objetivo
Garantizar que los contratos JSON de la API sean consistentes, tengan validación de tipos, manejen errores correctamente y sean compatibles con los consumidores.

## Inputs necesarios
- Código fuente del backend (`server.js` o archivos en `/backend/`).
- Especificación de la API (si existe).

## READ_SET recomendado
- `backend/`
- `public/js/` (para ver el consumo)
- `server.js`

## WRITE_SET permitido
- `backend/` (solo para agregar validaciones o corregir errores de contrato si se autoriza).

## DO_NOT_TOUCH
- No cambiar lógica de negocio sin autorización.
- No modificar la base de datos desde esta skill.

## Pasos
1. Listar todos los endpoints activos.
2. Revisar los validadores de entrada (middlewares, Joi, Zod, etc.).
3. Verificar el formato de respuesta de éxito y de error (consistent structure).
4. Detectar endpoints obsoletos que aún estén expuestos.

## Tools permitidas
- `view_file`
- `grep_search`

## Tools prohibidas
- `run_command` (para levantar el servidor, usar smoke tests separados).

## Riesgos
- Romper la integración con el dashboard al cambiar un nombre de campo en el JSON.
- No considerar el impacto en workflows de n8n.

## Output obligatorio
- endpoints detectados
- endpoint canónico vs legacy
- riesgos detectados (falta de validación, tipos inconsistentes)
- pruebas mínimas para validar el contrato

## Criterio de cierre
Reporte de salud del contrato de la API entregado.

## Siguiente paso real
Implementar tests de integración para los endpoints validados.
