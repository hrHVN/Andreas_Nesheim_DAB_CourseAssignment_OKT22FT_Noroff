module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
        id: {
            type: Sequalize.UUIDV1,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        fullName: {
            type: Sequalize.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: true
            }
        },
    },
        {
            timeStamps: false
        });

    User.hasOne(password, { foreignKey: 'password' });
    User.hasOne(role, { foreignKey: 'role' });
}