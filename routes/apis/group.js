const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'temp/' })
const groupController = require('../../controllers/groupController')

router.post('/:GroupId/members', groupController.postGroupMember)
router.delete('/:GroupId/members/:MemberId', groupController.deleteGroupMember)
router.get('/:GroupId/expenses', groupController.getGroupExpenses)
router.post('/:GroupId/expenses', groupController.postGroupExpenses)
router.get('/:GroupId', groupController.getGroup)
router.post('/', groupController.postGroup)
router.put('/:GroupId', upload.single('image'), groupController.putGroup)

module.exports = router