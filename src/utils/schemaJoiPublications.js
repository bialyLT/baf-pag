const Joi = require('joi');

const publicacionSchemaJoi = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    images: Joi.array().items(Joi.string()).min(1),
    portada: Joi.string(),
    linkFacebook: Joi.string()
});

module.exports = publicacionSchemaJoi;