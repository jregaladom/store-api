const { Model, DataTypes } = require('sequelize');
const { CUSTOMER_TABLE } = require('./customer.model');

const ORDER_TABLE = 'order';
const ORDER_PK_NAME = 'id';

const ORDER_SCHEMA = {
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
  total: {
    type: DataTypes.VIRTUAL,
    get() {
      if (this.products.length > 0) {
        return this.products.reduce((total, item) => {
          return total + (item.price * item.OrderProduct.amount);
        }, 0);
      }
      return 0;
    }
  }
};

class Order extends Model {
  static associate(models) {
    this.belongsTo(models.Customer, { as: 'customer', foreignKey: 'customerId' });
    this.belongsToMany(models.Product, { as: 'products', through: models.OrderProduct, foreignKey: 'orderId', otherKey: 'productId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false
    }
  }
}


module.exports = { Order, ORDER_SCHEMA, ORDER_TABLE, ORDER_PK_NAME };
