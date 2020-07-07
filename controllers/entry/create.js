const { Entry } = require('../../models');
const { messages } = require('../../utils');
const uuid = require('uuid').v4;

module.exports = async (userId, data) => {
    data.id = uuid();
    data.userId = userId;

    await Entry.create(data);

    return { message: messages.entry.created };
};