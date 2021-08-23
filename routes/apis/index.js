const express = require('express')
const router = express.Router()

const users = require('../apis/user')

router.use('/users', users)





module.exports = router