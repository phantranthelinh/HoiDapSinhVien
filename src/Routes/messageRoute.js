const express = require('express')

const router = express.Router()

const messageController = require('../Controller/messageController')
const { protect } = require('../middleware/Auth')

router.post('/', messageController.addQuestionFromUser)
router.get('/:id', messageController.get)

router.get('/', messageController.getAll)

module.exports = router
