module.exports = (sequelize, DataTypes) => {
    const Rating = sequelize.define('Rating', {
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
        tableName: 'saga_ratings',
        timestamps: false
    });

    return Rating;
};