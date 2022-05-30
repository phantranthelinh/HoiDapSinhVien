const express = require('express')

const router = express.Router()

const QnAController = require('../Controller/QnAController')
const { protect } = require('../middleware/Auth')

router.put('/:id', protect, QnAController.update)

router.delete('/:id', protect, QnAController.delete)

router.post('/', protect, QnAController.add)
router.get('/:id', QnAController.getSingleQnA)

router.get('/', QnAController.getQnAs)

module.exports = router
