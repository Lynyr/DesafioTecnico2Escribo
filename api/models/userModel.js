const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('User', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefones: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  ultimo_login: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

module.exports = User;
