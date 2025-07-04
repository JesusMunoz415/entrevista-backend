const obtenerHistorial = async (req, res) => {
  try {
    const { entrevistador_id } = req.body;
    const db = req.db;

    console.log('📥 Petición recibida para historial del entrevistador:', entrevistador_id);

    if (!entrevistador_id) {
      console.error('⚠️ Error: entrevistador_id no proporcionado');
      return res.status(400).json({ status: 'error', mensaje: 'ID de entrevistador requerido' });
    }

    // Ejecutar consulta
    const [rows] = await db.query(`
      SELECT 
        p.nombre AS postulante,
        r.fecha,
        r.pregunta_id,
        r.texto AS respuesta,
        r.evaluacion_automatica,
        r.puntaje_manual,
        r.comentario_manual
      FROM respuestas r
      JOIN postulantes p ON r.postulante_id = p.id
      WHERE r.entrevistador_id = ?
      ORDER BY r.fecha DESC
    `, [entrevistador_id]);

    console.log(`📊 Se encontraron ${rows.length} registros en la consulta`);

    if (rows.length === 0) {
      console.warn('⚠️ No hay datos de entrevistas para este entrevistador');
      return res.status(404).json({ status: 'vacio', mensaje: 'No hay entrevistas registradas' });
    }

    // Agrupar resultados
    const entrevistas = [];
    const mapa = new Map();

    for (const row of rows) {
      const clave = `${row.postulante}_${row.fecha}`;
      if (!mapa.has(clave)) {
        mapa.set(clave, {
          postulante: row.postulante,
          fecha: row.fecha,
          respuestas: []
        });
      }

      mapa.get(clave).respuestas.push({
        pregunta: `Pregunta ${row.pregunta_id}`,
        respuesta: row.respuesta,
        evaluacion_automatica: row.evaluacion_automatica,
        puntaje_manual: row.puntaje_manual,
        comentario_manual: row.comentario_manual
      });
    }

    console.log('✅ Historial procesado correctamente');
    res.json({ status: 'ok', entrevistas: Array.from(mapa.values()) });
  } catch (err) {
    console.error('❌ Error en historial (controlador):', err);
    res.status(500).json({ status: 'error', mensaje: 'Fallo en historial' });
  }
};

module.exports = { obtenerHistorial };
