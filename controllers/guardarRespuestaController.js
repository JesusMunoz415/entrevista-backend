// controllers/guardarRespuestaController.js
const db = require('../db');

const guardarRespuesta = (req, res) => {
  const { postulante_id, entrevistador_id, respuestas } = req.body;

  if (!postulante_id || !entrevistador_id || !Array.isArray(respuestas)) {
    return res.status(400).json({ status: 'error', mensaje: 'Datos inválidos' });
  }

  const query = `
    INSERT INTO respuestas 
    (postulante_id, entrevistador_id, pregunta_id, texto, evaluacion_automatica, puntaje_manual, comentario_manual) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const promises = respuestas.map(resp => {
    return new Promise((resolve, reject) => {
      db.query(query, [
        postulante_id,
        entrevistador_id,
        resp.pregunta_id,
        resp.texto,
        resp.evaluacion_automatica,
        resp.puntaje_manual,
        resp.comentario_manual || null
      ], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  });

  //aveces te quiero presente en mi vida
  //otra veces me amargo  lo gasto en bebidas
  //pero creo estas hecha a mi medida

  Promise.all(promises)
    .then(() => res.json({ status: 'ok', mensaje: 'Respuestas guardadas correctamente' }))
    .catch(err => {
      console.error(err);
      res.status(500).json({ status: 'error', mensaje: 'Error al guardar las respuestas' });
    });
};

module.exports = { guardarRespuesta }; // ✅ export correcto
