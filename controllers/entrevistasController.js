// backend/controllers/entrevistasController.js
const db = require('../db');

// ✅ Crear nueva entrevista
const crearEntrevista = async (req, res) => {
  const { entrevistador_id, postulante_id, fecha } = req.body;

  if (!entrevistador_id || !postulante_id) {
    return res.status(400).json({ status: 'error', mensaje: 'Faltan campos obligatorios' });
  }

  try {
    // Si no viene fecha, usamos la actual
    const fechaEntrevista = fecha || new Date();

    const result = await db.query(
      `INSERT INTO entrevistas (entrevistador_id, postulante_id, fecha, resultado)
       VALUES ($1, $2, $3, NULL)
       RETURNING id`,
      [entrevistador_id, postulante_id, fechaEntrevista]
    );

    const entrevistaId = result.rows[0].id;
    const enlace = `https://entrevista-frontend.onrender.com/entrevista/${entrevistaId}`;

    res.status(201).json({
      status: 'ok',
      mensaje: 'Entrevista creada exitosamente',
      enlace,
      entrevista_id: entrevistaId
    });
  } catch (err) {
    console.error('❌ Error al crear entrevista:', err);
    res.status(500).json({ status: 'error', mensaje: 'Error en el servidor' });
  }
};

// ✅ Obtener entrevista por ID
const obtenerEntrevistaPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      `SELECT * FROM entrevistas WHERE id = $1`,
      [id]
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

// ✅ Actualizar resultado de entrevista por ID
const actualizarResultadoEntrevista = async (req, res) => {
  const { id } = req.params;
  const { resultado } = req.body;

  if (!resultado) {
    return res.status(400).json({ status: 'error', mensaje: 'El campo resultado es obligatorio' });
  }

  try {
    const result = await db.query(
      `UPDATE entrevistas SET resultado = $1 WHERE id = $2 RETURNING *`,
      [resultado, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'error', mensaje: 'Entrevista no encontrada' });
    }

    res.status(200).json({ status: 'ok', entrevista: result.rows[0] });
  } catch (err) {
    console.error('❌ Error al actualizar resultado de entrevista:', err);
    res.status(500).json({ status: 'error', mensaje: 'Error en el servidor' });
  }
};

module.exports = {
  crearEntrevista,
  obtenerEntrevistaPorId,
  actualizarResultadoEntrevista
};
