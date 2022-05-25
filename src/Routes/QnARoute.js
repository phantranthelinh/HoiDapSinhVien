const express = require('express');

const router = express.Router();

const QnAController =require('../Controller/QnAController');
router.get("/", QnAController.getAll);
router.post("/", QnAController.add);

module.exports = router