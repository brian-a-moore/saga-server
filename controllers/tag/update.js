const { Tag } = require('../../models');
const { messages } = require('../../utils');

module.exports = async (userId, id, tag) => {
    await Tag.update(tag, {
        where: {
            userId,
            id
        }
    });
    
    return { message: messages.tag.updated };
};