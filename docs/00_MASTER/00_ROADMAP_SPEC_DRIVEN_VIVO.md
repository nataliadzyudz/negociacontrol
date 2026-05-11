# 00_ROADMAP_SPEC_DRIVEN_VIVO.md

# Roadmap spec-driven vivo — NC Control Tower v2

**Proyecto:** NEGOCIA CONTROL — NC CRM / Control Tower v2  
**Estado:** planificación viva  
**No es:** TASK_SPEC ejecutable  
**Fase activa:** 2C

---

## 1. Regla de uso

Este documento sirve para registrar:

```text
hallazgos
dependencias
TODO_FUTURO
SPEC_SUGGESTION
SKILL_SUGGESTION
decisiones pendientes
riesgos detectados durante construcción
propuestas de cambio de fase
```

No autoriza construcción.

Las únicas tareas ejecutables actuales están en:

```text
/docs/03_FASE_2C/specs/
```

---

## 2. Fase activa actual

```text
FASE_ACTIVA = 2C
```

Objetivo:

```text
Dashboard operativo controlado en laboratorio.
```

---

## 3. Propuestas de nuevas TASK_SPEC

Formato obligatorio:

```text
[FECHA] SPEC_SUGGESTION
Nombre sugerido:
Fase:
Motivo:
Dependencias:
READ_SET propuesto:
WRITE_SET propuesto:
DO_NOT_TOUCH propuesto:
Skills propuestos, si aplica:
Riesgo si no se crea:
Riesgo si se ejecuta dentro de la spec actual:
Estado: PROPUESTA / APROBADA / DESCARTADA
```

Regla:

```text
Una SPEC_SUGGESTION no autoriza construcción.
Solo Natalia puede aprobar que se convierta en TASK_SPEC ejecutable.
```

---

## 4. Propuestas de uso de skills

Formato obligatorio:

```text
[FECHA] SKILL_SUGGESTION
Skill solicitado:
Tarea:
Motivo:
READ_SET adicional propuesto:
Riesgo de usarlo:
Riesgo de no usarlo:
Estado: PROPUESTA / APROBADA / DESCARTADA
```

Regla:

```text
Una SKILL_SUGGESTION no autoriza leer /skills.
Solo Natalia puede aprobar que un skill entre en READ_SET.
```

---

## 5. Pendiente para Fase 2B (VALIDADA)

Tema general:

```text
Migración controlada Google Sheets / n8n → Supabase.
```

Estado:

```text
Fase 2B COMPLETADA - Gate aprobado
```

Pendientes a revisar cuando termine 2A:

```text
- Validar esquema Supabase creado. ✓
- Validar backend mínimo. ✓
- Revisar cómo mapear DIAGNOSTICO hacia Supabase.
- Decidir si hay dual-write.
- Mantener Google Sheets como respaldo.
- No convertir Supabase en fuente de verdad todavía.
```

TODO_FUTURO:

```text
- Fase 2B cerrada y aprobada.
- Fase 2C activa.
```

---

## 6. Pendiente para Fase 2C (COMPLETADA CON CONDICIÓN)

Tema general:

```text
Dashboard operativo controlado.
```

Estado:

```text
Fase 2C COMPLETADA - Gate APROBADO_CONDICION (2C_CIERRE_CONTROLADO)
```

Decisión:

```text
Gate APROBADO_CONDICION (2C_CIERRE_CONTROLADO) - 7/8 pruebas pasando
- Funcionalidad core operativa
- Deuda técnica: migration lead_interactions pendiente
- Interpretacion canonica: pre-produccion condicionada, no produccion abierta
```

Pendientes:

```text
- [✓] ficha lead (COMPLETADA)
- [✓] Estado operativo (COMPLETADA)
- [✓] Notas internas (COMPLETADA)
- [✓] Eventos (COMPLETADA)
- [✓] Acciones controladas (COMPLETADA)
- [✓] Frontend operativo (COMPLETADA)
- [✓] Gate 2C→3 (APROBADO_CONDICION - 2C_CIERRE_CONTROLADO)
- [⚠] lead_interactions (PENDIENTE - migration)
```

Completado en esta sesión:
- Frontend app.js con mutations (updateStatus, addNote, addEvent, updateSemaforo, addInteraction)
- Endpoint PATCH /leads/:id/semaforo
- Tabla lead_interactions + endpoint POST /leads/:id/interactions
- Documentación ordenada (QUICK_START, INDEX, TOOLING_IA_WORKFLOW)

Bloqueos:

```text
- No WhatsApp automático.
- No email automático sensible.
- No pagos.
- No calendario obligatorio.
- No portal cliente.
```

---

## 7. Pendiente para Fase 3

Tema general:

```text
Paso controlado a producción.
```

Pendientes:

```text
- Seguridad.
- RLS.
- Usuarios/perfiles.
- Backups.
- Logs.
- Rollback.
- Corte progresivo de fuente de verdad.
```

No ejecutar hasta que:

```text
Fase 2A validada.
Fase 2B validada.
Fase 2C validada.
```

---

## 8. Decisiones pendientes

```text
- Cuándo Supabase empieza a sustituir a Sheets.
- Qué queda como respaldo.
- Qué automatizaciones pasan a producción.
- Qué acciones siguen siendo manuales.
- Qué skills se autorizan para qué tipo de tarea.
```

---

## 9. Hallazgos durante Fase 2A

Formato obligatorio:

```text
[FECHA] [TAREA] Hallazgo:
Impacto:
Fase afectada:
Acción futura:
```

Añadir hallazgos debajo de esta línea.

---
