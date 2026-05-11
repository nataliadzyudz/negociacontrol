# QUICK_START_FASE2C.md

**Fase:** 2C - Dashboard operativo controlado  
**Objetivo:** Mostrar ficha lead operativa, estado, notas internas, eventos y acciones controladas.  
**Estado:** COMPLETADA (2026-05-08)

---

## Checklist de Entrada (OBLIGATORIO antes de cualquier tarea)

SOP operativo aplicable:

```text
/docs/03_FASE_2C/SOP_OPERATIVO_TAREAS_2C.md
```

Logs minimos de trazabilidad:

```text
/docs/03_FASE_2C/MCP_STATUS.md
/docs/03_FASE_2C/AGENT_RUNS_LOG.md
/docs/03_FASE_2C/TECH_DEBT_REGISTER.md
```

Roles y handoffs de subagentes:

```text
/docs/03_FASE_2C/AGENT_ROLES_AND_HANDOFFS_2C.md
```

Canon documental referencial:

```text
/docs/03_FASE_2C/CANON_DOCUMENTAL_REFERENCIAL_2C.md
```

### Antes de ejecutar:

- [ ] Leer PROJECT_STATE.md
- [ ] Confirmar fase activa en sistema vs docs
- [ ] Revisar índice de tareas - estado actual
- [ ] Identificar dependencias
- [ ] Verificar recursos (puertos, credenciales)
- [ ] CONFIRMAR: TASK_SPEC existe
- [ ] Si NO existe → PARAR → Crear SPEC primero

### Después de completar:

- [ ] Tests ejecutados y pasando
- [ ] Resultados registrados
- [ ] PROJECT_STATE.md actualizado
- [ ] Índice de fase actualizado
- [ ] NEXT_STEP propuesto (no ejecutado)

---

## Objetivo De Fase 2C

Validar que el dashboard puede operar leads de forma controlada: mostrar ficha lead, modificar estado operativo, agregar notas internas, registrar eventos y ejecutar acciones sin automatizaciones sensibles.

Fase 2C parte del gate 2B:

```text
TASK_GATE_2B_TO_2C = APROBAR CON CONTROL
```

Alcance ya validado desde 2B:

- Backend inserta leads test.
- Backend lee leads test.
- n8n lab intake funciona sin credenciales.
- RLS/policies acotadas a laboratorio.

---

## Limites De Fase 2C

```text
Solo operativo controlado.
Solo leads test.
Solo es_test=true.
No datos reales.
No produccion.
No Google Sheets.
No WhatsApp automatico.
No email automatico sensible.
No pagos.
No calendario obligatorio.
No portal cliente.
No automatizacion sensible.
```

---

## Que SE Puede Tocar

Solo si la TASK_SPEC concreta lo autoriza:

```text
/backend/
/supabase/
/docs/03_FASE_2C/
/n8n_workflows/lab/
```

Estado transicional operativo:

```text
2C_CIERRE_CONTROLADO
Pre-produccion condicionada, no produccion abierta.
```

No tocar n8n productivo ni Google Sheets real.

---

## Que NO Se Puede Tocar

```text
/server.js
/sheets.js
/package.json
/skills/
/_archivo_DO_NOT_READ/
/docs/00_MASTER/
Google Sheets real
n8n productivo
datos reales
automatizaciones sensibles
WhatsApp automatico
email automatico sensible
pagos
calendario obligatorio
portal cliente
```

---

## Orden De Tareas

| # | Tarea | Objetivo | Estado |
|---|---|---|---|
| 1 | TASK_2C_1_FICHA_LEAD | Mostrar ficha lead con detalles | PENDIENTE |
| 2 | TASK_2C_2_ESTADO_OPERATIVO | Modificar estado operativo | NO CREAR AUN |
| 3 | TASK_2C_3_NOTAS_INTERNAS | Agregar notas internas | NO CREAR AUN |
| 4 | TASK_2C_4_EVENTOS | Registrar eventos | NO CREAR AUN |
| 5 | TASK_2C_5_ACCIONES_CONTROLADAS | Acciones sin automatizacion sensible | NO CREAR AUN |
| 6 | TASK_GATE_2C_TO_3 | Gate de salida | NO CREAR AUN |

---

## Componentes Clave

| Componente | Uso en 2C |
|---|---|
| Backend | CRUD operativo de leads test |
| Supabase | Guardar estado, notas, eventos |
| Dashboard | Mostrar/operar ficha lead |
| n8n lab | Acciones controladas sin automatizacion sensible |

---

## Endpoints Relevantes

| Metodo | Endpoint | Uso |
|---|---|---|
| GET | `/api/health` | Confirmar backend activo |
| GET | `/api/leads/:id` | Obtener ficha lead |
| PUT | `/api/leads/:id/estado` | Actualizar estado operativo |
| POST | `/api/leads/:id/notas` | Agregar nota interna |
| POST | `/api/leads/:id/eventos` | Registrar evento |

---

## Protocolo De Lectura Minima

Para ejecutar una TASK de Fase 2C:

```text
1. Leer AGENTS.md.
2. Leer este QUICK_START_FASE2C.md.
3. Leer la TASK_SPEC activa.
4. Leer CORE_READ_SET completo.
5. Leer CONDITIONAL_READ_SET solo si aparece una necesidad real.
```

No leer por defecto:

```text
00_TASKS_FASE2C_INDEX.md
TASK_GATE anterior
migrations
seed
test-smoke
n8n_workflows/productivo
docs historicos
```

Excepciones:

- Leer índice si se elige siguiente tarea, se verifica orden o se actualiza progreso.
- Leer gate anterior si la TASK necesita validar una decisión de cambio de fase.
- Leer migraciones/seed solo si la TASK los incluye en CORE_READ_SET o si hay fallo técnico que requiera CONDITIONAL_READ_SET.

---

## Protocolo De Cierre De Tarea

Toda TASK de Fase 2C debe cerrar con:

```text
1. REVIEW creado o actualizado.
2. Evidencia real por criterio de aceptación.
3. Estado recomendado: APROBAR / CORREGIONES.
4. TASK_SPEC actualizada si WRITE_SET lo permite.
5. Índice de fase actualizado si WRITE_SET lo permite.
6. FILES_READ declarados.
7. FILES_CHANGED declarados.
8. SKILLS_USED declarado.
9. ACCEPTANCE_CHECK declarado.
10. NEXT_STEP propuesto.
```

El NEXT_STEP se propone, no se ejecuta sin aprobación de Natalia.

---

## Actualizacion De Estado

Si el WRITE_SET de la TASK lo permite:

- Cambiar estado de TASK_SPEC a COMPLETADA o CORREGIONES.
- Actualizar 00_TASKS_FASE2C_INDEX.md con progreso real.
- Crear o actualizar review en specs/reviews/.

Si WRITE_SET no lo permite, registrar como pendiente en la entrega final.

---

## Regla Closeout Estricto (Obligatorio)

Al cerrar cualquier TASK_SPEC, el cierre NO se considera válido hasta:

1. Actualizar el estado de la TASK_SPEC (línea 5 del header).
2. Actualizar 00_TASKS_FASE2C_INDEX.md con progreso real.
3. Actualizar este QUICK_START con progreso real.
4. **WRITE_SET siempre debe incluir índice y QUICK_START** cuando el closeout lo requiere.
5. Si WRITE_SET no lo permite, registrar explícitamente:

```
SIN_CERRAR: WRITE_SET no permitió actualizar índice/QUICK_START
```

**No se permite omitir este paso sin trazabilidad.**

---

## Regla Pensamiento Operativo

Toda solución propuesta debe evaluar:

- **Eficiencia**: resuelve el problema real con mínimo esfuerzo.
- **Productividad**: mejora la velocidad del proyecto.
- **Ahorro de tokens**: evita scripts, archivos o capas innecesarias.
- **Coherencia**: mantiene sincronizados TASK_SPEC, índice y QUICK_START.

---

## Reglas De Datos

- Todo lead operado en Fase 2C debe ser es_test=true.
- No se permite payload con datos reales.
- El estado operativo debe registrarse en lead_status_history.
- Las notas internas deben guardar autor y timestamp.
- Los eventos deben ser trazables.
- El semáforo debe mantenerse separado del estado operativo.

---

## Gate De Salida 2C

Fase 2C no se considera cerrada hasta crear y aprobar:

```text
TASK_GATE_2C_TO_3
```

El gate debe demostrar:

- Ficha lead visible y operativa.
- Estado operativo modificable.
- Notas internas funcionando.
- Eventos registrados.
- Acciones controladas sin automatizacion sensible.
- Sin datos reales.
- Sin Sheets.
- Sin n8n productivo.
- Sin automatizacion sensible.

---

## SKILLS

```text
SKILLS_ALLOWED = NO por defecto
```

Solo una TASK_SPEC puede autorizar skills expresamente.
