# NC Control Tower - Governance Canon

## 1. Autoridad documental

Orden de autoridad vigente:

1. `AGENTS.md`
2. `PROJECT_STATE.md`
3. `docs/00_CANON/README.md`
4. `docs/04_FASE_3/`
5. `TASK_SPEC` activa
6. skills relevantes

## 2. Estados de cierre obligatorios

Solo se permite cerrar con:

- `PASS`
- `FAIL`
- `PENDIENTE`

No se permite cerrar con expresiones ambiguas.

## 3. Alcance por contrato

Toda tarea debe declarar y respetar:

- `READ_SET`
- `WRITE_SET`
- `DO_NOT_TOUCH`

Si una accion cae fuera del alcance, estado obligatorio: `PENDIENTE` + escalado.

## 4. Flujo TASK_SPEC

1. Definir `TAREA CONCRETA`.
2. Leer `AGENTS.md`, `PROJECT_STATE.md`, canon y `TASK_SPEC` activa.
3. Publicar `FILES_TO_READ`, `FILES_TO_CHANGE`, `PLAN`, `RISKS`, `ROLLBACK`, `DO_NOT_TOUCH`.
4. Ejecutar solo dentro de `WRITE_SET`.
5. Cerrar con QA y evidencia.

## 5. QA estandar

QA minimo obligatorio:

- matriz `CA | Evidencia | Resultado`
- estado final `PASS/FAIL/PENDIENTE`
- riesgos residuales
- rollback
- `NEXT_STEP` unico

## 6. Protocolo de evidencia y cierre

Todo cierre debe incluir:

- `FILES_READ`
- `FILES_CHANGED`
- `ACCEPTANCE_CHECK`
- riesgos residuales
- rollback
- `NEXT_STEP` unico

## 7. Reglas de agentes

- Subagentes declarados de forma explicita.
- Un rol no amplia alcance por iniciativa propia.
- Agent Supervisor coordina, no omite bloqueos.
- Documentation Agent no inventa evidencia.

## 8. Limites y seguridad

- No exponer secretos.
- No tocar productivo sin autorizacion expresa.
- No activar automatizacion sensible fuera de spec.
- No saltar backend para escrituras criticas.

## 9. Regla de eficiencia NC

Elegir siempre la solucion mas simple, barata, reversible y mantenible que cumpla el objetivo real.

## 10. Reglas de commit

- Commits solo cuando se solicitan.
- Commits pequenos y por bloque logico.
- No mezclar governance, funcional y seguridad en un solo commit.
- No push sin instruccion explicita.

## 11. Cuando escalar a Natalia

Escalar solo ante bloqueo real:

- falta de acceso o credenciales
- riesgo de secretos o seguridad
- impacto en produccion
- cambio estructural de datos/arquitectura
- decision humana obligatoria

## 12. Protocolo de rollback

- Definir rollback antes de ejecutar.
- Rollback especifico por archivos/artefactos tocados.
- Si rollback incompleto, cerrar en `PENDIENTE`.
