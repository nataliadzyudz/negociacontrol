# 00_TASKS_FASE2B_INDEX.md — Indice spec-driven Fase 2B

**Fase:** 2B  
**Objetivo:** Escritura controlada de leads test y preparacion de n8n lab sin automatizacion sensible.

---

## 1. Regla De Uso

```text
No construir desde el PRD completo.
Elegir una TASK_SPEC.
Leer AGENTS.md.
Leer QUICK_START_FASE2B.md.
Leer TASK_SPEC activa.
Leer CORE_READ_SET.
Leer CONDITIONAL_READ_SET solo si hace falta.
Escribir solo en su WRITE_SET.
No tocar DO_NOT_TOUCH.
No usar skills salvo autorizacion expresa dentro de la TASK_SPEC.
```

Este índice no se lee por defecto para ejecutar una TASK ya indicada. Leerlo solo para elegir siguiente tarea, verificar orden o actualizar progreso al cierre.

---

## 2. Punto De Partida

Fase 2B parte de:

```text
TASK_GATE_2A_TO_2B = APROBADO PARA LECTURA BACKEND
```

Validado:

- `/api/health` PASS.
- `/api/leads` PASS con 7 leads test.
- Dashboard read-only no escribe.

Pendiente:

- Validar insercion controlada de lead test via backend.
- n8n lab queda para tarea separada o subfase autorizada.

---

## 3. Orden Recomendado

```text
01_TASK_2B_1_BACKEND_INSERT_TEST_LEAD
→ 02_TASK_2B_2_N8N_LAB_INTAKE_TEST
→ 03_TASK_2B_3_IMPORTAR_Y_PROBAR_N8N_LAB
→ TASK_GATE_2B_TO_2C
```

---

## 4. Tareas Ejecutables

| Orden | Archivo | Agente | Resultado | Skills |
|---:|---|---|---|---|
| 01 | `01_TASK_2B_1_BACKEND_INSERT_TEST_LEAD.md` | Backend/Auditor | COMPLETADA | No |
| 02 | `02_TASK_2B_2_N8N_LAB_INTAKE_TEST.md` | Orquestador/N8N Lab/Auditor | COMPLETADA | No |
| 03 | `03_TASK_2B_3_IMPORTAR_Y_PROBAR_N8N_LAB.md` | Orquestador/N8N Lab/Auditor | COMPLETADA | No |
| GATE | `TASK_GATE_2B_TO_2C.md` | Orquestador/Auditor | APROBAR CON CONTROL | No |

---

## 5. Progreso

```text
Fase 2B: 3/3 tareas ejecutables completadas + GATE APROBAR CON CONTROL
```

| Tarea | Estado | Fecha |
|---|---|---|
| TASK_2B_1 | COMPLETADA | 2026-05-08 |
| TASK_2B_2 | COMPLETADA | 2026-05-08 |
| TASK_2B_3 | COMPLETADA | 2026-05-08 |
| TASK_GATE_2B_TO_2C | APROBAR CON CONTROL | 2026-05-08 |

Regla de actualización:

```text
Al cerrar una TASK, actualizar este índice solo si el WRITE_SET de la TASK lo permite.
Registrar estado real: COMPLETADA, CORREGIONES o PENDIENTE.
```

---

## 6. No Crear Todavia

```text
Specs ejecutables de Fase 2C.
Specs ejecutables de Fase 3.
Automatizaciones n8n productivas.
Integraciones con Google Sheets.
```

---

## 7. Siguiente Hito Limpio

```text
APROBAR paso controlado a preparacion documental de Fase 2C
```

No crear specs 2C ni cambiar fase activa sin autorizacion explicita de Natalia. Siguiente accion propuesta: preparar `QUICK_START_FASE2C.md` y primera TASK_SPEC 2C si Natalia aprueba el cambio de fase.
