module.exports = (sequelize, DataType) => sequelize.define('animals', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataType.STRING,
        allowNull: false
    },
    birthday:{
        type: DataType.DATE,
        allowNull: false
    }
});