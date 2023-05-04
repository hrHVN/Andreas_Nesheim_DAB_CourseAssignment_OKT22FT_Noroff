module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
        id: {
            type: DataTypes.UUIDV1,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: true
            }
        },
    });
    User.associate = function (models) {
        User.hasOne(models.password, { foreignKey: 'password' });
        User.hasOne(models.role, { foreignKey: 'role' });
    };
    return User;
}