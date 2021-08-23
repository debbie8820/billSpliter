module.exports = async (body) => {
  try {
    const { account, password, confirmPassword, email, name, phone } = body

    if (!account || !password || !confirmPassword || !email || !name || !phone) {
      throw new Error('All fields are required.')
    }

    if (!account.trim() || !password.trim() || !confirmPassword.trim() || !email.trim() || !name.trim() || !phone.trim()) {
      throw new Error('All fields are required.')
    }

    if (8 > password.length || password.length > 15) {
      throw new Error('The length of password is between 8-15 characters.')
    }

    if (20 < account.length) {
      throw new Error('The maximum length of account is 20 characters.')
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new Error('invalid email')
    }

    if (!phone.match(/^0\d{9}$/)) {
      throw new Error('invalid phone number')
    }

    if (password !== confirmPassword) {
      throw new Error('Password and confirmation password do not match.')
    }

    await require('../utils/checkUnique').checkAccount(account)
    await require('../utils/checkUnique').checkEmail(email)
  }
  catch (err) {
    throw err
  }
}