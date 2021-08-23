const apis = require('./apis')

module.exports = (app) => {
  app.use('/api', apis)
  app.use((err, req, res, next) => {
    res.status(500).json(String(err))
  })
}

