const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,           // crossover.proxy.rlwy.net
  user: process.env.DB_USER,           // postgres
  password: process.env.DB_PASS,       // tu password Railway
  database: process.env.DB_NAME,       // railway
  port: process.env.DB_PORT,           // 47056
  ssl: {
    rejectUnauthorized: false          // ✅ para conexión segura
  }
});

// 🔥 Forzar uso del esquema público al conectarse
pool.query('SET search_path TO public')
  .then(() => console.log('🎯 Conectado a PostgreSQL y usando schema public'))
  .catch(err => console.error('❌ Error al establecer schema public:', err));

module.exports = pool;
