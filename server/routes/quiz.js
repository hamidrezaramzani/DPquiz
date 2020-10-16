const express = require('express');
const { addQuiz } = require('../controllers/quiz');
const router = express.Router();

router.post("/add-quiz", addQuiz);

module.exports = router;