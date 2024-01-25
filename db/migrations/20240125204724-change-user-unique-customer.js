'use strict';
const { CUSTOMER_SCHEMA, CUSTOMER_TABLE } = require('../models/customer.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', {
      type: CUSTOMER_SCHEMA.userId.type,
      allowNull: false,
      unique: true
    });
  },

};
