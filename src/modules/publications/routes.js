const express = require('express');
const router = express.Router();
const { getAllPublications, getPublication } = require('./controller');

// Ruta para obtener todas las publicaciones
router.get('/', getAllPublications);

// Ruta para obtener una publicacion
router.get('/:id', getPublication);

module.exports = router;