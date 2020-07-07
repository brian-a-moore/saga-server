const { Entry } = require('../../models');
const { messages } = require('../../utils');

module.exports = async (userId, id) => {
    await Entry.destroy({
        where: {
            userId,
            id
        }
    });
    
    return { message: messages.entry.deleted };
};