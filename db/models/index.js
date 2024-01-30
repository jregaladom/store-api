const { User, USER_SCHEMA } = require('./user.model');
const { Customer, CUSTOMER_SCHEMA } = require('./customer.model');
const { Category, CATEGORY_SCHEMA } = require('./category.model');
const { Product, PRODUCT_SCHEMA } = require('./product.model');

function setupModels(sequelize) {
  User.init(USER_SCHEMA, User.config(sequelize));
  Customer.init(CUSTOMER_SCHEMA, Customer.config(sequelize));
  Product.init(PRODUCT_SCHEMA, Product.config(sequelize));
  Category.init(CATEGORY_SCHEMA, Category.config(sequelize));

  Customer.associate(sequelize.models);
  User.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
}

module.exports = setupModels;
