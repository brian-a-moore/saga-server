const Joi = require('@hapi/joi');

module.exports = Joi.object({
    query: Joi.object({
        id: Joi.string().uuid().required(),
    }).options({ stripUnknown: true }),
    body: Joi.object({
        title: Joi.string().min(1).max(128),
        context: Joi.string().min(1).max(2048),
        moodId: Joi.number().min(1),
        ratingId: Joi.number().min(1),
        typeId: Joi.number().min(1),
        backgroundColor: Joi.string().min(7).max(7).regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
        textureId: Joi.string().min(1).max(128),
        fontId: Joi.string().min(1).max(128)
    }).options({ stripUnknown: true })
}).options({ stripUnknown: true });