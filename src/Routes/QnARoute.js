const express = require('express')
const multer = require('multer')
const upload = multer({ dest: './public/uploads/' })
const router = express.Router()

const QnAController = require('../Controller/QnAController')
const { protect } = require('../middleware/Auth')

router.get('/all', QnAController.getAllQnAs)
router.post('/keywords', QnAController.getQnAs)
router.get('/search', QnAController.searchQnA)
router.get('/:id', QnAController.getSingleQnA)

router.put('/:id', protect, QnAController.edit)

router.delete('/:id', protect, QnAController.delete)

router.post('/', protect, QnAController.add)
router.post('/file', upload.single('import_data'), protect, QnAController.addWithFile)

router.post('/extract', QnAController.extractKeywordFromQuestion)

module.exports = router
