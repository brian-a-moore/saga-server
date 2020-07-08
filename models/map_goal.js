module.exports = (sequelize, DataTypes) => {
    const MapGoal = sequelize.define('MapGoal', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false           
        },
        entryId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        goalId: {
            type: DataTypes.UUID,
            allowNull: false
        }
    }, {
        tableName: 'map_goals',
        indexes: [
            { fields: ['entryId', 'goalId'], unique: true }
        ]
    });

    MapGoal.associate = models => {
        MapGoal.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
        MapGoal.belongsTo(models.Entry, {
            foreignKey: 'entryId',
            onDelete: 'SET NULL'
        });
        MapGoal.belongsTo(models.Goal, {
            foreignKey: 'goalId',
            onDelete: 'CASCADE'
        });
    }

    return MapGoal;
};