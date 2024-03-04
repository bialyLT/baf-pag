const express = require('express');
const router = express.Router();
const { getAllPublications,
  getPublication,
  createPublication,
  deletePublication,
  updatePublication
} = require('./controller');

// Ruta para obtener todas las publicaciones
router.get('/', getAllPublications);

// Ruta para obtener una publicacion
router.get('/:id', getPublication);

// Ruta para crear una publicacion
router.post('/', createPublication);

// Ruta para eliminar una publicacion
router.delete('/:id', deletePublication);

// Ruta para actualizar una publicacion
router.put('/:id', updatePublication);

module.exports = router;
