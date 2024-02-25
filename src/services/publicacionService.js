const publicacionModel = require('../models/publicacionModel');

// obtenemos todas las publicaciones
exports.getAllPublications = async (orden) => {
    try {
        if (orden === 'titleAsc') {
            return await publicacionModel.find().sort({ title: 1 }).lean();
        } else if (orden === 'titleDes') {
            return await publicacionModel.find().sort({ title: -1 }).lean();
        } else if (orden === 'masReciente') {
            return await publicacionModel.find().sort({ updatedAt: -1 }).lean();
        } else if (orden === 'menosReciente') {
            return await publicacionModel.find().sort({ updatedAt: 1 }).lean();
        } else if (orden === 'vendido') {
            return await publicacionModel.find().sort({ isVendido: -1, title: 1 }).lean();
        } else if (orden === 'novendido') {
            return await publicacionModel.find().sort({ isVendido: 1, title: 1 }).lean();
        } else {
            // por defecto ubicamos las publicaciones mas recientes primero
            return await publicacionModel.find().sort({ updatedAt: -1 }).lean();
        }
    } catch (e) {
        console.error(e);
        throw e;
    }
};

// obtenemos una publicacion por su id
exports.getPublication = async (id) => {
    try {
        return await publicacionModel.findById(id);
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
