# Skill: supabase-schema-rls-review

## Cuándo usar esta skill
Usar cada vez que se modifique el esquema de base de datos o se necesite verificar que la seguridad a nivel de fila (RLS) está correctamente configurada.

## Objetivo
Asegurar la integridad del esquema de Supabase y que las políticas de RLS impidan el acceso no autorizado a datos de clientes.

## Inputs necesarios
- Archivos SQL de migración en `supabase/migrations/`.
- Configuración de policies.

## READ_SET recomendado
- `supabase/`
- `backend/config/supabase.js` (si existe)

## WRITE_SET permitido
- Ninguno (Prohibido escribir en Supabase real o archivos de migración existentes).

## DO_NOT_TOUCH
- Base de datos en producción o test.
- No ejecutar `supabase db push` sin supervisión humana.

## Pasos
1. Analizar el esquema de tablas y sus relaciones.
2. Verificar que toda tabla tenga habilitado RLS (`ALTER TABLE ... ENABLE ROW LEVEL SECURITY`).
3. Revisar cada política para asegurar que el `UID` del usuario coincide con el dueño del dato (si aplica).
4. Validar que los Enums coincidan con los estados definidos en la lógica del backend.

## Tools permitidas
- `view_file`
- `grep_search`

## Tools prohibidas
- Cualquier herramienta que intente modificar el estado de la base de datos.

## Riesgos
- Dejar tablas sin RLS, permitiendo lectura global anónima.
- Políticas demasiado restrictivas que rompan el dashboard.

## Output obligatorio
- inventario de tablas y relaciones
- estado de migraciones
- detalle de policies/RLS detectadas
- inconsistencias detectadas
- cambios propuestos (sin aplicar)

## Criterio de cierre
Auditoría de base de datos completada y reportada.

## Siguiente paso real
Crear una nueva migración SQL para corregir las brechas de seguridad o esquema detectadas.
