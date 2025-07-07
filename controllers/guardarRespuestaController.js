// controllers/guardarRespuestaController.js
const db = require('../db');

const guardarRespuesta = async (req, res) => {
  const { postulante_id, entrevistador_id, respuestas } = req.body;

  if (!postulante_id || !entrevistador_id || !Array.isArray(respuestas)) {
    return res.status(400).json({ status: 'error', mensaje: 'Datos inválidos' });
  }

  const query = `
    INSERT INTO respuestas 
    (postulante_id, entrevistador_id, pregunta_id, texto, evaluacion_automatica, puntaje_manual, comentario_manual) 
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `;

  try {
    for (const resp of respuestas) {
      await db.query(query, [
        postulante_id,
        entrevistador_id,
        resp.pregunta_id,
        resp.texto,
        resp.evaluacion_automatica,
        resp.puntaje_manual,
        resp.comentario_manual || null
      ]);
    }

    res.json({ status: 'ok', mensaje: 'Respuestas guardadas correctamente' });
  } catch (err) {
    console.error('❌ Error al guardar respuestas:', err);
    res.status(500).json({ status: 'error', mensaje: 'Error al guardar las respuestas' });
  }
};

module.exports = { guardarRespuesta };
