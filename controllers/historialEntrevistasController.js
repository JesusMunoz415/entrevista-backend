const db = require('../db');

const obtenerHistorial = (req, res) => {
  const { entrevistador_id } = req.body;

  if (!entrevistador_id) {
    return res.status(400).json({ status: 'error', mensaje: 'ID inválido' });
  }

  const query = `
    SELECT r.id, p.nombre AS postulante, r.fecha, r.evaluacion_automatica, r.puntaje_manual, r.comentario_manual, 
           pr.texto AS pregunta, r.texto AS respuesta
    FROM respuestas r
    JOIN postulantes p ON r.postulante_id = p.id
    JOIN preguntas pr ON r.pregunta_id = pr.id
    WHERE r.entrevistador_id = ?
    ORDER BY r.fecha DESC, r.postulante_id, r.pregunta_id
  `;

  db.query(query, [entrevistador_id], (err, resultados) => {
    if (err) {
      console.error('Error al obtener historial:', err);
      return res.status(500).json({ status: 'error', mensaje: 'Error interno' });
    }

    const entrevistasMap = {};

    resultados.forEach(row => {
      const clave = `${row.postulante}-${row.fecha}`;
      if (!entrevistasMap[clave]) {
        entrevistasMap[clave] = {
          postulante: row.postulante,
          fecha: row.fecha,
          respuestas: []
        };
      }

      entrevistasMap[clave].respuestas.push({
        pregunta: row.pregunta,
        respuesta: row.respuesta,
        evaluacion_automatica: row.evaluacion_automatica,
        puntaje_manual: row.puntaje_manual,
        comentario_manual: row.comentario_manual
      });
    });

    const entrevistas = Object.values(entrevistasMap);
    res.json({ status: 'ok', entrevistas });
  });
};

module.exports = { obtenerHistorial };
