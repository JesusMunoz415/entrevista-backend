// backend/controllers/eliminarEntrevistaController.js
const db = require('../db');

const eliminarEntrevista = async (req, res) => {
  const { postulante_id, fecha } = req.body;

  if (!postulante_id || !fecha) {
    return res.status(400).json({ status: 'error', mensaje: 'Datos incompletos' });
  }

  const query = `
    DELETE FROM respuestas 
    WHERE postulante_id = $1 AND DATE(fecha_respuesta) = DATE($2)
  `;

  try {
    const result = await db.query(query, [postulante_id, fecha]);

    if (result.rowCount > 0) {
      res.json({ status: 'ok', mensaje: 'Entrevista eliminada correctamente' });
    } else {
      res.json({ status: 'ok', mensaje: 'No se encontró la entrevista' });
    }
  } catch (err) {
    console.error('❌ Error al eliminar entrevista:', err);
    res.status(500).json({ status: 'error', mensaje: 'Error en el servidor' });
  }
};

module.exports = { eliminarEntrevista };
