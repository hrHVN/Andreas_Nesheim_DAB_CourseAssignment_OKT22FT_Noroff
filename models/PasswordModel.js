module.exports = (sequelize, DataTypes) => {
    const Password = sequelize.define('passwords', {
        id: {
            type: Sequalize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        password: {
            type: Sequalize.STRING,
            allowNull: false
        }
    },
        {
            timeStamps: false
        });
}