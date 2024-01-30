'use strict';
const { PRODUCT_SCHEMA, PRODUCT_TABLE } = require('../models/product.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(PRODUCT_TABLE, PRODUCT_SCHEMA);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(PRODUCT_TABLE);
  }
};
