# QUICK_START_FASE3.md

**Fase:** `3_V0` - Produccion controlada  
**Estado:** `ACTIVA` (controlada, no produccion abierta)  
**Objetivo:** operar leads reales con trazabilidad, revision humana y seguridad minima.

---

## Objetivo operativo inmediato

- Mantener cadena canonica DIAGNOSTICO: `Tally real -> n8n (normaliza datos, genera Lead_ID, Google Sheets inicial, reglas preIA, IA o ROJO_PREIA, Google Sheets final, payload final post-IA/post-ROJO_PREIA) -> backend /api/intake/diagnostico -> Supabase -> revision interna`.
- Operar en modo controlado con QA y rollback.
- Evitar automatizacion sensible y campanas masivas.

Reglas de operacion canonica:

- Endpoint canonico DIAGNOSTICO: `POST /api/intake/diagnostico`.
- `POST /api/leads`: alta simple/manual, operaciones basicas de dashboard y flujo no diagnostico.
- Google Sheets: espejo operativo/QA temporal (no fuente final consolidada).
- Supabase: destino estructurado principal para produccion controlada y base objetivo del dashboard.
- n8n debe enviar al backend el payload final post-IA/post-ROJO_PREIA, no el payload inicial pre-IA.
- Separacion obligatoria en dashboard: `Semaforo_final` (decision operativa), `Estado` (posicion en proceso), `Semaforo_IA` (informativo/auditoria), `Semaforo_preIA` (tecnico/reglas duras).

---

## Limites de la fase activa

- Si: operacion controlada, pruebas acotadas, evidencia y seguimiento diario.
- No: produccion abierta, cambios sin spec, acciones irreversibles sin revision humana.

---

## Protocolo minimo por tarea

1. Leer `AGENTS.md`.
2. Leer `PROJECT_STATE.md`.
3. Leer `docs/00_CANON/README.md`.
4. Leer `TASK_SPEC` activa.
5. Ejecutar dentro de `READ_SET/WRITE_SET/DO_NOT_TOUCH`.
6. Cerrar con `PASS/FAIL/PENDIENTE` + evidencia + rollback + `NEXT_STEP` unico.

---

## Pendientes reales de fase

- RLS final en proveedor Supabase: pendiente de aplicacion y validacion controlada.
- Consolidacion documental canonica: en curso.

---

## Referencias operativas vivas

- Estado global: `PROJECT_STATE.md`
- Canon documental: `docs/00_CANON/README.md`
- Gobernanza: `docs/00_CANON/GOVERNANCE.md`
- Modelo operativo: `docs/00_CANON/OPERATING_MODEL.md`
- Decisiones activas: `docs/00_CANON/DECISIONS.md`
