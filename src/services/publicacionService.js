const publicacionModel = require('../models/publicacionModel');

// obtenemos todas las publicaciones
exports.getAllPublications = async () => {
    try {
        return await publicacionModel.find().lean();
    } catch (e) {
        console.error(e);
        throw e;
    }
};

// creamos una publicacion
exports.createPublication = async (publicationData) => {
    try {
        return await publicacionModel.create(publicationData);
    } catch (e) {
        console.error(e);
        throw e;
    }
};

// eliminamos una publicacion por id
exports.deletePublication = async (publicationId) => {
    try {
        return await publicacionModel.findByIdAndDelete(publicationId);
    } catch (e) {
        console.error(e);
        throw e;
    }
};

// actualizamos una publicacion por id
exports.updatePublication = async (id, data) => {
    try {
        return await publicacionModel.findByIdAndUpdate(id, data, { new: true });
    } catch (e) {
        console.error(e);
        throw e;
    }
};