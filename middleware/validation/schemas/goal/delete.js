const Joi = require('@hapi/joi');

module.exports = Joi.object({
    query: Joi.object({
        id: Joi.string().uuid().required(),
    }).options({ stripUnknown: true }),
    body: Joi.object({}).options({ stripUnknown: true })
}).options({ stripUnknown: true });