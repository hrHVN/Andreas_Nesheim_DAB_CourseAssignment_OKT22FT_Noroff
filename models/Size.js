module.exports = (sequelize, DataTypes) => {
    const Size = sequelize.define('size', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Size;
}