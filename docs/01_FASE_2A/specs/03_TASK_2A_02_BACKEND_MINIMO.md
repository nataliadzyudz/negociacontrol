# 03_TASK_2A_02_BACKEND_MINIMO.md

**Fase:** 2A  
**Agente:** BACKEND  
**Estado:** COMPLETADA

---

## 1. Objetivo

Crear backend mínimo de laboratorio para validar y leer datos Supabase.

Endpoints mínimos:

```text
GET /api/health
POST /api/intake/test
GET /api/leads
GET /api/leads/:id
POST /api/leads/:id/triage
PATCH /api/leads/:id/status
POST /api/leads/:id/notes
```

---

## 2. READ_SET

Solo puede leer:

```text
AGENTS.md
/docs/01_ACTIVO_FASE_2A/specs/03_TASK_2A_02_BACKEND_MINIMO.md
/docs/01_ACTIVO_FASE_2A/01_FASE2A_SUPABASE_BACKEND_LAB.md
/docs/01_ACTIVO_FASE_2A/05_CONTRATO_DATOS_IA_Y_MIGRACION.md
/docs/01_ACTIVO_FASE_2A/06_REGLAS_NO_NEGOCIABLES_NC.md
/supabase/migrations/   # solo si ya existen
```

Puede leer solo si Natalia lo autoriza en el PLAN:

```text
/package.json
/server.js
```

No leer `sheets.js` salvo auditoría expresa.

---

## 3. WRITE_SET

Solo puede crear/modificar:

```text
/backend/
```

No puede modificar `package.json` salvo aprobación expresa en el PLAN.

---

## 4. DO_NOT_TOUCH

No puede leer/modificar:

```text
/n8n_workflows/
/n8n_worklows/
/n8n_workwolws/
/sheets.js
/public/
/docs/00_MASTER/
/skills/
/_archivo_DO_NOT_READ/
```

---

## 5. Skills

```text
SKILLS_ALLOWED = NO
```

Si el agente pide usar tooling skill para MCP/configuración, debe proponer SKILL_SUGGESTION y esperar aprobación.

---

## 6. Reglas específicas

```text
No conectar Google Sheets.
No tocar n8n.
No enviar emails.
No enviar WhatsApp.
No implementar pagos.
No implementar calendario.
No guardar secretos en código.
No exponer service_role al frontend.
```

---

## 7. Pasos

```text
1. Revisar contrato de datos.
2. Proponer estructura backend.
3. Crear servidor/API en /backend.
4. Crear validadores básicos.
5. Crear cliente Supabase usando variables de entorno.
6. Crear manejo de errores.
7. Crear README técnico breve.
```

---

## 8. Criterios de aceptación

```text
CA-01 /api/health responde.
CA-02 No hay secretos en código.
CA-03 POST test valida antes de escribir.
CA-04 Errores se devuelven de forma controlada.
CA-05 No toca Sheets ni n8n.
CA-06 No modifica archivos raíz sin autorización.
CA-07 SKILLS_USED = NO salvo aprobación expresa.
```

---

## 9. Definition of Done

```text
Backend listo para que dashboard read-only consuma datos de laboratorio sin escribir desde frontend.
```

---

## 10. Rollback

Eliminar carpeta `/backend/` creada o revertir cambios del task.

---

## 11. Entrega esperada

```text
Archivos creados.
Cómo ejecutar.
Variables de entorno necesarias.
Endpoints.
Riesgos.
SKILLS_USED.
```
