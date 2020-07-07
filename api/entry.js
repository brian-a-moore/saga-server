const router = require('express').Router();
const ctrl = require('../controllers');

router.post('/', async (req, res) => {
    try {
        let response = await ctrl.entry.create(req.userId, req.body);

        res.send(response);
    } catch(e) {
        res.status(500).send({ message: e.message });      
    }
});

router.put('/', async (req, res) => {
    try {
        let response = await ctrl.entry.update(req.userId, req.query.id, req.body);

        res.send(response);
    } catch(e) {
        res.status(500).send({ message: e.message });
    }
});

router.delete('/', async (req, res) => {
    try {
        let response = await ctrl.entry.delete(req.userId, req.query.id);

        res.send(response);
    } catch(e) {
        res.status(500).send({ message: e.message });
    }
});

module.exports = router;