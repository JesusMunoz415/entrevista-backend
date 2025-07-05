// index.js de tu backend
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración de CORS
app.use(cors({
    origin: 'https://entrevista-frontend.onrender.com', // Cambia a tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

// Pool de conexiones MySQL
let pool;
(async () => {
    try {
        pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
        console.log('✅ Pool de conexiones MySQL creado correctamente');
    } catch (err) {
        console.error('❌ Error al crear el pool de MySQL:', err);
    }
})();

// Middleware para inyectar pool
app.use((req, res, next) => {
    if (!pool) {
        return res.status(500).json({ status: 'error', message: 'DB no inicializada' });
    }
    req.db = pool;
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
app.use('/api/respuestas', guardarRespuestaRoutes); // Alias extra
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
