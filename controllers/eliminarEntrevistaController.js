const db = require('../db');

const eliminarEntrevista = (req, res) => {
  const { postulante_id, fecha } = req.body;

  if (!postulante_id || !fecha) {
    return res.status(400).json({ status: 'error', mensaje: 'Datos incompletos' });
  }

  const query = `
    DELETE FROM respuestas 
    WHERE postulante_id = ? AND DATE(fecha) = DATE(?)
  `;

  db.query(query, [postulante_id, fecha], (err, resultado) => {
    if (err) {
      console.error('Error al eliminar entrevista:', err);
      return res.status(500).json({ status: 'error', mensaje: 'Error en el servidor' });
    }

    if (resultado.affectedRows > 0) {
      res.json({ status: 'ok', mensaje: 'Entrevista eliminada correctamente' });
    } else {
      res.json({ status: 'ok', mensaje: 'No se encontró la entrevista' });
    }
  });
};

module.exports = { eliminarEntrevista };
