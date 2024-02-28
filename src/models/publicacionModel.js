const mongoose = require('mongoose');
const publicacionSchema = require('../schemas/publicacionSchema');

const Publicacion = mongoose.model('publicacion', publicacionSchema, 'publicaciones');

module.exports = Publicacion; 