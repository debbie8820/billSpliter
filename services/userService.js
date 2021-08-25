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

    let dateQuery = {
      [Op.gte]: date1,
      [Op.lte]: date2
    }
    if (!date1 || !date2) {
      dateQuery = {
        [Op.ne]: new Date('2015-1-1')
      }
    }

    return Expense.findAll({
      raw: true,
      include: [
        { model: Category, attributes: ['code', 'icon', 'name'] },
        { model: User, as: 'payer', attributes: ['id', 'name', 'avatar'] },
        { model: User, as: 'payee', attributes: ['id', 'name', 'avatar'] }
      ],
      where: {
        payerId: UserId,
        createdAt: dateQuery
      },
      attributes: [
        'id',
        'name',
        'createdAt',
        'payerId',
        'payeeId',
        [sequelize.fn('sum', sequelize.col('amount')), 'amount']
      ],
      group: ['name'],
      order: [['createdAt', 'DESC']],
      limit
    })
  }
}

module.exports = userService