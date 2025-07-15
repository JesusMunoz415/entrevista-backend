// backend/controllers/entrevistasController.js
const db = require('../db');

// ✅ Crear nueva entrevista
const crearEntrevista = async (req, res) => {
  const { entrevistador_id, postulante_id, fecha } = req.body;

  if (!entrevistador_id || !postulante_id || !fecha) {
    return res.status(400).json({ status: 'error', mensaje: 'Faltan campos obligatorios' });
  }

  try {
    const result = await db.query(
      `INSERT INTO entrevistas (entrevistador_id, postulante_id, fecha)
       VALUES ($1, $2, $3)
       RETURNING id, token`,
      [entrevistador_id, postulante_id, fecha]
    );

    const { token } = result.rows[0];
    const enlace = `https://entrevista-frontend.onrender.com/entrevista/${token}`;

    res.status(201).json({
      status: 'ok',
      mensaje: 'Entrevista creada exitosamente',
      enlace
    });
  } catch (err) {
    console.error('❌ Error al crear entrevista:', err);
    res.status(500).json({ status: 'error', mensaje: 'Error en el servidor' });
  }
};

// ✅ Obtener entrevista por token
const obtenerEntrevistaPorToken = async (req, res) => {
  const { token } = req.params;

  try {
    const result = await db.query(
      `SELECT * FROM entrevistas WHERE token = $1`,
      [token]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'error', mensaje: 'Entrevista no encontrada' });
    }

    res.status(200).json({ status: 'ok', entrevista: result.rows[0] });
  } catch (err) {
    console.error('❌ Error al obtener entrevista:', err);
    res.status(500).json({ status: 'error', mensaje: 'Error en el servidor' });
  }
};

// ✅ Actualizar estado de entrevista
const actualizarEstadoEntrevista = async (req, res) => {
  const { token } = req.params;
  const { estado } = req.body;

  if (!estado) {
    return res.status(400).json({ status: 'error', mensaje: 'El campo estado es obligatorio' });
  }

  try {
    const result = await db.query(
      `UPDATE entrevistas SET estado = $1 WHERE token = $2 RETURNING *`,
      [estado, token]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'error', mensaje: 'Entrevista no encontrada' });
    }

    res.status(200).json({ status: 'ok', entrevista: result.rows[0] });
  } catch (err) {
    console.error('❌ Error al actualizar estado de entrevista:', err);
    res.status(500).json({ status: 'error', mensaje: 'Error en el servidor' });
  }
};

module.exports = {
  crearEntrevista,
  obtenerEntrevistaPorToken,
  actualizarEstadoEntrevista
};
