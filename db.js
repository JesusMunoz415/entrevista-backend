// db.js
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false, // ✅ necesario para Railway/Render
  },
});

pool.on('connect', () => {
  console.log('✅ Conexión a Railway PostgreSQL establecida');
});

// 🔥 Forzar uso del esquema public
pool.query('SET search_path TO public');

module.exports = pool;
