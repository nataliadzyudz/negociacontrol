# QUICK_START_FASE2B.md

**Fase:** 2B - Escritura controlada laboratorio  
**Objetivo:** Validar insercion controlada de leads test y preparar n8n lab sin automatizacion sensible.  
**Estado inicial:** Pendiente de TASK_SPEC ejecutables.

---

## Objetivo de Fase 2B

Validar que el sistema puede crear leads de laboratorio de forma controlada, trazable y limitada a `es_test=true`, manteniendo Supabase como fuente tecnica de laboratorio y sin afectar operacion real.

Fase 2B parte del gate 2A:

```text
TASK_GATE_2A_TO_2B = APROBADO PARA LECTURA BACKEND
```

Alcance ya validado desde 2A:

- Backend responde health.
- Backend lee 7 leads test desde Supabase.
- Dashboard read-only puede consumir datos del backend.

---

## Limites De Fase 2B

```text
Laboratorio solamente.
Solo datos test.
Solo leads con es_test=true.
No datos reales.
No produccion.
No Google Sheets.
No mensajes automaticos.
No pagos.
No calendario.
No automatizacion sensible.
```

n8n puede entrar solo si una TASK_SPEC lo autoriza expresamente y como workflow/lab test. No se toca n8n productivo.

---

## Que SE Puede Tocar

Solo si la TASK_SPEC concreta lo autoriza:

```text
/backend/
/supabase/
/docs/02_ACTIVO_FASE_2B/
```

Para n8n lab, la TASK_SPEC debe declarar una ruta concreta dentro de `/n8n_workflows/` o una carpeta lab autorizada.

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
```

---

## Orden De Tareas

| # | Tarea | Objetivo | Estado |
|---|---|---|---|
| 1 | TASK_2B_1_BACKEND_INSERT_TEST_LEAD | Validar `POST /api/intake/test` con `es_test=true` | PENDIENTE |
| 2 | TASK_2B_2_N8N_LAB_INTAKE_TEST | Validar n8n lab solo si 2B.1 pasa | NO CREAR AUN |
| 3 | TASK_GATE_2B_TO_2C | Gate de salida con KPIs reales | NO CREAR AUN |

---

## Componentes Clave

| Componente | Uso en 2B |
|---|---|
| Backend | Insertar y leer leads test |
| Supabase | Guardar datos test y validar RLS/policies lab |
| RLS/policies | Mantener acceso acotado a laboratorio |
| Dashboard | Verificar visibilidad read-only si aplica |
| n8n lab | Solo despues de validar backend -> Supabase |

---

## Endpoints Relevantes

| Metodo | Endpoint | Uso |
|---|---|---|
| GET | `/api/health` | Confirmar backend activo |
| GET | `/api/leads` | Confirmar lectura de leads test |
| POST | `/api/intake/test` | Crear lead test controlado |

---

## Protocolo De Lectura Minima

Para ejecutar una TASK de Fase 2B:

```text
1. Leer AGENTS.md.
2. Leer este QUICK_START_FASE2B.md.
3. Leer la TASK_SPEC activa.
4. Leer CORE_READ_SET completo.
5. Leer CONDITIONAL_READ_SET solo si aparece una necesidad real.
```

No leer por defecto:

```text
00_TASKS_FASE2B_INDEX.md
TASK_GATE anterior
migrations
seed
test-smoke
n8n_workflows
docs historicos
```

Excepciones:

- Leer índice si se elige siguiente tarea, se verifica orden o se actualiza progreso.
- Leer gate anterior si la TASK necesita validar una decisión de cambio de fase.
- Leer migraciones/seed/test-smoke solo si la TASK los incluye en `CORE_READ_SET` o si hay fallo técnico que requiera `CONDITIONAL_READ_SET`.

---

## Protocolo De Cierre De Tarea

Toda TASK de Fase 2B debe cerrar con:

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

- Cambiar estado de TASK_SPEC a `COMPLETADA` o `CORREGIONES`.
- Actualizar `00_TASKS_FASE2B_INDEX.md` con progreso real.
- Crear o actualizar review en `specs/reviews/`.

Si WRITE_SET no lo permite, registrar como pendiente en la entrega final.

---

## Reglas De Datos

- Todo lead creado en Fase 2B debe ser `es_test=true`.
- No se permite payload con datos reales.
- El estado operativo debe registrarse en `lead_status_history`.
- El semaforo debe mantenerse separado del estado operativo.
- La escritura debe ser trazable y verificable.

---

## Gate De Salida 2B

Fase 2B no se considera cerrada hasta crear y aprobar:

```text
TASK_GATE_2B_TO_2C
```

El gate debe demostrar:

- Insercion test controlada funcionando.
- Lectura posterior funcionando.
- RLS/policies acotadas.
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
