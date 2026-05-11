# QUICK_START_FASE3.md

**Fase:** 3 - Produccion  
**Objetivo:** Sistema en produccion con datos reales, seguridad reforzada y operacion estable.  
**Estado:** PENDIENTE - No activar hasta completar Gate 2C->3

---

## Objetivo De Fase 3

Sistema en produccion:
- Migracion de datos reales desde Sheets hacia Supabase
- Operativa diaria con trazabilidad completa
- Monitoreo y alertas de disponibilidad y errores
- Backups automáticos y pruebas de restauracion
- Politica de seguridad y rotacion de secretos activa

---

## Prerequisitos (antes de activar)

- [ ] Gate 2C->3 APROBADO con 100% de criterios
- [ ] Migration de datos completada y validada
- [ ] Regression tests completos en backend, n8n y dashboard
- [ ] Politica de incidentes y soporte documentada
- [ ] Backups configurados y restauracion verificada
- [ ] MCP y credenciales revisadas sin secretos en repositorio

---

## Checklist Minimo De Seguridad

- [ ] No hay tokens, keys ni passwords en archivos versionados
- [ ] `.env` local y secretos fuera del repositorio
- [ ] Rotacion de tokens MCP y API keys activa (minimo mensual)
- [ ] Acceso por roles revisado (n8n, Supabase, AWS)
- [ ] HTTPS obligatorio en endpoints publicos
- [ ] Logs sin PII sensible y con retencion definida

---

## Checklist Minimo De Produccion

- [ ] Healthcheck backend 200 estable
- [ ] Flujo DIAGNOSTICO: webhook -> Supabase -> dashboard OK
- [ ] Duplicados controlados (respuesta 409) y sin doble accion critica
- [ ] PM2/systemd con reinicio automatico comprobado
- [ ] Alertas por caida de servicios (backend, n8n, db)
- [ ] Runbook de rollback y contingencia aprobado

---

## Referencias Operativas

- Estado global: `PROJECT_STATE.md`
- Conexiones MCP: `MCP.md`
- Criterios de hardening y salida a produccion: `docs/04_FASE_3/PRODUCCION_SEGURA_CHECKLIST.md`
