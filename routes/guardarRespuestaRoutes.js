const express = require('express');
const router = express.Router();
const { guardarRespuesta } = require('../controllers/guardarRespuestaController');

// POST /api/guardar-respuesta
router.post('/', guardarRespuesta);

module.exports = router;
