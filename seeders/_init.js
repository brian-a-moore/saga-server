let goal_types = require('../assets/seeds/goal_types');
let moods = require('../assets/seeds/moods');
let ratings = require('../assets/seeds/ratings');
let fonts = require('../assets/seeds/fonts');

module.exports = {
    up: queryInterface => {
        return Promise.all([ 
            queryInterface.bulkInsert('saga_fonts', fonts, {}),
            queryInterface.bulkInsert('saga_goal_types', goal_types, {}),
            queryInterface.bulkInsert('saga_moods', moods, {}),
            queryInterface.bulkInsert('saga_ratings', ratings, {})
        ]);
    },
    down: queryInterface => {
        return Promise.all([
            queryInterface.bulkDelete('saga_fonts', null, {}),
            queryInterface.bulkDelete('saga_goal_types', null, {}),
            queryInterface.bulkDelete('saga_moods', null, {}),
            queryInterface.bulkDelete('saga_ratings', null, {})
        ]);
    }
};