# Git Release Protocol — NC Control Tower

## Objetivo

Protocolo operativo para cerrar hitos con commit y tag sin incluir secretos ni romper trazabilidad.

## Cuándo usarlo

Usar cuando Natalia diga:

"haz commit/tag del hito"

o

"cierra el hito"

## Reglas críticas

- No commitear `.env`.
- No commitear `backend/.env`.
- No commitear archivos `.pem`.
- No commitear `opencode.json`.
- No commitear credenciales, tokens, passwords, service accounts ni claves.
- No hacer push salvo instrucción expresa.
- Si aparece un secreto staged/tracked, parar y corregir antes de commit.
- Siempre crear tag anotado para hitos relevantes.
- Siempre devolver evidencia.

## Checklist antes de commit

Ejecutar:

```bash
git status --short
git diff --name-only
git ls-files | grep -E "(\.env|\.pem|opencode\.json|credentials|token|secret|key)" || true
git status --short | grep -E "(\.env|\.pem|opencode\.json|credentials|token|secret|key)" || true
```

Validar:

- No hay secretos en staged.
- Los archivos modificados corresponden al hito.
- El árbol no incluye cambios accidentales fuera del alcance.

## Commit del hito

1. Staging selectivo de archivos del hito.
2. Commit con mensaje claro de cierre.

Patrón recomendado de mensaje:

- `release: close <hito> milestone`
- `feat: approve <hito> controlled v0`
- `security: harden <componente> for controlled v0`

## Tag del hito

Crear tag anotado después del commit:

```bash
git tag -a <tag_name> -m "<tag_description>"
```

Patrón recomendado de tags:

- `hito-<nombre>-v0`
- `release-<fase>-<fecha>`

Ejemplo:

- `git tag -a hito-aws-controlled-v0 -m "NC Control Tower AWS Controlled V0 approved"`

## Verificación posterior

Ejecutar:

```bash
git show --stat -1
git tag --list | tail -n 10
git status --short
```

Validar:

- Commit creado correctamente.
- Tag creado y apuntando al commit del hito.
- Working tree limpio o con cambios esperados no incluidos.

## Evidencia mínima a devolver

- Archivos incluidos en commit.
- SHA del commit.
- Nombre del tag.
- Confirmación de que no hubo push.
- Riesgos o pendientes no bloqueantes.
