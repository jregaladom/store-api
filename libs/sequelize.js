const { config } = require('./../config/config');
const Sequelize = require('sequelize');

const setupModels = require('../db/models');

const _user = encodeURIComponent(config.db.dbUser);
const _password = encodeURIComponent(config.db.dbPassword);

const urlConnection = `postgres://${_user}:${_password}@${config.db.dbAddress}:${config.db.dbPort}/${config.db.dbName}`;

const sequelize = new Sequelize(urlConnection, {
  dialect: 'postgres',
  logging: true
});

setupModels(sequelize);

sequelize.sync({ force: false }).then(() => {
  console.log('Tablas sincronizadas');
});

module.exports = sequelize;
