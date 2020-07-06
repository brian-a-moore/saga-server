const { User } = require('../../models');
const { messages } = require('../../utils');

module.exports = async userId => {
    await User.destroy({
        where: { userId }
    });
    
    return { message: messages.account.deleted };
};