module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define('Tag', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        tag: {
            type: DataTypes.STRING(128),
            allowNull: false
        }
    }, {
        tableName: 'tags'
    });

    Tag.associate = models => {
        Tag.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
        Tag.hasMany(models.MapTag, { foreignKey: 'tagId', onDelete: 'CASCADE' });
    }

    return Tag;
};