# 02_TASK_2A_01_SUPABASE_SCHEMA.md

**Fase:** 2A  
**Agente:** DB  
**Estado:** COMPLETADA

---

## 1. Objetivo

Crear esquema Supabase P0 para laboratorio.

Tablas P0:

```text
leads
lead_triage
lead_status_history
lead_events
error_logs
lead_notes
```

Opcional solo si no complica:

```text
lead_duplicates
integration_events
```

---

## 2. READ_SET

Solo puede leer:

```text
AGENTS.md
/docs/01_ACTIVO_FASE_2A/specs/02_TASK_2A_01_SUPABASE_SCHEMA.md
/docs/01_ACTIVO_FASE_2A/01_FASE2A_SUPABASE_BACKEND_LAB.md
/docs/01_ACTIVO_FASE_2A/05_CONTRATO_DATOS_IA_Y_MIGRACION.md
/docs/01_ACTIVO_FASE_2A/06_REGLAS_NO_NEGOCIABLES_NC.md
```

---

## 3. WRITE_SET

Solo puede crear/modificar:

```text
/supabase/migrations/
/supabase/seed/
```

---

## 4. DO_NOT_TOUCH

No puede leer/modificar:

```text
/n8n_workflows/
/n8n_worklows/
/n8n_workwolws/
/public/
/backend/
/server.js
/sheets.js
/package.json
/docs/00_MASTER/
/skills/
/_archivo_DO_NOT_READ/
```

---

## 5. Skills

```text
SKILLS_ALLOWED = NO
```

---

## 6. Reglas específicas

```text
No crear producción.
No conectar datos reales.
No meter service_role.
No tocar frontend.
No tocar backend.
No mezclar semáforo y estado.
No crear complejidad multiusuario avanzada.
```

Semáforo:

```text
VERDE
AMARILLO
ROJO
```

Estado:

```text
NUEVO
PENDIENTE_REVISION
FALTA_DATO
APTO_DIAGNOSTICO
DIAGNOSTICO_PROPUESTO
DIAGNOSTICO_RESERVADO
CLIENTE_ACTIVO
NO_ENCAJA
NO_CONTESTA
ERROR_IA
ARCHIVADO
```

---

## 7. Pasos

```text
1. Proponer migración SQL.
2. Crear enums o constraints necesarios.
3. Crear tablas P0.
4. Crear índices básicos.
5. Crear seed mínimo si procede.
6. Documentar cómo aplicar migración.
```

---

## 8. Criterios de aceptación

```text
CA-01 Existen migraciones SQL.
CA-02 Existen tablas P0.
CA-03 Semáforo y estado están separados.
CA-04 Hay FK entre leads y tablas dependientes.
CA-05 No hay secretos.
CA-06 No se toca n8n ni Sheets.
CA-07 SKILLS_USED = NO.
```

---

## 9. Definition of Done

```text
El esquema permite cargar datos test y ser leído por backend de laboratorio en la siguiente tarea.
```

---

## 10. Rollback

```text
Crear migración down o instrucciones para drop controlado en laboratorio.
```

---

## 11. Entrega esperada

```text
Lista de archivos creados.
Resumen de tablas.
Comandos para aplicar.
Riesgos.
SKILLS_USED = NO.
```
