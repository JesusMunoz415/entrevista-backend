const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ CORS configurado para producción y desarrollo
const allowedOrigins = [
  'https://entrevista-frontend.onrender.com', // frontend en Render
  'http://localhost:3000',                    // frontend local
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// 📦 Importar rutas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/postulantes', require('./routes/crearPostulanteRoutes'));
app.use('/api/guardar-respuesta', require('./routes/guardarRespuestaRoutes'));
app.use('/api/historial', require('./routes/historialEntrevistasRoutes'));
app.use('/api/eliminar-entrevista', require('./routes/eliminarEntrevistaRoutes'));

// 🏠 Ruta raíz
app.get('/', (req, res) => {
  res.send('🎉 Backend conectado a Railway PostgreSQL y funcionando');
});

// 🚀 Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
});
