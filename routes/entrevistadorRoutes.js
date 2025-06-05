const express = require('express');
const router = express.Router();
const entrevistadorController = require('../controllers/entrevistadorController');

router.post('/crear-entrevistador', entrevistadorController.crearEntrevistador);

module.exports = router;
