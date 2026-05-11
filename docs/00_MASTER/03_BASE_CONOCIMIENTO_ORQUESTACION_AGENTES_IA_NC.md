# **DECISIÓN DOCUMENTAL**

| Documento | Decisión |
| ----- | ----- |
| `02_BASE_CONOCIMIENTO_MCP_SPEC_DRIVEN_NC` | **Se queda intacto.** Es la base MCP. |
| `03_BASE_CONOCIMIENTO_ORQUESTACION_AGENTES_IA_NC` | **Fusionar ambos ORQUESTACION en un resumen ejecutivo-operativo único.** |
| `04_BASE_CONOCIMIENTO_GOBERNANZA_AGENTICA_AGENTMD_SKILLS_CICD_NC` | **Convertir en manual final de gobernanza.** No como propuesta, sino como norma operativa del proyecto. |

# **`03_RESUMEN_EJECUTABLE_ORQUESTACION_AGENTES_IA_NC.md`**

## **Orquestación operativa de agentes IA para NC Control Tower**

**Proyecto:** NC Control Tower  
**Uso:** aprendizaje, ejecución técnica, OpenCode, n8n, NotebookLM, documentación interna  
**Función:** convertir agentes, subagentes, tools y automatizaciones en un sistema útil, seguro y trazable.

---

## **1\. Principio central**

NC no necesita “muchos agentes”.  
NC necesita **pocos agentes, bien definidos, con límites claros, permisos controlados y evidencia de lo que hacen**.

Regla NC:

La IA no sustituye criterio. La IA amplifica criterio.  
Si no hay criterio, amplifica caos.

---

## **2\. Qué es un agente IA**

Un agente IA es un sistema que puede:

* recibir una tarea;  
* interpretar contexto;  
* decidir qué paso ejecutar;  
* usar herramientas;  
* delegar en subagentes;  
* devolver resultado;  
* dejar evidencia;  
* detenerse cuando alcanza un límite.

No es simplemente “preguntar a ChatGPT”.  
Eso es asistencia.  
Un agente implica **acción controlada**.

---

## **3\. Qué NO es un agente**

| Caso | Es agente | Motivo |
| ----- | ----- | ----- |
| “Redáctame un email” | No | Es generación asistida |
| “Busca el lead L-0024 y resume su estado” | Sí básico | Usa herramienta y contexto |
| “Diagnostica backend, repo, logs y endpoints sin tocar producción” | Sí multiagente | Requiere roles, límites y evidencias |

---

## **4\. Diferencia entre agente, subagente, tool, workflow y automatización**

| Elemento | Qué es | Ejemplo NC | Riesgo |
| ----- | ----- | ----- | ----- |
| Agente | Sistema que decide y actúa | OpenCode investigando backend | Que actúe sin límites |
| Subagente | Especialista delegado | Explorer, QA, Security Reviewer | Duplicidad o exceso |
| Tool | Herramienta concreta | `get_lead_by_id` | Permisos excesivos |
| Workflow | Secuencia automatizada | Tally → IA → Supabase | Caja negra |
| Automatización | Ejecución repetible | Aviso si lead ROJO | Automatizar mala decisión |

Regla:

Primero diseña proceso.  
Luego define agentes.  
Después conecta tools.  
Al final automatiza.

---

## **5\. Antipatrón prohibido: God Agent**

Un **God Agent** es un agente que:

* lee todo;  
* decide todo;  
* ejecuta todo;  
* toca datos;  
* modifica código;  
* cambia workflows;  
* hace QA de sí mismo;  
* reporta sin evidencia.

En NC está prohibido.

Modelo correcto:

Agent Supervisor

↓

Explorer

↓

Diagnostician

↓

Spec Writer

↓

Implementer

↓

QA Agent

↓

Security Reviewer

↓

Documentation Agent

↓

Natalia decide

---

## **6\. Roles estándar de agentes NC**

### **6.1 Agent Supervisor**

Coordina. No lo hace todo.

Debe decidir:

* qué subagente interviene;  
* con qué objetivo;  
* con qué tools;  
* con qué permiso;  
* cuándo parar;  
* cuándo escalar a Natalia.

No puede:

* tocar producción directamente;  
* inventar datos;  
* saltarse TASK\_SPEC;  
* ocultar errores.

---

### **6.2 Explorer Agent**

Investiga sin modificar.

Puede:

* leer archivos;  
* buscar rutas;  
* localizar endpoints;  
* revisar estructura;  
* leer logs no sensibles;  
* devolver evidencias.

No puede:

* editar;  
* ejecutar migraciones;  
* cambiar configuración;  
* tocar producción.

Uso típico:

Explora el repo y dime dónde está definido el endpoint /health. Solo lectura.

---

### **6.3 Diagnostician Agent**

Convierte errores en hipótesis verificables.

Formato obligatorio:

\#\# Error observado

\#\# Causa más probable

\#\# Causas alternativas

\#\# Prueba mínima siguiente

\#\# Qué NO tocar todavía

\#\# Criterio de cierre

Regla:

Una hipótesis, una prueba.  
Nada de probar 10 cosas a la vez como pollo sin cabeza tecnológico.

---

### **6.4 Spec Writer Agent**

Convierte una necesidad en una TASK\_SPEC ejecutable.

Debe incluir:

* objetivo;  
* contexto;  
* alcance;  
* fuera de alcance;  
* archivos probables;  
* riesgos;  
* permisos;  
* criterios de aceptación;  
* pruebas;  
* rollback;  
* Definition of Done;  
* prompt para OpenCode.

No ejecuta cambios.

---

### **6.5 Implementer Agent**

Ejecuta cambios concretos y limitados.

Solo puede actuar si existe:

* TASK\_SPEC;  
* entorno identificado;  
* archivos permitidos;  
* rollback;  
* pruebas;  
* criterio de cierre.

No puede improvisar arquitectura.

---

### **6.6 QA Agent**

Valida.

Debe comprobar:

* tests;  
* endpoints;  
* outputs JSON;  
* errores;  
* logs;  
* regressions;  
* cumplimiento de criterios.

No aprueba por intuición.

---

### **6.7 Security Reviewer Agent**

Revisa seguridad.

Debe detectar:

* secrets expuestos;  
* permisos excesivos;  
* endpoints inseguros;  
* mezcla test/producción;  
* acceso indebido a Supabase;  
* workflows n8n peligrosos;  
* acciones sin rollback.

---

### **6.8 Documentation Agent**

Convierte lo aprendido en activo reutilizable.

Produce:

* resumen de cambios;  
* checklist;  
* SOP;  
* actualización de logs;  
* lección aprendida;  
* siguiente paso real.

---

## **7\. Patrones de orquestación**

### **Patrón 1 — Single Agent \+ Tools**

Para tareas simples.

Ejemplo:

Consultar lead concreto y resumir estado.

---

### **Patrón 2 — Supervisor \+ Specialists**

Para tareas técnicas complejas.

Ejemplo:

Diagnosticar por qué backend no responde.

---

### **Patrón 3 — Pipeline secuencial**

Para procesos con orden fijo.

Ejemplo:

Intake → clasificación → riesgo → redacción → revisión humana → Supabase.

---

### **Patrón 4 — Revisión paralela**

Para decisiones delicadas.

Ejemplo:

Implementer propone solución.

Security Reviewer revisa.

QA valida.

Natalia decide.

---

### **Patrón 5 — Human-in-the-loop**

Obligatorio cuando hay:

* fiscalidad;  
* residencia;  
* datos personales;  
* producción;  
* Supabase real;  
* mensajes a clientes;  
* workflows activos.

---

### **Patrón 6 — Event-driven automation**

Para procesos automáticos disparados por eventos.

Ejemplo:

Nuevo lead en Tally → n8n clasifica → Supabase guarda → Natalia recibe aviso.

---

## **8\. Niveles de permiso**

| Nivel | Nombre | Puede hacer | Prohibido |
| ----- | ----- | ----- | ----- |
| 0 | Conversación | Analizar | Usar tools |
| 1 | Lectura | Leer docs, repo, logs no sensibles | Modificar |
| 2 | Propuesta | Crear specs, planes, patches | Aplicar cambios |
| 3 | Laboratorio | Modificar test/local | Producción |
| 4 | Producción controlada | Actuar con aprobación, rollback y evidencia | Actuar solo |
| 5 | Bloqueado | Nada salvo aprobación explícita | Borrar datos, credenciales, mensajes masivos |

---

## **9\. Guardrails NC obligatorios**

Antes de ejecutar cualquier agente:

\- \[ \] No inventar datos.

\- \[ \] No tocar producción sin permiso.

\- \[ \] No exponer secretos.

\- \[ \] No mezclar test y producción.

\- \[ \] No modificar Supabase real sin rollback.

\- \[ \] No activar workflows n8n reales sin QA.

\- \[ \] No enviar mensajes a clientes sin revisión si hay riesgo.

\- \[ \] No automatizar decisiones fiscales definitivas.

\- \[ \] No ampliar alcance sin declararlo.

\- \[ \] No cerrar tarea sin evidencia.

---

## **10\. Orquestación con OpenCode**

OpenCode debe recibir siempre:

\#\# Objetivo

\#\# Contexto

\#\# Alcance permitido

\#\# Fuera de alcance

\#\# Entorno

\#\# Archivos permitidos

\#\# Tools permitidas

\#\# Riesgos

\#\# Pruebas

\#\# Rollback

\#\# Criterio de cierre

\#\# Formato de entrega

No se le dice:

Arregla esto.

Se le dice:

Actúa como Agent Supervisor. Primero ejecuta exploración read-only, luego diagnóstico, luego propone TASK\_SPEC. No implementes sin autorización.

---

## **11\. Orquestación con n8n**

Modelo NC recomendado:

Trigger

↓

Normalización

↓

Clasificador IA

↓

Validador reglas duras

↓

Detector de riesgo

↓

Redactor de respuesta sugerida

↓

Human review si riesgo

↓

Guardar en Supabase

↓

Notificación interna

Subagentes posibles:

| Subagente | Función |
| ----- | ----- |
| Intake Normalizer | Limpia datos de Tally |
| Triage Classifier | Clasifica semáforo |
| Risk Detector | Detecta señales ROJAS |
| Reply Drafter | Redacta respuesta sugerida |
| QA Validator | Valida JSON y formato |
| Human Escalation Agent | Prepara aviso a Natalia |

---

## **12\. Orquestación con MCP**

MCP no es el cerebro.  
MCP es el enchufe seguro hacia herramientas.

Orden correcto:

1\. Documentar necesidad

2\. Definir tool

3\. Definir permisos

4\. Configurar MCP

5\. Probar read-only

6\. Añadir ejecución limitada

7\. Añadir logs

8\. Añadir revisión humana

Regla:

Primero MCP read-only.  
Escritura solo después de QA, rollback y aprobación.

---

## **13\. Context engineering**

El agente no debe cargarlo todo.

Debe cargar:

* objetivo;  
* TASK\_SPEC activa;  
* archivos relevantes;  
* logs necesarios;  
* reglas AGENTS.md;  
* skill específica si aplica;  
* evidencia mínima suficiente.

No cargar:

* todo el repo sin necesidad;  
* PDFs enormes sin objetivo;  
* conversaciones antiguas irrelevantes;  
* documentos fiscales si la tarea es backend;  
* producción si la tarea es local.

---

## **14\. Tracing y logs**

Cada ejecución relevante debe dejar registro:

| Campo | Descripción |
| ----- | ----- |
| `run_id` | ID de ejecución |
| `task_spec_id` | Tarea asociada |
| `agent_name` | Agente principal |
| `subagent_name` | Subagente |
| `tool_used` | Herramienta usada |
| `permission_level` | Nivel 0-5 |
| `status` | PASS / FAIL / PENDIENTE |
| `error` | Error si existe |
| `human_approval` | Sí / No |
| `evidence_url` | Evidencia |
| `next_action` | Siguiente paso |

---

## **15\. TASK\_SPEC mínima para agentes**

\# TASK\_SPEC\_AGENT\_ORCHESTRATION\_\[NOMBRE\]

\#\# 1\. Objetivo

\#\# 2\. Problema operativo

\#\# 3\. Resultado esperado

\#\# 4\. Agentes implicados

| Agente | Función | Permiso | Output |

|---|---|---|---|

\#\# 5\. Tools permitidas

| Tool | Agente | Permiso | Riesgo |

|---|---|---|---|

\#\# 6\. Fuera de alcance

\#\# 7\. Datos afectados

\#\# 8\. Entorno

local / test / staging / producción

\#\# 9\. Flujo de handoffs

\#\# 10\. Guardrails

\#\# 11\. Pruebas

\#\# 12\. Logs / evidencias

\#\# 13\. Rollback

\#\# 14\. Definition of Done

\#\# 15\. Siguiente paso real

---

## **16\. Prompt maestro para orquestar agentes en OpenCode**

Actúa como Agent Supervisor senior del proyecto NC Control Tower.

Objetivo:

Orquestar subagentes para resolver esta tarea de forma segura, eficiente y trazable.

Contexto:

NEGOCIA CONTROL está construyendo NC Control Tower.

Principios:

\- Natalia decide.

\- La IA clasifica.

\- Supabase guarda.

\- Backend valida.

\- n8n automatiza.

\- Dashboard permite operar.

\- OpenCode puede investigar y ejecutar si hay límites claros.

Tarea:

\[PEGAR TAREA\]

Reglas:

1\. No actúes como God Agent.

2\. Divide el trabajo en subagentes.

3\. Primero exploración read-only.

4\. Después diagnóstico.

5\. Después TASK\_SPEC.

6\. Solo implementa si el alcance está claro.

7\. No toques producción sin aprobación.

8\. No expongas secretos.

9\. No inventes datos.

10\. Devuelve evidencias.

Subagentes disponibles:

\- Explorer

\- Diagnostician

\- Spec Writer

\- Implementer

\- QA Agent

\- Security Reviewer

\- Documentation Agent

Formato de salida:

\#\# Plan de orquestación

| Paso | Subagente | Objetivo | Tools | Permiso | Output esperado |

|---|---|---|---|---|---|

\#\# Riesgos

\#\# Qué NO tocar

\#\# Primera acción read-only

\#\# Criterio de cierre

---

## **17\. Regla final**

La orquestación profesional no consiste en que la IA haga más cosas.

Consiste en que cada cosa la haga:

* el agente correcto;  
* con el contexto correcto;  
* con la herramienta correcta;  
* con el permiso correcto;  
* en el entorno correcto;  
* dejando evidencia;  
* y parando cuando debe parar.

En NC Control Tower, la IA no manda.  
**La IA ejecuta bajo arquitectura.**

---

