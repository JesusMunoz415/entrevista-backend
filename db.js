const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 60000,    // ⏱ 60 segundos para conectar
  acquireTimeout: 60000,    // ⏱ 60 segundos para adquirir conexión
  timeout: 60000            // ⏱ 60 segundos de timeout general
});

console.log('✅ Pool de conexiones MySQL inicializado con timeouts extendidos');

// ⏳ Keep-Alive: consulta trivial cada 5 minutos para evitar que Railway duerma la DB
setInterval(async () => {
  try {
    const conn = await pool.getConnection();
    await conn.query('SELECT 1'); // Ping trivial
    conn.release();
    console.log('🔄 Keep-Alive: DB despierta');
  } catch (err) {
    console.error('⚠️ Error en Keep-Alive DB:', err.code);
  }
}, 300000); // 5 minutos = 300000 ms

// 🛡️ Manejador de errores global del pool
pool.on('error', (err) => {
  console.error('❌ MySQL Pool Error:', err.code);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.log('♻️ Intentando reconexión a la DB...');
  } else {
    throw err;
  }
});

module.exports = pool;
