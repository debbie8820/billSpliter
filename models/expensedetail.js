'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExpenseDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ExpenseDetail.belongsTo(models.Expense)
    }
  };
  ExpenseDetail.init({
    ExpenseId: DataTypes.INTEGER,
    payerId: DataTypes.INTEGER,
    payeeId: DataTypes.INTEGER,
    amount: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'ExpenseDetail',
  });
  return ExpenseDetail;
};