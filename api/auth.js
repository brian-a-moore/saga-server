const router = require('express').Router();
const ctrl = require('../controllers');

router.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body;
        let info = await ctrl.auth.login({ ipAddr: req.ip, email, password });
        res.send(info);
    } catch(e) {
        if(e.message.includes('too many requests:')) {
            res.set('Retry-After', String(retrySecs));
            res.status(429);
        } else if(e.message.includes('entered was incorrect.')) {
            res.status(429);
        } else {
            res.status(500);
        }
        res.send({ message: e.message });
    }
});

router.post('/signup', async (req, res) => {
    try {
        let info  = await ctrl.auth.signup(req.body);
        res.send(info);
    } catch(e) {
        res.status(500).send({ message: e.message });
    }
});

module.exports = router;