// backend/routes/entrevistasRoutes.js
const express = require('express');
const router = express.Router();
const {
  crearEntrevista,
  obtenerEntrevistaPorToken,
  actualizarEstadoEntrevista
} = require('../controllers/entrevistasController');

// ✅ Crear nueva entrevista
router.post('/', crearEntrevista);

// ✅ Obtener entrevista por token
router.get('/:token', obtenerEntrevistaPorToken);

// ✅ Actualizar estado de entrevista
router.patch('/:token', actualizarEstadoEntrevista);

module.exports = router;
