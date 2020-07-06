const { User } = require('../../models');
const { jwt, messages } = require('../../utils');
const limiter = require('../../config/redis');
const bcrypt = require('bcrypt');

module.exports = async ({ipAddr, email, password }) => {
    const uniqueKey = `${email}_${ipAddr}`;

    const [perDay, perLogin] = await Promise.all([
        limiter.brutePerDay.get(uniqueKey),
        limiter.brutePerLogin.get(uniqueKey)
    ]);

    let retrySecs = 0;

    if(perLogin !== null && perLogin.consumedPoints > limiter.maxPerLogin) {
        retrySecs = Math.round(limiter.maxPerLogin.msBeforeNext / 1000) || 1;
    } else if(perDay !== null && perDay.consumedPoints > limiter.maxPerDay) {
        retrySecs = Math.round(limiter.maxPerLogin.msBeforeNext / 1000) || 1;
    }

    if(retrySecs > 0) {
        throw new Error(messages.auth.tooManyRequests(retrySecs));
    } else {
        let rows = await User.findAll({
            where: {
                email
            },
            raw: true
        });
        let user = rows[0];
        if(rows.length === 0) return { message: messages.auth.notFound };
        else {
            let result = await bcrypt.compare(password, user.password);
            if(!result) {
                const promises = [limiter.brutePerDay.consume(uniqueKey)];
                if(rows.length !== 0) {
                    promises.push(limiter.brutePerLogin.consume(uniqueKey));
                }

                await Promise.all(promises);

                return { message: messages.auth.incorrectPassword };
            }

            if(perDay !== null && perLogin.consumedPoints > 0) {
                await limiter.brutePerLogin.delete(uniqueKey);
            }

            delete user.password;
            let token = jwt.createToken(user);
            return {
                user,
                message: messages.auth.login(user.firstName),
                token
            }
        }
    }
};