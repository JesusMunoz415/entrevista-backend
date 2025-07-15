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

// 🚀 Bloque agregado para listar postulantes
const listarPostulantes = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT id, nombre, creado_en, correo, telefono
      FROM postulantes
      ORDER BY creado_en DESC
    `);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error('❌ Error al listar postulantes:', err);
    return res.status(500).json({
      status: 'error',
      mensaje: 'Error al obtener la lista de postulantes.'
    });
  }
};
module.exports = { crearPostulante, listarPostulantes };
