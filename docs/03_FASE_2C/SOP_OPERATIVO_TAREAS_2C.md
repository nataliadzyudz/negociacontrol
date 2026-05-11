# SOP_OPERATIVO_TAREAS_2C.md

**Fase:** 2C  
**Estado transicional:** 2C_CIERRE_CONTROLADO  
**Objetivo:** Protocolo operativo minimo por tarea (rapido, trazable, sin ambiguedad).

---

## 1) Checklist de inicio (maximo 7 items)

1. Leer `AGENTS.md`.
2. Leer `PROJECT_STATE.md`.
3. Leer `docs/03_FASE_2C/QUICK_START_FASE2C.md`.
4. Leer TASK_SPEC activa.
5. Confirmar `READ_SET` y `WRITE_SET`.
6. Confirmar entorno: local / test / staging / produccion.
7. Confirmar criterios de aceptacion, rollback y formato de evidencia.

## 2) Checklist de cierre

- [ ] Objetivo cumplido o marcado PENDIENTE.
- [ ] READ_SET revisado.
- [ ] WRITE_SET respetado.
- [ ] Cambios documentados.
- [ ] Criterios de aceptacion marcados PASS / FAIL / PENDIENTE.
- [ ] Evidencias registradas.
- [ ] Riesgos declarados.
- [ ] Rollback definido.
- [ ] Siguiente paso real indicado.
- [ ] Review creada.

## 3) Formato unico de entrega

```text
## Resumen
## Archivos revisados
## Archivos creados/modificados
## Cambios realizados
## Criterios de aceptación
## Pruebas / verificaciones
## Pendientes
## Riesgos
## Rollback
## Evidencias
## Siguiente paso real
```

## 4) Regla de parada

Parar y marcar PENDIENTE si:

- no existe TASK_SPEC;
- no esta claro el entorno;
- no esta claro el WRITE_SET;
- hay riesgo de produccion;
- aparece un secreto;
- se requiere modificar Supabase real;
- se requiere activar workflow n8n real;
- se requiere aprobacion de Natalia;
- la tarea pide ampliar alcance.

## 5) Regla de evidencia minima

- Cada criterio de aceptacion debe tener evidencia concreta en archivos o verificaciones.
- Si no hay evidencia verificable: marcar FAIL o PENDIENTE, nunca PASS.

## 6) Regla de uso READ_SET / WRITE_SET

- Leer solo archivos del READ_SET.
- Escribir solo archivos del WRITE_SET.
- Si hace falta salir del WRITE_SET: parar y escalar a Natalia.

## 7) Regla PASS / FAIL / PENDIENTE

- PASS: criterio cumplido con evidencia verificable.
- FAIL: criterio no cumplido o contradicho por evidencia.
- PENDIENTE: falta dato, acceso, aprobacion o archivo.

## 8) Regla de escalado a Natalia

Escalar cuando:

- hay riesgo de tocar produccion;
- hay conflicto de reglas o docs;
- se requiere ampliar alcance;
- se requiere decision de negocio/seguridad;
- no existe TASK_SPEC para la accion requerida.

## 9) Regla de implementacion

No pasar a implementacion sin TASK_SPEC activa aprobada.
