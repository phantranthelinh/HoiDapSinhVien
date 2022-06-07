const express = require('express')
const router = express.Router()
const userController = require('../Controller/userController')
const { admin, protect } = require('../middleware/Auth')
router.post('/', protect, admin, userController.addUser)
router.post('/login', userController.login)
router.get('/', protect, admin, userController.getUser)
router.delete('/:id', protect, admin, userController.deleteUser)

module.exports = router
