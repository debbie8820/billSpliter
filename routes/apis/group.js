const express = require('express')
const router = express.Router()
const groupController = require('../../controllers/groupController')

router.post('/', groupController.postGroup)
router.get('/:GroupId', groupController.getGroup)


module.exports = router