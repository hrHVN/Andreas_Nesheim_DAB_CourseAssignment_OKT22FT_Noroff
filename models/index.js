const Sequelize = require('sequelize');
require('dotenv').config();
const fs = require("fs")
const path = require("path")
const basename = path.basename(__filename);

const db = {};
const sequelize = new Sequelize(
  process.env.DB_DB,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    pool: {
      max: 50,
      min: 0,
      idle: 10000
    },
    define: {
      timestamps: false
    }
  });

db.sequelize = sequelize;
fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) &&
      (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize);
    db[model.name] = model;
    // console.log(db)
  });

db.sequelize.sync();
module.exports = db;