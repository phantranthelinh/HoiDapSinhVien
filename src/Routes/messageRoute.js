const express = require('express')

const router = express.Router()

const messageController = require('../Controller/messageController')
const { protect } = require('../middleware/Auth')

router.post('/', messageController.addQuestionFromUser)
router.delete('/:id', protect, messageController.delete)

router.get('/:id', protect, messageController.get)

router.get('/', protect, messageController.getAll)

module.exports = router
