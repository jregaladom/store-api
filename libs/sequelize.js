const { config } = require('./../config/config');
const Sequelize = require('sequelize');

const setupModels = require('../db/models');

const _user = encodeURIComponent(config.db.dbUser);
const _password = encodeURIComponent(config.db.dbPassword);

const urlConnection = `postgres://${_user}:${_password}@${config.db.dbAddress}:${config.db.dbPort}/${config.db.dbName}`;
//const urlConnection = `mysql://${_user}:${_password}@${config.db.dbAddress}:${config.db.dbPort}/${config.db.dbName}`;

const sequelize = new Sequelize(urlConnection, {
  dialect: 'postgres',
  //dialect: 'mysql',
  logging: true
});

setupModels(sequelize);

module.exports = sequelize;
