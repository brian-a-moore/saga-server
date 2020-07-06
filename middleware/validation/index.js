// Dependencies
const schemas = require('./schemas');
const { logger } = require('../../utils');

// Schema Validator
module.exports = async (req, res, next) => {
    if(req.routeId === 'GET/' || !schemas[req.routeId]) next();
    else {
        try {
            let { query, body } = await schemas[req.routeId].validateAsync({ query: req.query, body: req.body });
    
            req.query = query;
            req.body = body;
    
            next();
        } catch(e) {
            logger.log({ level: 'Info', message: e.message });
            res.status(422).send({ message: e.message });
        }
    }
};