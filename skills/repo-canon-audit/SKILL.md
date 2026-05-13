# Skill: repo-canon-audit

## Cuándo usar esta skill
Usar cuando se requiera entender la estructura actual del repositorio, identificar archivos duplicados, detectar código o documentación legacy que cause confusión, o proponer una jerarquía de archivos que sirva como fuente de verdad única (canon).

## Objetivo
Auditar la estructura del repositorio, detectar grietas (duplicados, inconsistencias) y proponer una estructura canónica alineada con la doctrina de NC Control Tower.

## Inputs necesarios
- Acceso de lectura a la raíz del workspace.
- `AGENTS.md` y `PROJECT_STATE.md` para contexto de fase.

## READ_SET recomendado
- `/` (raíz)
- `docs/`
- `AGENTS.md`
- `PROJECT_STATE.md`

## WRITE_SET permitido
- `docs/03_FASE_2C/specs/` (solo para proponer specs de auditoría)
- No modificar archivos de código fuente.

## DO_NOT_TOUCH
- `.env`
- Archivos `.pem`
- `/supabase/` (salvo lectura)
- `/backend/` (salvo lectura)

## Pasos
1. Realizar un mapeo completo de la estructura de directorios.
2. Identificar archivos con nombres similares o contenidos redundantes.
3. Contrastar la estructura física con lo declarado en `AGENTS.md`.
4. Identificar documentos "legacy" de fases anteriores que ya no deberían ser normativos.
5. Elaborar una propuesta de estructura canónica.

## Tools permitidas
- `list_dir`
- `grep_search`
- `view_file`

## Tools prohibidas
- `replace_file_content` (en archivos de sistema/código)
- `run_command` (para borrar o mover archivos)

## Riesgos
- Clasificar erróneamente un archivo necesario como legacy.
- Proponer cambios estructurales que rompan rutas relativas (si se ejecutaran sin supervisión).

## Output obligatorio
- mapa de repo
- grietas detectadas
- canon propuesto
- siguiente paso único

## Criterio de cierre
Informe detallado de la auditoría entregado al supervisor.

## Siguiente paso real
Crear TASK_SPEC para la limpieza física del repositorio basada en el canon aprobado.
