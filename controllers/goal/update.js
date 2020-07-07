const { Goal } = require('../../models');
const { messages } = require('../../utils');

module.exports = async (userId, id, goal) => {
    await Goal.update(goal, {
        where: {
            userId,
            id
        }
    });
    
    return { message: messages.goal.updated };
};