const Sequelize = require('sequelize');
require('dotenv').config();

// Import models
const UserModel = require('../models/user');
const RoleModel = require('../models/role');
const PasswordModel = require('../models/password');

const AnimalModel = require('../models/animal');
const SizeModel = require('../models/size');
const SpeciesModel = require('../models/specie');
const TemperamentModel = require('../models/temperament');
const AdoptionModel = require('../models/adoption');
const specie = require('../models/specie');

const sequelize = new Sequelize(
  process.env.DB_DB,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    define: {
      timestamps: false
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const User = UserModel(sequelize, Sequelize);
const Role = RoleModel(sequelize, Sequelize);
const Password = PasswordModel(sequelize, Sequelize);
const Animal = AnimalModel(sequelize, Sequelize);
const Size = SizeModel(sequelize, Sequelize);
const Species = SpeciesModel(sequelize, Sequelize);
const Temperament = TemperamentModel(sequelize, Sequelize);
const Adoption = AdoptionModel(sequelize, Sequelize);

// Password.hasOne(User);
User.belongsTo(Password);
User.hasMany(Animal);

Role.hasMany(User);

Animal.belongsTo(User, { through: 'Adoption' });
Animal.hasOne(Species);
Animal.hasMany(Temperament)
Animal.hasOne(Size);

Species.belongsToMany(Animal, { through: 'Aanimalspice' });
Temperament.belongsToMany(Animal, { through: 'animalTemper' });
Size.belongsToMany(Animal, { through: 'animalSize' });


sequelize.sync({
  // force: false,
  // alter: false
})

module.exports = { sequelize, User, Role, Password, Animal, Size, Species, Temperament, Adoption };