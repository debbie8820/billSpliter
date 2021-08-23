const { User } = require('../models')

const checkAccount = async (account) => {
  const accountExists = await User.findOne({ where: { account } })
  if (accountExists) {
    throw new Error('The account has already been registered.')
  }
}

const checkEmail = async (email) => {
  const emailExists = await User.findOne({ where: { email } })
  if (emailExists) {
    throw new Error('The email has already been registered.')
  }
}

module.exports = { checkAccount, checkEmail }

