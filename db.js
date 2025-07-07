const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 60000 // ✅ único timeout válido en mysql2/promise
});

console.log('✅ Pool de conexiones MySQL inicializado correctamente');

// ⏳ Keep-Alive: consulta trivial cada 5 minutos para mantener Railway despierto
setInterval(async () => {
  try {
    const conn = await pool.getConnection();
    await conn.query('SELECT 1');
    conn.release();
    console.log('🔄 Keep-Alive: DB despierta');
  } catch (err) {
    console.error('⚠️ Error en Keep-Alive DB:', err.code);
  }
});

// 🛡️ Manejo global de errores del pool
pool.on('error', (err) => {
  console.error('❌ Error del pool MySQL:', err.code);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.log('♻️ Conexión a la DB perdida. Intentando reconectar...');
  } else {
    throw err;
  }
});

module.exports = pool;
