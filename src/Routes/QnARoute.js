const express = require('express')

const router = express.Router()

const QnAController = require('../Controller/QnAController')
const { protect } = require('../middleware/Auth')

router.get('/', QnAController.getQnAs)
router.get('/all', QnAController.getAllQnAs)
router.get('/:id', QnAController.getSingleQnA)
router.put('/:id', protect, QnAController.update)

router.delete('/:id', protect, QnAController.delete)

router.post('/', protect, QnAController.add)
router.post('/extract', QnAController.extractKeywordFromQuestion)

module.exports = router
