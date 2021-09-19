const express = require('express')
const router = express.Router()
const expenseController = require('../../controllers/expenseController')

router.delete('/:ExpenseId', expenseController.deleteExpense)


module.exports = router