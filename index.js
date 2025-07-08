const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// 🔥 Configuración CORS (solo tu frontend)
app.use(cors({
  origin: 'https://entrevista-frontend.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// 📦 Importar rutas
const authRoutes = require('./routes/authRoutes');
const crearPostulanteRoutes = require('./routes/crearPostulanteRoutes');
const guardarRespuestaRoutes = require('./routes/guardarRespuestaRoutes');
const historialEntrevistasRoutes = require('./routes/historialEntrevistasRoutes');
const eliminarEntrevistaRoutes = require('./routes/eliminarEntrevistaRoutes');

// 📂 Usar rutas
app.use('/api/auth', authRoutes);
app.use('/api/postulantes', crearPostulanteRoutes);
app.use('/api/guardar-respuesta', guardarRespuestaRoutes);
app.use('/api/historial', historialEntrevistasRoutes);
app.use('/api/eliminar-entrevista', eliminarEntrevistaRoutes);

// 🌱 Ruta raíz
app.get('/', (req, res) => {
  res.send('🎉 Backend funcionando correctamente con Supabase (Transaction Pooler)');
});

// 🚀 Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
