const express = require('express')

const router = express.Router()

const newQuestionController = require('../Controller/newQuestionController')
const { protect } = require('../middleware/Auth')

router.post('/', newQuestionController.add)
router.get('/', protect, newQuestionController.getAll)
router.get('/:id', protect, newQuestionController.get)

module.exports = router
