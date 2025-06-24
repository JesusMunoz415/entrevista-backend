// routes/crearPostulanteRoute.js
const express = require('express');
const router = express.Router();
const crearPostulante = require('../controllers/crearPostulanteController');

// POST /api/postulantes
router.post('/', crearPostulante);

module.exports = router;

