# 05_TASK_2A_04_DASHBOARD_READ_ONLY.md

**Fase:** 2A  
**Agente:** DASHBOARD  
**Estado:** COMPLETADA

---

## 1. Objetivo

Adaptar `/public/` como dashboard read-only de laboratorio.

Debe mostrar:

```text
leads
semáforo
estado
riesgos
errores
detalle básico
```

No debe escribir datos.

---

## 2. READ_SET

Solo puede leer:

```text
AGENTS.md
/docs/01_ACTIVO_FASE_2A/specs/05_TASK_2A_04_DASHBOARD_READ_ONLY.md
/docs/01_ACTIVO_FASE_2A/01_FASE2A_SUPABASE_BACKEND_LAB.md
/docs/01_ACTIVO_FASE_2A/06_REGLAS_NO_NEGOCIABLES_NC.md
/public/
```

Puede leer backend API docs si existen:

```text
/backend/README.md
```

Skill opcional solo si Natalia lo aprueba:

```text
/skills/frontend-design/SKILL.md
```

---

## 3. WRITE_SET

Solo puede modificar:

```text
/public/index.html
/public/app.js
/public/styles.css
```

---

## 4. DO_NOT_TOUCH

No puede leer/modificar:

```text
/n8n_workflows/
/n8n_worklows/
/n8n_workwolws/
/sheets.js
/server.js
/package.json
/supabase/migrations/
/docs/00_MASTER/
/skills/using-superpowers/
/_archivo_DO_NOT_READ/
```

No puede leer `/skills/frontend-design/SKILL.md` salvo aprobación expresa.

---

## 5. Skills

```text
SKILLS_ALLOWED = SI_CON_APROBACION
```

Skill sugerible:

```text
/skills/frontend-design/SKILL.md
```

Uso:

```text
Solo para mejorar UI/UX/responsive/estructura visual.
No para cambiar arquitectura.
No para añadir escrituras.
No para abrir acciones operativas.
```

---

## 6. Reglas específicas

```text
Read-only.
No botones que escriban datos.
No envío WhatsApp.
No envío email.
No pagos.
No calendario.
No service_role.
No secretos en frontend.
```

Si necesita datos:

```text
Consumir backend.
No escribir directo en Supabase.
```

---

## 7. Pasos

```text
1. Revisar public actual.
2. Detectar dependencias legacy como SheetsAPI/localStorage.
3. Proponer cambios visuales mínimos.
4. Mantener diseño sobrio NC.
5. Mostrar semáforo y estado separados.
6. Añadir estados vacíos/carga/error.
7. Si hace falta frontend-design skill, proponer SKILL_SUGGESTION antes de usarlo.
```

---

## 8. Criterios de aceptación

```text
CA-01 Dashboard carga sin romper.
CA-02 Es read-only.
CA-03 No hay secretos.
CA-04 Muestra semáforo y estado separados.
CA-05 No toca backend ni supabase.
CA-06 No toca n8n ni Sheets.
CA-07 Si se usó skill, fue aprobado y declarado.
```

---

## 9. Definition of Done

```text
Dashboard listo para visualizar datos de laboratorio sin capacidad operativa sensible.
```

---

## 10. Rollback

Restaurar archivos previos de `/public/`.

---

## 11. Entrega esperada

```text
Archivos modificados.
Qué muestra.
Cómo probar.
Limitaciones.
SKILLS_USED.
```
