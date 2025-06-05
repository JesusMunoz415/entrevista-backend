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
  host: process.env.DB_HOST,       // Por ejemplo: 'localhost' o 'caboose.proxy.rlwy.net'
  user: process.env.DB_USER,       // Por ejemplo: 'root'
  password: process.env.DB_PASS,   // Tu contraseña
  database: process.env.DB_NAME    // Por ejemplo: 'railway'
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
// Agrega más rutas aquí como:
// const postulanteRoutes = require('./routes/postulanteRoutes');

app.use('/api/auth', authRoutes);
// app.use('/api/postulantes', postulanteRoutes); // Ejemplo futuro

// Ruta raíz de prueba
app.get('/', (req, res) => {
  res.send('🎉 Backend funcionando correctamente');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});

const crearPostulanteRoute = require('./routes/crearPostulanteRoute');
app.use('/api', crearPostulanteRoute);

const guardarRespuestaRoutes = require('./routes/guardarRespuestaRoutes');
app.use('/api/guardar-respuesta', guardarRespuestaRoutes);
