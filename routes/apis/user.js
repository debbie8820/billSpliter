const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController')
const { authenticate } = require('../../middlewares/auth')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/currentUser', authenticate, userController.getCurrentUser)
router.get('/expenses', authenticate, userController.getUserExpenses)




module.exports = router