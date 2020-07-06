let goal_types = require('../assets/goal_types');
let moods = require('../assets/moods');
let ratings = require('../assets/ratings');
let fonts = require('../assets/fonts');
let textures = require('../assets/textures');

module.exports = {
    up: queryInterface => {
        return Promise.all([ 
            queryInterface.bulkInsert('saga_fonts', fonts, {}),
            queryInterface.bulkInsert('saga_goal_types', goal_types, {}),
            queryInterface.bulkInsert('saga_moods', moods, {}),
            queryInterface.bulkInsert('saga_ratings', ratings, {}),
            queryInterface.bulkInsert('saga_textures', textures, {})
        ]);
    },
    down: queryInterface => {
        return Promise.all([
            queryInterface.bulkDelete('saga_fonts', null, {}),
            queryInterface.bulkDelete('saga_goal_types', null, {}),
            queryInterface.bulkDelete('saga_moods', null, {}),
            queryInterface.bulkDelete('saga_ratings', null, {}),
            queryInterface.bulkDelete('saga_textures', null, {})
        ]);
    }
};