const db = require('../db');

exports.crearEntrevistador = (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ mensaje: 'Faltan campos obligatorios.' });
  }

  const sql = 'INSERT INTO entrevistadores (nombre, email, password) VALUES (?, ?, ?)';
  db.query(sql, [nombre, email, password], (err, result) => {
    if (err) {
      console.error('❌ Error al insertar entrevistador:', err);
      return res.status(500).json({ mensaje: 'Error en el servidor.' });
    }
    res.status(201).json({ mensaje: 'Entrevistador creado', id: result.insertId });
  });
};
