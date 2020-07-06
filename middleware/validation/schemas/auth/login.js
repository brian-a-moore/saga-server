const Joi = require('@hapi/joi');
const { messages } = require('../../../../utils');

module.exports = Joi.object({
    query: Joi.object({}).options({ stripUnknown: true }),
    body: Joi.object({
        email: Joi.string().email().required().messages(messages.schema.auth.email),
        password: Joi.string().min(8).max(128).messages(messages.schema.auth.password).required()
    }).options({ stripUnknown: true })
}).options({ stripUnknown: true });