module.exports = (sequelize, DataTypes) => {
    const Species = sequelize.define('species', {
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
    return Species;
}