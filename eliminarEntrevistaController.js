const db = require('../db');

const eliminarEntrevista = (req, res) => {
  const { entrevista_id } = req.body;

  if (!entrevista_id) {
    return res.status(400).json({ status: 'error', mensaje: 'Falta el ID de la entrevista.' });
  }

  const sql = 'DELETE FROM respuestas WHERE id = ?';
  db.query(sql, [entrevista_id], (err, result) => {
    if (err) {
      console.error('Error al eliminar la entrevista:', err);
      return res.status(500).json({ status: 'error', mensaje: 'Error en el servidor.' });
    }
    res.json({ status: 'ok', mensaje: 'Entrevista eliminada exitosamente.' });
  });
};

module.exports = eliminarEntrevista;
