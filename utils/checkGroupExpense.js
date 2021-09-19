const { Group, Expense } = require('../models')

const checkGroupExpense = async (data) => {
  try {
    const { name, amount, GroupId, CategoryId, date, ExpenseId, expenseDetail } = data
    if (!name || !amount || !GroupId || !CategoryId || !date || !expenseDetail || !expenseDetail.length) {
      throw new Error('Please fill in all the fields')
    }

    if (ExpenseId !== undefined) {
      const expense = await Expense.findByPk(ExpenseId)
      if (!expense) throw new Error('Cannot find the expense')
    }

    const group = await Group.findByPk(GroupId)
    if (!group) throw new Error('Cannot find the group')

    if (amount < 0 || amount % 1 !== 0) throw new Error('Incorrect amount')
    if (CategoryId < 0 || CategoryId % 1 !== 0) throw new Error('Incorrect CategoryId')

  }
  catch (err) {
    throw err
  }
}

module.exports = checkGroupExpense