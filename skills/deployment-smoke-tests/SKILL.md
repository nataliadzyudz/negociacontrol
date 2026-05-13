# Skill: deployment-smoke-tests

## Cuándo usar esta skill
Usar inmediatamente después de un despliegue en cualquier entorno o como parte del Gate de cambio de fase.

## Objetivo
Verificar que los componentes críticos del sistema están operativos y se comunican entre sí mediante pruebas no destructivas de lectura.

## Inputs necesarios
- `PROJECT_STATE.md` para conocer IPs y puertos.
- Endpoints de healthcheck.

## READ_SET recomendado
- `PROJECT_STATE.md`
- `tests/smoke/` (si existen)

## WRITE_SET permitido
- `tests/smoke/` (para crear scripts de prueba).

## DO_NOT_TOUCH
- Configuración de servidores, Nginx o PM2.

## Pasos
1. Validar que el puerto del backend (3001) responde.
2. Validar que el dashboard (8080) carga (status 200).
3. Verificar conexión básica con Supabase (vía API health).
4. Comprobar que n8n responde en el puerto 5678.

## Tools permitidas
- `run_command` (solo para `curl` o comandos de red read-only).
- `view_file`

## Tools prohibidas
- Comandos que reinicien servicios o modifiquen archivos de sistema.

## Riesgos
- Interpretar un timeout de red como un fallo crítico del servicio.
- Ejecutar pruebas que saturen el backend.

## Output obligatorio
- comandos ejecutados (solo lectura)
- resultados por componente (PASS/FAIL/PENDIENTE)
- evidencia (snippets de respuesta)
- plan de rollback en caso de fallo masivo

## Criterio de cierre
Certificado de salud del sistema emitido.

## Siguiente paso real
Si hay fallos, ejecutar TASK_SPEC de corrección de infraestructura o rollback.
