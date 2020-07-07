// Dependencies
const schemas = require('./schemas');
const { logger } = require('../../utils');

// Schema Validator
module.exports = async (req, res, next) => {
    if(req.routeId === 'GET/' || !schemas[req.routeId]) next();
    else {
        let { err, data } = await await schemas[req.routeId].validateAsync({ query: req.query, body: req.body });

        if(err) {
            logger.log({ level: 'Info', message: err.message });
            res.status(422).send({ message: err.message });        
        } else {
            let { query, body } = data;

            req.query = query;
            req.body = body;
    
            next();       
        }
    }
};