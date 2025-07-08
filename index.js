const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ CORS abierto para pruebas
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.options('*', cors());

app.use(express.json());

// 🔥 Middleware de prueba para DB eliminado (no lo necesitamos aquí)

// 📦 Importar rutas (comentadas para pruebas)
// const authRoutes = require('./routes/authRoutes');
// const crearPostulanteRoutes = require('./routes/crearPostulanteRoutes');
// const guardarRespuestaRoutes = require('./routes/guardarRespuestaRoutes');
// const historialEntrevistasRoutes = require('./routes/historialEntrevistasRoutes');
// const eliminarEntrevistaRoutes = require('./routes/eliminarEntrevistaRoutes');

// 🛣️ Usar rutas (comentadas)
// app.use('/api/auth', authRoutes);
// app.use('/api/postulantes', crearPostulanteRoutes);
// app.use('/api/guardar-respuesta', guardarRespuestaRoutes);
// app.use('/api/historial', historialEntrevistasRoutes);
// app.use('/api/eliminar-entrevista', eliminarEntrevistaRoutes);

// 🌐 Ruta raíz
app.get('/', (req, res) => {
  res.send('🎉 Backend funcionando (sin rutas activas)');
});

// ❌ 404 para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ status: 'error', mensaje: 'Ruta no encontrada (sin rutas activas)' });
});

// 🚀 Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Backend corriendo en http://localhost:${PORT} (sin rutas activas)`);
});
