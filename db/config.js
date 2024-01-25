const { config } = require('../config/config');

const _user = encodeURIComponent(config.db.dbUser);
const _password = encodeURIComponent(config.db.dbPassword);

const urlConnection = `postgres://${_user}:${_password}@${config.db.dbAddress}:${config.db.dbPort}/${config.db.dbName}`;

module.exports = {
  development: {
    url: urlConnection,
    dialect: 'postgres'
  },
  production: {
    url: urlConnection,
    dialect: 'postgres'
  }
}
