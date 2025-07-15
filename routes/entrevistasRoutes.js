// backend/routes/entrevistasRoutes.js
const express = require('express');
const router = express.Router();
const { crearEntrevista, obtenerEntrevistaPorToken } = require('../controllers/entrevistasController');

// POST /api/entrevistas ➝ Crear entrevista
router.post('/', crearEntrevista);

// GET /api/entrevistas/:token ➝ Obtener entrevista por token
router.get('/:token', obtenerEntrevistaPorToken);

module.exports = router;
