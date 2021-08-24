const { User, Expense } = require('../models')
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
    const dateQuery = {
      [Op.and]: [
        { createdAt: { [Op.gte]: date1 } },
        { createdAt: { [Op.lte]: date2 } }
      ]
    }

    return Expense.findAll({
      raw: true,
      include: ['Category'],
      where: {
        payerId: UserId,
        createdAt: dateQuery
      },
      attributes: [
        'id',
        'name',
        'createdAt',
        [sequelize.fn('count', sequelize.col('amount')), 'amount']
      ],
      group: ['name'],
      order: [['createdAt', 'DESC']],
      limit
    })
  }
}

module.exports = userService