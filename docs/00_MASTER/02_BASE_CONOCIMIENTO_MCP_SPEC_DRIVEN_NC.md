# **DECISIÓN DOCUMENTAL**

| Documento | Decisión |
| ----- | ----- |
| `02_BASE_CONOCIMIENTO_MCP_SPEC_DRIVEN_NC` | **Se queda intacto.** Es la base MCP. |
| `03_BASE_CONOCIMIENTO_ORQUESTACION_AGENTES_IA_NC` | **Fusionar ambos ORQUESTACION en un resumen ejecutivo-operativo único.** |
| `04_BASE_CONOCIMIENTO_GOBERNANZA_AGENTICA_AGENTMD_SKILLS_CICD_NC` | **Convertir en manual final de gobernanza.** No como propuesta, sino como norma operativa del proyecto. |

---

BASE\_CONOCIMIENTO\_MCP\_SPEC\_DRIVEN\_NC.md

Base técnica contrastada: MCP define un estándar para conectar aplicaciones LLM con herramientas y datos externos; sus transportes estándar son `stdio` y `Streamable HTTP`; n8n ofrece MCP Server Trigger, MCP Client Tool y servidor MCP de instancia; OpenCode permite registrar servidores MCP en la configuración bajo `mcp`. ([GitHub](https://github.com/modelcontextprotocol/typescript-sdk?utm_source=chatgpt.com))

\# 02\_BASE\_CONOCIMIENTO\_MCP\_SPEC\_DRIVEN\_NC

\#\# Metodología Spec-Driven para Conexiones MCP en NEGOCIA CONTROL

\*\*Proyecto:\*\* NC Control Tower    
\*\*Área:\*\* Arquitectura técnica, automatización, agentes IA, MCP, n8n, OpenCode    
\*\*Estado:\*\* Base de conocimiento operativa    
\*\*Uso principal:\*\* NotebookLM, OpenCode, documentación interna, formación y toma de decisiones técnicas    
\*\*Enfoque NC:\*\* aprender, crecer y hacer con arquitectura sólida, foco operativo y tecnologías actuales sin dispersión elegante.

\---

\# 1\. Propósito del documento

Este documento sirve como \*\*base de conocimiento operativa\*\* para entender, diseñar, implementar y auditar conexiones MCP dentro del ecosistema de NEGOCIA CONTROL.

No es un documento académico.

Es una guía de trabajo para:

\- aprender qué es MCP;  
\- entender cuándo tiene sentido usarlo;  
\- evitar configuraciones improvisadas;  
\- conectar herramientas como OpenCode, n8n, Supabase, Google Drive u otros sistemas;  
\- trabajar con metodología Spec-Driven Development;  
\- convertir cada avance técnico en activo reutilizable;  
\- proteger la arquitectura de NC Control Tower;  
\- evitar automatizaciones bonitas pero frágiles.

\---

\# 2\. Principio estratégico NC aplicado a MCP

NEGOCIA CONTROL no adopta una tecnología porque esté de moda.

La adopta solo si cumple al menos una de estas funciones:

1\. ayuda a vender mejor;  
2\. ayuda a operar mejor;  
3\. ayuda a decidir mejor;  
4\. reduce error;  
5\. ahorra tiempo real;  
6\. mejora trazabilidad;  
7\. convierte conocimiento en sistema reutilizable.

MCP entra en NC si sirve para conectar agentes IA con herramientas reales de forma controlada, auditable y escalable.

Si MCP solo añade complejidad, no entra.

\---

\# 3\. Qué es MCP

MCP significa \*\*Model Context Protocol\*\*.

Es un protocolo abierto que permite que una aplicación con IA —por ejemplo OpenCode, Claude Desktop, un agente en n8n o un entorno de desarrollo— pueda conectarse a herramientas, datos y servicios externos mediante una interfaz estandarizada.

Dicho simple:

\> MCP es como un “puerto universal” para que los agentes IA puedan usar herramientas externas sin inventar una integración distinta cada vez.

Ejemplos de herramientas conectables vía MCP:

\- n8n;  
\- bases de datos;  
\- sistemas de archivos;  
\- Google Drive;  
\- GitHub;  
\- CRMs;  
\- APIs internas;  
\- documentación;  
\- buscadores;  
\- herramientas propias de negocio;  
\- Supabase, si existe un servidor MCP o puente compatible.

\---

\# 4\. Por qué MCP importa para NC Control Tower

NC Control Tower no es solo una app.

Es una arquitectura operativa donde:

\- Natalia decide;  
\- la IA clasifica;  
\- Supabase guarda;  
\- el backend valida;  
\- n8n automatiza;  
\- el dashboard permite ver y operar;  
\- OpenCode puede investigar, modificar y ejecutar tareas técnicas bajo control.

MCP puede convertirse en la capa que permite que los agentes IA no solo “opinen”, sino que interactúen con herramientas reales.

Ejemplo práctico:

Antes:

\`\`\`text  
Natalia pregunta → IA responde → Natalia copia comandos → Natalia ejecuta → Natalia trae errores → IA analiza

Con MCP bien configurado:

Natalia define objetivo → OpenCode consulta herramientas → inspecciona workflows → propone cambios → ejecuta tareas permitidas → devuelve evidencias

La diferencia es enorme.

Pero también aumenta el riesgo.

Por eso MCP debe entrar en NC con una metodología estricta.

---

# **5\. La regla central: MCP no sustituye arquitectura**

MCP no arregla un sistema mal diseñado.

MCP amplifica lo que ya existe.

Si el sistema tiene:

* mala documentación;  
* variables confusas;  
* nombres inconsistentes;  
* secretos expuestos;  
* endpoints mal definidos;  
* ausencia de pruebas;  
* workflows sin control de versiones;  
* falta de separación entre test y producción;

MCP no lo convierte en profesional.

Lo convierte en un caos más rápido.

Regla NC:

Primero arquitectura. Luego conexión. Luego automatización.

---

# **6\. Glosario operativo MCP**

## **6.1 Cliente MCP**

Es la aplicación que quiere usar herramientas externas.

Ejemplos:

* OpenCode;  
* Claude Desktop;  
* Cursor;  
* un agente IA;  
* n8n usando MCP Client Tool.

El cliente MCP pregunta:

¿Qué herramientas tienes disponibles?  
¿Cómo se llaman?  
¿Qué parámetros necesitan?  
¿Puedo ejecutarlas?

---

## **6.2 Servidor MCP**

Es el componente que expone herramientas, recursos o acciones a un cliente MCP.

Ejemplos:

* un servidor MCP de n8n;  
* un servidor MCP local que expone archivos;  
* un servidor MCP que permite consultar documentación;  
* un servidor MCP que permite gestionar workflows;  
* un servidor MCP propio de NC.

El servidor MCP responde:

Estas son mis herramientas.  
Estos son sus parámetros.  
Así puedes llamarlas.  
Este es el resultado.

---

## **6.3 Tool**

Una tool es una acción que el agente puede ejecutar.

Ejemplos:

buscar\_workflow  
leer\_workflow  
crear\_contacto  
consultar\_lead  
actualizar\_estado  
crear\_nota  
ejecutar\_test

Una tool debe tener:

* nombre claro;  
* descripción precisa;  
* parámetros definidos;  
* límites de uso;  
* respuesta esperada;  
* errores previstos;  
* permisos asociados.

---

## **6.4 Resource**

Un resource es información que el agente puede consultar.

Ejemplos:

docs/AGENTS.md  
TASK\_SPEC actual  
schema de Supabase  
workflow exportado de n8n  
logs de backend  
configuración de endpoints

---

## **6.5 Prompt**

En MCP, un prompt puede ser una plantilla reutilizable para guiar al modelo.

Ejemplo:

Diagnostica este fallo de conexión n8n usando solo evidencias.  
No propongas cambios sin identificar la causa probable.  
Devuelve hipótesis, pruebas, comandos y criterio de cierre.

---

# **7\. Transportes MCP: stdio y Streamable HTTP**

MCP puede funcionar mediante distintos transportes.

Los dos transportes estándar relevantes son:

## **7.1 stdio**

Comunicación mediante entrada y salida estándar del proceso.

Se usa normalmente para servidores MCP locales.

Ejemplo conceptual:

{  
  "mcp": {  
    "filesystem": {  
      "type": "local",  
      "command": \["npx", "-y", "@modelcontextprotocol/server-filesystem", "."\],  
      "enabled": true  
    }  
  }  
}

Uso típico:

* herramientas locales;  
* acceso a archivos;  
* servidores ejecutados en la máquina;  
* integraciones de desarrollo;  
* prototipos controlados.

Riesgo:

* puede ejecutar procesos locales;  
* puede acceder a archivos sensibles si se configura mal;  
* requiere mucho cuidado con permisos.

---

## **7.2 Streamable HTTP**

Comunicación mediante HTTP.

Se usa normalmente para servidores remotos o servicios expuestos por URL.

Ejemplo conceptual:

{  
  "mcp": {  
    "n8n": {  
      "type": "remote",  
      "url": "https://mi-instancia-n8n.com/mcp",  
      "enabled": true,  
      "headers": {  
        "Authorization": "Bearer ${N8N\_MCP\_TOKEN}"  
      }  
    }  
  }  
}

Uso típico:

* n8n remoto;  
* APIs;  
* servicios cloud;  
* herramientas compartidas;  
* agentes que necesitan conectarse a sistemas externos.

Riesgo:

* autenticación incorrecta;  
* exposición pública de endpoints;  
* tokens mal protegidos;  
* permisos excesivos.

---

# **8\. MCP en n8n: tres conceptos que no hay que mezclar**

En n8n hay que distinguir muy bien tres cosas.

## **8.1 MCP Server Trigger**

El **MCP Server Trigger** permite que un workflow de n8n actúe como servidor MCP.

Sirve para exponer una herramienta creada en n8n a clientes MCP externos.

Ejemplo:

OpenCode → llama herramienta MCP → n8n workflow recibe petición → ejecuta lógica → devuelve resultado

Uso NC:

* exponer una herramienta “consultar\_lead”;  
* exponer una herramienta “registrar\_interaccion”;  
* exponer una herramienta “crear\_resumen\_operativo”;  
* exponer una herramienta “validar\_payload\_tally”.

---

## **8.2 MCP Client Tool**

El **MCP Client Tool** permite que un agente dentro de n8n use herramientas expuestas por otros servidores MCP.

Ejemplo:

n8n Agent → usa MCP Client Tool → consulta herramienta externa → incorpora resultado al flujo

Uso NC:

* un agente de n8n consulta documentación;  
* un agente de n8n consulta una herramienta externa;  
* un flujo de n8n usa un servidor MCP para completar información.

---

## **8.3 Servidor MCP de instancia n8n**

El servidor MCP de instancia expone herramientas para interactuar con la propia instancia de n8n.

Puede permitir acciones como:

* buscar workflows;  
* consultar workflows;  
* gestionar workflows;  
* inspeccionar elementos de n8n según permisos.

Uso NC:

* que OpenCode pueda inspeccionar workflows;  
* que OpenCode diagnostique configuración;  
* que el agente pueda leer estructura de workflows;  
* que el agente proponga cambios con conocimiento real.

Cuidado:

No es lo mismo exponer un workflow como herramienta que exponer la propia instancia n8n como servidor MCP.

Esta confusión causa muchos errores.

---

# **9\. MCP en OpenCode**

OpenCode puede usar servidores MCP definidos en su configuración.

La configuración suele vivir en archivos como:

\~/.config/opencode/opencode.json  
\~/.config/opencode/opencode.jsonc

También puede existir configuración local de proyecto, según el entorno.

Ejemplo conceptual:

{  
  "$schema": "https://opencode.ai/config.json",  
  "mcp": {  
    "n8n-nc": {  
      "type": "remote",  
      "url": "https://n8n-nc-n8n.wmd3t3.easypanel.host/mcp",  
      "enabled": true,  
      "headers": {  
        "Authorization": "Bearer ${N8N\_MCP\_TOKEN}"  
      }  
    }  
  }  
}

Comandos útiles:

opencode mcp list  
opencode mcp ls

Objetivo operativo:

OpenCode no debe limitarse a leer instrucciones.  
OpenCode debe poder consultar herramientas reales cuando la tarea lo justifique.

Pero siempre bajo límites.

---

# **10\. Diferencia entre “tener config MCP” y “tener MCP funcional”**

Este punto es crítico.

Tener un bloque JSON de configuración no significa que MCP funcione.

Para considerar MCP funcional deben cumplirse estas condiciones:

1. el servidor MCP existe;  
2. la URL o comando es correcto;  
3. el transporte es compatible;  
4. la autenticación funciona;  
5. el cliente puede inicializar sesión;  
6. el cliente puede listar herramientas;  
7. las herramientas tienen descripción y schema;  
8. al menos una tool responde correctamente;  
9. los errores son trazables;  
10. no hay permisos excesivos.

Checklist mínimo:

\[ \] OpenCode reconoce el servidor MCP.  
\[ \] El servidor aparece en \`opencode mcp list\`.  
\[ \] No hay error Unauthorized.  
\[ \] No hay error session not found.  
\[ \] No hay error serverURL or command must be specified.  
\[ \] Se pueden listar herramientas.  
\[ \] Una herramienta simple responde.  
\[ \] Hay logs o evidencia del intento.

---

# **11\. Errores frecuentes MCP y lectura operativa**

## **11.1 Error: Unauthorized**

Significa normalmente:

El cliente llegó al servidor, pero la autenticación falló.

Causas posibles:

* token incorrecto;  
* token caducado;  
* header mal escrito;  
* formato Bearer incorrecto;  
* endpoint exige otro método de autenticación;  
* el servidor no acepta ese cliente;  
* permisos insuficientes.

Acción NC:

No cambiar 10 cosas.  
Primero validar token, header y endpoint exacto.

---

## **11.2 Error: session not found**

Puede indicar:

* sesión MCP no inicializada correctamente;  
* endpoint incorrecto;  
* transporte no compatible;  
* uso de URL de workflow en lugar de URL MCP;  
* servidor esperando una secuencia distinta de inicialización.

Acción NC:

Separar URL de workflow, webhook y MCP.  
No son intercambiables.

---

## **11.3 Error: serverURL or command must be specified**

Indica que la configuración del servidor MCP está incompleta o usa una clave incorrecta.

Posibles causas:

* se escribió `serverURL` cuando la herramienta espera `url`;  
* se escribió `url` cuando el entorno espera `serverURL`;  
* falta `command` para servidor local;  
* falta `type`;  
* JSON inválido;  
* archivo de configuración no recargado.

Acción NC:

Validar contra la documentación exacta de la herramienta cliente.  
No copiar configuraciones de otro cliente sin adaptar.

---

## **11.4 Webhook not registered en n8n**

Ejemplo:

The requested webhook is not registered.  
Click the Execute workflow button on the canvas, then try again.

Este error no es necesariamente MCP.

Suele indicar:

* webhook en modo test no activado;  
* workflow no ejecutado en modo escucha;  
* URL de test usada fuera de sesión;  
* workflow no activo;  
* path incorrecto.

Acción NC:

No mezclar diagnóstico webhook con diagnóstico MCP.  
Primero identificar qué tipo de endpoint se está probando.

---

# **12\. Mapa de endpoints: no confundir**

En NC Control Tower puede haber varias URLs parecidas pero con funciones distintas.

## **12.1 URL de interfaz n8n**

Ejemplo conceptual:

https://n8n-nc-n8n.wmd3t3.easypanel.host/workflow/ID

Sirve para abrir el workflow en la interfaz.

No sirve como endpoint MCP.

No sirve como webhook.

---

## **12.2 URL de webhook test**

Ejemplo conceptual:

https://n8n-nc-n8n.wmd3t3.easypanel.host/webhook-test/diagnostico-supabase-parallel-test

Sirve para pruebas temporales.

Normalmente exige pulsar “Execute workflow”.

Puede funcionar solo para una llamada.

---

## **12.3 URL de webhook producción**

Ejemplo conceptual:

https://n8n-nc-n8n.wmd3t3.easypanel.host/webhook/diagnostico-supabase-parallel-test

Sirve si el workflow está activo.

Debe usarse para integraciones estables.

---

## **12.4 URL de MCP**

Ejemplo conceptual:

https://n8n-nc-n8n.wmd3t3.easypanel.host/mcp

Sirve si la instancia o workflow expone un servidor MCP compatible.

No debe asumirse.

Debe confirmarse en documentación, configuración y logs.

---

# **13\. Arquitectura objetivo NC para MCP**

La arquitectura recomendada no es conectar todo con todo.

Es separar capas.

Natalia  
  ↓  
OpenCode / agente técnico  
  ↓  
MCP Client  
  ↓  
Servidor MCP autorizado  
  ↓  
Herramientas controladas  
  ↓  
n8n / Supabase / backend / documentación

Principio:

El agente solo debe tocar lo que está autorizado a tocar.

---

# **14\. Capas de integración recomendadas**

## **14.1 Capa 1: Lectura segura**

Primera fase.

El agente puede consultar información, pero no modificar.

Permisos:

* leer documentación;  
* listar workflows;  
* leer configuración no sensible;  
* consultar schemas;  
* revisar logs;  
* inspeccionar endpoints;  
* generar diagnóstico.

No puede:

* modificar workflows;  
* borrar datos;  
* crear usuarios;  
* cambiar credenciales;  
* desplegar producción;  
* tocar datos reales sin autorización.

Objetivo:

Aprender y diagnosticar sin romper.

---

## **14.2 Capa 2: Propuesta controlada**

Segunda fase.

El agente puede proponer cambios en formato spec.

Permisos:

* crear plan;  
* generar patch;  
* redactar instrucciones;  
* preparar migraciones;  
* crear checklist;  
* generar tests;  
* preparar rollback.

No ejecuta cambios destructivos.

Objetivo:

Pasar de diagnóstico a plan auditable.

---

## **14.3 Capa 3: Ejecución limitada**

Tercera fase.

El agente puede ejecutar acciones concretas bajo límites.

Permisos posibles:

* ejecutar tests;  
* crear rama;  
* modificar archivos no críticos;  
* actualizar documentación;  
* crear workflows de prueba;  
* ejecutar endpoints de laboratorio.

Condición:

Debe haber TASK\_SPEC, rollback y criterio de cierre.

---

## **14.4 Capa 4: Producción con revisión humana**

Cuarta fase.

Cualquier acción que afecte producción requiere validación humana.

Ejemplos:

* cambiar backend en servidor;  
* tocar Supabase real;  
* modificar workflow activo;  
* enviar mensajes a clientes;  
* automatizar respuestas;  
* manipular datos personales;  
* actualizar lógica fiscal;  
* cambiar reglas de clasificación.

Regla:

Producción no se toca sin evidencia, rollback y decisión humana.

---

# **15\. Spec-Driven Development aplicado a MCP**

En NC, MCP debe implementarse mediante Spec-Driven Development.

Eso significa que antes de configurar o ejecutar, se redacta una especificación.

La especificación debe responder:

1. ¿Qué problema resuelve esta conexión?  
2. ¿Qué cliente MCP se usará?  
3. ¿Qué servidor MCP se usará?  
4. ¿Qué tools estarán disponibles?  
5. ¿Qué permisos tendrá cada tool?  
6. ¿Qué datos puede leer?  
7. ¿Qué datos puede modificar?  
8. ¿Qué logs debe dejar?  
9. ¿Cómo se prueba?  
10. ¿Cómo se revierte?  
11. ¿Qué queda fuera de alcance?

---

# **16\. Plantilla TASK\_SPEC para conexión MCP**

\# TASK\_SPEC\_MCP\_XXX

\#\# 1\. Objetivo

Definir, configurar y validar una conexión MCP entre:

\- Cliente MCP:  
\- Servidor MCP:  
\- Proyecto:  
\- Entorno: local / staging / producción

\#\# 2\. Problema que resuelve

Describe el dolor operativo real.

Ejemplo:

Actualmente OpenCode no puede inspeccionar workflows de n8n. Natalia debe copiar capturas, errores y JSON manualmente. Esto ralentiza diagnóstico y aumenta riesgo de error.

\#\# 3\. Resultado esperado

Al finalizar, OpenCode debe poder:

\- detectar servidor MCP;  
\- autenticar correctamente;  
\- listar tools disponibles;  
\- ejecutar una tool de lectura;  
\- devolver evidencia;  
\- no tener permisos de escritura en esta fase.

\#\# 4\. Fuera de alcance

Queda expresamente fuera:

\- modificar workflows activos;  
\- tocar datos reales;  
\- cambiar credenciales;  
\- activar automatizaciones de producción;  
\- escribir en Supabase;  
\- enviar comunicaciones a clientes.

\#\# 5\. Arquitectura propuesta

\`\`\`text  
OpenCode  
  ↓ MCP Client  
n8n MCP Server  
  ↓  
Tools de lectura  
  ↓  
Workflows / metadata / diagnóstico

## **6\. Tools esperadas**

| Tool | Tipo | Permiso | Descripción | Riesgo |
| ----- | ----- | ----- | ----- | ----- |
| search\_workflows | lectura | read-only | Buscar workflows por nombre | Bajo |
| get\_workflow | lectura | read-only | Leer estructura de workflow | Medio |
| list\_credentials\_metadata | lectura limitada | read-only | Ver metadata, no secretos | Alto |
| run\_test\_tool | ejecución controlada | test-only | Ejecutar prueba segura | Medio |

## **7\. Requisitos de seguridad**

* No exponer tokens en archivos versionados.  
* Usar variables de entorno.  
* No incluir secrets en prompts.  
* No conceder permisos de escritura al inicio.  
* Separar test y producción.  
* Registrar logs.  
* Validar URL exacta.  
* Validar transporte.  
* Validar método de autenticación.

## **8\. Configuración prevista**

{  
  "$schema": "https://opencode.ai/config.json",  
  "mcp": {  
    "n8n-nc": {  
      "type": "remote",  
      "url": "PENDIENTE\_CONFIRMAR\_URL\_MCP",  
      "enabled": true,  
      "headers": {  
        "Authorization": "Bearer ${N8N\_MCP\_TOKEN}"  
      }  
    }  
  }  
}

## **9\. Variables necesarias**

N8N\_MCP\_TOKEN=  
N8N\_MCP\_URL=

## **10\. Plan de prueba**

### **Test 1: validar configuración**

opencode mcp list

Criterio de éxito:

El servidor aparece como configurado y sin error de inicialización.

### **Test 2: listar tools**

Solicitar a OpenCode:

Lista las herramientas disponibles del MCP n8n-nc.  
No ejecutes ninguna acción de escritura.

Criterio de éxito:

OpenCode devuelve tools disponibles con nombre y descripción.

### **Test 3: ejecutar tool de lectura**

Solicitar:

Usa la tool de lectura más segura para buscar workflows relacionados con NC Control Tower.  
Devuelve solo nombre, ID y descripción si existe.

Criterio de éxito:

La tool responde sin error y no modifica nada.

## **11\. Errores esperados**

| Error | Interpretación | Acción |
| ----- | ----- | ----- |
| Unauthorized | Token/header incorrecto | Revisar auth |
| session not found | Sesión/transporte/URL incorrecta | Revisar endpoint MCP |
| serverURL or command required | Config incompleta | Revisar schema OpenCode |
| no tools found | Servidor conecta pero no expone tools | Revisar servidor |
| timeout | Red o servidor no responde | Revisar logs |

## **12\. Rollback**

* Desactivar servidor MCP en configuración.  
* Eliminar token local.  
* Reiniciar OpenCode.  
* Confirmar que el servidor no aparece en lista MCP.

## **13\. Criterio de cierre**

La tarea se cierra solo si:

* hay evidencia de conexión;  
* hay evidencia de listado de tools;  
* se ejecutó al menos una tool read-only;  
* no se expusieron secretos;  
* no se modificó producción;  
* quedó documentado el resultado.

\---

\# 17\. Prompt maestro para OpenCode: diagnóstico MCP

Usar cuando haya errores de conexión MCP.

\`\`\`markdown  
Actúa como Spec-Driven Developer senior experto en MCP, OpenCode, n8n y seguridad de automatizaciones.

Objetivo:  
Diagnosticar por qué la conexión MCP no funciona en este proyecto.

Contexto:  
Proyecto: NC Control Tower.  
Principio NC: primero arquitectura, luego ejecución. No improvises. No cambies configuración sin explicar causa probable.

Reglas:  
1\. No ejecutes cambios destructivos.  
2\. No toques producción.  
3\. No expongas tokens ni secretos.  
4\. No inventes endpoints.  
5\. Diferencia claramente:  
   \- URL de workflow n8n  
   \- URL de webhook test  
   \- URL de webhook producción  
   \- URL MCP real  
6\. Si falta información crítica, márcala como PENDIENTE.  
7\. Trabaja con evidencias.

Tareas:  
1\. Inspecciona la configuración MCP disponible en OpenCode.  
2\. Identifica cliente MCP, servidor MCP, transporte y método de autenticación.  
3\. Comprueba si el error es:  
   \- configuración incompleta;  
   \- URL incorrecta;  
   \- autenticación incorrecta;  
   \- transporte incompatible;  
   \- servidor no disponible;  
   \- herramienta no expuesta;  
   \- confusión webhook/MCP.  
4\. Devuelve un diagnóstico en tabla.  
5\. Propón el siguiente paso mínimo verificable.  
6\. No hagas cambios sin presentar plan.

Formato de salida:

\#\# Diagnóstico MCP

| Elemento | Estado | Evidencia | Riesgo | Acción recomendada |  
|---|---|---|---|---|

\#\# Causa más probable

\#\# Prueba mínima siguiente

\#\# Comando o acción sugerida

\#\# Qué NO tocar todavía

\#\# Criterio de cierre

---

# **18\. Prompt maestro para OpenCode: implementar MCP read-only**

Actúa como Spec-Driven Developer senior experto en MCP, OpenCode y n8n.

Objetivo:  
Preparar una conexión MCP read-only entre OpenCode y n8n para el proyecto NC Control Tower.

Modo:  
Plan \+ ejecución controlada.

Reglas NC:  
\- Primero arquitectura.  
\- No dispersión elegante.  
\- No tocar producción sin criterio de cierre.  
\- No exponer secretos.  
\- No inventar endpoints.  
\- No mezclar webhook con MCP.  
\- Todo cambio debe ser documentado y reversible.

Alcance permitido:  
\- Revisar archivos de configuración.  
\- Proponer configuración MCP.  
\- Crear documentación.  
\- Añadir ejemplo seguro con variables de entorno.  
\- Ejecutar comandos de diagnóstico si están disponibles.  
\- Validar que OpenCode reconoce el servidor.

Fuera de alcance:  
\- Modificar workflows activos.  
\- Escribir en Supabase.  
\- Cambiar backend.  
\- Enviar datos reales.  
\- Crear automatizaciones de producción.  
\- Guardar tokens en repo.

Tareas:  
1\. Localiza configuración OpenCode.  
2\. Revisa si ya existe bloque \`mcp\`.  
3\. Propón configuración mínima para servidor n8n.  
4\. Usa variables de entorno para tokens.  
5\. Añade comentarios de seguridad.  
6\. Ejecuta validación con \`opencode mcp list\` si procede.  
7\. Documenta resultado en \`docs/01\_ACTIVO\_FASE\_2A/MCP\_STATUS.md\`.

Entrega:  
\- Cambios realizados.  
\- Archivos tocados.  
\- Evidencias.  
\- Errores encontrados.  
\- Siguiente paso.  
\- Rollback.

---

# **19\. Prompt maestro para OpenCode: usar MCP sin romper**

Actúa como operador técnico del proyecto NC Control Tower.

Tienes acceso a herramientas MCP, pero debes usarlas con prudencia.

Objetivo:  
Usar MCP para investigar y diagnosticar, no para modificar producción.

Reglas obligatorias:  
1\. Antes de usar una tool, explica qué tool quieres usar y por qué.  
2\. Prioriza tools read-only.  
3\. No ejecutes tools de escritura sin permiso explícito.  
4\. No reveles secretos.  
5\. No descargues datos personales si no es necesario.  
6\. No hagas cambios masivos.  
7\. Toda conclusión debe citar evidencia observada.  
8\. Si una tool falla, interpreta el error antes de probar otra cosa.

Formato de trabajo:  
1\. Hipótesis.  
2\. Tool MCP propuesta.  
3\. Resultado.  
4\. Interpretación.  
5\. Siguiente acción mínima.

Criterio de calidad:  
El diagnóstico debe reducir incertidumbre, no aumentarla.

---

# **20\. Diseño de tools MCP para NC**

Si NC crea sus propias tools MCP, deben ser pequeñas, explícitas y seguras.

Mala tool:

manage\_nc\_system

Problema:

* demasiado amplia;  
* riesgo alto;  
* el agente no sabe límites;  
* difícil de auditar.

Buena tool:

get\_lead\_by\_id

Mejor porque:

* tiene objetivo único;  
* parámetros claros;  
* respuesta clara;  
* riesgo limitado.

---

# **21\. Catálogo inicial de tools MCP recomendadas para NC**

## **21.1 Tools read-only**

get\_project\_status  
list\_active\_docs  
get\_task\_spec  
get\_backend\_health  
get\_supabase\_schema\_summary  
search\_n8n\_workflows  
get\_n8n\_workflow\_summary  
get\_recent\_error\_logs  
get\_lead\_summary\_by\_id

## **21.2 Tools de propuesta**

propose\_backend\_patch  
propose\_n8n\_workflow\_change  
generate\_task\_spec  
generate\_test\_plan  
generate\_rollback\_plan  
generate\_qa\_checklist

## **21.3 Tools de ejecución limitada**

run\_backend\_tests  
run\_smoke\_tests  
create\_dev\_branch  
create\_test\_workflow\_copy  
write\_markdown\_doc  
update\_task\_status

## **21.4 Tools de alto riesgo**

Estas deben estar bloqueadas por defecto.

delete\_lead  
update\_production\_workflow  
modify\_supabase\_schema  
send\_client\_message  
deploy\_backend  
rotate\_credentials  
bulk\_update\_records

Regla:

Las tools de alto riesgo no se exponen hasta que exista control de permisos, logs, rollback y validación humana.

---

# **22\. Naming convention para tools NC**

Formato recomendado:

verbo\_objeto\_contexto

Ejemplos:

get\_lead\_summary  
search\_workflows\_by\_name  
validate\_tally\_payload  
create\_lead\_note  
run\_backend\_smoke\_tests  
generate\_triage\_report

Evitar nombres vagos:

process\_data  
handle\_request  
do\_task  
manage\_system  
fix\_error

---

# **23\. Schema mínimo de una tool MCP**

Toda tool debe documentarse así:

\#\# Tool: get\_lead\_summary

\#\#\# Tipo  
Read-only

\#\#\# Objetivo  
Consultar resumen operativo de un lead sin exponer datos sensibles innecesarios.

\#\#\# Parámetros

| Parámetro | Tipo | Requerido | Descripción |  
|---|---|---|---|  
| lead\_id | string | sí | ID del lead, ejemplo L-0024 |

\#\#\# Respuesta esperada

\`\`\`json  
{  
  "lead\_id": "L-0024",  
  "estado": "NUEVO",  
  "semaforo": "VERDE",  
  "tipo\_lead": "Alta autónomo",  
  "requiere\_revision": false,  
  "siguiente\_accion": "Enviar enlace diagnóstico"  
}

### **Riesgos**

Puede exponer información personal si se amplía demasiado.

### **Limitaciones**

No devuelve teléfono, email ni texto completo salvo permiso explícito.

### **Errores**

* LEAD\_NOT\_FOUND  
* INVALID\_LEAD\_ID  
* PERMISSION\_DENIED

\---

\# 24\. Seguridad: reglas no negociables

\#\# 24.1 No guardar secretos en el repositorio

Nunca guardar:

\`\`\`text  
API keys  
tokens  
service role keys  
refresh tokens  
passwords  
private keys  
cookies

Usar:

.env  
variables de entorno  
secret manager  
credenciales internas de n8n

---

## **24.2 No exponer datos personales sin necesidad**

NC trabaja con leads, fiscalidad, residencia y potencialmente datos sensibles.

Por tanto:

* minimizar datos;  
* usar IDs;  
* ocultar información personal;  
* limitar acceso por entorno;  
* evitar copiar datos reales en prompts;  
* usar datos sintéticos para tests.

---

## **24.3 Separar entornos**

Debe existir separación conceptual entre:

local  
test  
staging  
production

Aunque al principio el MVP sea pequeño, la mentalidad debe ser profesional.

Regla:

Lo que automatiza producción debe haber sido probado antes en laboratorio.

---

## **24.4 Logs sin secretos**

Los logs deben mostrar:

* qué tool se ejecutó;  
* cuándo;  
* por quién o por qué cliente;  
* con qué parámetros no sensibles;  
* resultado;  
* error si existe.

No deben mostrar:

* tokens;  
* claves;  
* datos personales completos;  
* payloads sensibles sin anonimizar.

---

# **25\. Testing MCP**

## **25.1 Test de configuración**

Pregunta:

¿El cliente reconoce el servidor MCP?

Evidencia:

opencode mcp list

---

## **25.2 Test de autenticación**

Pregunta:

¿El servidor acepta las credenciales?

Evidencia:

No aparece Unauthorized.

---

## **25.3 Test de descubrimiento**

Pregunta:

¿El cliente puede listar tools?

Evidencia:

Lista de tools con nombre y descripción.

---

## **25.4 Test de ejecución read-only**

Pregunta:

¿Una tool segura responde correctamente?

Ejemplo:

search\_workflows\_by\_name("NC")

---

## **25.5 Test de límites**

Pregunta:

¿El agente intenta ejecutar algo que no debe?

Evidencia:

Tools de escritura bloqueadas o no expuestas.

---

# **26\. Definition of Done para conexión MCP**

Una conexión MCP solo se considera lista cuando:

\[ \] Está documentado el objetivo.  
\[ \] Está claro el cliente MCP.  
\[ \] Está claro el servidor MCP.  
\[ \] Está claro el transporte.  
\[ \] Está claro el método de autenticación.  
\[ \] No hay secretos en repo.  
\[ \] El servidor aparece en el cliente.  
\[ \] Se pueden listar tools.  
\[ \] Se ejecutó una tool read-only.  
\[ \] Hay evidencia del resultado.  
\[ \] Hay rollback.  
\[ \] Hay límites de permisos.  
\[ \] Hay registro de errores.  
\[ \] Está documentado el siguiente paso.

---

# **27\. Estrategia de crecimiento MCP para NC**

## **Fase 0: documentación**

Objetivo:

Entender MCP y documentar reglas internas.

Resultado:

* este documento;  
* glosario;  
* checklist;  
* prompts;  
* límites.

---

## **Fase 1: conexión read-only**

Objetivo:

Permitir que OpenCode consulte herramientas sin modificar nada.

Resultado:

* MCP configurado;  
* listado de tools;  
* test read-only;  
* documentación de errores.

---

## **Fase 2: diagnóstico asistido**

Objetivo:

OpenCode puede diagnosticar workflows, backend y configuración con evidencias.

Resultado:

* reduce copy-paste;  
* mejora análisis;  
* crea informes técnicos;  
* no toca producción.

---

## **Fase 3: ejecución controlada**

Objetivo:

OpenCode puede ejecutar tareas limitadas de laboratorio.

Resultado:

* tests;  
* creación de docs;  
* patches;  
* ramas;  
* workflows de prueba.

---

## **Fase 4: orquestación operativa**

Objetivo:

Agentes especializados trabajan sobre NC Control Tower con roles claros.

Roles:

* Explorer;  
* Diagnostician;  
* Spec Writer;  
* Implementer;  
* QA Agent;  
* Security Reviewer.

---

# **28\. Modelo de agentes recomendado**

## **28.1 Explorer**

Función:

Investiga el sistema.

Puede:

* leer docs;  
* buscar archivos;  
* inspeccionar workflows;  
* listar endpoints;  
* detectar inconsistencias.

No puede:

* modificar archivos;  
* ejecutar cambios;  
* tocar producción.

---

## **28.2 Diagnostician**

Función:

Convierte errores en hipótesis verificables.

Puede:

* analizar logs;  
* clasificar errores;  
* proponer pruebas;  
* diferenciar causas.

No puede:

* aplicar cambios sin plan.

---

## **28.3 Spec Writer**

Función:

Convierte una necesidad en TASK\_SPEC.

Puede:

* redactar alcance;  
* criterios de aceptación;  
* rollback;  
* definición de done;  
* checklist QA.

---

## **28.4 Implementer**

Función:

Ejecuta cambios concretos.

Puede:

* modificar código;  
* crear archivos;  
* aplicar patches;  
* generar tests.

Condición:

Solo actúa con TASK\_SPEC aprobada.

---

## **28.5 QA Agent**

Función:

Valida que lo hecho cumple el criterio de cierre.

Puede:

* ejecutar tests;  
* revisar DoD;  
* detectar regresiones;  
* documentar evidencias.

---

## **28.6 Security Reviewer**

Función:

Busca riesgos antes de producción.

Revisa:

* secretos;  
* permisos;  
* endpoints;  
* datos personales;  
* logs;  
* exposición pública;  
* operaciones destructivas.

---

# **29\. Regla anti God Agent**

NC no debe trabajar con un único agente todopoderoso.

El “God Agent” es peligroso porque:

* mezcla análisis y ejecución;  
* toma decisiones sin control;  
* toca demasiadas capas;  
* dificulta auditoría;  
* aumenta riesgo de daño;  
* genera falsa sensación de productividad.

Modelo recomendado:

Agentes pequeños.  
Roles claros.  
Permisos limitados.  
Trazabilidad.  
Validación humana.

---

# **30\. MCP y Supabase**

MCP puede interactuar con Supabase si existe una herramienta o servidor que lo permita.

Pero Supabase en NC debe tratarse como capa crítica.

Riesgos:

* datos personales;  
* estructura de base de datos;  
* integridad de leads;  
* trazabilidad;  
* errores de escritura;  
* exposición de service role key.

Regla:

Supabase nunca se toca por MCP en modo escritura hasta tener entorno de test, logs y rollback.

Fase inicial permitida:

* leer schema;  
* consultar tablas vacías o de laboratorio;  
* validar conexión;  
* ejecutar queries read-only;  
* generar migraciones propuestas sin aplicarlas.

Fase bloqueada:

* borrar datos;  
* alterar tablas reales;  
* modificar policies;  
* usar service role sin control;  
* escribir leads reales.

---

# **31\. MCP y n8n en NC**

n8n es orquestador.

MCP no debe convertir n8n en una caja negra.

Debe servir para:

* inspeccionar workflows;  
* documentar nodos;  
* diagnosticar errores;  
* validar rutas;  
* exponer herramientas pequeñas;  
* conectar agentes con automatizaciones.

No debe usarse para:

* activar workflows sin test;  
* modificar producción a ciegas;  
* mezclar datos reales con pruebas;  
* esconder lógica crítica en nodos no documentados.

---

# **32\. MCP y backend NC**

El backend es capa de validación.

MCP puede ayudar a:

* consultar health checks;  
* ejecutar smoke tests;  
* revisar endpoints;  
* detectar errores;  
* generar documentación;  
* proponer refactors;  
* analizar logs.

Pero no debe saltarse el backend.

Regla:

n8n automatiza.  
Supabase guarda.  
Backend valida.  
MCP conecta.  
El humano decide.

---

# **33\. MCP y documentación**

Una de las mejores aplicaciones iniciales de MCP en NC es documentación viva.

Objetivo:

Que los agentes consulten la documentación correcta antes de actuar.

Documentos prioritarios:

AGENTS.md  
README.md  
TASK\_SPEC actual  
PRD v2  
QUICK\_START\_FASE2A.md  
MCP\_STATUS.md  
schema Supabase  
workflow n8n exportado

Regla:

Antes de tocar código, el agente debe leer la spec activa.

---

# **34\. Estructura documental recomendada**

docs/  
  00\_MASTER/  
    01\_PRD\_V2\_NC\_CONTROL\_TOWER.md  
    02\_BASE\_CONOCIMIENTO\_MCP\_SPEC\_DRIVEN\_NC.md

  01\_ACTIVO\_FASE\_2A/  
    QUICK\_START\_FASE2A.md  
    TASK\_SPEC\_XXX.md  
    MCP\_STATUS.md  
    QA\_LOG.md

  02\_ARQUITECTURA/  
    ARCHITECTURE\_OVERVIEW.md  
    MCP\_ARCHITECTURE.md  
    SECURITY\_MODEL.md

  03\_N8N/  
    WORKFLOW\_MAP.md  
    WEBHOOKS.md  
    MCP\_N8N.md

  04\_SUPABASE/  
    SCHEMA.md  
    MIGRATIONS.md  
    RLS\_POLICIES.md

  05\_BACKEND/  
    API\_ENDPOINTS.md  
    HEALTHCHECKS.md  
    SMOKE\_TESTS.md

---

# **35\. Archivo MCP\_STATUS.md**

Crear este archivo para estado vivo de MCP.

\# MCP\_STATUS

\#\# Estado actual

\- Fecha:  
\- Responsable:  
\- Cliente MCP:  
\- Servidor MCP:  
\- Transporte:  
\- Entorno:  
\- Estado general:

\#\# Configuración detectada

\`\`\`json  
{  
  "mcp": {}  
}

## **Tools disponibles**

| Tool | Tipo | Permiso | Probada | Resultado |
| :---: | :---: | :---: | :---: | :---: |

## **Últimas pruebas**

| Fecha | Prueba | Resultado | Evidencia | Siguiente paso |
| :---: | :---: | :---: | :---: | :---: |

## **Errores abiertos**

| Error | Causa probable | Estado | Acción |
| :---: | :---: | :---: | :---: |

## **Riesgos**

| Riesgo | Nivel | Mitigación |
| :---: | :---: | :---: |

## **Siguiente paso real**

\---

\# 36\. Checklist antes de activar MCP con n8n

\`\`\`text  
\[ \] Sé si estoy usando MCP Server Trigger, MCP Client Tool o servidor MCP de instancia.  
\[ \] Tengo URL correcta.  
\[ \] No estoy usando URL de workflow como URL MCP.  
\[ \] No estoy usando webhook test como MCP.  
\[ \] Tengo token correcto.  
\[ \] El token no está en repo.  
\[ \] El transporte es compatible.  
\[ \] OpenCode reconoce el servidor.  
\[ \] Puedo listar tools.  
\[ \] La primera tool es read-only.  
\[ \] Hay logs.  
\[ \] Hay rollback.

---

# **37\. Checklist antes de pedir a OpenCode que actúe**

\[ \] Hay TASK\_SPEC.  
\[ \] Está claro el objetivo.  
\[ \] Está claro qué puede tocar.  
\[ \] Está claro qué NO puede tocar.  
\[ \] Hay entorno de prueba.  
\[ \] Hay backup o rollback.  
\[ \] Se han protegido secretos.  
\[ \] Está definido el criterio de cierre.  
\[ \] Está definido cómo reportar evidencias.

---

# **38\. Preguntas de diagnóstico rápido**

Cuando algo falle en MCP, preguntar:

1. ¿Estoy probando MCP o webhook?  
2. ¿La URL pertenece a workflow, webhook o MCP?  
3. ¿El servidor existe?  
4. ¿El cliente MCP lo reconoce?  
5. ¿El transporte es correcto?  
6. ¿La autenticación es correcta?  
7. ¿Puedo listar tools?  
8. ¿La tool existe?  
9. ¿La tool tiene permisos?  
10. ¿El error viene del cliente, del servidor o de la red?

---

# **39\. Decisiones NC actuales**

## **Decisión 1**

MCP se adopta primero en modo aprendizaje y diagnóstico.

No se empieza por automatización de escritura.

---

## **Decisión 2**

OpenCode debe usarse como agente técnico capaz de investigar y ejecutar tareas cuando sea seguro.

No debe limitarse a recibir prompts manuales si puede inspeccionar el proyecto con herramientas controladas.

---

## **Decisión 3**

n8n sigue siendo orquestador.

MCP no sustituye n8n.

MCP permite que agentes externos interactúen con n8n de forma más estructurada.

---

## **Decisión 4**

Supabase es capa crítica.

No se expone escritura por MCP hasta tener control fuerte.

---

## **Decisión 5**

Toda conexión MCP debe documentarse como activo reutilizable.

No se configura “a ojo”.

---

# **40\. Antipatrones a evitar**

## **40.1 Copiar configuraciones sin entender**

Mala práctica:

Copiar un bloque JSON de internet y pegarlo en OpenCode.

Buena práctica:

Validar contra documentación del cliente, servidor, transporte y versión.

---

## **40.2 Mezclar webhook y MCP**

Mala práctica:

Usar URL /workflow/ID o /webhook-test/... como si fuera MCP.

Buena práctica:

Identificar endpoint real y función exacta.

---

## **40.3 Dar permisos de escritura demasiado pronto**

Mala práctica:

Permitir que el agente modifique workflows activos.

Buena práctica:

Primero lectura, luego propuesta, luego ejecución controlada.

---

## **40.4 No documentar errores**

Mala práctica:

Probar muchas cosas y no guardar qué falló.

Buena práctica:

Guardar error, hipótesis, prueba y resultado.

---

## **40.5 Convertir MCP en juguete técnico**

Mala práctica:

Instalar MCP porque suena avanzado.

Buena práctica:

Usarlo solo si reduce trabajo real, error o incertidumbre.

---

# **41\. Prompt para NotebookLM**

Usar este prompt dentro de NotebookLM cuando este documento esté cargado como fuente.

Actúa como tutor técnico senior en MCP, Spec-Driven Development y arquitectura de automatización para NEGOCIA CONTROL.

Usa exclusivamente las fuentes cargadas.

Objetivo:  
Ayudarme a aprender, decidir y ejecutar conexiones MCP en NC Control Tower con criterio profesional.

Cuando te pregunte algo:  
1\. Distingue entre concepto, decisión y acción.  
2\. Señala riesgos.  
3\. Propón el siguiente paso mínimo verificable.  
4\. No inventes endpoints ni configuraciones.  
5\. Si falta un dato crítico, márcalo como pendiente.  
6\. Convierte cada aprendizaje en checklist, spec o SOP.  
7\. Mantén el foco NC: arquitectura, utilidad, trazabilidad y cero dispersión elegante.

Formato preferido:  
\- Resumen corto.  
\- Diagnóstico.  
\- Decisión recomendada.  
\- Pasos concretos.  
\- Riesgos.  
\- Checklist de cierre.

---

# **42\. Prompt para aprender MCP con NotebookLM**

Explícame MCP desde cero usando las fuentes cargadas.

Quiero una explicación por capas:

1\. Qué problema resuelve MCP.  
2\. Qué es cliente MCP.  
3\. Qué es servidor MCP.  
4\. Qué son tools, resources y prompts.  
5\. Qué diferencia hay entre stdio y HTTP.  
6\. Cómo se aplica a OpenCode.  
7\. Cómo se aplica a n8n.  
8\. Qué errores debo evitar.  
9\. Qué debo implementar primero en NC Control Tower.  
10\. Qué no debo tocar todavía.

Después hazme 10 preguntas tipo examen práctico para comprobar si lo he entendido.

---

# **43\. Prompt para convertir MCP en SOP NC**

Convierte la información sobre MCP en un SOP operativo para NEGOCIA CONTROL.

El SOP debe incluir:

\- objetivo;  
\- cuándo usar MCP;  
\- cuándo no usar MCP;  
\- roles;  
\- pasos;  
\- checklist;  
\- riesgos;  
\- rollback;  
\- Definition of Done;  
\- plantilla de registro de pruebas;  
\- ejemplo aplicado a OpenCode \+ n8n.

Estilo:  
Claro, directo, operativo, no académico.

---

# **44\. Prompt para diagnosticar error real usando NotebookLM**

Tengo este error MCP:

\[PEGAR ERROR AQUÍ\]

Analízalo usando las fuentes cargadas.

Devuelve:

1\. Tipo de error.  
2\. Causa más probable.  
3\. Qué evidencia falta.  
4\. Qué NO debo tocar todavía.  
5\. Prueba mínima siguiente.  
6\. Prompt para OpenCode.  
7\. Checklist de cierre.

---

# **45\. Prompt para crear TASK\_SPEC MCP desde NotebookLM**

Crea una TASK\_SPEC para implementar o diagnosticar esta conexión MCP:

Cliente MCP:  
Servidor MCP:  
Herramienta:  
Error actual:  
Objetivo:  
Entorno:  
Riesgo:

La TASK\_SPEC debe incluir:

\- objetivo;  
\- contexto;  
\- fuera de alcance;  
\- arquitectura;  
\- permisos;  
\- configuración prevista;  
\- pruebas;  
\- errores esperados;  
\- rollback;  
\- Definition of Done;  
\- prompt para OpenCode.

---

# **46\. Conclusión operativa**

MCP puede ser una pieza estratégica para NC Control Tower.

Pero solo si se usa con criterio.

No es “más automatización”.

Es una capa de conexión entre agentes IA y sistemas reales.

Por eso debe entrar así:

Aprender → documentar → conectar en lectura → diagnosticar → proponer → ejecutar limitado → auditar → escalar.

La regla final:

MCP no es magia. MCP es poder operativo. Y el poder operativo sin arquitectura es deuda técnica con luces LED.

En NEGOCIA CONTROL, MCP debe servir para construir una torre de control real:

* más clara;  
* más segura;  
* más trazable;  
* más escalable;  
* más útil para operar y vender.

Si no cumple eso, no entra.

::contentReference\[oaicite:1\]{index=1}

