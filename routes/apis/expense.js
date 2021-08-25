const express = require('express')
const router = express.Router()
const expenseController = require('../../controllers/expenseController')

router.put('/', expenseController.putExpense)


module.exports = router