const db = require('../db'); // Conexión a PostgreSQL

const getDashboardData = async (req, res) => {
  const entrevistadorId = req.query.id;

  if (!entrevistadorId) {
    return res.status(400).json({ mensaje: 'Falta el ID del entrevistador' });
  }

  try {
    // Total de entrevistas del entrevistador
    const totalEntrevistas = await db.query(
      'SELECT COUNT(*) FROM entrevistas WHERE entrevistador_id = $1',
      [entrevistadorId]
    );

    // Total de postulantes evaluados
    const totalPostulantes = await db.query(
      'SELECT COUNT(DISTINCT postulante_id) FROM respuestas WHERE entrevistador_id = $1',
      [entrevistadorId]
    );

    // Entrevistas pendientes
    const pendientes = await db.query(
      'SELECT COUNT(*) FROM entrevistas WHERE entrevistador_id = $1 AND estado = $2',
      [entrevistadorId, 'pendiente']
    );

    res.status(200).json({
      totalEntrevistas: totalEntrevistas.rows[0].count,
      totalPostulantes: totalPostulantes.rows[0].count,
      pendientes: pendientes.rows[0].count,
    });
  } catch (err) {
    console.error('❌ Error en getDashboardData:', err);
    res.status(500).json({ mensaje: 'Error al obtener datos del dashboard' });
  }
};

module.exports = { getDashboardData };
