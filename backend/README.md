# NC Control Tower v2 — Backend de Laboratorio

## Fase 2A

Backend mínimo para conectar con Supabase en entorno de laboratorio.

## Requisitos

- Node.js 18+
- npm

## Instalación

```bash
cd backend
npm install
```

## Configuración

1. Copiar `.env.example` a `.env`:
```bash
cp .env.example .env
```

2. Completar las variables en `.env`:
```
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu-anon-key
```

## Ejecutar

```bash
# Desarrollo
npm run dev

# Producción
npm start
```

El servidor estará en `http://localhost:3001`

## Endpoints

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/health` | Estado del servicio |
| GET | `/api/leads` | Listar todos los leads |
| GET | `/api/leads/:id` | Obtener lead por ID |
| POST | `/api/intake/test` | Crear lead de prueba |
| POST | `/api/leads/:id/triage` | Crear triaje IA |
| PATCH | `/api/leads/:id/status` | Cambiar estado operativo |
| POST | `/api/leads/:id/notes` | Añadir nota |

## Ejemplo de uso

### Obtener todos los leads

```bash
curl http://localhost:3001/api/leads
```

### Crear lead de prueba

```bash
curl -X POST http://localhost:3001/api/intake/test \
  -H "Content-Type: application/json" \
  -d '{
    "lead_code": "L-TEST-001",
    "nombre": "Test Lead Verde",
    "email": "test@example.com",
    "whatsapp": "34600000000",
    "idioma_preferido": "Español",
    "consentimiento_valido": true,
    "email_valido": true,
    "whatsapp_valido": true
  }'
```

### Cambiar estado

```bash
curl -X PATCH http://localhost:3001/api/leads/{id}/status \
  -H "Content-Type: application/json" \
  -d '{
    "estado_nuevo": "DIAGNOSTICO_PROPUESTO",
    "motivo": "Lead verde verificado"
  }'
```

## Reglas de Seguridad

- NO exponer `SERVICE_ROLE_KEY` en código
- Usar `SUPABASE_ANON_KEY` para operaciones de lectura/escritura
- No guardar secretos en archivos versionados
- Validar datos antes de escribir en Supabase

## Notas

- Este backend es para **laboratorio Fase 2A**
- No conecta con Google Sheets
- No envía mensajes automáticos
- No implementa pagos ni calendario
- Los errores se registran en `error_logs` de Supabase

## Siguiente Paso

**TASK_2A_03_SEED_TEST_DATA** — Verificar que los datos de prueba se cargan correctamente.