const express = require('express')

const router = express.Router()

const QnAController = require('../Controller/QnAController')
const { protect } = require('../middleware/Auth')

router.put('/:id', protect, QnAController.update)

router.delete('/:id', protect, QnAController.delete)

router.post('/', protect, QnAController.add)
router.post('/extract', protect, QnAController.extractKeywordFromQuestion)

router.get('/', QnAController.getQnAs)
router.get('/:slug', QnAController.getSingleQnA)

module.exports = router
