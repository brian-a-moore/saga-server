const Joi = require('@hapi/joi');
const { messages } = require('../../../../utils');

module.exports = Joi.object({
    query: Joi.object({}).options({ stripUnknown: true }),
    body: Joi.object({
        firstName: Joi.string().min(1).max(128).messages(messages.schema.auth.firstName),
        email: Joi.string().email().messages(messages.schema.auth.email),
        password: Joi.string().min(8).max(128).messages(messages.schema.auth.password),
        pin: Joi.string().min(4).max(4),
        darkMode: Joi.boolean(),
        summaryLength: Joi.number().min(1).max(20),
        timestampBefore: Joi.boolean()
    }).options({ stripUnknown: true })
}).options({ stripUnknown: true });