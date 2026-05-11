# Skill: Premium Frontend Design (Deepmind Edition)

Inspired by the Claude Code Frontend Design plugin, this skill empowers the agent to build stunning, intentional, and high-fidelity interfaces that transcend standard templates.

## Core Directives

### 1. Typography as Architecture
- **Pairing:** Always use a serif/sans-serif pairing or distinct weights to establish hierarchy.
- **Precision:** Use `line-height`, `letter-spacing`, and `optical-sizing` to make text feel professional.
- **Scale:** Use a consistent typographic scale (e.g., Major Third).

### 2. Texture & Depth (The "Premium" Feel)
- **Noise:** Add subtle grain/noise overlays to large background areas to eliminate "flatness."
- **Gradients:** Use multi-stop, non-linear gradients (mesh-like) for backgrounds.
- **Glassmorphism:** Use `backdrop-filter: blur()` combined with subtle borders and shadows to create layered depth.
- **Shadows:** Use layered, soft shadows (ambient occlusion) instead of harsh singular shadows.

### 3. Grid-Breaking Composition
- **Bento Logic:** Use a solid grid foundation but allow elements to slightly overlap or extend beyond their boundaries to create a "crafted" look.
- **Asymmetry:** Introduce intentional asymmetry to guide the eye and add character.

### 4. Meaningful Micro-Interactions
- **States:** Hover, focus, and active states should feel "alive" (elastic transforms, subtle color shifts).
- **Transitions:** Use `cubic-bezier` timing functions for smoother, more natural motion.

### 5. Intentional Constraints
- Avoid default colors. Use curated HSL palettes.
- Avoid 100% black/white. Use deep charcoals and warm creams.

## Implementation Workflow
1. **Analyze:** Look at the current UI through these lenses.
2. **Refine CSS:** Inject the "texture" and "depth" tokens.
3. **Elevate Components:** Apply grid-breaking and premium typography.
4. **Iterate:** Review the visual balance and "wow" factor.
