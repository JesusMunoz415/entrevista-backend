// index.js de tu backend
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: 'https://entrevista-frontend.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Rutas
const authRoutes = require('./routes/authRoutes');
const crearPostulanteRoutes = require('./routes/crearPostulanteRoutes');
const guardarRespuestaRoutes = require('./routes/guardarRespuestaRoutes');
const historialEntrevistasRoutes = require('./routes/historialEntrevistasRoutes');
const eliminarEntrevistaRoutes = require('./routes/eliminarEntrevistaRoutes');

const startServer = async () => {
  try {
    const db = await mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    console.log('✅ Pool de conexiones MySQL creado correctamente');

    // Inyectar conexión en cada request
    app.use((req, res, next) => {
      req.db = db;
      next();
    });

    // Usar las rutas
    app.use('/api/auth', authRoutes);
    app.use('/api/postulantes', crearPostulanteRoutes);
    app.use('/api/guardar-respuesta', guardarRespuestaRoutes);
    app.use('/api/respuestas', guardarRespuestaRoutes); // alias
    app.use('/api/historial', historialEntrevistasRoutes);
    app.use('/api/eliminar-entrevista', eliminarEntrevistaRoutes);

    app.get('/', (req, res) => {
      res.send('🎉 Backend funcionando correctamente');
    });

    app.listen(PORT, () => {
      console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error('❌ Error al crear el pool de MySQL:', err);
  }
};

startServer();
