# **DECISIÓN DOCUMENTAL**

| Documento | Decisión |
| ----- | ----- |
| `02_BASE_CONOCIMIENTO_MCP_SPEC_DRIVEN_NC` | **Se queda intacto.** Es la base MCP. |
| `03_BASE_CONOCIMIENTO_ORQUESTACION_AGENTES_IA_NC` | **Fusionar ambos ORQUESTACION en un resumen ejecutivo-operativo único.** |
| `04_BASE_CONOCIMIENTO_GOBERNANZA_AGENTICA_AGENTMD_SKILLS_CICD_NC` | **Convertir en manual final de gobernanza.** No como propuesta, sino como norma operativa del proyecto. |

# **`04_MANUAL_GOBERNANZA_AGENTICA_AGENTMD_SKILLS_CICD_NC.md`**

## **Manual final de gobernanza agéntica para NC Control Tower**

**Proyecto:** NC Control Tower  
**Función:** establecer reglas obligatorias para agentes, subagentes, skills, memoria, Git Worktrees, CI/CD, seguridad y producción.  
**Estado:** Manual operativo normativo.  
**Relación documental:** complementa el documento 02 MCP y el documento 03 Orquestación. No los sustituye.

---

## **1\. Propósito**

Este manual define **cómo deben comportarse los agentes IA dentro del proyecto NC Control Tower**.

Su función no es explicar qué es la IA.  
Su función es imponer orden.

Este documento sirve para:

* evitar agentes caóticos;  
* proteger producción;  
* evitar exposición de secretos;  
* separar test de real;  
* definir permisos;  
* estandarizar AGENTS.md;  
* crear skills reutilizables;  
* usar Git Worktrees;  
* blindar Pull Requests;  
* documentar decisiones;  
* cerrar tareas con evidencia.

---

## **2\. Triángulo documental NC**

| Documento | Función |
| ----- | ----- |
| `02_BASE_CONOCIMIENTO_MCP_SPEC_DRIVEN_NC` | Cómo conectar agentes con herramientas reales mediante MCP |
| `03_RESUMEN_EJECUTABLE_ORQUESTACION_AGENTES_IA_NC` | Cómo diseñar agentes, subagentes, handoffs y patrones de trabajo |
| `04_MANUAL_GOBERNANZA_AGENTICA_AGENTMD_SKILLS_CICD_NC` | Cómo gobernar reglas, permisos, memoria, skills, ramas, PRs y producción |

Regla:

02 conecta.  
03 organiza.  
04 gobierna.

---

## **3\. Paradigma NC**

El código es artefacto.

La spec es contrato.

AGENTS.md es constitución.

Skills son procedimientos cargables.

MCP es conectividad.

Worktrees son aislamiento.

CI/CD es frontera de seguridad.

Natalia decide.

---

## **4\. AGENTS.md como constitución del repo**

Todo proyecto NC Control Tower debe tener un archivo:

AGENTS.md

Ubicación:

raíz del repositorio

Función:

* explicar al agente qué es el proyecto;  
* definir stack permitido;  
* indicar comandos;  
* marcar archivos relevantes;  
* establecer prohibiciones;  
* definir pruebas;  
* definir Definition of Done;  
* proteger producción;  
* obligar a devolver evidencias.

---

## **5\. Plantilla AGENTS.md para NC Control Tower**

\# AGENTS.md — NC Control Tower

\#\# 1\. Proyecto

NC Control Tower es una app interna de NEGOCIA CONTROL para gestionar leads, clasificación IA, Supabase, backend, n8n y dashboard operativo.

\#\# 2\. Principio rector

Natalia decide.

La IA clasifica.

Supabase guarda.

Backend valida.

n8n automatiza.

Dashboard permite operar.

\#\# 3\. Orden obligatorio antes de actuar

1\. Leer este AGENTS.md.

2\. Leer QUICK\_START de la fase activa.

3\. Leer TASK\_SPEC activa.

4\. Identificar entorno: local / test / staging / producción.

5\. Confirmar alcance.

6\. Ejecutar solo lo permitido.

7\. Devolver evidencias.

\#\# 4\. Stack permitido

\- Backend: Node / Express o stack vigente del repo.

\- Base de datos: Supabase.

\- Automatización: n8n.

\- Dashboard: stack definido en PRD.

\- Documentación: Markdown.

\- Control de versiones: Git.

\- Agente técnico: OpenCode / Codex / herramienta autorizada.

\#\# 5\. Archivos que revisar primero

\- docs/00\_MASTER/

\- docs/01\_ACTIVO\_FASE\_3/

\- TASK\_SPEC activa

\- MCP\_STATUS.md

\- QA\_LOG.md

\- AGENT\_RUNS\_LOG.md

\- README.md

\- package.json

\- configuración backend

\- migraciones Supabase

\- workflows exportados de n8n, si existen

\#\# 6\. Prohibiciones

\- No exponer secrets.

\- No tocar producción sin aprobación humana.

\- No modificar Supabase real sin rollback.

\- No activar workflows n8n reales sin QA.

\- No enviar mensajes a clientes reales sin revisión humana.

\- No inventar endpoints.

\- No mezclar semáforo IA con estado operativo.

\- No ampliar alcance sin declararlo.

\- No borrar datos.

\- No modificar credenciales.

\- No cambiar policies críticas sin TASK\_SPEC específica.

\#\# 7\. Semáforo y estado operativo

No mezclar:

\- Semáforo IA: VERDE / AMARILLO / ROJO.

\- Estado operativo: NUEVO / PENDIENTE\_REVISION / APTO\_DIAGNOSTICO / CLIENTE\_ACTIVO / ERROR\_IA, etc.

El semáforo mide riesgo/encaje.

El estado mide posición en proceso.

\#\# 8\. Pruebas mínimas

Antes de cerrar una tarea, ejecutar las pruebas definidas en la TASK\_SPEC.

Si una prueba no puede ejecutarse:

\- marcar PENDIENTE;

\- explicar causa;

\- decir si bloquea o no bloquea;

\- proponer siguiente paso.

\#\# 9\. Definition of Done

Una tarea solo se considera cerrada si hay:

\- cambios descritos;

\- archivos tocados;

\- pruebas ejecutadas;

\- resultado PASS / FAIL / PENDIENTE;

\- riesgos pendientes;

\- rollback;

\- evidencia;

\- siguiente paso real.

\#\# 10\. Formato de entrega obligatorio

\#\# Resumen

\#\# Cambios realizados

\#\# Archivos tocados

\#\# Pruebas ejecutadas

\#\# Resultado

\#\# Evidencias

\#\# Riesgos

\#\# Rollback

\#\# Siguiente paso real

---

## **6\. Sistema de skills NC**

Las skills son procedimientos reutilizables que el agente carga solo cuando los necesita.

Estructura recomendada:

.skills/

  backend-debugging/

    SKILL.md

  supabase-safe-migration/

    SKILL.md

  n8n-workflow-review/

    SKILL.md

  mcp-connection-diagnosis/

    SKILL.md

  fiscal-content-review/

    SKILL.md

  landing-copy-loss-angle/

    SKILL.md

  release-pr-review/

    SKILL.md

Regla:

No cargar todo el conocimiento siempre.  
Cargar la skill correcta cuando la tarea lo exige.

---

## **7\. Plantilla SKILL.md**

\# SKILL.md — \[nombre-skill\]

\#\# Cuándo usar esta skill

\[Describir cuándo aplica\]

\#\# Objetivo

\[Resultado que debe conseguir\]

\#\# Inputs necesarios

\- \[input 1\]

\- \[input 2\]

\#\# Pasos

1\. \[paso\]

2\. \[paso\]

3\. \[paso\]

\#\# Tools permitidas

\- \[tool\]

\#\# Tools prohibidas

\- \[tool\]

\#\# Riesgos

\- \[riesgo\]

\#\# Guardrails

\- \[regla\]

\#\# Output obligatorio

\#\# Diagnóstico

\#\# Evidencia

\#\# Acción recomendada

\#\# Qué NO tocar

\#\# Criterio de cierre

---

## **8\. Skill inicial: diagnóstico MCP**

\# SKILL.md — mcp-connection-diagnosis

\#\# Cuándo usar esta skill

Usar cuando haya errores de conexión MCP, OpenCode, n8n, servidor remoto, tokens, transportes o tools no visibles.

\#\# Objetivo

Diagnosticar la causa sin tocar producción.

\#\# Pasos

1\. Identificar cliente MCP.

2\. Identificar servidor MCP.

3\. Confirmar transporte.

4\. Confirmar endpoint real.

5\. Confirmar autenticación.

6\. Listar tools.

7\. Ejecutar solo tool read-only.

8\. Documentar resultado.

\#\# Prohibido

\- No usar URL de workflow como MCP.

\- No usar webhook test como MCP.

\- No exponer tokens.

\- No probar 10 cambios a la vez.

\- No tocar workflows activos.

\- No escribir en Supabase.

\#\# Output obligatorio

\#\# Diagnóstico MCP

| Elemento | Estado | Evidencia | Riesgo | Acción recomendada |

|---|---|---|---|---|

\#\# Causa más probable

\#\# Prueba mínima siguiente

\#\# Qué NO tocar todavía

\#\# Criterio de cierre

---

## **9\. Memoria operativa**

NC debe usar cuatro tipos de memoria.

| Tipo | Herramienta | Uso |
| ----- | ----- | ----- |
| Memoria documental | Markdown / NotebookLM | Specs, SOPs, decisiones, aprendizaje |
| Memoria operativa | Supabase | Leads, estados, agent\_runs, auditoría |
| Memoria de agente | AGENTS.md / skills | Reglas y procedimientos |
| Memoria experimental | Engram u otra | Solo evaluar más adelante |

Regla:

Primero Markdown.  
Después Supabase.  
Solo más adelante memoria persistente experimental.

Engram no será columna vertebral de NC todavía.

---

## **10\. Git Worktrees**

Git Worktrees permiten trabajar en ramas/carpeta separadas sin pisar el trabajo principal.

Uso recomendado:

\# Crear worktree

git worktree add ../nc-fix-healthcheck fix/backend-healthcheck

\# Ver worktrees

git worktree list

\# Eliminar worktree al cerrar

git worktree remove ../nc-fix-healthcheck

Regla NC:

Un agente \= una tarea \= una rama \= un worktree.

No hace falta para cambios pequeños.  
Sí conviene para:

* cambios paralelos;  
* backend delicado;  
* Supabase;  
* n8n;  
* PRs relevantes;  
* refactors;  
* migraciones;  
* seguridad.

---

## **11\. Model switching**

No todos los modelos sirven para todo.

| Fase | Modelo recomendado | Motivo |
| ----- | ----- | ----- |
| Entender | razonador medio/alto | Reducir error |
| Planificar | razonador alto | Arquitectura |
| Ejecutar | coding rápido/medio | Coste y velocidad |
| QA | razonador medio/alto | Detectar fallos |
| Seguridad | razonador alto \+ tools | Riesgo |

Regla:

No usar modelo caro para tareas mecánicas.  
No usar modelo barato para decisiones críticas.

---

## **12\. SDD en NC**

NC trabaja con Spec-Driven Development.

| Nivel | Qué significa | Estado NC |
| ----- | ----- | ----- |
| Spec-First | Primero spec, luego código | Aplicable ya |
| Spec-Anchor | Spec y código evolucionan juntos | Objetivo actual |
| Spec-as-Source | El código deriva de la spec | Futuro |
| Do Not Edit | Archivos generados no se editan manualmente | Futuro controlado |

Regla práctica:

Ahora NC debe trabajar en Spec-First \+ Spec-Anchor.  
No saltar todavía a Spec-as-Source total.

---

## **13\. Reglas por entorno**

| Entorno | Qué se puede hacer | Qué está prohibido |
| ----- | ----- | ----- |
| Local | explorar, implementar, testear | usar datos reales innecesarios |
| Test | validar flujos | afectar clientes reales |
| Staging | QA casi real | saltarse rollback |
| Producción | solo con aprobación | improvisar |

---

## **14\. Pipeline PR blindado**

Flujo obligatorio para cambios relevantes:

Branch / Worktree

↓

Implementación agente

↓

Tests locales

↓

Pull Request

↓

CI

↓

CodeQL

↓

Secret Scanning / Push Protection

↓

AI Security Review opcional

↓

Human approval

↓

Merge

↓

Release Please

↓

Deploy

Regla:

La IA puede escribir código.  
La IA puede revisar código.  
Pero producción no se aprueba sola.

---

## **15\. Seguridad mínima obligatoria**

Antes de merge:

\- \[ \] No hay secrets hardcoded.

\- \[ \] No hay tokens en logs.

\- \[ \] No hay \`.env\` subido.

\- \[ \] No se exponen service role keys.

\- \[ \] No se ha mezclado test/producción.

\- \[ \] No hay endpoint nuevo sin validación.

\- \[ \] No hay tool MCP demasiado amplia.

\- \[ \] No hay workflow n8n activo modificado sin QA.

\- \[ \] Existe rollback.

\- \[ \] Existe evidencia.

---

## **16\. Pull Request obligatorio**

Todo PR debe incluir:

\#\# Objetivo

\#\# Cambios realizados

\#\# Archivos tocados

\#\# Riesgo

Bajo / Medio / Alto / Crítico

\#\# Entorno afectado

local / test / staging / producción

\#\# Pruebas ejecutadas

\#\# Resultado

PASS / FAIL / PENDIENTE

\#\# Seguridad

\- \[ \] Sin secrets

\- \[ \] Sin producción no autorizada

\- \[ \] Sin datos personales innecesarios

\#\# Rollback

\#\# Evidencias

\#\# Siguiente paso

---

## **17\. Release Please y versionado**

Cuando el proyecto madure, NC puede usar Release Please para:

* generar changelog;  
* crear release notes;  
* ordenar versiones;  
* explicar cambios técnicos en lenguaje legible;  
* mantener trazabilidad.

No es prioridad si el MVP aún está en laboratorio.  
Sí será útil cuando haya producción real.

---

## **18\. Matriz de permisos de agentes**

| Agente | Permiso máximo por defecto |
| ----- | ----- |
| Supervisor | Nivel 2 |
| Explorer | Nivel 1 |
| Diagnostician | Nivel 2 |
| Spec Writer | Nivel 2 |
| Implementer | Nivel 3 |
| QA Agent | Nivel 3 |
| Security Reviewer | Nivel 2 |
| Documentation Agent | Nivel 2 |
| n8n Agent producción | Nivel 1 por defecto |
| MCP Tool escritura | Bloqueada por defecto |

---

## **19\. Checklist antes de ejecutar agente**

\- \[ \] ¿Hay objetivo claro?

\- \[ \] ¿Hay entorno identificado?

\- \[ \] ¿Hay TASK\_SPEC?

\- \[ \] ¿Se sabe qué NO tocar?

\- \[ \] ¿Se han definido tools permitidas?

\- \[ \] ¿Hay límite de permiso?

\- \[ \] ¿Hay criterio de cierre?

\- \[ \] ¿Hay rollback si toca algo?

\- \[ \] ¿Hay formato de evidencia?

\- \[ \] ¿Hace falta revisión humana?

---

## **20\. Checklist antes de producción**

\- \[ \] PR revisado.

\- \[ \] Tests PASS.

\- \[ \] CodeQL sin bloqueo.

\- \[ \] Secret scanning sin bloqueo.

\- \[ \] No hay claves expuestas.

\- \[ \] Supabase protegido.

\- \[ \] n8n probado.

\- \[ \] Backend responde.

\- \[ \] Dashboard validado.

\- \[ \] Rollback claro.

\- \[ \] Natalia aprueba.

---

## **21\. Antipatrones prohibidos**

| Antipatrón | Por qué es peligroso |
| ----- | ----- |
| God Agent | Mezcla todo y rompe control |
| Tool `manage_everything` | Permiso demasiado amplio |
| Cambiar producción “solo un momento” | Riesgo real |
| No guardar evidencia | No hay trazabilidad |
| Automatizar criterio fiscal | Riesgo legal |
| Copiar tokens al chat | Riesgo de seguridad |
| Confundir webhook con MCP | Diagnóstico falso |
| Crear skills que nadie usa | Documentación basura |
| Hacer PR sin rollback | Mala ingeniería |
| Cerrar con “parece que funciona” | No es criterio técnico |

---

## **22\. Prompt maestro de gobernanza para OpenCode**

Actúa como operador técnico senior del proyecto NC Control Tower.

Antes de actuar, aplica este manual de gobernanza.

Objetivo:

\[PEGAR OBJETIVO\]

Entorno:

\[local / test / staging / producción\]

Reglas obligatorias:

1\. Lee AGENTS.md.

2\. Lee TASK\_SPEC activa.

3\. No toques producción sin aprobación.

4\. No expongas secretos.

5\. No inventes endpoints.

6\. No mezcles test y producción.

7\. Si falta información crítica, marca PENDIENTE.

8\. Primero exploración read-only.

9\. Después diagnóstico.

10\. Solo implementa si el alcance está claro.

11\. Ejecuta pruebas.

12\. Devuelve evidencias.

13\. Propón rollback.

14\. Cierra con siguiente paso real.

Formato de salida:

\#\# Resumen

\#\# Entorno detectado

\#\# Archivos revisados

\#\# Cambios propuestos / realizados

\#\# Pruebas

\#\# Resultado

\#\# Riesgos

\#\# Rollback

\#\# Evidencias

\#\# Siguiente paso real

---

## **23\. Definition of Done global**

Una tarea NC está cerrada solo si existe:

\- \[ \] Objetivo cumplido.

\- \[ \] Alcance respetado.

\- \[ \] Archivos tocados listados.

\- \[ \] Pruebas ejecutadas.

\- \[ \] Resultado documentado.

\- \[ \] Errores pendientes declarados.

\- \[ \] Riesgos visibles.

\- \[ \] Rollback definido.

\- \[ \] Evidencia guardada.

\- \[ \] Siguiente paso real indicado.

Si no hay evidencia, no hay cierre.

---

## **24\. Conclusión operativa**

Este manual convierte NC Control Tower de:

“Estoy usando IA”

a:

“Estoy gobernando una arquitectura de desarrollo asistido por agentes”

La diferencia es enorme.

Usar IA es pedir.  
Gobernar IA es definir:

* reglas;  
* límites;  
* permisos;  
* contexto;  
* herramientas;  
* evidencias;  
* seguridad;  
* decisión humana.

Regla final:

En NC, los agentes ejecutan.  
La arquitectura gobierna.  
Natalia decide.

