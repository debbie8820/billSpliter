const checkExpenseDetail = async (object) => {
  try {
    const { id, payerId, payeeId, amount } = object
    if (!payerId || !payeeId || amount == undefined) {
      throw new Error('Please fill in all the fields in expenseDetail')
    }
    if (id) {
      if (id % 1 !== 0 || id < 0) throw new Error(`Incorrect id`)
    }
    if (payerId % 1 !== 0 || id < 0) throw new Error(`Incorrect payerId`)
    if (payeeId % 1 !== 0 || id < 0) throw new Error(`Incorrect payeeId`)
    if (amount % 1 !== 0 || amount < 0) throw new Error(`Incorrect amount`)
  }
  catch (err) {
    throw err
  }
}

module.exports = checkExpenseDetail