const router = require('express').Router();
const ctrl = require('../controllers');

router.post('/', (req, res) => ctrl.entry.create(req, res));
router.put('/', (req, res) => ctrl.entry.update(req, res));
router.delete('/', (req, res) => ctrl.entry.delete(req, res));

module.exports = router;