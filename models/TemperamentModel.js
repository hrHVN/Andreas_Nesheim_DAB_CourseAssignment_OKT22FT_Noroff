module.exports = (sequelize, DataTypes) => {
    const Temperament = sequelize.define('temperament', {
        id: {
            type: Sequalize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequalize.STRING,
            allowNull: false
        }
    },
        {
            timeStamps: false
        });
}