module.exports = {
    'DELETE/api/account': require('./account/delete'),
    'POST/api/auth/login': require('./auth/login'),
    'POST/api/auth/signup': require('./auth/signup'),
    'PUT/api/account': require('./account/update')
};