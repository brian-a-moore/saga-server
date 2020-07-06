const { User } = require('../../models');
const { messages } = require('../../utils');
const bcrypt = require('bcrypt');

module.exports = async ({ email, password }) => {
    let user = await User.findAll({
        attributes: ['userId', 'password'],
        where: { email },
        raw: true
    });

    if(user.length === 0) throw new Error(messages.auth.notFound)
    else {
        let result = await bcrypt.compare(password, user[0].password);
        if(!result)  throw new Error(messages.auth.incorrectPassword)
        else return user[0].userId;
    }
};