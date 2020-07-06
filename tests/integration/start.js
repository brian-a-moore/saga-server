const db = require('../../models');
const Sequelize = require('sequelize');
const { logger } = require('../../utils');
const { exec } = require("child_process");

let sequelize = new Sequelize(
    'postgres',
    'postgres',
    process.env.PG_PASSWORD || '',
    {
        dialect: 'postgres',
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        logging: msg => logger.log({ level: 'Database', message: msg })
    }
);

before(async function() {
    try {
        await sequelize.query(`DROP DATABASE IF EXISTS saga_test;`);
        await sequelize.query(`CREATE DATABASE saga_test;`);
        await sequelize.close();
        await db.init();
        await db.startUp();
    } catch(e) {
        logger.log({ level: 'Error', message: `Failed to run tests: ${e.message}` });
        process.exit();
    }
});

before(function(done) {
    exec(`npx sequelize-cli --env test db:seed:all`, function(err, stdout) {
        if(err) {
            logger.log({ level: 'Error', message: `Failed to run tests: ${err.message}` });
            process.exit();          
        } else {
            logger.log({ level: 'Database', message: stdout });
            done();
        }
    });
});