const { Goal } = require('../../models');
const { messages } = require('../../utils');
const uuid = require('uuid').v4;

module.exports = async (userId, data) => {
    data.id = uuid();
    data.userId = userId;

    await Goal.create(data);

    return { message: messages.goal.created };
};