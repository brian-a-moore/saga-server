const { Entry } = require('../../models');
const { messages } = require('../../utils');

module.exports = async (userId, id, entry) => {
    await Entry.update(entry, {
        where: {
            userId,
            id
        }
    });
    
    return { message: messages.entry.updated };
};