const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'temp/' })
const groupController = require('../../controllers/groupController')

router.post('/', groupController.postGroup)
router.get('/:GroupId', groupController.getGroup)
router.put('/:GroupId', upload.single('image'), groupController.putGroup)
router.post('/:GroupId/members', groupController.postGroupMember)
router.delete('/:GroupId/members/:MemberId', groupController.deleteGroupMember)

module.exports = router