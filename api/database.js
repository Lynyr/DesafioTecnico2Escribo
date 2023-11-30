const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite', // Usei o SQLite como exemplo
  logging: false,
});

module.exports = sequelize;
