const express = require('express')

const router = express.Router()

const QnAController = require('../Controller/QnAController')
const { protect } = require('../middleware/Auth')
router.put('/:id', QnAController.update)

router.delete('/:id', QnAController.delete)

router.post('/', QnAController.add)

router.get('/', QnAController.getQnAs)

module.exports = router
