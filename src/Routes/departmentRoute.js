const express = require('express')
const departmentController = require('../Controller/departmentController')
const router = express.Router()
const { admin, protect } = require('../middleware/Auth')

router.get('/all', protect, admin, departmentController.getAll)
router.get('/:id', protect, admin, departmentController.get)
router.delete('/:id', protect, admin, departmentController.delete)
router.put('/:id', protect, admin, departmentController.edit)
router.post('/', protect, admin, departmentController.add)

module.exports = router
