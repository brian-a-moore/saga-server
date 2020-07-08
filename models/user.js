module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(),
            allowNull: false
        },
        pin: {
            type: DataTypes.STRING(4),
            allowNull: false
        },
        darkMode: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        summaryLength: {
            type: DataTypes.INTEGER,
            defaultValue: 10
        },
        timestampBefore: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        defaultBackgroundColor: {
            type: DataTypes.STRING(7)
        },
        defaultTexture: {
            type: DataTypes.STRING(128)
        },
        defaultFont: {
            type: DataTypes.STRING(128)
        },
        avatar: {
            type: DataTypes.BLOB
        }
    }, {
        tableName: 'users'
    });

    User.associate = models => {
        User.belongsTo(models.Font, {
            foreignKey: 'defaultFont'
        });
        User.belongsTo(models.Texture, {
            foreignKey: 'defaultTexture'
        });
        User.hasMany(models.Entry, { foreignKey: 'userId', onDelete: 'CASCADE' });
        User.hasMany(models.Goal, { foreignKey: 'userId', onDelete: 'CASCADE' });
        User.hasMany(models.Tag, { foreignKey: 'userId', onDelete: 'CASCADE' });
    }

    return User;
};