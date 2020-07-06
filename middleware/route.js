module.exports = (req, res, next) => {
    req.routeId = req.method + req['_parsedUrl'].pathname;
    next();
};