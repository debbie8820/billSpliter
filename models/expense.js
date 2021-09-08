'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Expense.hasMany(models.ExpenseDetail)
      Expense.belongsTo(models.Category)
      Expense.belongsTo(models.Group)
      Expense.belongsTo(models.User, {
        foreignKey: 'payerId',
        as: 'payer',
      })
    }
  };
  Expense.init({
    name: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    date: DataTypes.DATE,
    CategoryId: DataTypes.INTEGER,
    GroupId: DataTypes.INTEGER,
    payerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Expense',
  });
  return Expense;
};