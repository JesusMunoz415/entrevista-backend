const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,       // interchange.proxy.rlwy.net
  port: process.env.DB_PORT,       // 16822
  user: process.env.DB_USER,       // postgres
  password: process.env.DB_PASS,   // VCghOSXt1brChQjHboZCqQgMvCFIMpVf
  database: process.env.DB_NAME,   // railway
  ssl: { rejectUnauthorized: false } // ✅ necesario para Render
});

console.log('✅ Conexión a Railway PostgreSQL establecida');

module.exports = pool;

