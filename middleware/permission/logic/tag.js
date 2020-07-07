const { Tag } = require('../../../models');
const { messages } = require('../../../utils');

module.exports = async (userId, title) => {
    let count = await Tag.count({ where: { userId, title }});
    if(count > 0) {
        return { message: messages.tag.alreadyExists, granted: false, status: null };
    } else {
        return { message: null, granted: true, status: null };
    }
};