# REVIEW_2A_00_WORKSPACE_AUDIT.md

**Tarea:** TASK_2A_00_AUDIT_WORKSPACE  
**Fase:** 2A  
**Agente:** ORQUESTADOR + AUDITOR  
**Fecha:** 2026-05-07  
**Estado:** COMPLETADO

---

## 1. Resumen Ejecutivo

El workspace contiene un **MVP funcional** de NC Control Tower con:
- Dashboard frontend operativo (public/)
- Server Express con API REST (server.js)
- Mock de Google Sheets en localStorage (sheets.js)
- Workflow n8n existente (n8n_workflows/DIAGNOSTICO.json)
- Documentación completa de spec-driven (docs/01_ACTIVO_FASE_2A/)

**Hallazgo clave:** El código legacy ES reutilizable. No es necesario recrear todo desde cero.

---

## 2. Tabla de Clasificación

| Archivo/Carpeta | Clasificación | Notas |
|---|---|---|
| `AGENTS.md` | ACTIVO_FASE_2A | Gobierno del proyecto |
| `.gemini_instructions.md` | READ_ONLY_LEGADO | Configuración IA, no carga skills automáticamente |
| `.agents/rules/00_NC_CONTROL_TOWER_RULES.md` | ACTIVO_FASE_2A | Reglas operativas |
| `package.json` | READ_ONLY_LEGADO | Base npm, agregar @supabase/supabase-js |
| `server.js` | READ_ONLY_LEGADO | Express con endpoints reutilizables para backend nuevo |
| `sheets.js` | READ_ONLY_LEGADO | Mock localStorage, reemplazar por cliente Supabase |
| `public/` | READ_ONLY_LEGADO | UI funcional, reconectar a nuevo backend |
| `public/index.html` | READ_ONLY_LEGADO | Dashboard SPA completo |
| `public/app.js` | READ_ONLY_LEGADO | Lógica de triaje y renderizado |
| `public/styles.css` | READ_ONLY_LEGADO | Estilos del dashboard |
| `n8n_workflows/` | BLOQUEADO | Fase 2A no toca n8n |
| `skills/` | BLOQUEADO | No autorizados en Fase 2A |
| `_archivo_DO_NOT_READ/` | BLOQUEADO | Artefactos legacy no relevantes |
| `docs/01_ACTIVO_FASE_2A/` | ACTIVO_FASE_2A | Specs y documentación activa |
| `docs/00_MASTER/` | FUTURO | PRD, roadmap, reglas triage |
| `docs/02_SIGUIENTE_FASE_2B/` | FUTURO | Specs Fase 2B |
| `docs/03_SIGUIENTE_FASE_2C/` | FUTURO | Specs Fase 2C |
| `docs/FUTURO_FASE_3/` | FUTURO | Specs Fase 3 |
| `README_INSTALACION_PACK.md` | ARCHIVO | Documentación de instalación legacy |

---

## 3. Estado de Componentes Legado

### 3.1 Server.js (READ_ONLY_LEGADO)

```javascript
- Express + static files
- Endpoints: /api/leads, /api/leads/:id, /api/leads/:id/status, /api/stats
- Lee de SheetsAPI (mock)
- Listo para adaptación a backend Supabase
```

**Reutilización sugerida:** Usar como base del nuevo backend, reemplazar SheetsAPI por cliente Supabase.

### 3.2 sheets.js (READ_ONLY_LEGADO)

```javascript
- Mock en localStorage (no conecta a Google Sheets real)
- Métodos: getAll, getById, create, update, delete, updateStatus, getStats
- Datos de test precargados (12 leads)
```

**Reutilización sugerida:** Reemplazar completamente por cliente Supabase (@supabase/supabase-js).

### 3.3 package.json (READ_ONLY_LEGADO)

```json
{
  "name": "nc-control-tower",
  "type": "module",
  "dependencies": {
    "googleapis": "^140.0.0",
    "express": "^4.18.2"
  }
}
```

**Reutilización sugerida:** Agregar `@supabase/supabase-js` sin eliminar googleapis (por si se necesita integración real con Sheets más adelante).

### 3.4 public/ (READ_ONLY_LEGADO)

```
- Dashboard SPA completo
- Pipeline con columnas por estado
- Lead drawer con detalles completos
- Filtros: urgencia, idioma, duda principal
- Estadísticas: total, urgentes, semaforo (verde/amarillo/rojo)
- Cambio de estado operativo
- Copiar respuesta sugerida
```

**Reutilización sugerida:** Reconectar app.js al nuevo backend (cambiar SheetsAPI por llamadas a /api/*).

---

## 4. Verificación de Estructura n8n

| Elemento | Estado |
|---|---|
| Carpeta real | `n8n_workflows/` ✅ |
| Workflow principal | `DIAGNOSTICO.json` existe ✅ |
| Backup | `DIAGNOSTICO.backup.json` existe ✅ |
| Acceso en audit | NO leido (bloqueado por spec) |

**Nota:** Hay typos en paths anteriores (`n8n_worklows/`, `n8n_workwolws/`) pero la carpeta real es `n8n_workflows/`.

---

## 5. Documentación Activa Fase 2A

| Archivo | Estado |
|---|---|
| `00_TASKS_FASE2A_INDEX.md` | ✅ Índice de tareas |
| `01_TASK_2A_00_AUDIT_WORKSPACE.md` | ✅ Esta spec |
| `02_TASK_2A_01_SUPABASE_SCHEMA.md` | ⚠️ Estado: BORRADOR |
| `03_TASK_2A_02_BACKEND_MINIMO.md` | ⚠️ Estado: BORRADOR |
| `04_TASK_2A_03_SEED_TEST_DATA.md` | ⚠️ Estado: BORRADOR |
| `05_TASK_2A_04_DASHBOARD_READ_ONLY.md` | ⚠️ Estado: BORRADOR |
| `06_TASK_2A_05_SMOKE_TESTS.md` | ⚠️ Estado: BORRADOR |
| `01_FASE2A_SUPABASE_BACKEND_LAB.md` | ✅ Documento de fase |
| `05_CONTRATO_DATOS_IA_Y_MIGRACION.md` | ✅ Contrato de datos |
| `06_REGLAS_NO_NEGOCIABLES_NC.md` | ✅ Reglas no negociables |

---

## 6. Riesgos Identificados

| # | Riesgo | Severidad | Mitigación |
|---|---|---|---|
| 1 | Specs en estado "BORRADOR" | Media | Aprobar TASK_2A_01 antes de ejecutar |
| 2 | Code legacy no auditado previamente | Baja | ✅ Audit completado |
| 3 | Sin carpeta /supabase/ ni /backend/ | Baja | Crear en TASK_2A_01 y TASK_2A_02 |
| 4 | Múltiples typos en paths de docs | Baja | Usar paths verificados del glob |

---

## 7. Decisiones de Reutilización

### Decisión 1: Server.js

**Sí reutilizar** como base del nuevo backend.

### Decisión 2: sheets.js

**Reemplazar** por cliente Supabase (no adaptar el mock).

### Decisión 3: public/

**Sí reutilizar** UI, solo reconectar API.

### Decisión 4: package.json

**Ampliar** agregando @supabase/supabase-js.

---

## 8. Criterios de Aceptación Cumplidos

| CA | Criterio | Estado |
|---|---|---|
| CA-01 | Existe REVIEW_2A_00_WORKSPACE_AUDIT.md | ✅ |
| CA-02 | No se modifica código | ✅ |
| CA-03 | No se lee n8n_workflows | ✅ |
| CA-04 | No se lee skills | ✅ |
| CA-05 | No se lee _archivo_DO_NOT_READ | ✅ |
| CA-06 | Cada archivo raíz queda clasificado | ✅ |
| CA-07 | Se recomienda siguiente tarea | ✅ |

---

## 9. Siguiente Tarea Recomendada

### TASK_2A_01_SUPABASE_SCHEMA

**Antes de ejecutar:**
1. Cambiar estado de BORRADOR a APROBADA
2. Confirmar que el agente tiene claro que debe crear /supabase/migrations/ desde cero (no hay legacy de Supabase)

**Razón:** La siguiente tarea debe crear la estructura de base de datos Supabase, que no existe aún.

---

## 10. Definition of Done

El informe permite decidir que:

- ✅ El código legacy es reutilizable, no desecho
- ✅ Se puede pasar a TASK_2A_01 sin riesgo de arrastrar legado problemático
- ✅ Las specs de Fase 2A están definidas aunque en estado BORRADOR
- ✅ El workspace está limpio para comenzar construcción

---

## 11. SKILLS_USED

```
SKILLS_USED = NO
```

---

## 12. Confirmación

```
✅ Código no modificado
✅ n8n_workflows no leído
✅ skills no leído
✅ _archivo_DO_NOT_READ no leído
✅ Informe creado
```

**AUDIT COMPLETADO.** Listo para pasar a TASK_2A_01_SUPABASE_SCHEMA.