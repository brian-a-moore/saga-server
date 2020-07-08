const router = require('express').Router();
const ctrl = require('../controllers');

router.post('/', async (req, res) => {
    try {
        let response = await ctrl.attach.add(req.userId, req.body);

        res.send(response);
    } catch(e) {
        res.status(500).send({ message: e.message });      
    }
});

router.delete('/', async (req, res) => {
    try {
        let response = await ctrl.attach.remove(req.userId, req.query);

        res.send(response);
    } catch(e) {
        res.status(500).send({ message: e.message });
    }
});

module.exports = router;