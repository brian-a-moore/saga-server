module.exports = (sequelize, DataTypes) => {
    const GoalType = sequelize.define('GoalType', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(128),
            allowNull: false
        }
    }, {
        tableName: 'saga_goal_types',
        timestamps: false
    });

    return GoalType;
};