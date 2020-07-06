const { User } = require('../../../models');
const { messages } = require('../../../utils');

module.exports = async body => {
    let count = await User.count({ where: { email: body.email }});
    if(count > 0) {
        return { message: messages.permission.alreadyExists, granted: false, status: null };
    } else {
        return { message: null, granted: true, status: null };
    }
};