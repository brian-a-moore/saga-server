const Joi = require('@hapi/joi');

module.exports = Joi.object({
    query: Joi.object({
        id: Joi.string().uuid().required(),
        type: Joi.string().valid('goal', 'tag').required()
    }).options({ stripUnknown: true }),
    body: Joi.object({}).options({ stripUnknown: true })
}).options({ stripUnknown: true });