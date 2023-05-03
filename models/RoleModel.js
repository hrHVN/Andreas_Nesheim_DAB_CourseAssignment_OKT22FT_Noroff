module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('role', {
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