const Joi = require('@hapi/joi');

module.exports = Joi.object({
    query: Joi.object({}).options({ stripUnknown: true }),
    body: Joi.object({
        entryId: Joi.string().uuid().required(),
        id: Joi.string().uuid().required(),
        type: Joi.string().valid('goal', 'tag').required()
    }).options({ stripUnknown: true })
}).options({ stripUnknown: true });