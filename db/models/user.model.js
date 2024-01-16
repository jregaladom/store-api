const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const USER_SCHEMA = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
};

class User extends Model {
  // static associate(models) {
  //   //asociaciones
  // }
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}


module.exports = { User, USER_SCHEMA, USER_TABLE };
