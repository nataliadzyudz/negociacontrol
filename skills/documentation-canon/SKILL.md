# Skill: documentation-canon

## Cuándo usar esta skill
Usar cuando existan discrepancias entre lo que dice `AGENTS.md`, `PROJECT_STATE.md` y los `README` o `QUICK_START` de las fases.

## Objetivo
Alinear toda la documentación de gobierno para que no existan contradicciones y se respete la jerarquía normativa establecida.

## Inputs necesarios
- `AGENTS.md` (como documento maestro).
- `PROJECT_STATE.md` (como estado de verdad).
- Todos los documentos de la fase activa.

## READ_SET recomendado
- `AGENTS.md`
- `PROJECT_STATE.md`
- `docs/`
- `README.md`

## WRITE_SET permitido
- Archivos de documentación en `docs/` o raíz (si la TASK_SPEC lo autoriza).

## DO_NOT_TOUCH
- Archivos de código (.js, .html, .css).
- Archivos de configuración de infraestructura.

## Pasos
1. Leer `AGENTS.md` para establecer la base doctrinal.
2. Comparar fechas y estados en `PROJECT_STATE.md` con las descripciones de las fases.
3. Detectar instrucciones contradictorias en los `QUICK_START`.
4. Verificar que los `Definition of Done` son consistentes.

## Tools permitidas
- `view_file`
- `grep_search`
- `replace_file_content` (solo para docs)

## Tools prohibidas
- No borrar documentos históricos sin respaldo (archivar en `/docs/legacy/`).

## Riesgos
- Borrar información contextual importante al intentar "limpiar".
- Desalinear la documentación con el estado real del sistema.

## Output obligatorio
- contradicciones detectadas
- documento que debe mandar (fuente)
- documento a corregir/archivar
- propuesta de jerarquía canónica

## Criterio de cierre
Documentación alineada y sin contradicciones lógicas.

## Siguiente paso real
Actualizar el Gate de fase con la documentación consolidada.
