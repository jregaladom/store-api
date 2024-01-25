const { User, USER_SCHEMA } = require('./user.model');
const { Customer, CUSTOMER_SCHEMA } = require('./customer.model');


function setupModels(sequelize) {
  User.init(USER_SCHEMA, User.config(sequelize));
  Customer.init(CUSTOMER_SCHEMA, Customer.config(sequelize));

  Customer.associate(sequelize.models);
  User.associate(sequelize.models);
}

module.exports = setupModels;
