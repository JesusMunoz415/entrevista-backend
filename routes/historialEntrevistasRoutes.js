const express = require('express');
const router = express.Router();
const { obtenerHistorial } = require('../controllers/historialEntrevistasController');

// Ruta POST para obtener el historial de entrevistas
router.post('/', obtenerHistorial);

module.exports = router;
