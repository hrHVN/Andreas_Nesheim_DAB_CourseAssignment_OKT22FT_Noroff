module.exports = (sequelize, DataTypes) => {
    const Size = sequelize.define('size', {
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