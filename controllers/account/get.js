const { User } = require('../../models');

module.exports = async userId => {
    let account = await User.findOne({ attributes: [
        'firstName',
        'email',
        'darkMode',
        'summaryLength',
        'timestampBefore',
        'defaultBackgroundColor',
        'defaultTexture',
        'defaultFont'
    ], where: { userId }});

    return { account };
};