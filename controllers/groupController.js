const groupService = require('../services/groupService')
const imgur = require('imgur-node-api')
const checkGroupExpense = require('../utils/checkGroupExpense')
const imgurUpload = require('../utils/imgurUpload')

const groupController = {
  postGroup: async (req, res, next) => {
    try {
      const { name, members } = req.body
      let img = null
      const { file } = req
      if (!name || !members || !members.length) {
        throw new Error('Please fill in all the fields')
      }

      if (file) {
        imgur.setClientID(process.env.IMGUR_CLIENT_ID)
        img = await imgurUpload(file.path) || null
      }

      const { GroupId } = await groupService.postGroup({ name, img, members })
      return res.json({ status: 'success', message: 'Group created', GroupId })
    }
    catch (err) {
      next(err)
    }
  },

  getGroup: async (req, res, next) => {
    try {
      const { GroupId } = req.params
      const { id: UserId } = req.user
      const group = await groupService.getGroup(GroupId, UserId)
      return res.json(group)
    }
    catch (err) {
      next(err)
    }
  },

  putGroup: async (req, res, next) => { //members只能修改跟原本一樣的數量
    try {
      const { GroupId } = req.params
      const { name, members } = req.body
      let img
      const { file } = req
      if (!name || !members || !members.length) throw new Error('Please fill in all the fields')

      if (file) {
        imgur.setClientID(process.env.IMGUR_CLIENT_ID)
        img = await imgurUpload(file.path)
      }
      console.log(img)
      await groupService.putGroup({ name, img, members, GroupId })
      return res.json({ status: 'success', message: 'Group updated', GroupId })
    }
    catch (err) {
      next(err)
    }
  },

  postGroupMember: async (req, res, next) => {
    try {
      const { UserId } = req.body
      const { GroupId } = req.params
      if (!UserId || !GroupId) throw new Error('Please provide UserId and GroupId')
      const record = await groupService.postGroupMember(UserId, GroupId)
      res.json(record)
    }
    catch (err) {
      next(err)
    }
  },

  deleteGroupMember: async (req, res, next) => {
    try {
      const { GroupId, MemberId } = req.params
      if (!MemberId || !GroupId) throw new Error('Please provide MemberId and GroupId')
      await groupService.deleteGroupMember(GroupId, MemberId)
      res.json({ status: 'success', message: 'Member deleted' })
    }
    catch (err) {
      next(err)
    }
  },

  getGroupExpenses: async (req, res, next) => {
    try {
      const { GroupId } = req.params
      const { id: UserId } = req.user
      if (!GroupId) throw new Error('Please provide GroupId')
      let { limit } = req.query
      limit = Number(limit)
      if (!limit) {
        limit = 20
      }
      const expenses = await groupService.getGroupExpenses(GroupId, UserId, limit)
      res.json(expenses)
    }
    catch (err) {
      next(err)
    }
  },

  postGroupExpenses: async (req, res, next) => {
    try {
      const { GroupId } = req.params
      req.body.GroupId = GroupId
      await checkGroupExpense(req.body)
      const record = await groupService.postGroupExpenses(req.body)
      res.json(record)
    }
    catch (err) {
      next(err)
    }
  },

  putGroupExpenses: async (req, res, next) => {
    try {
      const { GroupId, ExpenseId } = req.params
      if (!GroupId || !ExpenseId) throw new Error('Please provide GroupId and ExpenseId')
      req.body.ExpenseId = ExpenseId
      req.body.GroupId = GroupId
      await checkGroupExpense(req.body)
      await groupService.putGroupExpenses(req.body)
      res.json({ status: 'success', message: 'Group Expense updated', ExpenseId })
    }
    catch (err) {
      next(err)
    }
  },

  postExpenseDetail: async (req, res, next) => {
    try {
      const { ExpenseId } = req.params
      const { expenseDetail } = req.body
      if (!ExpenseId || !expenseDetail || !expenseDetail.length) throw new Error('Please provide ExpenseId and expenseDetail')
      const record = await groupService.postExpenseDetail({ ExpenseId, expenseDetail })
      res.json(record)
    }
    catch (err) {
      next(err)
    }
  },

  deleteExpenseDetail: async (req, res, next) => {
    try {
      const { DetailId } = req.params
      if (!DetailId) throw new Error('Please provide DetailId')
      await groupService.deleteExpenseDetail(DetailId)
      res.json({ status: 'success', message: 'Expense detail deleted' })
    }
    catch (err) {
      next(err)
    }
  }
}

module.exports = groupController