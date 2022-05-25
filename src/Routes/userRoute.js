const express = require('express')
const router = express.Router();
const userController = require('../Controller/userController')
router.post("/", userController.addUser);
router.post("/login", userController.login);
router.get("/:id", userController.getUser);
router.delete("/:id", userController.deleteUser);

module.exports = router