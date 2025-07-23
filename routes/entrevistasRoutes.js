// backend/routes/entrevistasRoutes.js
const express = require('express');
const router = express.Router();
const {
  crearEntrevista,
  obtenerEntrevistaPorId,
  actualizarEstadoEntrevista
} = require('../controllers/entrevistasController');

// ✅ Crear nueva entrevista
router.post('/', crearEntrevista);

// ✅ Obtener entrevista por ID
router.get('/:id', obtenerEntrevistaPorId);

// ✅ Actualizar estado de entrevista por ID
router.patch('/:id', actualizarEstadoEntrevista);

module.exports = router;
