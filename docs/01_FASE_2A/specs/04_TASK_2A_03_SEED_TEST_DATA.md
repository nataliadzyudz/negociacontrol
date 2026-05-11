# 04_TASK_2A_03_SEED_TEST_DATA.md

**Fase:** 2A  
**Agente:** DB  
**Estado:** COMPLETADA

---

## 1. Objetivo

Crear datos test para laboratorio Supabase.

Debe incluir casos:

```text
VERDE normal
AMARILLO falta contacto
ROJO riesgo duro
ROJO sin consentimiento
ERROR_IA simulado
TEST lead
```

---

## 2. READ_SET

Solo puede leer:

```text
AGENTS.md
/docs/01_ACTIVO_FASE_2A/specs/04_TASK_2A_03_SEED_TEST_DATA.md
/docs/01_ACTIVO_FASE_2A/05_CONTRATO_DATOS_IA_Y_MIGRACION.md
/supabase/migrations/
```

---

## 3. WRITE_SET

Solo puede crear/modificar:

```text
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
Solo datos ficticios.
No datos reales.
No emails reales.
No teléfonos reales.
No clientes reales.
```

---

## 7. Pasos

```text
1. Crear seed SQL o JSON.
2. Cubrir los 6 casos mínimos.
3. Respetar contrato de datos.
4. Documentar cómo cargar datos.
```

---

## 8. Criterios de aceptación

```text
CA-01 Existen 6 casos test.
CA-02 No hay datos reales.
CA-03 Incluye semáforo y estado separados.
CA-04 Incluye caso Error IA.
CA-05 No toca backend ni public.
CA-06 SKILLS_USED = NO.
```

---

## 9. Definition of Done

```text
Los datos test permiten validar backend y dashboard sin usar leads reales.
```

---

## 10. Rollback

Eliminar seed o limpiar datos test.

---

## 11. Entrega esperada

```text
Archivo seed.
Lista de casos.
Instrucciones de carga.
SKILLS_USED = NO.
```
