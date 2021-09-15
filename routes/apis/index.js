const express = require('express')
const router = express.Router()
const { authenticate } = require('../../middlewares/auth')


const users = require('../apis/user')
const groups = require('../apis/group')
const expenses = require('../apis/expense')

router.use('/users', users)
router.use(authenticate)
router.use('/groups', groups)
router.use('/expenses', expenses)





module.exports = router