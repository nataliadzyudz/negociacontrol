# 06_TASK_2A_05_SMOKE_TESTS.md

**Fase:** 2A  
**Agente:** AUDITOR / BACKEND  
**Estado:** COMPLETADA

---

## 1. Objetivo

Validar Fase 2A con pruebas de humo sin tocar producción.

---

## 2. READ_SET

Solo puede leer:

```text
AGENTS.md
/docs/01_ACTIVO_FASE_2A/specs/06_TASK_2A_05_SMOKE_TESTS.md
/backend/
/supabase/
/public/
/docs/01_ACTIVO_FASE_2A/06_REGLAS_NO_NEGOCIABLES_NC.md
```

---

## 3. WRITE_SET

Puede crear:

```text
/tests/
/backend/tests/
/docs/01_ACTIVO_FASE_2A/specs/reviews/REVIEW_2A_05_SMOKE_TESTS.md
```

---

## 4. DO_NOT_TOUCH

No puede leer/modificar:

```text
/n8n_workflows/
/n8n_worklows/
/n8n_workwolws/
/sheets.js
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
No usar datos reales.
No llamar n8n.
No llamar Google Sheets.
No enviar mensajes.
No probar pagos ni calendario.
```

---

## 7. Pasos

```text
1. Probar health.
2. Probar inserción test si backend existe.
3. Probar lectura leads.
4. Probar dashboard con datos test.
5. Revisar secretos expuestos.
6. Crear informe.
```

---

## 8. Criterios de aceptación (con KPIs)

| CA | Criterio | KPI de Éxito | Método de Verificación |
|---|---|---|---|
| CA-01 | Health OK | Status 200, response < 500ms | `curl http://localhost:3001/api/health` |
| CA-02 | Datos test visibles | JSON con 7+ leads en array | `curl /api/leads` y validar count |
| CA-03 | No hay escrituras desde frontend | Botón cambio estado deshabilitado | Inspector UI, alert shown |
| CA-04 | No hay secretos | .env no commiteado | `git status` o revisar archivos |
| CA-05 | No se tocó n8n ni Sheets | DO_NOT_TOUCH respetado | Código review en specs |
| CA-06 | Informe creado | Archivo existe en reviews/ | `ls docs/01_ACTIVO_FASE_2A/specs/reviews/` |
| CA-07 | SKILLS_USED = NO | Sin skill cargado en entrega | Revisar entrega final |

---

## 8.1 Validación Real Obligatoria

**Regla:** Estas pruebas DEBEN ejecutarse y sus resultados registrarset antes de aprobar el Gate.

### Resultados de Validación

| # | Prueba | Resultado | Evidencia |
|---|---|---|---|
| 1 | Health endpoint | PENDIENTE | Requiere credenciales Supabase + backend arrancado |
| 2 | Datos test visibles | PENDIENTE | Requiere credenciales Supabase |
| 3 | Read-only dashboard | ✅ PASS | Código verificado, alert implementado |
| 4 | Secretos en código | ✅ PASS | Usa .env, no hardcoded |
| 5 | n8n/Sheets intactos | ✅ PASS | DO_NOT_TOUCH respetado |

**Nota:** Las pruebas CA-01 y CA-02 requieren ejecución real con credenciales de Supabase.

---

## 9. Definition of Done

```text
Hay evidencia suficiente para decidir si Fase 2A puede cerrarse o necesita correcciones.
```

---

## 10. Rollback

Eliminar tests o revertir archivos de prueba.

---

## 11. Entrega esperada

```text
Resultado de pruebas.
Errores.
Pendientes.
SKILLS_USED = NO.
Recomendación para pasar/no pasar a 2B.
```
