const { User } = require('../../models');
const { jwt, messages } = require('../../utils');
const uuid = require('uuid').v4;
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = async user => {
    user.userId = uuid();
    let hash = await bcrypt.hash(user.password, saltRounds);
    user.password = hash;
    await User.create(user);
    delete user.password;
    let token = jwt.createToken(user);

    return {
        user,
        message: messages.auth.signup(user.firstName),
        token
    };
};