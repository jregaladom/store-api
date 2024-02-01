'use strict';
const { ORDER_PRODUCT_SCHEMA, ORDER_PRODUCT_TABLE } = require('../models/order-products.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, ORDER_PRODUCT_SCHEMA);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
  }
};
