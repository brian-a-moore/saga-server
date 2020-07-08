module.exports = (sequelize, DataTypes) => {
    const Goal = sequelize.define('Goal', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        typeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        entryId: {
            type: DataTypes.UUID
        },
        title: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(1028)
        },
        targetDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        completionDate: {
            type: DataTypes.DATE
        }
    }, {
        tableName: 'goals'
    });

    Goal.associate = models => {
        Goal.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
        Goal.belongsTo(models.GoalType, {
            foreignKey: 'typeId'
        });
        Goal.belongsTo(models.Entry, {
            foreignKey: 'entryId',
            onDelete: 'SET NULL'
        });
        Goal.hasMany(models.MapGoal, { foreignKey: 'goalId', onDelete: 'CASCADE' });
    }

    return Goal;
};