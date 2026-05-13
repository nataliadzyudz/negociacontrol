# Skill: security-baseline

## Cuándo usar esta skill
Usar en cualquier fase antes de un despliegue o cuando se sospeche de exposición de información sensible. Es obligatorio antes de pasar de fase 2C a 3.

## Objetivo
Detectar secretos expuestos, archivos de configuración sensibles, tokens, datos personales en logs y endpoints que no tengan la protección adecuada.

## Inputs necesarios
- Acceso a la raíz del proyecto.
- Lista de extensiones sensibles (.env, .pem, .key, .json con creds).

## READ_SET recomendado
- `**/*.env*`
- `**/*.pem`
- `backend/`
- `supabase/migrations/`
- `.gitignore`

## WRITE_SET permitido
- Ninguno (Read-only por defecto).

## DO_NOT_TOUCH
- No modificar ningún archivo detectado como sensible (la mitigación se hará mediante TASK_SPEC separada).

## Pasos
1. Buscar archivos con nombres sospechosos (.env, .key, certs).
2. Escanear código en busca de hardcoded tokens o IPs.
3. Revisar `.gitignore` para asegurar que los archivos sensibles están excluidos del control de versiones.
4. Identificar endpoints en el backend que carezcan de validación de JWT o RLS.

## Tools permitidas
- `grep_search`
- `list_dir`
- `view_file`

## Tools prohibidas
- No mostrar valores reales de secretos en el output. Usar placeholders como `********`.

## Riesgos
- Exponer accidentalmente un secreto en el log del agente al reportarlo.
- Falsos positivos en archivos de test.

## Output obligatorio
- tipo de riesgo
- ruta
- severidad (Baja, Media, Alta, Crítica)
- mitigación propuesta
- bloquea producción sí/no

## Criterio de cierre
Inventario de riesgos de seguridad entregado y clasificado.

## Siguiente paso real
Ejecutar TASK_SPEC de remediación de secretos (ej. rotación de claves, actualización de .gitignore).
