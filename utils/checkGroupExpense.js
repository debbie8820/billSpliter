const { Group, Category } = require('../models')

const checkGroupExpense = async (data) => {
  try {
    const { name, amount, GroupId, CategoryId, date, expenseDetail } = data
    const category = await Category.findByPk(CategoryId)
    if (!category) throw new Error('Cannot find the category')
    const group = await Group.findByPk(GroupId)
    if (!group) throw new Error('Cannot find the group')

    if (!name || !amount || !GroupId || !CategoryId || !date || !expenseDetail || !expenseDetail.length) {
      throw new Error('Please fill in all the fields')
    }
    if (Number(amount) < 0 || Number(amount) == null) {
      throw new Error('Amount should be a positive number')
    }
    expenseDetail.map((d, i) => {
      if (Number(d.amount) < 0 || Number(d.amount) == null) {
        throw new Error('Amount should be a positive number')
      }
    })
  }
  catch (err) {
    throw err
  }
}

module.exports = checkGroupExpense