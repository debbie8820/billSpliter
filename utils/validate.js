module.exports = async (body) => {
  try {
    const { account, password, confirmPassword, email, name, UserId } = body

    if (!account || !password || !confirmPassword || !email || !name) {
      throw new Error('All fields are required.')
    }

    if (!account.trim() || !password.trim() || !confirmPassword.trim() || !email.trim() || !name.trim()) {
      throw new Error('All fields are required.')
    }

    if (8 > password.length) {
      throw new Error('The minimum length of password is 8 characters.')
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new Error('invalid email')
    }

    if (password !== confirmPassword) {
      throw new Error('Password and confirmation password do not match.')
    }

    await require('../utils/checkUnique').checkAccount(account, UserId)
    await require('../utils/checkUnique').checkEmail(email, UserId)
  }
  catch (err) {
    throw err
  }
}