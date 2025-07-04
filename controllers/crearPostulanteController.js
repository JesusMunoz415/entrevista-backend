// controllers/crearPostulanteController.js
// controllers/crearPostulanteController.js
const db = require('../db');

const crearPostulante = (req, res) => {
  const { nombre, correo = '', telefono = '' } = req.body;

  if (!nombre) {
    return res.status(400).json({ status: 'error', mensaje: 'El nombre es obligatorio.' });
  }

  const query = 'INSERT INTO postulantes (nombre, correo, telefono) VALUES (?, ?, ?)';
  db.query(query, [nombre, correo, telefono], (err, result) => {
    if (err) {
      console.error('Error al insertar postulante:', err);
      return res.status(500).json({ status: 'error', mensaje: 'Error al registrar el postulante.' });
    }

    res.json({ status: 'ok', id: result.insertId, nombre });
  });
};

module.exports = crearPostulante;

