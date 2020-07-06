const router = require('express').Router();
const ctrl = require('../controllers');

router.post('/', async (req, res) => {
    try {
        let response = await ctrl.tag.create(req.userId, req.body);

        res.send(response);
    } catch(e) {
        res.status(500).send({ message: e.message });      
    }
});

router.put('/', async (req, res) => {
    try {
        let response = await ctrl.tag.update(req.userId, req.body);

        res.send(response);
    } catch(e) {
        res.status(500).send({ message: e.message });
    }
});

router.delete('/', async (req, res) => {
    try {
        let response = await ctrl.tag.delete(req.userId);

        res.send(response);
    } catch(e) {
        res.status(500).send({ message: e.message });
    }
});

module.exports = router;