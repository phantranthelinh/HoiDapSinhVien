const express = require('express')

const router = express.Router()

const newQuestionController = require('../Controller/newQuestionController')
const { protect } = require('../middleware/Auth')

router.get('/', protect, newQuestionController.getAll)
router.get('/:id', protect, newQuestionController.get)

router.delete('/:id', protect, newQuestionController.delete)

router.post('/', newQuestionController.add)

module.exports = router
