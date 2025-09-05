const pool = require('./db');

(async () => {
  try {
    const res = await pool.query('SELECT * FROM public.entrevistadores LIMIT 1');
    console.log('Filas:', res.rows);
    process.exit(0);
  } catch (err) {
    console.error('Error DB:', err);
    process.exit(1);
  }
})();