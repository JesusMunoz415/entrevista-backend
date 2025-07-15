const express = require('express');
const router = express.Router();
const { crearEntrevista, obtenerEntrevistaPorToken, actualizarEstadoEntrevista } = require('../controllers/entrevistasController');

// POST /api/entrevistas
router.post('/', crearEntrevista);

// GET /api/entrevistas/:token
router.get('/:token', obtenerEntrevistaPorToken);

// PATCH /api/entrevistas/:token
router.patch('/:token', actualizarEstadoEntrevista);

module.exports = router;
