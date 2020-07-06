const Joi = require('@hapi/joi');
const { messages } = require('../../../../utils');

module.exports = Joi.object({
    query: Joi.object({}).options({ stripUnknown: true }),
    body: Joi.object({
        firstName: Joi.string().min(1).max(128).messages(messages.schema.auth.firstName).required(),
        email: Joi.string().email().messages(messages.schema.auth.email).required(),
        password: Joi.string().min(8).max(128).messages(messages.schema.auth.password).required(),
        pin: Joi.string().min(4).max(4).required()
    }).options({ stripUnknown: true })
}).options({ stripUnknown: true })