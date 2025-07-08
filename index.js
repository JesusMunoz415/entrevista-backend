const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db'); // conexión PostgreSQL

const app = express();
const PORT = process.env.PORT || 3001;

// CORS
app.use(cors({
  origin: 'https://entrevista-frontend.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Middleware para inyectar el pool
app.use((req, res, next) => {
  if (!db) {
    return res.status(500).json({ status: 'error', mensaje: 'DB no inicializada' });
  }
  req.db = db;
  next();
});

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const crearPostulanteRoutes = require('./routes/crearPostulanteRoutes');
const guardarRespuestaRoutes = require('./routes/guardarRespuestaRoutes');
const historialEntrevistasRoutes = require('./routes/historialEntrevistasRoutes');
const eliminarEntrevistaRoutes = require('./routes/eliminarEntrevistaRoutes');

// Usar rutas
app.use('/api/auth', authRoutes);
app.use('/api/postulantes', crearPostulanteRoutes);
app.use('/api/guardar-respuesta', guardarRespuestaRoutes);
app.use('/api/historial', historialEntrevistasRoutes);
app.use('/api/eliminar-entrevista', eliminarEntrevistaRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.send('🎉 Backend funcionando correctamente con Supabase');
});

// Endpoint de prueba para conexión DB
app.get('/api/ping', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json({ status: 'ok', time: result.rows[0].now });
  } catch (err) {
    console.error('❌ Error al hacer ping a la DB:', err);
    res.status(500).json({ status: 'error', mensaje: 'No se pudo conectar a la DB' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
