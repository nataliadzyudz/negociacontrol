# BRAND_UI_TOKENS_NC

## 1. Regla Canónica de Marca
- **Fuente de verdad:** `docs/00_CANON/brand/BRANDINGBOOK_V3.pdf` es el documento **CANÓNICO** y final de la marca Negocia Control. 
- **Propósito de este archivo:** Este documento (`BRAND_UI_TOKENS_NC.md`) actúa EXCLUSIVAMENTE como un mapeo técnico (Design Tokens) para facilitar la implementación en código del Dashboard UI y la operativa frontend por parte de Antigravity. Si existe discrepancia, manda el PDF.

## 2. Identidad y Tono (Antigravity Limits)
- **Tono Visual:** "Claro, firme, humano, premium-práctico".
- **Límites de diseño:**
  - Evitar diseño sobrecargado.
  - Usar tipografías claras (Serif para jerarquía, Sans para lectura de datos).
  - Mantener densidad operativa alta (Dashboard) sin perder contraste ni orden.
  - El uso de colores semánticos (Rojo, Amarillo, Verde) tiene prioridad técnica de Triaje, NO decorativa.

## 3. Core Palette Tokens

### Backgrounds
- `--bg-primary`: `#F9F6F1` (Fondo cálido premium - hueso NC)
- `--bg-secondary`: `#EAF0F5` (Azul pálido operativo)

### Text
- `--text-primary`: `#17212B` (Charcoal NC profundo)
- `--text-secondary`: `#4B5A69`

### Brand Accent & Primary Colors
- `--accent`: `#D4612A` (Terracota NC)
- `--accent-hover`: `#B54D1F`
- `--primary-blue`: `#1C6EA4` (Azul corporativo NC)
- `--border-color`: `rgba(226, 232, 240, 0.6)`

## 4. Typography
- `--font-serif`: `'DM Serif Display', serif;` (Para títulos, nombres, logo - Autoridad)
- `--font-sans`: `'Manrope', sans-serif;` (Para UI general, dashboard, tags - Claridad)

## 5. Semantic Triage Palette (Semáforos)
*Estrictamente alineado con Semaforo_final.*
- **Verde:** Text `--color-verde: #166534`, BG `--bg-verde: #DCFCE7`, Dot `--semaforo-verde: #82C99B`
- **Amarillo:** Text `--color-amarillo: #854D0E`, BG `--bg-amarillo: #FEF9C3`
- **Rojo:** Text `--color-rojo: #991B1B`, BG `--bg-rojo: #FEE2E2`
- **Error/Incidencia:** Text `--color-error: #3730A3`, BG `--bg-error: #E0E7FF`
- **Semaforo_IA:** Dato informativo/auditoría (No gobierna pipeline).

## 6. Pipeline State Borders (Estado)
*Estado gobierna columnas/pipeline. SEPARADO de Semaforo_final.*
- **Nuevo:** `--border-azul: #7FB3D5`
- **En Revisión / Falta Dato:** `--border-amarillo: #F3CC62`
- **Contactado / Reservado:** `--border-indigo: #9FA8DA`
- **Diagnóstico Propuesto:** `--border-verde-claro: #82C99B`
- **Cliente Activo:** `--border-verde-oscuro: #166534`
- **No Encaja / Rechazado:** `--border-rojo: #E57373`
- **Error IA:** `--border-error-dark: #312E81`
- **Archivado / No Contesta:** `--border-neutral: #CBD5E1`
- **Urgente (filtro):** `--border-naranja: #E68A5C`
