const { Expense } = require('../models')

const expenseService = {
  deleteExpense: async (ExpenseId) => {
    try {
      const expense = await Expense.findByPk(ExpenseId)
      if (!expense) throw new Error('The expense does not exist')
      await expense.destroy()
    }
    catch (err) {
      throw (err)
    }
  }
}

module.exports = expenseService