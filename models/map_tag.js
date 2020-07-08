module.exports = (sequelize, DataTypes) => {
    const MapTag = sequelize.define('MapTag', {
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
        tagId: {
            type: DataTypes.UUID,
            allowNull: false
        }
    }, {
        tableName: 'map_tags',
        indexes: [
            { fields: ['entryId', 'tagId'], unique: true }
        ]
    });

    MapTag.associate = models => {
        MapTag.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
        MapTag.belongsTo(models.Entry, {
            foreignKey: 'entryId',
            onDelete: 'SET NULL'
        });
        MapTag.belongsTo(models.Tag, {
            foreignKey: 'tagId',
            onDelete: 'CASCADE'
        });
    }

    return MapTag;
};