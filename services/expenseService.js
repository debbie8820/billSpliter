const { User, Expense, Category } = require('../models')

const expenseService = {
  getExpense: (ExpenseId) => {
    return Expense.findByPk(ExpenseId, {
      include: [
        { model: Category, attributes: ['name'] },
        { model: User, as: 'payer', attributes: ['id', 'name', 'avatar'] },
        { model: User, as: 'payee', attributes: ['id', 'name', 'avatar'] }
      ]
    })
  }
}

module.exports = expenseService