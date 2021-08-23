const { User } = require('../models')

const userService = {
  register: (data) => {
    User.create(data)
  }
}

module.exports = userService