const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE, USER_PK_NAME } = require('./user.model');
const CUSTOMER_TABLE = 'customer';

const CUSTOMER_SCHEMA = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },

  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },

  createAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  },

  userId: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
    field: 'user_id',
    references: {
      model: USER_TABLE,
      key: USER_PK_NAME
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
};

class Customer extends Model {

  static associate(models) {
    this.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false
    }
  }
}


module.exports = { Customer, CUSTOMER_SCHEMA, CUSTOMER_TABLE };
