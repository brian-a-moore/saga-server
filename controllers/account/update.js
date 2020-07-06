const { User } = require('../../models');
const { messages } = require('../../utils');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = async (userId, data) => {
    if(data.password) {
        let hash = await bcrypt.hash(data.password, saltRounds);
        data.password = hash;
    }
    await User.update(data, {
        where: { userId }
    });

    let msg = messages.account.updated; 

    return { message: msg };
};