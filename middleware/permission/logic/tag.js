const { Tag } = require('../../../models');
const { messages } = require('../../../utils');

module.exports = async title => {
    let count = await Tag.count({ where: { title }});
    if(count > 0) {
        return { message: messages.tag.alreadyExists, granted: false, status: null };
    } else {
        return { message: null, granted: true, status: null };
    }
};