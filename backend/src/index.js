import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import leadsRouter from './routes/leads.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'nc-control-tower-backend',
    phase: process.env.PHASE || 'laboratorio'
  });
});

app.use('/api', leadsRouter);

app.use((err, req, res, next) => {
  console.error('Error no manejado:', err);
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 NC Control Tower Backend corriendo en http://localhost:${PORT}`);
  console.log(`📋 Fase ${process.env.PHASE || 'laboratorio'}`);
  console.log(`🔗 Endpoints disponibles en /api/*`);
});

export default app;