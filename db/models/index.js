const { User, USER_SCHEMA } = require('./user.model');


function setupModels(sequelize) {
  User.init(USER_SCHEMA, User.config(sequelize));
}

module.exports = setupModels;
