# TASK_2C_2_ESTADO_OPERATIVO

**Fase:** 2C  
**Agente:** BACKEND / AUDITOR  
**Estado:** COMPLETADA

---

## 1. Objetivo

```text
Validar que el endpoint PATCH /api/leads/:id/status permite modificar el estado operativo de un lead test y registra el cambio en lead_status_history.
```

---

## 2. CORE_READ_SET

```text
AGENTS.md
/docs/02_ACTIVO_FASE_2C/QUICK_START_FASE2C.md
/backend/src/routes/leads.js
```

---

## 3. CONDITIONAL_READ_SET

```text
None - endpoint verificado en código existente
```

---

## 4. WRITE_SET

```text
/docs/02_ACTIVO_FASE_2C/specs/reviews/REVIEW_TASK_2C_2.md
/docs/02_ACTIVO_FASE_2C/specs/TASK_2C_2_ESTADO_OPERATIVO.md
```

---

## 5. DO_NOT_TOUCH

```text
/server.js
/sheets.js
/package.json
/skills/
/n8n_workflows/productivo
Google Sheets real
datos reales
```

---

## 6. Skills

```text
SKILLS_ALLOWED = NO
```

---

## 7. Reglas Especificas De Esta Tarea

```text
- Solo leads con es_test=true
- Solo en laboratorio
- Solo estados válidos: NUEVO, CONTACTADO, CITADO, CONVERTIDO, PERDIDO
- No modificar semáforo
```

---

## 8. Pasos

```text
1. Usar lead test existente (9e562096-12ab-425f-99f3-19a9fc41e7ee)
2. Llamar PATCH /api/leads/:id/status con estado_nuevo=CITADO
3. Validar respuesta 200
4. Verificar registro en lead_status_history con estado_anterior=NUEVO, estado_nuevo=CITADO
5. Documentar resultado en REVIEW
```

---

## 9. Criterios De Aceptacion Con KPIs

| CA | Criterio | KPI de Exito | Metodo de Verificacion |
|---|---|---|---|
| CA-01 | PATCH /leads/:id/status retorna 200 | Status 200 | curl/PowerShell |
| CA-02 | JSON contiene estado_anterior | "NUEVO" presente | Validar JSON |
| CA-03 | JSON contiene estado_nuevo | "CITADO" presente | Validar JSON |
| CA-04 | Registro en lead_status_history |Cambio persistido en BD| GET lead_id/status_history|
| CA-05 | changed_by presente | autor registrado | Validar JSON |

---

## 10. Validacion Real Obligatoria

### Checklist De Validacion

| # | Prueba | KPI de Exito | Metodo de Verificacion |
|---|---|---|---|
| 1 | PATCH /leads/:id/status | Status 200 | curl/PowerShell |
| 2 | Estado anterior correcto | "NUEVO" | Validar JSON |
| 3 | Estado nuevo guardado | "CITADO" | GET posterior |
| 4 | Autor registrado | changed_by presente | Validar JSON |

### Resultados De Validacion

| Prueba | Resultado | Evidencia |
|---|---|---|
| | | |

---

## 11. Definition Of Done

```text
- Endpoint retorna 200
- Cambio de estado guardado en lead_status_history
- Estado anterior vs nuevo correcto
- Solo datos test
```

---

## 12. Rollback

```text
- No requiere rollback (es operación controlada en lab)
- Lead test puede recrearse si fuera necesario
```

---

## 13. Closeout Obligatorio

```text
1. Crear REVIEW si WRITE_SET lo permite
2. Actualizar estado de TASK_SPEC
3. Declarar FILES_READ
4. Declarar FILES_CHANGED
5. Declarar SKILLS_USED
6. Proponer NEXT_STEP
```

---

## 14. Entrega Esperada

```text
FILES_READ: AGENTS.md, QUICK_START_FASE2C.md, leads.js
FILES_CHANGED: REVIEW_TASK_2C_2.md (creado)
SKILLS_USED: Ninguno
ACCEPTANCE_CHECK: 5/5 CA pasando
RISKS: Ninguno
ROLLBACK: No aplica
NEXT_STEP: TASK_2C_3_NOTAS_INTERNAS
```