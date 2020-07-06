module.exports = {
    'DELETE/api/account': require('./account/delete'),
    'DELETE/api/tag': require('./tag/delete'),
    'POST/api/auth/login': require('./auth/login'),
    'POST/api/auth/signup': require('./auth/signup'),
    'POST/api/tag': require('./tag/create'),
    'PUT/api/account': require('./account/update'),
    'PUT/api/tag': require('./tag/update')
};