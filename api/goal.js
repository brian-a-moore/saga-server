const router = require('express').Router();
const ctrl = require('../controllers');

router.post('/', (req, res) => ctrl.goal.create(req, res));
router.put('/', (req, res) => ctrl.goal.update(req, res));
router.delete('/', (req, res) => ctrl.goal.delete(req, res));

module.exports = router;