const express = require('express')
const departmentController = require('../Controller/departmentController')
const router = express.Router()

router.post('/', departmentController.add)

module.exports = router
