module.exports = (sequelize, DataTypes) => {
    const Animal = sequelize.define('animals', {
        id: {
            type: DataTypes.UUIDV1,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: true
            }
        },
        birthday: {
            type: DataTypes.DATE
        }
    });

    Animal.associate = function (models) {
        Animal.hasMany(Temperament, { foreignKey: 'temperament' });
        Animal.hasOne(models.Species, { foreignKey: 'species' });
        Animal.hasOne(models.Size, { foreignKey: 'size' });
    };
    return Animal;
}