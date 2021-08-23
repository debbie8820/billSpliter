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
  }
}

module.exports = userController