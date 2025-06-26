const express = require('express');
const router = express.Router();
const { obtenerHistorial } = require('../controllers/historialEntrevistasController');

router.post('/', obtenerHistorial);

module.exports = router;
