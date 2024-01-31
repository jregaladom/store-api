'use strict';
const { ORDER_TABLE, ORDER_SCHEMA } = require('../models/order.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(ORDER_TABLE, ORDER_SCHEMA);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(ORDER_TABLE);
  }
};
