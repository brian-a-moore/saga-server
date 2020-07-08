const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const { logger, messages } = require('../utils');
const db = {};
const env = process.env.NODE_ENV;
const { exec } = require("child_process");

const options = {
    dialect: 'postgres',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: msg => logger.log({ level: 'Database', message: msg })
}

let sequelize = new Sequelize(
    `saga_${process.env.NODE_ENV}`,
    'saga',
    process.env.SAGA_PASSWORD,
    options
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.init = async () => {

    let rootsql = new Sequelize(
        'postgres',
        'postgres',
        process.env.PG_PASSWORD || '',
        options   
    );

    try {
        let USER = await rootsql.query(`SELECT 1 FROM pg_roles WHERE rolname='saga'`);
        let DB = await rootsql.query(`SELECT datname FROM pg_catalog.pg_database WHERE datname='saga_${process.env.NODE_ENV}'`);

        if(USER[1].rowCount < 1) {
            await rootsql.query(`CREATE USER saga WITH PASSWORD '${process.env.SAGA_PASSWORD}'`);
        } else {
            logger.log({ level: 'Database', message: '"saga" user already exists.' });
        }
    
        if(DB[1].rowCount < 1) {
            await rootsql.query(`CREATE DATABASE saga_${process.env.NODE_ENV}`);
        } else {
            logger.log({ level: 'Database', message: `"saga_${process.env.NODE_ENV}" database already exists.` });
        }

        rootsql.close();
    } catch(e) {
        logger.log({ level: 'Error', message: `Unable to initialize database: ${e.message}`});
        process.exit();
    }
}

db.startUp = async () => {
    try {
        await db.sequelize.authenticate();
        logger.log({ level: 'Database', message: messages.database.connect });

        try {
            await db.sequelize.sync({ force: false });
            logger.log({level: 'Database', message: messages.database.sync });
            return true;
        } catch(e) {
            logger.log({ level: 'Database', message: messages.database.error(e.message) });
            process.exit();
        }
    } catch(e) {
        logger.log({ level: 'Database', message: messages.database.connectionErr(e.message) });
        process.exit();
    };


};

db.seed = async () => {
    let empty = await isEmpty();
    if(empty) {
        exec(`npx sequelize-cli --env ${env} db:seed:all`, (err, stdout) => {
            if(err) {
                logger.log({ level: 'Error', message: err.message });
                process.exit();
            }
            else {
                logger.log({ level: 'Database', message: messages.database.seeding(stdout) });
                logger.log({ level: 'Database', message: messages.database.seeded });
            }
        });      
    } else {
        logger.log({ level: 'Database', message: messages.database.alreadySeeded });
    }
};

const isEmpty = async () => {
    let cnt = await db.GoalType.count();

    if(cnt === 0) return true;
    else return false;
}

module.exports = db;