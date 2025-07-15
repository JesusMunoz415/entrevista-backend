// backend/routes/crearPostulanteRoutes.js

const express = require('express');
const router = express.Router();
const { crearPostulante, listarPostulantes } = require('../controllers/crearPostulanteController');

// POST /api/postulantes
router.post('/', crearPostulante);

// GET /api/postulantes
router.get('/', listarPostulantes);

module.exports = router;
