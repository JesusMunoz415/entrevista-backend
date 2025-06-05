const express = require('express');
const router = express.Router();
const eliminarEntrevista = require('../controllers/eliminarEntrevistaController');

router.post('/eliminar-entrevista', eliminarEntrevista);

module.exports = router;
