const express = require("express");
const router = express.Router();
const { getQuestions, submitQuiz } = require("../controllers/gameController");

router.get("/questions/:subjectId", getQuestions);
router.post("/submit", submitQuiz);
module.exports = router;
