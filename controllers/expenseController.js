const expenseService = require('../services/expenseService')

const expenseController = {
  getExpense: async (req, res, next) => {
    try {
      const { ExpenseId } = req.params
      const expense = await expenseService.getExpense(ExpenseId)
      if (!expense) {
        throw err('Can not find the expense record')
      }
      return res.json(expense)
    }
    catch (err) {
      next(err)
    }
  }
}

module.exports = expenseController