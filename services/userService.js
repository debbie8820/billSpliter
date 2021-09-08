const { User, Expense, Category } = require('../models')
const { Op } = require('sequelize')
const sequelize = require('sequelize')

const userService = {
  register: (data) => {
    User.create(data)
  },

  login: (account) => {
    return User.findOne({
      where: { account },
      attributes: ['id', 'password', 'name', 'avatar', 'email']
    })
  },

  getUserExpenses: (limit, date1, date2, UserId) => {
    limit = limit > 50 ? 50 : limit //最多只查50筆
    let dateQuery = {
      [Op.gte]: date1,
      [Op.lte]: date2
    }
    if (!date1 || !date2) {
      dateQuery = {
        [Op.gte]: new Date('2001-1-1')
      }
    }

    return Expense.findAll({
      raw: true,
      include: [
        { model: Category, attributes: ['id', 'code', 'icon', 'name'] },
        { model: User, as: 'payer', attributes: ['id', 'name', 'avatar'] },
        // { model: User, as: 'payee', attributes: ['id', 'name', 'avatar'] }
      ],
      where: {
        payerId: UserId,
        date: dateQuery
      },
      attributes: [
        'id',
        'name',
        'amount',
        'date',
        'payerId'
      ],
      order: [['date', 'DESC']],
      limit
    })
  },

  postUserExpense: async (data) => {
    const { id } = await Expense.create(data)
    return id
  }
}

module.exports = userService