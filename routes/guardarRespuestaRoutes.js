// backend/routes/guardarRespuestaRoutes.js
const express = require('express');
const router = express.Router();
const { guardarRespuesta } = require('../controllers/guardarRespuestaController');

// Corregido:
router.post('/', guardarRespuesta);

module.exports = router;
