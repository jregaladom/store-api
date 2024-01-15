const { config } = require('./../config/config');
const Sequelize = require('sequelize');

const _user = encodeURIComponent(config.db.dbUser);
const _password = encodeURIComponent(config.db.dbPassword);

const urlConnection = `postgres://${_user}:${_password}@${config.db.dbAddress}:${config.db.dbPort}/${config.db.dbName}`;

const sequelize = new Sequelize(urlConnection, {
  dialect: 'postgres',
  logging: true
});


module.exports = sequelize;
