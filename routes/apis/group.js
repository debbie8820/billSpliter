const express = require('express')
const router = express.Router()
const groupController = require('../../controllers/groupController')

router.post('/', groupController.postGroup)
router.get('/:GroupId', groupController.getGroup)
router.put('/:GroupId', groupController.putGroup)
router.post('/:GroupId/members', groupController.postGroupMember)

module.exports = router