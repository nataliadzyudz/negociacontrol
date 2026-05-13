# AGENTS.md â€” NC Control Tower v2 Â· Router mÃ­nimo spec-driven

**Proyecto:** NEGOCIA CONTROL â€” NC CRM / Control Tower v2  
**Workspace local:** `<LOCAL_WORKSPACE_ROOT>`  
**Fase activa documental:** `3_V0`.
**Regla de gobierno:** `process.env.PHASE` orienta runtime tecnico, pero no sustituye `PROJECT_STATE.md` ni este `AGENTS.md` para decisiones documentales.
**Modo:** spec-driven Â· una tarea cada vez Â· contexto eficiente Â· MCP con lÃ­mites Â· skills bajo demanda.

---

## 1. Regla principal

```text
AGENTS.md no es el PRD.
AGENTS.md no contiene toda la doctrina.
AGENTS.md solo enruta.
La tarea concreta manda mediante su TASK_SPEC.
```

Antes de cualquier acciÃ³n:

```text
1. Leer AGENTS.md.
2. Leer PROJECT_STATE.md â† OBLIGATORIO
3. Leer QUICK_START de la fase activa.
4. Leer SOLO la TASK_SPEC indicada.
5. Leer CORE_READ_SET.
6. CONDITIONAL_READ_SET solo si hay fallo/ambigÃ¼edad.
7. Escribir SOLO en WRITE_SET.
8. No tocar DO_NOT_TOUCH.
9. Primero devolver PLAN.
10. No construir hasta aprobaciÃ³n.
11. Si tarea NO tiene SPEC â†’ PARAR â†’ Pedir creaciÃ³n de SPEC
```

---

## 2. Fase activa

```text
FASE_ACTIVA = 3_V0
```

Fase 3_V0 significa:

```text
Produccion controlada (no produccion abierta).
Cadena canonica DIAGNOSTICO: Tally real controlado -> n8n (normaliza datos, genera Lead_ID, escribe Google Sheets inicial, ejecuta reglas preIA, ejecuta IA o rama ROJO_PREIA, actualiza Google Sheets final, envia payload final post-IA/post-ROJO_PREIA) -> backend POST /api/intake/diagnostico -> Supabase (leads, lead_triage, lead_status_history) -> dashboard operativo/revision interna.
Operacion con trazabilidad, QA y rollback.
Sin automatizacion sensible.
Con validacion humana obligatoria.
Documentacion viva en docs/04_FASE_3 y docs/00_CANON.
```

Principio rector NC:

```text
Natalia decide.
La IA clasifica.
El backend valida.
Supabase guarda.
n8n automatiza.
El dashboard visualiza/opera segÃºn fase.
```

Reglas canonicas DIAGNOSTICO F3_V0:

```text
/api/intake/diagnostico = endpoint canonico del flujo DIAGNOSTICO.
/api/leads = alta simple/manual, operaciones basicas de dashboard y flujo no diagnostico.
Google Sheets = espejo operativo/QA temporal durante transicion (no fuente final consolidada).
Supabase = destino estructurado principal y base objetivo del dashboard operativo.
Dashboard opera con separacion explicita:
- Semaforo_final = decision operativa principal de encaje/riesgo.
- Estado = posicion del lead en el proceso.
- Semaforo_IA = dato informativo/auditoria.
- Semaforo_preIA = dato tecnico/reglas duras.
Prohibido mezclar semaforo con estado operativo.
```

Nota de gobernanza:

```text
docs/03_FASE_2C queda como legacy operativo/historico.
No usar 2C como autoridad de fase activa.
```

---

## 3. Ãndices y rutas de gobierno

### Ãndice de tareas ejecutables de la fase activa

```text
/docs/04_FASE_3/
```

### Plantilla de TASK_SPEC

```text
/docs/00_CANON/TASK_SPEC_TEMPLATE.md
```

### Roadmap vivo para futuro

```text
/docs/00_MASTER/00_ROADMAP_SPEC_DRIVEN_VIVO.md
```

Uso:

```text
Registrar TODO_FUTURO, SPEC_SUGGESTION, SKILL_SUGGESTION, hallazgos, dependencias y decisiones pendientes.
No autoriza construcciÃ³n.
No sustituye una TASK_SPEC.
```

### Documento de workflow entre herramientas IA

```text
/docs/00_MASTER/01_TOOLING_IA_WORKFLOW.md
```

Solo leer si la tarea toca:

```text
Antigravity
Gemini
MCP
skills
AGENTS.md
.gemini_instructions.md
flujo orquestador/subagente
configuraciÃ³n de editor IA
```

### Documento de fase 2A

```text
/docs/01_FASE_2A/01_FASE2A_SUPABASE_BACKEND_LAB.md
```

### Contrato de datos

```text
/docs/01_FASE_2A/05_CONTRATO_DATOS_IA_Y_MIGRACION.md
```

### Reglas no negociables NC

```text
/docs/01_FASE_2A/06_REGLAS_NO_NEGOCIABLES_NC.md
```

### PRD maestro

```text
/docs/00_MASTER/00_PRD_MAESTRO_CRM_NC_V2.md
```

Solo leer si la TASK_SPEC lo autoriza expresamente.

### Reglas IA / triaje

```text
/docs/00_MASTER/07_REGLAS_TRIAGE_IA_REFERENCIA_v2_PRD.md
```

Solo leer si la TASK_SPEC toca IA, n8n, triaje, `lead_triage` o mapeo `DIAGNOSTICO â†’ Supabase`.

### Quick Start por Fase

```text
/docs/04_FASE_3/QUICK_START_FASE3.md
```

**Regla:** Leer siempre antes de ejecutar una TASK de la fase activa. No sustituye la TASK_SPEC.

### Referencias legacy 2C (historico)

```text
/docs/03_FASE_2C/SOP_OPERATIVO_TAREAS_2C.md
```

Uso:

```text
Usar solo para contexto historico de cierre 2C, no como contrato activo de Fase 3_V0.
```

### Logs minimos de trazabilidad 2C (historico)

```text
/docs/03_FASE_2C/MCP_STATUS.md
/docs/03_FASE_2C/AGENT_RUNS_LOG.md
/docs/03_FASE_2C/TECH_DEBT_REGISTER.md
```

Uso:

```text
Consultar solo para trazabilidad historica.
```

### Roles y handoffs de subagentes 2C (historico)

```text
/docs/03_FASE_2C/AGENT_ROLES_AND_HANDOFFS_2C.md
```

Uso:

```text
Referencia historica. El marco activo de subagentes vive en TASK_SPEC activa y canon vigente.
```

### Canon documental referencial 2C (historico)

```text
/docs/03_FASE_2C/CANON_DOCUMENTAL_REFERENCIAL_2C.md
```

Uso:

```text
Referencia historica. La autoridad documental vigente de fase activa se resuelve en `docs/00_CANON/README.md`.
```

### Canon documental vigente (fase activa)

```text
/docs/00_CANON/README.md
```

Uso:

```text
Resolver autoridad documental actual y clasificar vivo vs legacy sin mover ni borrar documentos.
```

---

## 3.1 Regla: Quick Start por Fase

Antes de iniciar cualquier fase nueva (2B, 2C, 3...):

```text
1. Revisar documentaciÃ³n existente de la fase
2. Crear archivo QUICK_START_FASEX.md si no existe
3. Incluir: objetivo, lÃ­mites, orden de tareas, componentes clave, endpoints
4. Incluir protocolo de lectura mÃ­nima, cierre de tarea, actualizaciÃ³n de estado y siguiente paso
5. Referenciarlo en AGENTS.md

El Quick Start no sustituye las TASK_SPEC individuales.
```

---

## 4. Estructura real esperada del workspace

```text
crm_nc_tower_v2/
â”œâ”€â”€ AGENTS.md
â”œâ”€â”€ .agents/
â”‚   â””â”€â”€ rules/
â”‚       â””â”€â”€ 00_NC_CONTROL_TOWER_RULES.md
â”œâ”€â”€ .gemini_instructions.md
â”œâ”€â”€ docs/
â”œâ”€â”€ n8n_workflows/
â”œâ”€â”€ public/           <-- Frontend (siempre verificar)
â”œâ”€â”€ skills/
â”œâ”€â”€ _archivo_DO_NOT_READ/
â”œâ”€â”€ package.json
â”œâ”€â”€ server.js
â”œâ”€â”€ sheets.js
â””â”€â”€ README_INSTALACION_PACK.md
```

### Regla de verificaciÃ³n obligatoria

Antes de concluir que un componente "no existe":

```text
1. Explorar /public/ - verificar si existe frontend
2. Buscar index.html - entrada web
3. Glob *.html - buscar cualquier entrada web
4. Revisar docs futuros (02/03/04) para contexto
```

Durante cierre documental de Fase 2C (historico) podian crearse si faltaban:

```text
/supabase/
/supabase/migrations/
/supabase/seed/
/backend/
/docs/03_FASE_2C/
/docs/03_FASE_2C/specs/
/docs/03_FASE_2C/specs/reviews/
```

Estado transicional canonico para cierre 2C:

```text
2C_CIERRE_CONTROLADO
```

Interpretacion canonica:

```text
Pre-produccion condicionada.
No produccion abierta hasta cierre de condiciones del Gate 2C_TO_3.
```

---

## 5. Bloqueos globales

No leer ni modificar salvo TASK_SPEC explÃ­cita:

```text
/n8n_workflows/
/n8n_worklows/
/n8n_workwolws/
/skills/
/_archivo_DO_NOT_READ/
/docs/00_MASTER/
/server.js
/sheets.js
/package.json
```

Reglas especÃ­ficas:

```text
n8n productivo queda congelado en Fase 2B.
Google Sheets no es fuente final desde Fase 2B; en F3_V0 se permite solo como espejo operativo/QA temporal cuando la TASK_SPEC lo explicite.
server.js, sheets.js y package.json son legado/read-only salvo TASK_SPEC explÃ­cita.
_archivo_DO_NOT_READ no se lee nunca.
```

`.gemini_instructions.md` puede leerse solo para verificar alineaciÃ³n de tooling, no para cargar skills automÃ¡ticamente.

---

## 6. PolÃ­tica de uso de skills

Los archivos dentro de `/skills/` no se leen por defecto.

Los skills solo pueden usarse si la TASK_SPEC activa los incluye expresamente en READ_SET.

Skills disponibles conocidos:

```text
/skills/frontend-design/SKILL.md
/skills/using-superpowers/SKILL.md
/skills/using-superpowers/references/gemini-tools.md
```

Uso permitido:

```text
/skills/frontend-design/SKILL.md
```

Solo para tareas de dashboard, UI, UX, responsive, diseÃ±o visual o revisiÃ³n frontend.

```text
/skills/using-superpowers/SKILL.md
/skills/using-superpowers/references/gemini-tools.md
```

Solo para tareas especÃ­ficas de configuraciÃ³n de herramientas, MCP, Gemini/Antigravity o comportamiento del editor IA.

Regla:

```text
Los skills son apoyo tÃ©cnico.
No son fuente de verdad del proyecto.
No sustituyen AGENTS.md.
No sustituyen la TASK_SPEC.
No sustituyen el PRD.
No se cargan â€œpor si acasoâ€.
```

Si un agente cree que necesita un skill, debe proponerlo antes:

```text
SKILL_SUGGESTION:
Skill solicitado:
Tarea:
Motivo:
READ_SET adicional propuesto:
Riesgo de usarlo:
Riesgo de no usarlo:
RecomendaciÃ³n:
```

Solo Natalia puede aprobar que un skill entre en READ_SET.

---

## 7. Protocolo MCP / herramientas

Cuando uses MCP o cualquier herramienta de archivos:

```text
No hagas lectura amplia del repositorio.
No abras carpetas fuera de READ_SET.
No busques en todo el proyecto salvo TASK_SPEC de auditoria explicita.
No escribas fuera de WRITE_SET.
No edites archivos raÃ­z salvo autorizaciÃ³n expresa en TASK_SPEC.
No borres archivos.
No muevas carpetas.
No renombres carpetas.
No leas /skills salvo autorizaciÃ³n expresa.
No leas /_archivo_DO_NOT_READ.
```

### 7.1 Protocolo de contexto eficiente

Para ejecutar una TASK de la fase activa:

```text
1. Leer AGENTS.md.
2. Leer QUICK_START de la fase activa.
3. Leer TASK_SPEC activa.
4. Leer CORE_READ_SET completo.
5. Leer CONDITIONAL_READ_SET solo por necesidad real: fallo, ambigÃ¼edad, validaciÃ³n especÃ­fica o decisiÃ³n tÃ©cnica.
6. No leer el Ã­ndice de fase salvo para elegir siguiente tarea, verificar orden o actualizar progreso.
7. No leer documentos histÃ³ricos o de fases anteriores salvo autorizaciÃ³n expresa en CORE_READ_SET o CONDITIONAL_READ_SET.
```

Regla:

```text
El Quick Start reduce contexto repetido.
La TASK_SPEC manda la ejecuciÃ³n concreta.
CORE_READ_SET es obligatorio.
CONDITIONAL_READ_SET es bajo demanda.
```

Regla unica para indice de fase:

```text
Leer docs/04_FASE_3/ solo para elegir siguiente tarea, verificar orden o actualizar progreso.
```

Antes de modificar, informa:

```text
FILES_TO_READ
FILES_TO_CHANGE
SKILLS_REQUESTED
PLAN
RISKS
ROLLBACK
```

DespuÃ©s de modificar, informa:

```text
FILES_READ
FILES_CHANGED
SKILLS_USED
ACCEPTANCE_CHECK
NEXT_STEP
```

### 7.2 Protocolo de cierre de tarea

Al terminar una TASK:

```text
1. Crear o actualizar el REVIEW de la tarea si WRITE_SET lo permite.
2. Actualizar estado de la TASK_SPEC si WRITE_SET lo permite.
3. Actualizar Ã­ndice de fase si WRITE_SET lo permite.
4. Registrar evidencia real para cada criterio de aceptaciÃ³n.
5. Declarar FILES_READ.
6. Declarar FILES_CHANGED.
7. Declarar SKILLS_USED.
8. Declarar ACCEPTANCE_CHECK.
9. Proponer NEXT_STEP.
10. No ejecutar NEXT_STEP sin aprobaciÃ³n de Natalia.
```

---

## 8. EvoluciÃ³n documental

```text
Solo la fase activa tiene TASK_SPEC ejecutables.
Las fases futuras no se desarrollan ni se detallan en exceso hasta cerrar la fase anterior.
```

Si aparece algo de fases futuras:

```text
Registrar como TODO_FUTURO en:
/docs/00_MASTER/00_ROADMAP_SPEC_DRIVEN_VIVO.md
```

No crear specs futuras completas salvo orden expresa de Natalia.

---

## 9. Regla de creaciÃ³n de nuevas TASK_SPEC

Una nueva TASK_SPEC debe proponerse cuando ocurra cualquiera de estos casos:

```text
1. La tarea requiere modificar archivos fuera del WRITE_SET actual.
2. La tarea afecta a otra capa tÃ©cnica: Supabase, backend, dashboard, n8n, seguridad o datos.
3. La tarea introduce una decisiÃ³n nueva de arquitectura.
4. La tarea implica riesgo de romper Fase 1, Sheets, n8n o datos reales.
5. La tarea requiere nuevas variables de entorno, secretos o permisos.
6. La tarea pertenece a una fase futura.
7. La tarea actual empieza a ser demasiado grande o ambigua.
8. La tarea requiere cambiar AGENTS.md, rutas globales, gates, skills o bloqueos.
```

Regla operativa:

```text
Los subagentes NO crean nuevas TASK_SPEC.
Los subagentes solo proponen crear una TASK_SPEC.
El ORQUESTADOR puede crear una TASK_SPEC.
Natalia debe aprobarla antes de ejecutarla.
```

Formato obligatorio:

```text
SPEC_SUGGESTION:
Nombre sugerido:
Fase:
Motivo:
READ_SET propuesto:
WRITE_SET propuesto:
DO_NOT_TOUCH propuesto:
Skills propuestos, si aplica:
Riesgo si se ejecuta dentro de la spec actual:
RecomendaciÃ³n:
```

---

## 10. CuÃ¡ndo actualizar AGENTS.md

AGENTS.md solo se actualiza si cambia:

```text
fase activa
estructura real de carpetas
rutas autorizadas
bloqueos globales
reglas de seguridad
modo de trabajo
polÃ­tica de skills
polÃ­tica de creaciÃ³n de TASK_SPEC
gates de cambio de fase
```

No se actualiza por cada tarea pequeÃ±a.

Solo el ORQUESTADOR puede proponer cambios en AGENTS.md.  
Los subagentes no deben modificar AGENTS.md.

---

## 11. Gate de cambio de fase

### 11.1 Regla General

Antes de pasar de cualquier fase X a la siguiente (X+1), el ORQUESTADOR debe:

1. **Proponer TASK_GATE_{X}_TO_{X+1}** con:
   - Pruebas ejecutadas con KPIs verificados
   - Riesgos confirmados
   - RecomendaciÃ³n: APROBAR / RECHAZAR / CORREGIONES

2. **Validar que cada Criterio de AceptaciÃ³n tiene validaciÃ³n real**
   - No es suficiente tener cÃ³digo escrito
   - Cada CA debe demostrar funcionalidad
   - Las pruebas deben ejecutarse, no solo describirse

El Gate NO se aprueba hasta que todas las pruebas con KPI estÃ©n PASANDO.

### 11.2 Transiciones Definidas

| TransiciÃ³n | Gate Requerido | Restricciones hasta aprobar |
|---|---|---|
| 1 â†’ 2A | TASK_GATE_1_TO_2A | Legacy intacto |
| 2A â†’ 2B | TASK_GATE_2A_TO_2B | No specs 2B, no n8n, no Sheets |
| 2B â†’ 2C | TASK_GATE_2B_TO_2C | No specs 2C, no operaciÃ³n completa |
| 2C â†’ 3 | TASK_GATE_2C_TO_3 | No specs 3, no producciÃ³n |

### 11.3 Estructura de TASK_GATE

Todo Gate debe incluir:

```markdown
# TASK_GATE_X_TO_Y.md

## 1. Pruebas Ejecutadas

| # | Prueba | KPI | Resultado |
|---|---|---|---|
| 1 | Health endpoint | Status 200 | PASS/FAIL |
| 2 | Datos visibles | JSON con N registros | PASS/FAIL |
| ... | ... | ... | ... |

## 2. KPIs de Ã‰xito

- Por cada Criterio de AceptaciÃ³n (CA-XX): prueba ejecutada y pasada
- Sin secretos expuestos
- Sin errores crÃ­ticos

## 3. Riesgos Identificados

| Riesgo | Severidad | MitigaciÃ³n |
|---|---|---|
| ... | ... | ... |

## 4. RecomendaciÃ³n

```
APROBAR / RECHAZAR / CORREGIONES
```

## 5. Siguiente Fase (si se aprueba)

- Specs ejecutables de la siguiente fase
- ConfiguraciÃ³n de entorno
- Reglas adicionales especÃ­ficas
```

### 11.4 Restricciones Pre-Gate

Hasta que el Gate estÃ© APROBADO:

- No se crean specs ejecutables de la siguiente fase
- No se toca n8n (salvo especificaciÃ³n expresa)
- No se toca Google Sheets (salvo especificaciÃ³n expresa)
- No se activa automatizaciÃ³n sensible

---

## 12. Autoridad de reglas

Si hay conflicto:

```text
1. AGENTS.md
2. TASK_SPEC activa
3. Documento de fase activa
4. Contrato de datos
5. Reglas no negociables
6. PRD maestro solo si fue autorizado
7. Skills solo si fueron autorizados en TASK_SPEC
```

`.agents/rules/` y `.gemini_instructions.md` son recordatorios operativos. No superan a AGENTS.md.

---

## 13. Definition of Done global

Una tarea o fase solo se considera terminada cuando:

```text
cumple criterios de aceptaciÃ³n
no rompe la fase anterior
tiene rollback
no abre automatizaciones sensibles
no mezcla semÃ¡foro y estado
no pierde leads
registra errores
mantiene trazabilidad
no expone secretos
respeta READ_SET / WRITE_SET / DO_NOT_TOUCH
declara si usÃ³ o no skills
```

---

## 14. Frase de gobierno

```text
No migramos por ilusiÃ³n tÃ©cnica.
Migramos cuando el sistema demuestre control.
```

---

## 15. PROJECT_STATE como entrada obligatoria

**Antes de ejecutar CUALQUIER tarea, el subagente DEBE:**

1. Leer `PROJECT_STATE.md` - Estado global del sistema
2. Verificar fase activa vs sistema
3. Revisar Ã­ndice de tareas solo para elegir siguiente tarea, verificar orden o actualizar progreso
4. Leer QUICK_START de fase activa

---

## 16. Regla: Sin TASK_SPEC NO hay ejecuciÃ³n

```text
1. Si la tarea no tiene TASK_SPEC:
   â†’ PARAR
   â†’ Proponer SPEC_SUGGESTION
   â†’ Esperar aprobaciÃ³n de Natalia

2. Si durante la tarea se necesita algo fuera de SPEC:
   â†’ PARAR
   â†’ Solicitar expansiÃ³n de WRITE_SET
   â†’ Nunca ejecutar fuera de WRITE_SET

3. Si algo "hace falta" pero no estÃ¡ en spec:
   â†’ Documentar como TODO_FUTURO
   â†’ NO ejecutar
   â†’ Proponer en siguiente reuniÃ³n de Planning
```

---

## 17. Checklist de cierre de tarea

Al completar una tarea, ANTES de marcar COMPLETADA:

```text
1. [ ] Tests de validaciÃ³n ejecutados y pasando
2. [ ] Resultados registrados en TASK_SPEC
3. [ ] Ãndice de fase actualizado
4. [ ] PROJECT_STATE.md actualizado (si cambia)
5. [ ] Si cambio de recursos â†’ actualizar REGISTRO
6. [ ] Declarar FILES_READ / FILES_CHANGED
7. [ ] Declarar SKILLS_USED
8. [ ] Declarar ACCEPTANCE_CHECK
9. [ ] Proponer NEXT_STEP (no ejecutar)
```

---

## 18. Memoria operativa y orquestacion de subagentes

Frase rectora:

```text
La memoria del proyecto no vive en la cabeza del agente.
Vive en el repo.
El agente solo la carga, la respeta y deja evidencia.
```

Reglas obligatorias:

```text
1. Los subagentes deben declararse explicitamente.
2. Si actua Agent Supervisor, debe definir al menos:
   - Explorer Agent
   - Contract Mapper/Spec Writer
   - Implementer Agent
   - QA Agent
   - Security Reviewer
   - Documentation Agent
3. Cada subagente debe declarar: permisos, limites, handoff, output, criterio de cierre y evidencia esperada.
4. Regla anti-baile manual: si una accion es segura dentro del alcance autorizado, el agente la ejecuta y devuelve evidencia.
5. Solo escalar a Natalia ante bloqueo real: falta de acceso/credenciales, ausencia de entorno seguro, cambio en produccion, riesgo de secretos, cambio estructural de Supabase o decision humana obligatoria.
6. Fuente oficial de memoria tecnica: AGENTS.md, skills aprobadas, TASK_SPEC, QA/Review logs y docs de fase activa.
7. Ninguna tarea se cierra con "parece que funciona": cerrar solo con PASS/FAIL/PENDIENTE + evidencia + riesgos pendientes + siguiente paso real.
```

---

## 19. REGLA DE EFICIENCIA Y GESTIÃ“N DE RECURSOS NC

NC no optimiza para â€œlo mÃ¡s sofisticadoâ€ . NC optimiza para:
- mÃ­nimo coste
- mÃ­nimo riesgo
- mÃ¡xima claridad
- mÃ¡ximo reaprovechamiento
- mÃ­nima dependencia externa
- mantenimiento sencillo
- avance real hacia producciÃ³n

**Regla principal:**
Si existen dos soluciones vÃ¡lidas, elegir la mÃ¡s simple, barata, reversible y mantenible que consiga el resultado real.

**Los agentes NO deben proponer:**
- herramientas nuevas si las actuales sirven;
- servicios cloud adicionales sin necesidad;
- automatizaciones complejas antes de estabilizar V0;
- arquitectura enterprise prematura;
- CI/CD pesado sin necesidad real;
- refactors grandes sin retorno claro;
- â€œmodernizaciÃ³nâ€  sin impacto operativo.

Toda propuesta tÃ©cnica relevante debe indicar:
- coste estimado;
- esfuerzo;
- impacto operativo;
- riesgo;
- prioridad real;
- si es imprescindible ahora o puede esperar.

**Principio NC:**
> â€œNo construir para impresionar. Construir para operar.â€ 


