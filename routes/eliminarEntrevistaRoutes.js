const express = require('express');
const router = express.Router();
const { eliminarEntrevista } = require('../controllers/eliminarEntrevistaController');

// POST /api/eliminar-entrevista
router.post('/', eliminarEntrevista);

module.exports = router;
