// backend/routes/historialEntrevistasRoutes.js
const express = require('express');
const router = express.Router();
const { obtenerHistorial } = require('../controllers/historialEntrevistasController');

// POST /api/historial
router.post('/', obtenerHistorial);

module.exports = router;
