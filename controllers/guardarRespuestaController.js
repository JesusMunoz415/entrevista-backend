// controllers/guardarRespuestasController.js
const db = require('../db');

const guardarRespuestas = async (req, res) => {
  const { entrevista_id, respuestas } = req.body;

  if (!entrevista_id || !respuestas || !Array.isArray(respuestas)) {
    return res.status(400).json({ mensaje: 'Datos incompletos para guardar respuestas' });
  }

  try {
    for (const respuesta of respuestas) {
      if (
        !respuesta.pregunta_id ||
        typeof respuesta.texto !== 'string' ||
        typeof respuesta.evaluacion_automatica !== 'string' ||
        typeof respuesta.puntaje_manual !== 'number' ||
        typeof respuesta.comentario_manual !== 'string'
      ) {
        return res.status(400).json({ mensaje: 'Datos inválidos en una respuesta' });
      }

      await db.query(
        `INSERT INTO respuestas 
        (entrevista_id, pregunta_id, texto, evaluacion_automatica, puntaje_manual, comentario_manual, fecha)
        VALUES ($1, $2, $3, $4, $5, $6, NOW())`,
        [
          entrevista_id,
          respuesta.pregunta_id,
          respuesta.texto,
          respuesta.evaluacion_automatica,
          respuesta.puntaje_manual,
          respuesta.comentario_manual
        ]
      );
    }

    console.log(`✅ Respuestas guardadas para entrevista_id: ${entrevista_id}`);
    res.status(201).json({ mensaje: 'Respuestas guardadas exitosamente' });
  } catch (err) {
    console.error('❌ Error al guardar respuestas:', err);
    res.status(500).json({ mensaje: 'Error al guardar respuestas' });
  }
};


module.exports = { guardarRespuestas }; 
