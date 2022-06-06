const express = require('express')
const departmentController = require('../Controller/departmentController')
const router = express.Router()
const { admin, protect } = require('../middleware/Auth')

router.get('/', protect, admin, departmentController.getAll)
router.delete('/:id', protect, admin, departmentController.delete)
router.get('/:id', protect, admin, departmentController.get)
router.put('/:id', protect, admin, departmentController.update)
router.post('/', protect, admin, departmentController.add)

module.exports = router
