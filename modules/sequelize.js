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

/**
 * Relationships
 */
User.hasMany(Animal);        // one User -> many Animal
Password.belongsTo(User);    // one Password -> one User
Role.hasMany(User, {});      // one Role -> Many User

Species.hasMany(Animal);     // one Species -> Many Animal
Temperament.hasMany(Animal)  // one Temp -> Many Animal
Size.hasMany(Animal)         // one Sze -> Many Animal

Animal.belongsTo(Species);   // one Role -> Many User
Animal.belongsToMany(Temperament, { through: 'animalTempers'}); // one Role -> Many User
Animal.belongsTo(Size);       // one Role -> Many User
Animal.belongsTo(User, { through: 'adoptions'});       // one Role -> Many User


sequelize.sync({
  // force: true,
  // alter: true
})

module.exports = { sequelize, User, Role, Password, Animal, Size, Species, Temperament };