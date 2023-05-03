module.exports = (sequelize, DataTypes) => {
    const Animal = sequelize.define('animals', {
        id: {
            type: Sequalize.UUIDV1,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequalize.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: true
            }
        },
        birthday: {
            type: Sequalize.DATE
        }
    },
        {
            timeStamps: false
        });

    Animal.hasMany(Temperament, { foreignKey: 'temperament' });
    Animal.hasOne(Species, { foreignKey: 'species' });
    Animal.hasOne(Size, { foreignKey: 'size' });
}