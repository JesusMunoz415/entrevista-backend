// backend/routes/entrevistasRoutes.js
const express = require('express');
const router = express.Router();

const {
  crearEntrevista,
  obtenerEntrevistaPorId,
  actualizarResultadoEntrevista
} = require('../controllers/entrevistasController');

// ✅ Crear nueva entrevista
router.post('/', crearEntrevista);

// ✅ Obtener entrevista por ID
router.get('/:id', obtenerEntrevistaPorId);

// ✅ Actualizar resultado de entrevista por ID
router.patch('/:id', actualizarResultadoEntrevista);

module.exports = router;
