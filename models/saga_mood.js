module.exports = (sequelize, DataTypes) => {
    const Mood = sequelize.define('Mood', {
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
        tableName: 'saga_moods',
        timestamps: false
    });

    return Mood;
};