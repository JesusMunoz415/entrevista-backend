// backend/controllers/guardarRespuestaController.js
const db = require('../db');

const guardarRespuestas = async (req, res) => {
  const { entrevista_id, respuestas } = req.body;

  if (!entrevista_id || !respuestas || !Array.isArray(respuestas)) {
    return res.status(400).json({ mensaje: 'Datos incompletos para guardar respuestas' });
  }

  try {
    for (const r of respuestas) {
      await db.query(
        'INSERT INTO respuestas (entrevista_id, pregunta_id, respuesta, puntuacion) VALUES ($1, $2, $3, $4)',
        [entrevista_id, r.pregunta_id, r.respuesta, r.puntuacion]
      );
    }

    console.log('✅ Respuestas guardadas correctamente');
    res.status(201).json({ mensaje: 'Respuestas guardadas' });
  } catch (err) {
    console.error('❌ Error al guardar respuestas:', err);
    res.status(500).json({ mensaje: 'Error en el servidor al guardar respuestas' });
  }
};

module.exports = { guardarRespuestas };
