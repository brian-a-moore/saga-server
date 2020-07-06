module.exports = (sequelize, DataTypes) => {
    const Entry = sequelize.define('Entry', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(128)
        },
        context: {
            type: DataTypes.STRING(2048),
            allowNull: false
        },
        moodId: {
            type: DataTypes.INTEGER
        },
        ratingId: {
            type: DataTypes.INTEGER
        },
        typeId: {
            type: DataTypes.INTEGER
        },
        backgroundColor: {
            type: DataTypes.STRING(7)
        },
        textureId: {
            type: DataTypes.STRING(128)
        },
        fontId: {
            type: DataTypes.STRING(128)
        }
    }, {
        tableName: 'entries'
    });

    Entry.associate = models => {
        Entry.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
        Entry.belongsTo(models.Mood, {
            foreignKey: 'moodId'
        });
        Entry.belongsTo(models.Rating, {
            foreignKey: 'ratingId'
        });
        Entry.belongsTo(models.GoalType, {
            foreignKey: 'typeId'
        });
        Entry.belongsTo(models.Texture, {
            foreignKey: 'textureId'
        });
        Entry.belongsTo(models.Font, {
            foreignKey: 'fontId'
        });
        Entry.hasMany(models.MapGoal, { foreignKey: 'entryId', onDelete: 'CASCADE' });
        Entry.hasMany(models.MapTag, { foreignKey: 'entryId', onDelete: 'CASCADE' });
    }

    return Entry;
};