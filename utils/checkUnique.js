const { User } = require('../models')

const checkAccount = async (account, UserId) => {
  const user = await User.findOne({ where: { account } })
  if (user && user.id !== UserId) {
    throw new Error('The account has already been registered.')
  }
}

const checkEmail = async (email, UserId) => {
  const user = await User.findOne({ where: { email } })
  if (user && user.id !== UserId) {
    throw new Error('The email has already been registered.')
  }
}

module.exports = { checkAccount, checkEmail }

