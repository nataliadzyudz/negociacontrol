# AGENT_ROLES_AND_HANDOFFS_2C.md

## 1. Proposito

Definir roles, limites, permisos y handoffs minimos de subagentes para tareas de `2C_CIERRE_CONTROLADO`.

## 2. Relacion documental

- `AGENTS.md`: reglas globales y limites.
- `TASK_SPEC`: alcance concreto por tarea.
- `SOP_OPERATIVO_TAREAS_2C.md`: ejecucion y cierre estandar.

## 3. Matriz de subagentes

| Subagente | Responsabilidad | Permiso maximo |
|---|---|---|
| Agent Supervisor | Coordinar flujo y decisiones de ejecucion | N2 |
| Explorer | Explorar evidencia tecnica en lectura | N1 |
| Diagnostician | Formular causa probable y prueba minima | N2 |
| Spec Writer | Redactar TASK_SPEC ejecutable | N2 |
| Implementer | Ejecutar cambios autorizados por TASK_SPEC | N3 |
| QA Agent | Verificar criterios y pruebas | N3 |
| Security Reviewer | Revisar riesgos y cumplimiento | N2 |
| Documentation Agent | Cerrar trazabilidad y evidencia | N2 |

## 4. Definicion por subagente

### Agent Supervisor
- responsabilidad: orquestar pasos, permisos, paradas y escalado.
- puede hacer: planificar flujo, asignar subagente, consolidar estado.
- no puede hacer: actuar como God Agent, saltar TASK_SPEC, ocultar bloqueos.
- input minimo: AGENTS + QUICK_START + TASK_SPEC + estado actual.
- output obligatorio: plan de orquestacion + estado + next step.
- criterio de parada: falta spec, riesgo de produccion, alcance ambiguo.

### Explorer
- responsabilidad: levantar evidencia en read-only.
- puede hacer: leer archivos, ubicar rutas, listar hallazgos.
- no puede hacer: editar, migrar, tocar produccion.
- input minimo: objetivo puntual + READ_SET.
- output obligatorio: archivos revisados + evidencias + huecos.
- criterio de parada: falta acceso, falta fuente, riesgo fuera de scope.

### Diagnostician
- responsabilidad: convertir evidencia en hipotesis verificable.
- puede hacer: proponer causa probable y prueba minima.
- no puede hacer: aplicar cambios.
- input minimo: evidencia del Explorer + criterio de aceptacion.
- output obligatorio: error, causa probable, alternativa, prueba minima.
- criterio de parada: evidencia insuficiente o contradictoria.

### Spec Writer
- responsabilidad: crear TASK_SPEC ejecutable y acotada.
- puede hacer: definir alcance, READ/WRITE_SET, CA y rollback.
- no puede hacer: ejecutar cambios tecnicos.
- input minimo: diagnostico validado + objetivo aprobado.
- output obligatorio: TASK_SPEC completa.
- criterio de parada: falta aprobacion o falta alcance claro.

### Implementer
- responsabilidad: ejecutar solo cambios autorizados por TASK_SPEC.
- puede hacer: cambios dentro de WRITE_SET.
- no puede hacer: ampliar alcance, tocar produccion, modificar AGENTS por iniciativa propia.
- input minimo: TASK_SPEC aprobada + WRITE_SET.
- output obligatorio: cambios + evidencia + rollback.
- criterio de parada: necesidad fuera de WRITE_SET.

### QA Agent
- responsabilidad: validar CA con evidencia real.
- puede hacer: ejecutar verificaciones definidas.
- no puede hacer: aprobar sin evidencia.
- input minimo: CA + evidencias de implementacion.
- output obligatorio: PASS/FAIL/PENDIENTE por criterio.
- criterio de parada: prueba no reproducible o evidencia incompleta.

### Security Reviewer
- responsabilidad: detectar riesgos de seguridad y cumplimiento.
- puede hacer: revisar secretos, permisos, exposicion, riesgo productivo.
- no puede hacer: aprobar riesgo critico sin escalar.
- input minimo: cambios, contexto de entorno, reglas NC.
- output obligatorio: riesgos, nivel, mitigacion, bloqueo/no bloqueo.
- criterio de parada: riesgo critico sin decision de Natalia.

### Documentation Agent
- responsabilidad: cerrar trazabilidad operativa.
- puede hacer: actualizar specs/reviews/logs dentro de WRITE_SET.
- no puede hacer: inventar evidencias o maquillar estado.
- input minimo: resultado de subagentes previos.
- output obligatorio: resumen final, evidencias, pendientes, next step.
- criterio de parada: falta evidencia o conflicto documental.

## 5. Flujo de handoffs estandar

1. Supervisor -> Explorer
2. Explorer -> Diagnostician
3. Diagnostician -> Spec Writer (si aplica)
4. Spec Writer -> Implementer (solo con spec aprobada)
5. Implementer -> QA Agent
6. QA Agent -> Security Reviewer
7. Security Reviewer -> Documentation Agent
8. Documentation Agent -> Supervisor
9. Supervisor -> Natalia (decision)

## 6. Reglas de parada

- Sin TASK_SPEC: parar.
- Fuera de READ_SET/WRITE_SET: parar.
- Riesgo de produccion o secreto: parar y escalar.
- Evidencia insuficiente: marcar PENDIENTE.

## 7. Formato de salida por subagente

```text
## Resumen
## Evidencias
## Riesgos
## Estado (PASS/FAIL/PENDIENTE)
## Siguiente paso real
```

## 8. Regla de alcance y AGENTS

Ningun subagente amplia alcance ni modifica `AGENTS.md` sin TASK_SPEC explicita y aprobacion.

## 9. Regla de decision final

Natalia decide en gate, produccion y riesgos residuales.
