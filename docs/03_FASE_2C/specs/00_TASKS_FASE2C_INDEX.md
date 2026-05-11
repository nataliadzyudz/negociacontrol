# 00_TASKS_FASE2C_INDEX.md — Índice spec-driven Fase 2C

**Fase:** 2C (dinámica via process.env.PHASE)  
**Objetivo:** Dashboard operativo controlado en laboratorio.  
**Estado:** COMPLETADA (2026-05-08)

---

## 1. Regla De Uso

```text
No construir desde el PRD completo.
Elegir una TASK_SPEC.
Leer AGENTS.md.
Leer QUICK_START_FASE2C.md.
Leer TASK_SPEC activa.
Leer CORE_READ_SET.
Leer CONDITIONAL_READ_SET solo si hace falta.
Escribir solo en su WRITE_SET.
No tocar DO_NOT_TOUCH.
No usar skills salvo autorizacion expresa dentro de la TASK_SPEC.
```

---

## 2. Verificacion Previa (Checklist Obligatorio)

Antes de ejecutar cualquier tarea, el agente DEBE verificar:

```text
1. Explorar /public/ - verificar si existe frontend
2. Buscar index.html - entrada web
3. Revisar docs futuros (02/03/04) - para contexto
4. Leer QUICK_START de fase activa - limites
5. Verificar indice de tareas - estado actual
```

---

## 3. Punto De Partida

Fase 2C parte de:

```text
TASK_GATE_2B_TO_2C = APROBAR CON CONTROL
```

Validado:
- Backend 2B funcional con endpoints CRUD
- Supabase con datos test
- n8n lab validar sin credenciales
- Sin automatizaciones sensibles

---

## 4. Orden Recomendado

```text
TASK_2C_1_FICHA_LEAD
→ TASK_2C_2_ESTADO_OPERATIVO
→ TASK_2C_3_NOTAS_INTERNAS
→ TASK_2C_4_EVENTOS
→ TASK_2C_5_ACCIONES_CONTROLADAS
→ TASK_2C_6_MIGRACION_DIAGNOSTICO_SUPABASE
→ TASK_GATE_2C_TO_3
```

---

## 5. Tareas Ejecutables

| Orden | Archivo | Agente | Resultado | Skills |
|---:|---|---|---|---|
| 01 | `TASK_2C_1_FICHA_LEAD.md` | Backend/Auditor | ✓ COMPLETADA | No |
| 02 | `TASK_2C_2_ESTADO_OPERATIVO.md` | Backend/Auditor | ✓ COMPLETADA | No |
| 03 | `TASK_2C_3_NOTAS_INTERNAS.md` | Backend/Auditor | ✓ COMPLETADA | No |
| 04 | `TASK_2C_4_EVENTOS.md` | Backend/Auditor | ✓ COMPLETADA | No |
| 05 | `TASK_2C_5_ACCIONES_CONTROLADAS.md` | Backend/Auditor | ✓ COMPLETADA | No |
| 06 | `TASK_2C_6_MIGRACION_DIAGNOSTICO_SUPABASE.md` | Backend | ✓ COMPLETADA | No |
| DOC-01 | `TASK_SPEC_DOC_2C_01_CANON_GOBERNANZA.md` | Orquestador/Documentation | ✓ COMPLETADA | No |
| DOC-02 | `TASK_SPEC_DOC_2C_02_SOP_OPERATIVO_TAREAS.md` | Orquestador/Documentation | ✓ COMPLETADA | No |
| DOC-03 | `TASK_SPEC_DOC_2C_03_TRAZABILIDAD_LOGS.md` | Orquestador/Traceability | ✓ COMPLETADA | No |
| DOC-03B | `TASK_SPEC_DOC_2C_03B_AGENT_ROLES_AND_HANDOFFS.md` | Orquestador/Documentation | ✓ COMPLETADA | No |
| DOC-04 | `TASK_SPEC_DOC_2C_04_GO_NOGO_FASE3.md` | Orquestador/Governance | ✓ COMPLETADA | No |
| DOC-05 | `TASK_SPEC_DOC_2C_05_CANON_DOCUMENTAL_REFERENCIAL.md` | Orquestador/Governance | ✓ COMPLETADA | No |
| FIX-INT | `TASK_2C_FIX_LEAD_INTERACTIONS_GATE_8_8.md` | Backend/QA | ✓ COMPLETADA | No |
| GATE | `TASK_GATE_2C_TO_3.md` | Orquestador/Auditor | ⚠️ APROBADO_CONDICION (2C_CIERRE_CONTROLADO) | No |

## 6. Progreso

```text
Fase 2C: 6/6 tareas completadas + fixes documentales/tecnicos aplicados
Pruebas backend controladas: 8/8 pasando (lead_interactions validado)
Interpretacion: pre-produccion condicionada, no produccion abierta.
```

| Tarea | Estado | Fecha |
|---|---|---|
| TASK_2C_1 | COMPLETADA | 2026-05-08 |
| TASK_2C_2 | COMPLETADA | 2026-05-08 |
| TASK_2C_3 | COMPLETADA | 2026-05-08 |
| TASK_2C_4 | COMPLETADA | 2026-05-08 |
| TASK_2C_5 | COMPLETADA | 2026-05-08 |
| TASK_2C_6 | COMPLETADA | 2026-05-08 |
| TASK_GATE_2C_TO_3 | APROBADO_CONDICION (2C_CIERRE_CONTROLADO) | 2026-05-08 |

Regla de actualización (OBLIGATORIA):

```text
Al cerrar una TASK
1. Actualizar TASK_SPEC (header línea 5): COMPLETADA
2. Actualizar este índice (tabla arriba)
3. Actualizar QUICK_START_FASE2C.md
4. Si WRITE_SET no lo permite → registrar: SIN_CERRAR: WRITE_SET no permitió
```
Registrar estado real: COMPLETADA, CORREGIONES o PENDIENTE.
```

---

## 7. No Crear Todavia

```text
Specs ejecutables de Fase 3.
Automatizaciones n8n productivas.
Integraciones con Google Sheets como fuente.
Migración Sheets→Supabase (Doc 02).
```

---

## 8. Docs Futuros (Referencia)

Para contexto de planificación, revisar:

```text
/docs/03_SIGUIENTE_FASE_2C/03_FASE2C_DASHBOARD_OPERATIVO_CONTROLADO.md
/docs/02_SIGUIENTE_FASE_2B/02_FASE2B_MIGRACION_SHEETS_SUPABASE.md
/docs/FUTURO_FASE_3/04_FASE3_PRODUCCION_SUPABASE.md
```

No construir desde estos docs. Solo leer para contexto.

---

## 9. Siguiente Hito Limpio

```text
Cerrar condiciones pendientes del Gate 2C_TO_3
Mantener 2C_CIERRE_CONTROLADO hasta cierre de deuda tecnica
Preparar paquete GO/NO-GO para Fase 3
```

---

## 10. Bloqueos Activos

```text
No WhatsApp automático.
No email automático sensible.
No pagos.
No migración Sheets→Supabase ahora.
No portal cliente.
```
