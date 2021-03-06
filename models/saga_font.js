module.exports = (sequelize, DataTypes) => {
    const Font = sequelize.define('Font', {
        id: {
            type: DataTypes.STRING(128),
            primaryKey: true
        },
        displayName: {
            type: DataTypes.STRING(128),
            allowNull: false
        }
    }, {
        tableName: 'saga_fonts',
        timestamps: false
    });

    return Font;
};