const express = require('express');
const router = express.Router();
const { guardarRespuesta } = require('../controllers/guardarRespuestaController');

router.post('/guardar', guardarRespuesta); // ✅ esta es la línea que fallaba

module.exports = router;
