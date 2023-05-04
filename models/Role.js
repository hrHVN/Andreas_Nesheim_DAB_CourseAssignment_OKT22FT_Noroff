module.exports = (sequelize, DataType) => sequelize.define('role', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataType.STRING,
        allowNull: false,
        unique: true
    }
});