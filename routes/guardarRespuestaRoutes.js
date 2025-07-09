// backend/routes/guardarRespuestaRoutes.js
const express = require('express');
const router = express.Router();
const guardarRespuestaController = require('../controllers/guardarRespuestaController');

// Ruta para guardar respuestas
router.post('/', guardarRespuestaController.guardarRespuestas);

module.exports = router;
