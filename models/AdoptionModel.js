module.exports = (sequelize, DataTypes) => {
    const Adoption = sequelize.define('adoptions', {
        id: {
            type: Sequalize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        }
    },
        {
            timeStamps: false
        });

    Adoption.hasOne(Users, { foreignKey: 'user' });
    Adoption.hasOne(Animals, { foreignKey: 'animal' });
}

