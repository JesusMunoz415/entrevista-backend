const obtenerHistorial = (req, res) => {
  const { entrevistador_id } = req.body;

  if (!entrevistador_id) {
    return res.status(400).json({ status: 'error', mensaje: 'Falta el ID del entrevistador' });
  }

  const sql = `
    SELECT 
      r.id,
      r.postulante_id,
      p.nombre AS postulante,
      r.fecha,
      r.pregunta_id,
      pr.texto AS pregunta,
      r.texto AS respuesta,
      r.evaluacion_automatica,
      r.puntaje_manual,
      r.comentario_manual
    FROM respuestas r
    JOIN postulantes p ON r.postulante_id = p.id
    JOIN preguntas pr ON r.pregunta_id = pr.id
    WHERE r.entrevistador_id = ?
    ORDER BY r.fecha DESC
  `;

  req.db.query(sql, [entrevistador_id], (err, resultados) => {
    if (err) {
      console.error('❌ Error al obtener historial:', err);
      return res.status(500).json({ status: 'error', mensaje: 'Error al obtener historial' });
    }

    // Agrupar por fecha + postulante
    const entrevistasMap = {};
    resultados.forEach(row => {
      const key = `${row.fecha}-${row.postulante_id}`;
      if (!entrevistasMap[key]) {
        entrevistasMap[key] = {
          fecha: row.fecha,
          postulante: row.postulante,
          respuestas: []
        };
      }

      entrevistasMap[key].respuestas.push({
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
