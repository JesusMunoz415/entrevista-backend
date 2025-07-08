const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,        // Usar puerto 6543 del Pooler
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false }
});

console.log('✅ Conexión a Supabase Pooler establecida');
module.exports = pool;
