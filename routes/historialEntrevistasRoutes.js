const express = require('express');
const router = express.Router();
const { obtenerHistorial } = require('../controllers/historialEntrevistasController');

// Ruta para obtener historial de entrevistas
router.post('/', (req, res, next) => {
  console.log('📥 [POST] /api/historial');
  obtenerHistorial(req, res, next);
});

module.exports = router;
