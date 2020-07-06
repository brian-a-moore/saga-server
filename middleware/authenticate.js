const { jwt, logger, messages } = require('../utils');
const ctrl = require('../controllers');

const bypassRoutes = [
    'GET/',
    'POST/api/auth/login',
    'POST/api/auth/signup'
];

module.exports = async (req, res, next) => {
    const authorization = req.headers.authorization;

    if(bypassRoutes.includes(req.routeId)) next();
    else if(authorization) {
        try {
            const [type, data] = authorization.split(' ');
            if(type === 'Bearer') {
                let token = await jwt.verifyTokenPromise(data);
                req.userId = token.user.userId;
                next();
            } else if(type === 'Basic') {
                const credentials = Buffer.from(data, 'base64').toString('ascii');
                const [email, password] = credentials.split(':');
                req.userId = await ctrl.auth.basic({ email, password });
                next();
            } else {
                logger.log({ level: 'Authentication', message: e.message });
                res.status(422).send({ message: message.auth.unsupported });    
            }
        } catch(e) {
            logger.log({ level: 'Authentication', message: e.message });
            res.status(422).send({ message: e.message });    
        }
    } else {
        logger.log({ level: 'Authentication', message: messages.auth.notAuthorized });
        res.status(401).send({ message: messages.auth.notAuthorized });
    }
};