// controllers/crearPostulanteController.js
const db = require('../db');

// ✅ Crear postulante
const crearPostulante = async (req, res) => {
  const { nombre, correo = null, telefono = null } = req.body; // 🔹 Cambio: usar null en lugar de '' para evitar conflicto con UNIQUE

  if (!nombre) {
    return res.status(400).json({ status: 'error', mensaje: 'El nombre es obligatorio.' });
  }

  try {
    // 🔹 Inserción del postulante
    const query = `
      INSERT INTO postulantes (nombre, correo, telefono)
      VALUES ($1, $2, $3)
      RETURNING id
    `;
    const result = await db.query(query, [nombre, correo, telefono]);

    const postulanteId = result.rows[0].id;

    res.json({
      status: 'ok',
      id: postulanteId, // 📦 devuelve el nuevo ID
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

// 🚀 Listar postulantes
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
