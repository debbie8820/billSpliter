const { User, Group, UserGroup } = require('../models')
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
      where: { GroupId },
      attributes: ['UserId', 'GroupId'],
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
  }
}

module.exports = groupService