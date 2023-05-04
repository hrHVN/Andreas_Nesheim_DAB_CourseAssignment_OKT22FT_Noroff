module.exports = (sequelize, DataType) => sequelize.define('password', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    password: {
        type: DataType.STRING,
        allowNull: false
    }
});