const express = require('express')
const router = express.Router()
const userController = require('../Controller/userController')
const { admin, protect } = require('../middleware/Auth')
router.get('/', userController.getAll)

router.get('/:id', protect, admin, userController.get)
router.put('/:id', protect, admin, userController.edit)

router.post('/login', userController.login)

router.delete('/:id', protect, admin, userController.deleteUser)
router.post('/', protect, admin, userController.addUser)

module.exports = router
