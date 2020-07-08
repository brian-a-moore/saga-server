const Joi = require('@hapi/joi');

module.exports = Joi.object({
    query: Joi.object({
        id: Joi.string().uuid().required(),
    }).options({ stripUnknown: true }),
    body: Joi.object({
        title: Joi.string().min(1).max(128),
        description: Joi.string().min(1).max(1028)
    }).options({ stripUnknown: true })
}).options({ stripUnknown: true });