// index.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('❌ Error al conectar a la base de datos:', err);
  } else {
    console.log('✅ Conectado a la base de datos MySQL');
  }
});

// Hacer accesible la conexión a DB desde req
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Rutas
const authRoutes = require('./routes/authRoutes');
const crearPostulanteRoute = require('./routes/crearPostulanteRoute');
const guardarRespuestaRoutes = require('./routes/guardarRespuestaRoutes');
const entrevistadorRoutes = require('./routes/entrevistadorRoutes');
const historialEntrevistasRoutes = require('./routes/historialEntrevistasRoutes');
const eliminarEntrevistaRoutes = require('./routes/eliminarEntrevistaRoutes');

// Usar las rutas
app.use('/api/auth', authRoutes);
app.use('/api', crearPostulanteRoute);
app.use('/api/guardar-respuesta', guardarRespuestaRoutes);
app.use('/api/registrar', entrevistadorRoutes);
app.use('/api/historial', historialEntrevistasRoutes);
app.use('/api/eliminar-entrevista', eliminarEntrevistaRoutes);

// Ruta raíz de prueba
app.get('/', (req, res) => {
  res.send('🎉 Backend funcionando correctamente');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
