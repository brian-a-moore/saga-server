const models = require('../../models');
const users = require('./users');
const entries = require('./entries');
const tags = require('./tags');
const goals = require('./goals');
var Sequelize = require('sequelize');
var Op = Sequelize.Op;
const { jwt } = require('../../utils');

module.exports = {
    build: async () => {
        try {
            await models.User.bulkCreate(users);
            await models.Entry.bulkCreate(entries);
            await models.Goal.bulkCreate(goals);
            await models.Tag.bulkCreate(tags);
        } catch(e) {
            console.log('Build Error: ', e.message);
            process.exit();
        }
    },
    tearDown: async () => {
        try {
            await models.User.destroy({
                where: {
                    userId: {
                        [Op.not]: null
                    }
                }
            });
        } catch(e) {
            console.log('Teardown Error: ', e.message);
            process.exit();
        }
    },
    models,
    token: `Bearer ${jwt.createToken(users[0], process.env.SECRET, { expiresIn: process.env.EXP_TIME })}`,
    users,
    entries,
    goals,
    tags
}