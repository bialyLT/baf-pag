import mongoose from "mongoose";
import imgSchema from "./imgSchema";
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
        required: true
    },
    images: [imgSchema],
    isVendido: {
        type: Boolean,
        default: false
    },
    portada: {
        type: String,
        default: 'images/portada/default-img-portada.webp'
    },
    linkFacebook: String
}, { timestamps: true });

module.exports = publicacionSchema;