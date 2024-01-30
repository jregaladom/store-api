const { Model, DataTypes } = require('sequelize');

const CATEGORY_TABLE = 'category';
const CATEGORY_PK_NAME = 'id';

const CATEGORY_SCHEMA = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    field: CATEGORY_PK_NAME
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  createAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'create_at',
    defaultValue: DataTypes.NOW
  },
};

class Category extends Model {
  static associate(models) {
    this.hasMany(models.Product, { as: 'products', foreignKey: 'categoryId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: false
    }
  }
}


module.exports = { Category, CATEGORY_SCHEMA, CATEGORY_TABLE, CATEGORY_PK_NAME };
