const { User, Group, UserGroup, Expense, ExpenseDetail, Category } = require('../models')
const Sequelize = require('sequelize')

const groupService = {
  postGroup: async (data) => {
    try {
      const { name, img, members } = data
      const { id: GroupId } = await Group.create({ name, img })
      await UserGroup.bulkCreate(Array.from({ length: members.length }).map((d, i) => ({
        UserId: members[i],
        GroupId,
        createdAt: new Date(),
        updatedAt: new Date()
      })))
      return GroupId
    }
    catch (err) {
      throw err
    }
  },

  getGroup: async (GroupId) => {
    const group = await Group.findByPk(GroupId, {
      attributes: [
        'id',
        'img',
        'name',
        [Sequelize.literal(`(SELECT SUM (amount) FROM Expenses WHERE GroupId = ${GroupId})`), 'totalExpense']
      ],
      raw: true
    })
    if (!group) throw new Error('The group doesn\'t exist')
    const members = await UserGroup.findAll({
      raw: true,
      nest: true,
      where: { GroupId },
      attributes: ['id', 'UserId', 'GroupId'],
      include: {
        model: User,
        attributes: [
          'id',
          'name',
          'avatar',
          [Sequelize.literal(`(SELECT SUM (amount) FROM expenseDetails WHERE payerId = User.id AND ExpenseId in (SELECT id FROM Expenses WHERE GroupId = ${GroupId}))`), 'totalUserPaid'],
          [Sequelize.literal(`(SELECT SUM (amount) FROM expenseDetails WHERE payeeId = User.id AND ExpenseId in (SELECT id FROM Expenses WHERE GroupId = ${GroupId}))`), 'totalUserOwed']
        ]
      }
    })
    group.members = members
    return group
  },

  putGroup: async (data) => {
    try {
      const { name, members, GroupId } = data
      let { img } = data
      const group = await Group.findByPk(GroupId)

      if (!group) throw new Error('The group doesn\'t exist')
      if (!img) {
        img = group.img
      }

      await group.update({ name, img })
      await Promise.all(members.map(object => {
        return UserGroup.update({ UserId: object.UserId }, { where: { id: object.id } })
      }))
    }
    catch (err) {
      throw err
    }
  },

  postGroupMember: async (UserId, GroupId) => {
    try {
      await UserGroup.findOrCreate({ where: { UserId, GroupId } })
      const record = await UserGroup.findOne({
        raw: true,
        where: { UserId, GroupId },
        attributes: ['id', 'UserId', 'GroupId']
      })
      return record
    }
    catch (err) {
      throw err
    }
  },

  deleteGroupMember: async (GroupId, MemberId) => {
    try {
      const record = await UserGroup.findOne({ where: { GroupId, UserId: MemberId } })
      await record.destroy()
    }
    catch (err) {
      throw err
    }
  },

  getGroupExpenses: async (GroupId, UserId, limit) => {
    try {
      const expenses = await Expense.findAll({
        raw: true,
        nest: true,
        where: { GroupId },
        attributes: ['id', 'name', 'amount', 'GroupId', 'date',
          [Sequelize.literal(`(SELECT SUM (amount) FROM ExpenseDetails WHERE ExpenseId = Expense.id AND payerId = ${UserId})`), 'totalUserPaid'],
          [Sequelize.literal(`(SELECT SUM (amount) FROM ExpenseDetails WHERE ExpenseId = Expense.id AND payeeId = ${UserId})`), 'totalUserOwed']
        ],
        include: [
          {
            model: ExpenseDetail,
            include: { model: User, as: 'payees', attributes: ['id', 'name', 'avatar'] }
          },
          {
            model: ExpenseDetail,
            include: { model: User, as: 'payers', attributes: ['id', 'name', 'avatar'] }
          },
          { model: Category }
        ],
        order: [['date', 'DESC']],
        limit
      })
      return expenses
    }
    catch (err) {
      throw err
    }
  }
}

module.exports = groupService