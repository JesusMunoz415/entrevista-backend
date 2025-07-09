const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configurado solo para tu frontend en Render
app.use(cors({
  origin: 'https://entrevista-frontend.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Rutas
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('🎉 Backend conectado a Railway PostgreSQL y funcionando');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
});
