const express = require('express');
const router = express.Router();
const publicacionController = require('../controllers/publicacionController');

// Ruta para obtener todas las publicaciones
router.get('/', publicacionController.getAllPublications);

// Ruta para obtener una publicacion
router.get('/:id', publicacionController.getPublication);

// Ruta para crear una publicacion
router.post('/', publicacionController.createPublication);

// Ruta para eliminar una publicacion
router.delete('/:id', publicacionController.deletePublication);

// Ruta para actualizar una publicacion
router.put('/:id', publicacionController.updatePublication);

module.exports = router;