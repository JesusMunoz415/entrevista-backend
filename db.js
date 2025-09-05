// backend/db.js
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,       // interchange.proxy.rlwy.net
  port: process.env.DB_PORT,       // 16822
  user: process.env.DB_USER,       // postgres
  password: process.env.DB_PASS,   // tu contraseña pública
  database: process.env.DB_NAME,   // railway
  ssl: { rejectUnauthorized: false }, // necesario para Render
  // Forzar esquema public
  options: '-c search_path=public'
});

// Comprobar conexión y search_path
(async () => {
  try {
    const res = await pool.query('SHOW search_path');
    console.log('✅ Conexión a Railway PostgreSQL establecida');
    console.log('🔹 search_path actual:', res.rows[0].search_path);
  } catch (err) {
    console.error('❌ Error DB:', err);
  }
})();

module.exports = pool;
