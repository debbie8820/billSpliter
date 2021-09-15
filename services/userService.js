const { User, Expense, Category, Group, UserGroup, Friendship } = require('../models')
const { Op } = require('sequelize')
const Sequelize = require('sequelize')

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
    try {
      const { id } = await Expense.create(data)
      return id
    }
    catch (err) {
      throw err
    }
  },

  putUserExpense: async (data) => {
    try {
      const { name, CategoryId, amount, date, ExpenseId } = data
      const expense = await Expense.findByPk(ExpenseId)

      if (!expense) {
        throw new Error('The expense doesn\'t exist.')
      }
      await expense.update({ name, CategoryId, amount, date })
    }
    catch (err) {
      throw err
    }
  },

  getUserGroups: async (UserId) => {
    try {
      const result = UserGroup.findAndCountAll({
        include: [
          {
            model: Group, attributes: [
              'id',
              'name',
              'img',
              [Sequelize.literal(`(SELECT COUNT (*) FROM UserGroups WHERE GroupId = Group.id)`), 'totalMembers'],
              [Sequelize.literal(`(SELECT COUNT (*) FROM Expenses WHERE GroupId = Group.id)`), 'totalExpenses'],
              [Sequelize.literal(`(SELECT SUM (ExpenseDetails.amount) FROM expenseDetails WHERE payerId = ${UserId} AND ExpenseId in (SELECT id FROM Expenses WHERE GroupId = Group.id))`), 'totalUserPaid'],
              [Sequelize.literal(`(SELECT SUM (ExpenseDetails.amount) FROM expenseDetails WHERE payeeId = ${UserId} AND ExpenseId in (SELECT id FROM Expenses WHERE GroupId = Group.id))`), 'totalUserOwed']
            ]
          }
        ],
        where: { UserId },
        attributes: ['UserId', 'GroupId'],
        raw: true
      })
      return result
    }
    catch (err) {
      throw err
    }
  },

  getUserFriends: (UserId) => {
    return User.findAll({
      raw: true,
      where: { id: UserId },
      attributes: [],
      include: [{ model: User, as: 'followings', attributes: [['id', 'friendId'], 'avatar', 'name', 'account'] }]
    })
  },

  getUserData: async (account, UserId) => {
    try {
      const userData = await User.findOne({
        where: { account },
        attributes: [
          'id',
          'account',
          'name',
          'avatar',
          [Sequelize.literal(`(SELECT EXISTS (SELECT * FROM Friendships WHERE followerId = ${UserId} AND followingId = User.id))`), 'isFriend']
        ]
      })
      if (!userData) {
        throw new Error('The user doesn\'t exist')
      }
      return userData
    }
    catch (err) {
      throw err
    }
  },

  putUserData: async (data) => {
    try {
      const { account, password, email, name, avatar, UserId } = data
      const user = await User.findByPk(UserId)
      if (!user) throw new Error('The user doesn\'t exist')
      await user.update({ account, password, email, name, avatar })
      return user.toJSON()
    }
    catch (err) {
      throw err
    }
  },

  postFriend: (followerId, followingId) => {
    Friendship.findOrCreate({ where: { followerId, followingId } })
  },

  deleteFriend: async (followerId, followingId) => {
    try {
      const record = await Friendship.findOne({ where: { followerId, followingId } })
      if (!record) {
        throw new Error('The user is not your friend')
      }
      await record.destroy()
    }
    catch (err) {
      throw err
    }
  }
}

module.exports = userService