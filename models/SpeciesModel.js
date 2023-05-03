module.exports = (sequelize, DataTypes) => {
    const Species = sequelize.define('species', {
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