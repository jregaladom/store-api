const { Model, DataTypes } = require('sequelize');
const { CATEGORY_TABLE, CATEGORY_PK_NAME } = require('./category.model');

const PRODUCT_TABLE = 'product';
const PRODUCT_PK_NAME = 'id';

const PRODUCT_SCHEMA = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    field: PRODUCT_PK_NAME
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  createAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'create_at',
    defaultValue: DataTypes.NOW
  },
  categoryId: {
    allowNull: true,
    type: DataTypes.INTEGER,
    field: 'category_id',
    references: {
      model: CATEGORY_TABLE,
      key: CATEGORY_PK_NAME
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
};

class Product extends Model {
  static associate(models) {
    this.belongsTo(models.Category, { as: 'category' });
    this.belongsToMany(models.Order, { as: 'orders', through: models.OrderProduct, foreignKey: 'productId', otherKey: 'orderId' });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false
    }
  }
}


module.exports = { Product, PRODUCT_SCHEMA, PRODUCT_TABLE, PRODUCT_PK_NAME };
