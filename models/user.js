'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Group, {
        through: 'UserGroup',
        foreignKey: 'UserId',
        as: 'groupId'
      }),
        User.belongsToMany(models.Expense, {
          through: 'Expense',
          foreignKey: 'payerId',
          as: 'borrowers'
        }),
        User.belongsToMany(models.Expense, {
          through: 'Expense',
          foreignKey: 'payeeId',
          as: 'lenders'
        })
    }
  };
  User.init({
    account: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    avatar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};