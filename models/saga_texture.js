module.exports = (sequelize, DataTypes) => {
    const Texture = sequelize.define('Texture', {
        id: {
            type: DataTypes.STRING(128),
            primaryKey: true
        },
        displayName: {
            type: DataTypes.STRING(128),
            allowNull: false
        }
    }, {
        tableName: 'saga_textures',
        timestamps: false
    });

    return Texture;
};