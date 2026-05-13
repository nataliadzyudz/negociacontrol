# QUICK_START_FASE3.md

**Fase:** `3_V0` - Produccion controlada  
**Estado:** `ACTIVA` (controlada, no produccion abierta)  
**Objetivo:** operar leads reales con trazabilidad, revision humana y seguridad minima.

---

## Objetivo operativo inmediato

- Mantener cadena canonica: `Tally real -> n8n -> backend /api/leads -> Supabase -> revision interna`.
- Operar en modo controlado con QA y rollback.
- Evitar automatizacion sensible y campanas masivas.

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
