const { Model, DataTypes } = require('sequelize');

const { ORDER_TABLE } = require('./order.model');
const { PRODUCT_TABLE } = require('./product.model');

const ORDER_PRODUCT_TABLE = 'order_product';
const ORDER_PRODUCT_PK_NAME = 'id';

const ORDER_PRODUCT_SCHEMA = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    field: ORDER_PRODUCT_PK_NAME
  },
  orderId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'order_id',
    references: {
      model: ORDER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  productId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'product_id',
    references: {
      model: PRODUCT_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'create_at',
    defaultValue: DataTypes.NOW
  },
};

class OrderProduct extends Model {
  // static associate(models) {
  //   //this.belongsTo(models.Customer, { as: 'customer', foreignKey: 'customerId' });
  // }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_PRODUCT_TABLE,
      modelName: 'OrderProduct',
      timestamps: false
    }
  }
}


module.exports = { OrderProduct, ORDER_PRODUCT_SCHEMA, ORDER_PRODUCT_PK_NAME, ORDER_PRODUCT_TABLE };
