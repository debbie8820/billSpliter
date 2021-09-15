const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController')
const { authenticate } = require('../../middlewares/auth')
const multer = require('multer')
const upload = multer({ dest: 'temp/' })

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/currentUser', authenticate, userController.getCurrentUser)
router.get('/expenses', authenticate, userController.getUserExpenses)
router.post('/expenses', authenticate, userController.postUserExpense)
router.put('/expenses/:ExpenseId', authenticate, userController.putUserExpense)
router.get('/groups', authenticate, userController.getUserGroups)
router.get('/friends', authenticate, userController.getUserFriends)
router.post('/friends/:UserId', authenticate, userController.postFriend)
router.delete('/friends/:UserId', authenticate, userController.deleteFriend)
router.get('/', authenticate, userController.getUserData)
router.put('/', authenticate, upload.single('avatar'), userController.putUserData)


module.exports = router