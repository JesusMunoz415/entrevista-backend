// routes/crearPostulanteRoute.js
const express = require('express');
const router = express.Router();
const crearPostulante = require('../controllers/crearPostulanteController');

router.post('/crear_postulante', crearPostulante);

module.exports = router;
