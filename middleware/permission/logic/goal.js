const { Goal } = require('../../../models');
const { messages } = require('../../../utils');

module.exports = async (userId, title) => {
    let count = await Goal.count({ where: { userId, title }});
    if(count > 0) {
        return { message: messages.goal.alreadyExists, granted: false, status: null };
    } else {
        return { message: null, granted: true, status: null };
    }
};