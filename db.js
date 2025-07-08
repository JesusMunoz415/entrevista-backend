const { Pool } = require('pg');
const dns = require('dns');

// 🌐 Forzar resolución IPv4 para Supabase
dns.setDefaultResultOrder('ipv4first');

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false }, // Supabase requiere SSL
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 10000,
  keepAlive: true
});

console.log('✅ Conexión a Supabase establecida (IPv4 primero)');
module.exports = pool;
