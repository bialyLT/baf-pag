const mongoose = require('mongoose');
const publicacionSchema = require('../schemas/publicacionSchema');


export default Publicacion = mongoose.model('publicacion', publicacionSchema);