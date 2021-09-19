const expenseService = require('../services/expenseService')

const expenseController = {
  deleteExpense: async (req, res, next) => {
    try {
      const { ExpenseId } = req.params
      if (!ExpenseId) throw new Error('Please provide ExpenseId')
      await expenseService.deleteExpense(ExpenseId)
      res.json({ status: 'success', message: 'Expense deleted' })
    }
    catch (err) {
      next(err)
    }
  }
}

module.exports = expenseController