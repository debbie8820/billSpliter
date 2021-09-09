const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'temp/' })
const { authenticate } = require('../../middlewares/auth')


const users = require('../apis/user')
const groups = require('../apis/group')
const expenses = require('../apis/expense')

router.use('/users', users)
router.use(authenticate)
router.use('/groups', upload.single('image'), groups)
router.use('/expenses', expenses)





module.exports = router