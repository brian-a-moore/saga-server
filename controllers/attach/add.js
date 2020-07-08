const { MapGoal, MapTag } = require('../../models');
const { messages } = require('../../utils');
const uuid = require('uuid').v4;

module.exports = async (userId, { entryId, id, type }) => {
    let model;

    let modelId = type === 'goal' ? 'goalId' : 'tagId';
    
    let data = {
        id: uuid(),
        userId,
        entryId,
        [modelId]: id
    };

    if(type === 'goal') model = MapGoal;
    else model = MapTag;

    await model.create(data);

    return { message: messages.attach.add(type) };
};