const userService = require('../services/userService')
const validation = require('../utils/validate')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userController = {
  register: async (req, res, next) => {
    try {
      const { account, password, email, name, phone } = req.body
      await validation(req.body)

      const hash = bcrypt.hashSync(password, 10)

      await userService.register({ account, password: hash, email, name, phone })
      return res.json({ status: 'success', message: '成功註冊' })
    }
    catch (err) {
      next(err)
    }
  },

  login: async (req, res, next) => {
    try {
      const { account, password } = req.body

      if (!account || !password) {
        throw new Error('All fields are required.')
      }

      const user = await userService.login(account)

      if (!user) {
        throw new Error('The account does not exist.')
      }
      if (!bcrypt.compareSync(password, user.password)) {
        throw new Error('incorrect password')
      }

      const payload = { id: user.id }
      const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 43200 }
      )

      return res.json({
        status: 'success',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar
        }
      })
    }
    catch (err) {
      next(err)
    }
  },

  getCurrentUser: (req, res, next) => {
    return res.json(req.user)
  },

  getUserExpenses: async (req, res, next) => {
    try {
      let { limit, date1, date2 } = req.query
      const { id: UserId } = req.user
      if (limit) {
        limit = Number(limit)
      } else {
        limit = null
      }
      const expenses = await userService.getUserExpenses(limit, date1, date2, UserId)
      return res.json(expenses)
    }
    catch (err) {
      next(err)
    }
  },

  postUserExpense: async (req, res, next) => {
    try {
      let { name, CategoryId, amount, date } = req.body
      const { id: payerId } = req.user
      if (!name || !CategoryId || !amount || !date) {
        throw new Error('Please fill in all the columns')
      }
      amount = Number(amount)

      const id = await userService.postUserExpense({ name, CategoryId, amount, date, payerId })

      return res.json({ status: 'success', message: 'new expense created', ExpenseId: id })
    }
    catch (err) {
      next(err)
    }
  },

  putUserExpense: async (req, res, next) => {
    try {
      let { name, CategoryId, amount, date } = req.body
      const { ExpenseId } = req.params
      if (!name || !CategoryId || !amount || !date || !ExpenseId) {
        throw new Error('Please fill in all the fields')
      }
      amount = Number(amount)

      await userService.putUserExpense({ name, CategoryId, amount, date, ExpenseId })

      return res.json({ status: 'success', message: 'Your expense is updated', ExpenseId })
    }
    catch (err) {
      next(err)
    }
  },

  getUserGroups: async (req, res, next) => {
    try {
      const { id: UserId } = req.user
      const groups = await userService.getUserGroups(UserId)
      return res.json(groups)
    }
    catch (err) {
      next(err)
    }
  }
}

module.exports = userController