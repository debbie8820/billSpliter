const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController')
const { authenticate } = require('../../middlewares/auth')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/currentUser', authenticate, (req, res, next) => {
  return res.json({ status: 'pass' })
})





module.exports = router