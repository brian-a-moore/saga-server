const { MapGoal, MapTag } = require('../../models');
const { messages } = require('../../utils');

module.exports = async (userId, { id, type }) => {
    let model;

    if(type === 'goal') model = MapGoal;
    else model = MapTag;

    await model.destroy({ where: { userId, id }});

    return { message: messages.attach.remove(type) };
};