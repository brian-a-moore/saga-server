const router = require('express').Router();
const ctrl = require('../controllers');

router.get('/', async (req, res) => {
    try {
        let response = await ctrl.account.get(req.userId);

        res.send(response);
    } catch(e) {
        res.status(500).send({ message: e.message }); 
    }
});

router.put('/', async (req, res) => {
    try {
        let response = await ctrl.account.update(req.userId, req.body);

        res.send(response);
    } catch(e) {
        console.log({ e })
        res.status(500).send({ message: e.message });
    }
});

router.delete('/', async (req, res) => {
    try {
        let response = await ctrl.account.delete(req.userId);

        res.send(response);
    } catch(e) {
        res.status(500).send({ message: e.message });
    }
});

module.exports = router;