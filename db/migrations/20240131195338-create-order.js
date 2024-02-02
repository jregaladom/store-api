'use strict';
const { ORDER_TABLE } = require('../models/order.model');
const { DataTypes } = require('sequelize');
const { CUSTOMER_TABLE } = require('../models/customer.model');
const ORDER_PK_NAME = 'id';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(ORDER_TABLE, {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: ORDER_PK_NAME
      },
      customerId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        field: 'customer_id',
        references: {
          model: CUSTOMER_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'create_at',
        defaultValue: DataTypes.NOW
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(ORDER_TABLE);
  }
};
