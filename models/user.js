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
      // User.hasMany(models.Expense)
      User.hasMany(models.UserGroup)
      User.belongsToMany(models.Expense, {
        through: models.ExpenseDetail,
        foreignKey: 'payerId',
        as: 'payees'
      })

      User.belongsToMany(models.Expense, {
        through: models.ExpenseDetail,
        foreignKey: 'payeeId',
        as: 'payers'
      })

      User.belongsToMany(models.Group, {
        through: models.UserGroup,
        foreignKey: 'UserId',
        as: 'groupId'
      })

      User.belongsToMany(models.User, {
        through: models.Friendship,
        foreignKey: 'followingId',
        as: 'followers'
      })

      User.belongsToMany(models.User, {
        through: models.Friendship,
        foreignKey: 'followerId',
        as: 'followings'
      })
      // User.belongsToMany(models.Expense, {
      //   through: models.Expense,
      //   targetKey: 'payerId',
      //   as: 'borrowers'
      // })

      // User.belongsToMany(models.Expense, {
      //   through: models.Expense,
      //   targetKey: 'payeeId',
      //   as: 'lenders'
      // })
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