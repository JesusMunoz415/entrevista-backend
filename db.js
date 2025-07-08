const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false }, // 🌐 Supabase requiere SSL
  statement_timeout: 10000,           // ⏱️ timeout opcional
  idle_in_transaction_session_timeout: 10000,
  keepAlive: true,                    // 🟢 mantener conexión viva
  connectionTimeoutMillis: 10000,     // 🔥 timeout de conexión
  // 🌐 Forzar IPv4
  family: 4
});

console.log('✅ Conexión a Supabase establecida (IPv4)');
module.exports = pool;
