const mongoose = require('mongoose');
const imgSchema = require("./imgSchema");
const { Schema } = mongoose;

const publicacionSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  images: [imgSchema],
  isVendido: {
    type: Boolean,
    default: false
  },
  portada: {
    type: String,
    trim: true,
    default: 'images/portada/default-img-portada.webp'
  },
  linkFacebook: {
    type: String,
    trim: true
  }
}, { timestamps: true });


const Publicacion = mongoose.model('publicacion', publicacionSchema, 'publicaciones');

module.exports = Publicacion; 