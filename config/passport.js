const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const passport = require('passport')
const { User } = require('../models')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

passport.use(new JwtStrategy(options, async (payload, done) => {
  try {
    const user = await User.findByPk(payload.id)

    if (!user) {
      return done(null, false)
    }
    return done(null, user)
  }
  catch (err) {
    return done(err, false)
  }
}))

module.exports = passport