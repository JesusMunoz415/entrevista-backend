const { Pool } = require('pg');

const pool = new Pool({
  host: 'db.yntqvycarvwchtplnwex.supabase.co',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 6543, // 👈 Transaction Pooler
  ssl: {
    rejectUnauthorized: false
  }
});

console.log('✅ Conexión a Supabase (Transaction Pooler) establecida');
module.exports = pool;
