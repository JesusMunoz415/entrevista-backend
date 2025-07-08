const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db'); // ✅ conexión a Supabase (PostgreSQL)

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ CORS: permite frontend en Render y localhost para pruebas
app.use(cors({
  origin: [
    'https://entrevista-frontend.onrender.com',
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// 🔥 Responder a preflight OPTIONS requests
app.options('*', cors());

app.use(express.json());

// ✅ Middleware para inyectar db en cada request
app.use((req, res, next) => {
  req.db = db;
  next();
});

// 🛣️ Importar rutas
const authRoutes = require('./routes/authRoutes');
const crearPostulanteRoutes = require('./routes/crearPostulanteRoutes');
const guardarRespuestaRoutes = require('./routes/guardarRespuestaRoutes');
const historialEntrevistasRoutes = require('./routes/historialEntrevistasRoutes');
const eliminarEntrevistaRoutes = require('./routes/eliminarEntrevistaRoutes');

// 📌 Usar rutas
app.use('/api/auth', authRoutes);
app.use('/api/postulantes', crearPostulanteRoutes);
app.use('/api/guardar-respuesta', guardarRespuestaRoutes);
app.use('/api/historial', historialEntrevistasRoutes);
app.use('/api/eliminar-entrevista', eliminarEntrevistaRoutes);

// 🌐 Ruta raíz
app.get('/', (req, res) => {
  res.send('🎉 Backend funcionando correctamente con Supabase y CORS configurado');
});

// ❌ Middleware para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ status: 'error', mensaje: 'Ruta no encontrada' });
});

// ❌ Middleware de manejo de errores global
app.use((err, req, res, next) => {
  console.error('🔥 Error interno:', err);
  res.status(500).json({ status: 'error', mensaje: 'Error interno en el servidor' });
});

// 🚀 Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
