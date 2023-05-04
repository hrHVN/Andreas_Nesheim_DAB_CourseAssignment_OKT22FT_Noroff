module.exports = (sequelize, DataTypes) => {
    const Adoption = sequelize.define('adoptions', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        }
    });

    Adoption.associate = function (models) {
        Adoption.hasOne(models.Users, { foreignKey: 'user' });
        Adoption.hasOne(models.Animals, { foreignKey: 'animal' });
    };

    return Adoption;
}
