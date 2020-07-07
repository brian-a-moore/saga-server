const { Goal } = require('../../models');
const { messages } = require('../../utils');

module.exports = async (userId, id) => {
    await Goal.destroy({
        where: {
            userId,
            id
        }
    });
    
    return { message: messages.goal.deleted };
};