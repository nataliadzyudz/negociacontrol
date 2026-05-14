# TASK_SPEC_DASHBOARD_UI_OPERATIVO_V0_1

## 1. Estado

- Estado actual: `IMPLEMENTADA_QA_EXTERNO_PASS_PENDIENTE_APROBACION_NATALIA`
- Fase: `3_V0` (produccion controlada)
- Tipo: `UI frontend only`
- Estado de gobierno:
  - Implementacion UI ejecutada por Antigravity en BLOQUE 2.
  - QA externo ejecutado por OpenCode QA.
  - Aprobacion final reservada a Natalia / ChatGPT supervisor.
  - Commit/push/deploy solo con instruccion explicita posterior.

## 2. Objetivo UI V0.1

Evolucionar el dashboard operativo para mejorar legibilidad, accionabilidad y control visual sin romper el contrato runtime validado de DIAGNOSTICO.

## 3. Alcance

- Refinar experiencia visual de tarjetas, columnas y drawer.
- Reforzar alertas operativas criticas en ficha lead.
- Mejorar filtros y estadisticas operativas para uso diario.
- Garantizar responsive minimo util (desktop + mobile basico).
- Mantener separacion contractual entre `Estado`, `Semaforo_final`, `Semaforo_IA`, `Semaforo_preIA`.

## 4. Fuera de alcance

- Cambios de backend/API.
- Cambios de n8n/workflows.
- Cambios de Supabase/schema/migraciones.
- Cambios de infraestructura/AWS/PM2/nginx.
- Automatizacion sensible o cambios de produccion.

## 5. Archivos autorizados

### WRITE_SET

- `public/app.js`
- `public/styles.css`
- `public/index.html` (solo si es estrictamente necesario y se documenta).

### READ_SET minimo

- `AGENTS.md`
- `PROJECT_STATE.md`
- `ANTIGRAVITY_RULES_NC.md`
- `docs/00_CANON/brand/BRAND_UI_TOKENS_NC.md`
- `docs/04_FASE_3/QUICK_START_FASE3.md`
- `docs/04_FASE_3/REVIEW_F3_V0_OPERAR_LEADS_DASHBOARD_AWS.md`
- `docs/00_CANON/GOVERNANCE.md`
- `docs/00_CANON/OPERATING_MODEL.md`
- `public/app.js`
- `public/styles.css`

## 6. DO_NOT_TOUCH

- `backend/*`
- `n8n_workflows/*`
- `supabase/*`
- `.env`, secrets, credenciales
- produccion/AWS/PM2/nginx
- workflows n8n activos
- `master/main`

## 7. Baseline E2E runtime (previo obligatorio)

Validacion cerrada sobre entorno runtime controlado:

- `T260514_V02` VERDE -> `APTO_DIAGNOSTICO`
- `T260514_V03` AMARILLO sin revision -> `FALTA_DATO`
- `T260514_V04` AMARILLO con revision -> `PENDIENTE_REVISION`
- `T260514_V05` ROJO riesgo duro -> `PENDIENTE_REVISION`
- `T260514_V06` ERROR_IA -> `ERROR_IA`

## 8. Contrato visual obligatorio

- `Estado` gobierna columnas/pipeline y posicion operativa.
- `Semaforo_final` gobierna prioridad visual operativa (cards, filtros semaforo, stats semaforo).
- `Semaforo_IA` y `Semaforo_preIA` se muestran como auditoria/informativo.
- Prohibido mezclar `Estado` con semaforo como criterio principal de pipeline.
- Todo diseño debe consumir los tokens de `docs/00_CANON/BRAND_UI_TOKENS_NC.md`, priorizando legibilidad y sobriedad.

## 9. Mejoras previstas (UI V0.1)

- Tarjetas de lead: jerarquia visual mas clara, prioridad por `Semaforo_final`.
- Drawer/ficha: lectura rapida por bloques operativos.
- Alertas criticas: consentimiento/contacto/riesgo/error IA mas visibles.
- Filtros: reducir friccion de operacion diaria.
- Stats: consistencia visual con contrato de datos.
- Responsive minimo: uso aceptable en mobile sin romper operacion.

## 10. Criterios de aceptacion UI

1. La UI mantiene separacion `Estado` vs `Semaforo_final` vs `Semaforo_IA`.
2. No hay cambios fuera de `WRITE_SET`.
3. No hay cambios backend/n8n/supabase.
4. Vista principal y drawer siguen funcionales sin errores JS.
5. Filtros y stats operativos mantienen coherencia con datos runtime.
6. Evidencia de QA visual y tecnica registrada en cierre.

## 11. Pruebas obligatorias (cuando se implemente)

- `node --check public/app.js`
- Revision de `git diff --stat`
- Verificacion de alcance: solo archivos UI autorizados
- QA manual rapido desktop/mobile
- Confirmar que no se tocaron backend/n8n/supabase/secrets

## 12. Rollback

1. Revertir solo archivos UI tocados en la tarea.
2. Restaurar estado previo de `public/app.js`, `public/styles.css`, `public/index.html` si aplica.
3. Revalidar carga UI y ausencia de errores JS.

## 13. Criterio GO / NO GO para pasar a Antigravity

`GO` si:

- baseline E2E se mantiene PASS,
- `ANTIGRAVITY_RULES_NC.md` vigente,
- alcance de UI acotado y aprobado,
- riesgos y rollback claros.

`NO GO` si:

- se requiere tocar backend/n8n/supabase,
- hay ambiguedad de contrato de datos,
- no hay evidencia de rollback viable.

## 14. Resultado esperado de cierre

- Estado final de BLOQUE 2: `IMPLEMENTADA_PENDIENTE_APROBACION`
- Evidencia verificable: 
  - `app.js` y `styles.css` refactorizados aplicando tokens NC.
  - El Drawer y cards usan clases semánticas (ej. `.audit-ia-grid`, `.alert-riesgo-detectado`) en lugar de inline styles abigarrados.
  - El diseño base es responsivo (media queries CSS activadas).
  - Verificación `node --check public/app.js` exitosa (código 0).
- Riesgos residuales: Ninguno grave; la funcionalidad subyacente y la interacción con backend son idénticas.
- Rollback: `git restore public/app.js public/styles.css` a commit pre-refactor (ej. `cec70e8`).
- `NEXT_STEP`: decision explicita de Natalia sobre commit y cierre formal de UI V0.1.
