const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ CORS configurado (solo para tu frontend en Render y localhost para desarrollo)
app.use(cors({
  origin: [
    'https://entrevista-frontend.onrender.com', // 🌐 frontend en Render
    'http://localhost:3000'                     // 🖥️ frontend local
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// 🔥 Manejo de preflight OPTIONS
app.options('*', cors());

app.use(express.json());

// 📦 Importar rutas
const authRoutes = require('./routes/authRoutes');
const crearPostulanteRoutes = require('./routes/crearPostulanteRoutes');
const guardarRespuestaRoutes = require('./routes/guardarRespuestaRoutes');
const historialEntrevistasRoutes = require('./routes/historialEntrevistasRoutes');
const eliminarEntrevistaRoutes = require('./routes/eliminarEntrevistaRoutes');

// 🛣️ Usar rutas
app.use('/api/auth', authRoutes);
app.use('/api/postulantes', crearPostulanteRoutes);
app.use('/api/guardar-respuesta', guardarRespuestaRoutes);
app.use('/api/historial', historialEntrevistasRoutes);
app.use('/api/eliminar-entrevista', eliminarEntrevistaRoutes);

// 🌐 Ruta raíz
app.get('/', (req, res) => {
  res.send('🎉 Backend funcionando con Supabase y todas las rutas activas');
});

// ❌ 404 para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ status: 'error', mensaje: 'Ruta no encontrada' });
});

// 💣 Middleware global de errores
app.use((err, req, res, next) => {
  console.error('🔥 Error interno:', err);
  res.status(500).json({ status: 'error', mensaje: 'Error interno del servidor' });
});

// 🚀 Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
});
