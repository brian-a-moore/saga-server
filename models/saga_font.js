module.exports = (sequelize, DataTypes) => {
    const Font = sequelize.define('Font', {
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
        tableName: 'saga_fonts',
        timestamps: false
    });

    return Font;
};