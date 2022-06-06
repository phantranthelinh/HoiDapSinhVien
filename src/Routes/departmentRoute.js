const express = require('express')
const departmentController = require('../Controller/departmentController')
const router = express.Router()
const { admin, protect } = require('../middleware/Auth')

router.delete('/:id', admin, protect, departmentController.delete)
router.get('/:id', admin, protect, departmentController.get)
router.put('/:id', admin, protect, departmentController.update)
router.post('/', admin, protect, departmentController.add)
router.get('/', admin, protect, departmentController.getAll)

module.exports = router
