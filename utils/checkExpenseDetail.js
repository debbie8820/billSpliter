const { User, ExpenseDetail } = require('../models')

const checkExpenseDetail = async (object) => {
  try {
    const { id, payerId, payeeId, amount } = object
    if (!id || !payerId || !payeeId || amount == undefined) {
      throw new Error('Please fill in all the fields in expenseDetail')
    }
    const record = ExpenseDetail.findByPk(id)
    if (!record) throw new Error(`The record does not exist`)
    if (payerId === payeeId) {
      const payer = await User.findByPk(payerId)
      if (!payer) throw new Error(`The payer and payee does not exist`)
    }
    const payer = await User.findByPk(payerId)
    const payee = await User.findByPk(payeeId)
    if (!payer) throw new Error(`The payer with id ${payerId} does not exist`)
    if (!payee) throw new Error(`The payee with id ${payeeId} does not exist`)
  }
  catch (err) {
    throw err
  }
}

module.exports = checkExpenseDetail