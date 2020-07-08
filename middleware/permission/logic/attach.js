const { MapGoal, MapTag } = require('../../../models');
const { messages } = require('../../../utils');

module.exports = async (userId, { entryId, id, type }) => {
    let model = type === 'goal' ? MapGoal : MapTag;
    let modelId = type === 'goal' ?  'goalId' : 'tagId';

    let count = await model.count({ where: { userId, entryId, [modelId]: id }});

    if(count > 0) {
        return { message: messages.attach.alreadyExists(type), granted: false, status: null };
    } else {
        return { message: null, granted: true, status: null };
    }
};