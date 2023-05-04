module.exports = (sequelize, DataType) => sequelize.define('adoptions', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});