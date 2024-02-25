const PublicacionService = require('../services/publicacionService');
const publicacionSchemaJoi = require('../utils/schemaJoiPublications');

// controlador para obtener todas las publicaciones
exports.getAllPublications = async (req, res, next) => {
    try {
        const publications = await PublicacionService.getAllPublications(req.query.orden);
        res.json({ success: true, data: publications });
    } catch (e) {
        next(e);
    }
};

// controlador para obtener una publicacion por id
exports.getPublication = async (req, res, next) => {
    try {
        const publication = await PublicacionService.getPublication(req.params.id);
        res.json({ success: true, data: publication });
    } catch (e) {
        next(e);
    }
};

// controlador para crear una publicacion
exports.createPublication = async (req, res, next) => {
    try {
        const { error } = publicacionSchemaJoi.validate(req.body);
        if (error) throw new Error(error.details[0].message);
        const newPublication = await PublicacionService.createPublication(req.body);
        res.status(201).json({ success: true, data: newPublication });
    } catch (e) {
        next(e);
    }
};

// controlador para eliminar una publicacion
exports.deletePublication = async (req, res, next) => {
    try {
        const delPublication = await PublicacionService.deletePublication(req.params.id);
        res.status(201).json({ success: true, data: delPublication });
    } catch (e) {
        next(e);
    }
};

exports.updatePublication = async (req, res, next) => {
    try {
        const { error } = publicacionSchemaJoi.validate(req.body);
        if (error) throw new Error(error.details[0].message);
        const upPublication = await PublicacionService.updatePublication(req.params.id, req.body);
        res.status(201).json({ upPublication });
    } catch (e) {
        next(e);
    }
};