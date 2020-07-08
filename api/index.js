const router = require('express').Router();

router.use('/account', require('./account'));
router.use('/attach', require('./attach'));
router.use('/auth', require('./auth'));
router.use('/entry', require('./entry'));
router.use('/goal', require('./goal'));
router.use('/tag', require('./tag'));

module.exports = router;