const express = require('express')
const router = express.Router()
const groupController = require('../../controllers/groupController')

router.post('/', groupController.postGroup)


module.exports = router