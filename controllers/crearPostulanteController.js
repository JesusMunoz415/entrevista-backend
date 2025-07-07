// controllers/crearPostulanteController.js
const db = require('../db');

const crearPostulante = async (req, res) => {
  const { nombre, correo = '', telefono = '' } = req.body;

  if (!nombre) {
    return res.status(400).json({ status: 'error', mensaje: 'El nombre es obligatorio.' });
  }

  try {
    const query = `
      INSERT INTO postulantes (nombre, correo, telefono)
      VALUES ($1, $2, $3)
      RETURNING id
    `;
    const result = await db.query(query, [nombre, correo, telefono]);

    res.json({
      status: 'ok',
      id: result.rows[0].id, // 📦 devuelve el nuevo ID
      nombre
    });
  } catch (err) {
    console.error('❌ Error al insertar postulante:', err);
    return res.status(500).json({
      status: 'error',
      mensaje: 'Error al registrar el postulante.'
    });
  }
};

module.exports = crearPostulante;
