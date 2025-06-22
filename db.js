const mysql = require('mysql2');
require('dotenv').config();

let db;

if (process.env.DATABASE_URL) {
  // 👉 Para Render: usa la URL completa
  db = mysql.createConnection(process.env.DATABASE_URL);
} else {
  // 👉 Para local: usa las variables de .env
  db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  });
}

db.connect((err) => {
  if (err) {
    console.error("❌ Error al conectar a la base de datos:", err);
  } else {
    console.log("✅ Conectado a la base de datos MySQL");
  }
});

module.exports = db;
