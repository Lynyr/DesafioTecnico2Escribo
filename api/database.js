const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite', // Use o SQLite como exemplo
  logging: false,
});

module.exports = sequelize;
