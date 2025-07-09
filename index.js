const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// 🌎 CORS configuración
const allowedOrigins = [
  'https://entrevista-frontend.onrender.com', // frontend en producción
  'http://localhost:3000'                     // para pruebas locales
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// 🌐 Manejo explícito de preflight (evita CORS error con OPTIONS)
app.options('*', cors());

// 📦 Middleware para parsear JSON
app.use(express.json());

// 📁 Importar rutas
const authRoutes = require('./routes/authRoutes');
const crearPostulanteRoutes = require('./routes/crearPostulanteRoutes');
const guardarRespuestaRoutes = require('./routes/guardarRespuestaRoutes');
const historialEntrevistasRoutes = require('./routes/historialEntrevistasRoutes');
const eliminarEntrevistaRoutes = require('./routes/eliminarEntrevistaRoutes');

// 🔗 Usar rutas
app.use('/api/auth', authRoutes);
app.use('/api/postulantes', crearPostulanteRoutes);
app.use('/api/guardar-respuesta', guardarRespuestaRoutes);
app.use('/api/historial', historialEntrevistasRoutes);
app.use('/api/eliminar-entrevista', eliminarEntrevistaRoutes);

// 📄 Ruta raíz
app.get('/', (req, res) => {
  res.send('🎉 Backend conectado a Railway PostgreSQL y funcionando');
});

// 🚀 Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
});
