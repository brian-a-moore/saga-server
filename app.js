const express = require('express');
const app = module.exports = express();
const bodyParser = require('body-parser');
const port = process.env.PORT;
const env = process.env.NODE_ENV;
const { logger, messages } = require('./utils');
const db = require('./models');
const { authenticate, limiter, permission, route } = require('./middleware');
const morgan = require('morgan');
const helmet = require('helmet');

// Application
app.listen(port, async () => {
    if(env !== 'test') {
        await db.init();
        await db.startUp();
        await db.seed();
    }
    logger.log({
        level: 'Application',
        message: messages.application.online(port, env)
    });
});

// Security
app.disable('x-powered-by');
app.use(limiter);
app.use(helmet());

// Middleware
if(env !== 'test') app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(route);
app.use(authenticate);
app.use(permission);

// Api Routes
app.use('/api', require('./api'));

// 404 Redirect
app.all('*', (req, res) => res.status(404).send(messages.api.notFound));