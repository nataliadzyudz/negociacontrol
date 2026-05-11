# PROJECT_STATE.md

**Última actualización:** 2026-05-11

---

## Estado del Sistema (LIVE)

| Componente | Host | Puerto | Estado | Phase |
|-----------|------|--------|--------|-------|
| Backend | 16.171.174.52 | 3001 | ✅ RUNNING | PHASE=2C |
| Frontend | 16.171.174.52 | 8080 | ✅ RUNNING | - |
| Nginx | 16.171.174.52 | 8080 | ✅ RUNNING | Proxy |
| n8n | 16.171.174.52 | 5678 | ✅ RUNNING | Lab |
| EasyPanel | 16.171.174.52 | 80, 443, 3000 | ✅ RUNNING | - |
| Supabase | njzvqyovopcwfgwvnqli | - | ✅ CONNECTED | Test |

---

## Fases

| Fase | Estado | Fechas | Docs Folder | Notas |
|------|--------|--------|-----------|-----------|
| 1 | LEGACY | - | - | Sheets freeze |
| 2A | COMPLETADA | 2026-05-05 | 01_FASE_2A | Test |
| 2B | COMPLETADA | 2026-05-06 | 02_FASE_2B | Test |
| 2C | ACTIVA | 2026-05-08 | 03_FASE_2C | 2C_CIERRE_CONTROLADO |
| 3 | ACTIVA | 2026-05-11 | 04_FASE_3 | FASE_3_PRODUCCION_CONTROLADA_V0_ACTIVA |

Interpretacion canonica del estado 2C:

```text
2C_CIERRE_CONTROLADO = pre-produccion condicionada.
No produccion abierta hasta cierre de condiciones del Gate 2C_TO_3.
```

---

## Puertos AWS (EC2 Security Group)

| Puerto | Servicio | Status |
|--------|---------|--------|
| 80 | EasyPanel/Traefik | ✅ |
| 443 | HTTPS | ✅ |
| 3000 | EasyPanel | ✅ |
| 3001 | Backend | ✅ |
| 5678 | n8n | ✅ |
| 8080 | Frontend | ✅ |

---

## Recursos (Referencias)

| Recurso | Referencia | Ubicación |
|--------|------------|-----------|
| AWS_IP | 16.171.174.52 | AWS Console |
| AWS_REGION | eu-north-1 | - |
| SSH_KEY | par_claves_nc.pem | ./par_claves_nc.pem |
| AWS_SG | sg-0a6e33ad93fe8ad57 | AWS Console |
| SUPABASE_PROJECT | njzvqyovopcwfgwvnqli | supabase.com |
| MCP_CONFIG | MCP.md | ./MCP.md |
| PROD_CHECKLIST | PRODUCCION_SEGURA_CHECKLIST.md | ./docs/04_FASE_3/PRODUCCION_SEGURA_CHECKLIST.md |

---

## Tareas Pendientes (TODO)

| ID | Tarea | Fase | Prioridad |
|----|------|------|---------|
| 1 | Migrar DIAGNOSTICO → Supabase | 2C→3 | ALTA |
| 2 | Testing integrado DIAGNOSTICO | 3 | ALTA |

---

## Historial de Gates

| Gate | Fecha | Resultado |
|------|-------|----------|
| GATE_1_TO_2A | 2026-05-04 | APROBADO |
| GATE_2A_TO_2B | 2026-05-05 | APROBADO |
| GATE_2B_TO_2C | 2026-05-06 | APROBADO |
| GATE_2C_TO_3 | 2026-05-08 | APROBADO_CONDICION (2C_CIERRE_CONTROLADO) |

Nota operativa (2026-05-11):

```text
Se permite evaluacion de PRODUCCION_CONTROLADA_V0 en modo manual/controlado.
No produccion abierta.
MCP n8n permanece como deuda de automatizacion.
Estado recomendado: APROBAR_CON_CONDICIONES para v0 manual/controlada.
Decision Natalia: APROBAR_V0_CON_CONDICIONES.
```

---

## Checklist de Entrada (OBLIGATORIO)

### Antes de ejecutar CUALQUIER tarea:

- [ ] Leer PROJECT_STATE.md
- [ ] Confirmar fase activa en sistema vs docs
- [ ] Revisar índice de tareas - estado
- [ ] Identificar dependencias
- [ ] Verificar recursos (puertos, creds)
- [ ] CONFIRMAR: TASK_SPEC existe
- [ ] Si NO existe → PARAR → Crear SPEC primero
- [ ] Si necesita más →.expand WRITE_SET

### Después de completar tarea:

- [ ] Tests ejecutados y pasando
- [ ] Resultados registrados
- [ ] PROJECT_STATE.md actualizado
- [ ] Índice de fase actualizado
- [ ] NEXT_STEP propuesto (no ejecutado)
