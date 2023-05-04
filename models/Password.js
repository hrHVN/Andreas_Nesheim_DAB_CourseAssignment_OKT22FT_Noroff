module.exports = (sequelize, DataTypes) => {
    const Password = sequelize.define('passwords', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Password;
}