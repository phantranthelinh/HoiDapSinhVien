const express = require('express')
const multer = require('multer')
const path = require('path')
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '/uploads/'))
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage: fileStorageEngine })

const router = express.Router()

const QnAController = require('../Controller/QnAController')
const { protect } = require('../middleware/Auth')

router.get('/all', QnAController.getAllQnAs)
router.post('/keywords', QnAController.getQnAs)
router.get('/search', QnAController.searchQnA)

router.put('/happy/:id', QnAController.happy)
router.put('/unhappy/:id', QnAController.unhappy)
router.get('/:id', QnAController.getSingleQnA)
router.put('/:id', protect, QnAController.edit)

router.delete('/:id', protect, QnAController.delete)

router.post('/', protect, QnAController.add)
router.post('/file', protect, upload.single('import_data'), QnAController.addWithFile)

router.post('/extract', QnAController.extractKeywordFromQuestion)

module.exports = router
