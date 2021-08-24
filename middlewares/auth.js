const passport = require('../config/passport')

const authenticate = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (!user) { return res.json({ status: 'error', message: 'No JWT token' }) }
    if (err) { return res.json({ status: 'error', message: err }) }
    req.user = user.toJSON()
    return next()
  })(req, res, next)
}

module.exports = { authenticate };