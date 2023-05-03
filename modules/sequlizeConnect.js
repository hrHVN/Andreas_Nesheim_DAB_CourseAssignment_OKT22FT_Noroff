const Sequalize = require('sequelize');
require('dotenv').config();

module.exports = new Sequalize(
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
