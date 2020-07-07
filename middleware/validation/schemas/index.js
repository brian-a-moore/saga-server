module.exports = {
    'DELETE/api/account': require('./account/delete'),
    'DELETE/api/entry': require('./entry/delete'),
    'DELETE/api/goal': require('./goal/delete'),
    'DELETE/api/tag': require('./tag/delete'),
    'POST/api/auth/login': require('./auth/login'),
    'POST/api/auth/signup': require('./auth/signup'),
    'POST/api/entry': require('./entry/create'),
    'POST/api/goal': require('./goal/create'),
    'POST/api/tag': require('./tag/create'),
    'PUT/api/account': require('./account/update'),
    'PUT/api/entry': require('./entry/update'),
    'PUT/api/goal': require('./goal/update'),
    'PUT/api/tag': require('./tag/update')
};