const userService = require('../services/userService')
const validation = require('../utils/validate')
const bcrypt = require('bcryptjs')

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
  }
}

module.exports = userController