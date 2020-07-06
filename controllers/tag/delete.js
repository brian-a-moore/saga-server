const { Tag } = require('../../models');
const { messages } = require('../../utils');

module.exports = async ({ userId, id }) => {
    await Tag.destroy({
        where: {
            userId,
            id
        }
    });
    
    return { message: messages.tag.deleted };
};