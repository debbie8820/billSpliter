const express = require('express')
const { authenticate } = require('../../middlewares/auth')
const router = express.Router()

const users = require('../apis/user')
const expenses = require('../apis/expense')

router.use('/users', users)
router.use(authenticate)
router.use('/expenses', expenses)





module.exports = router