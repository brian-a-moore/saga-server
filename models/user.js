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
            allowNull: false,
            defaultValue: 10
        },
        timestampBefore: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
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
        tableName: 'users',
        hooks: {
            beforeCreate: user => {
                if(!user.darkMode === undefined || !user.darkMode === null) user.darkMode = false;
                if(!user.summaryLength === undefined || !user.summaryLength === null) user.summaryLength = 10;
                if(!user.timestampBefore === undefined || !user.timestampBefore === null) user.timestampBefore = true;
            }
        }
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