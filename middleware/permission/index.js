const { logger } = require('../../utils');
const logic = require('./logic');

// These routes do not require permission checks
const bypassRoutes = [
    'GET/'
];

// Route Permissions
module.exports = async (req, res, next) => {
    if(bypassRoutes.includes(req.routeId)) next();
    else {
        try {
            let permissionHandler = await handler(req.routeId, req.userId, req.query, req.body);
            if(permissionHandler.granted) next();
            else { 
                logger.log({ level: 'Permission', message: permissionHandler.message });
                res.status(permissionHandler.status || 402).send({ message: permissionHandler.message });
            }
        } catch(e) {
            logger.log({ level: 'Error', message: e.message });
            res.status(500).send({ message: e.message });           
        }
    }
};

// Handler
const handler = (routeId, userId, params, body) => {
    switch(routeId) {
        case 'POST/api/tag': return logic.tag(body.title);
        case 'POST/api/auth/signup': return logic.signup(body);
        case 'PUT/api/tag': return logic.tag(body.title);
        default: return { message: null, granted: true, status: null }; // Temporary!! default should ALWAYS be false
    };
};