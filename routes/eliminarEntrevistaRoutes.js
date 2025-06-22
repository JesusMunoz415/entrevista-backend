// File: backend/routes/eliminarEntrevista.js
// This file is part of backend/routes/eliminarEntrevista.js
const express = require('express');
const router = express.Router();
const { eliminarEntrevista } = require('../controllers/eliminarEntrevistaController');

router.post('/', eliminarEntrevista);

module.exports = router;
