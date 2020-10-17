const express = require('express');
const { addQuiz , listQuiz } = require('../controllers/quiz');
const router = express.Router();

router.post("/add-quiz", addQuiz);
router.get("/list", listQuiz);

module.exports = router;