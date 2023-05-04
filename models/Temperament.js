module.exports = (sequelize, DataTypes) => {
    const Temperament = sequelize.define('temperament', {
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
    return Temperament;
}