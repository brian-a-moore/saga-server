const { bruteRequest } = require('../config/redis');
const { messages } = require('../utils');

module.exports = (req, res, next) => {
    if(process.env.NODE_ENV !== 'test') {
        bruteRequest.consume(req.ip)
        .then(() => {
            next();
        })
        .catch(_ => {
            res.status(429).send(messages.auth.tooManyRequests());
        });
    } else {
        next();
    }
};