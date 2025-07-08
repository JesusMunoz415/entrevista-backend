const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware CORS
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Preflight
app.options('*', cors());

app.use(express.json());

// Rutas
const authRoutes = require('./routes/authRoutes');
const crearPostulanteRoutes = require('./routes/crearPostulanteRoutes');
const guardarRespuestaRoutes = require('./routes/guardarRespuestaRoutes');
const historialEntrevistasRoutes = require('./routes/historialEntrevistasRoutes');
const eliminarEntrevistaRoutes = require('./routes/eliminarEntrevistaRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/postulantes', crearPostulanteRoutes);
app.use('/api/guardar-respuesta', guardarRespuestaRoutes);
app.use('/api/historial', historialEntrevistasRoutes);
app.use('/api/eliminar-entrevista', eliminarEntrevistaRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.send('🎉 Backend corriendo correctamente con Supabase Transaction Pooler');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
});
