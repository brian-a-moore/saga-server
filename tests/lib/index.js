// Dependencies 
const models = require('../../models');
const users = require('./users');
var Sequelize = require('sequelize');
var Op = Sequelize.Op;
const _ = require('lodash');
const { jwt } = require('../../utils');

module.exports = {
    build: async () => {
        try {
            await models.User.bulkCreate(users);
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
    users
}