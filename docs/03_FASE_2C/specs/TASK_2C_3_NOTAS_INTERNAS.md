# TASK_2C_3_NOTAS_INTERNAS

**Fase:** 2C  
**Agente:** BACKEND / AUDITOR  
**Estado:** COMPLETADA

---

## 1. Objetivo

```text
Validar que el endpoint POST /api/leads/:id/notes permite agregar notas internas a un lead test y registra autor/timestamp.
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
/docs/02_ACTIVO_FASE_2C/specs/reviews/REVIEW_TASK_2C_3.md
/docs/02_ACTIVO_FASE_2C/specs/TASK_2C_3_NOTAS_INTERNAS.md
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
- Nota no puede estar vacía
- created_by obligatorio
```

---

## 8. Pasos

```text
1. Usar lead test existente (9e562096-12ab-425f-99f3-19a9fc41e7ee)
2. Llamar POST /api/leads/:id/notes con note y created_by
3. Validar respuesta 201
4. Verificar registro en lead_notes
5. Documentar resultado en REVIEW
```

---

## 9. Criterios De Aceptacion Con KPIs

| CA | Criterio | KPI de Exito | Metodo de Verificacion |
|---|---|---|---|
| CA-01 | POST /leads/:id/notes retorna 201 | Status 201 | curl/PowerShell |
| CA-02 | JSON contiene note | texto presente | Validar JSON |
| CA-03 | JSON contiene created_by | autor presente | Validar JSON |
| CA-04 | Registro en lead_notes | Nota persistida en BD| GET lead_id |
| CA-05 | timestamp presente | created_at presente | Validar JSON |

---

## 10. Validacion Real Obligatoria

### Checklist De Validacion

| # | Prueba | KPI de Exito | Metodo de Verificacion |
|---|---|---|---|
| 1 | POST /leads/:id/notes | Status 201 | curl/PowerShell |
| 2 | Nota presente | note!=empty | Validar JSON |
| 3 | Autor registrado | created_by presente | Validar JSON |
| 4 | Timestamp presente | created_at presente | Validar JSON |

### Resultados De Validacion

| Prueba | Resultado | Evidencia |
|---|---|---|
| | | |

---

## 11. Definition Of Done

```text
- Endpoint retorna 201
- Nota guardada en lead_notes
- Autor y timestamp registrados
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
FILES_CHANGED: REVIEW_TASK_2C_3.md (creado)
SKILLS_USED: Ninguno
ACCEPTANCE_CHECK: 5/5 CA pasando
RISKS: Ninguno
ROLLBACK: No aplica
NEXT_STEP: TASK_2C_4_EVENTOS
```