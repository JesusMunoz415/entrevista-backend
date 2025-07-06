// backend/index.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS
app.use(cors({
  origin: 'https://entrevista-frontend.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Configuración avanzada del pool MySQL
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 60000,      // ⏱️ 60 segundos para conectar
  acquireTimeout: 60000,      // ⏱️ 60 segundos para adquirir conexión
  enableKeepAlive: true,      // 🔥 Mantener viva la conexión
  keepAliveInitialDelay: 0    // 🔥 Sin retraso inicial
};

let db;

(async () => {
  try {
    db = await mysql.createPool(dbConfig);
    console.log('✅ Pool de conexiones MySQL inicializado correctamente');
  } catch (err) {
    console.error('❌ Error al inicializar el pool de MySQL:', err);
  }
})();

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
  res.send('🎉 Backend funcionando correctamente');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
