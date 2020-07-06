module.exports = {
    development: {
        username: 'saga',
        password: process.env.SAGA_PASSWORD,
        database: 'saga_development',
        host: process.env.SAGA_HOST || 'localhost',
        dialect: 'postgres'
    },
    test: {
        username: 'saga',
        password: process.env.SAGA_PASSWORD,
        database: 'saga_test',
        host: process.env.SAGA_HOST || 'localhost',
        dialect: 'postgres'
    },
    stage: {
        username: 'saga',
        password: process.env.SAGA_PASSWORD,
        database: 'saga_stage',
        host: process.env.SAGA_HOST || 'localhost',
        dialect: 'postgres'
    },
    production: {
        username: 'saga',
        password: process.env.SAGA_PASSWORD,
        database: 'saga_production',
        host: process.env.SAGA_HOST || 'localhost',
        dialect: 'postgres'
    }
};