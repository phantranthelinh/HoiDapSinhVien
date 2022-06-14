const express = require('express')

const router = express.Router()

const QnAController = require('../Controller/QnAController')
const { protect } = require('../middleware/Auth')

router.get('/all', QnAController.getAllQnAs)
router.get('/', QnAController.getQnAs)
router.get('/search', QnAController.searchQnA)
router.get('/:id', QnAController.getSingleQnA)

router.put('/:id', protect, QnAController.edit)

router.delete('/:id', protect, QnAController.delete)

router.post('/', protect, QnAController.add)
router.post('/fromfile', protect, QnAController.addWithFile)

router.post('/extract', QnAController.extractKeywordFromQuestion)

module.exports = router
