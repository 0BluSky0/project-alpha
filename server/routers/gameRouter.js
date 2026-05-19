const express = require("express");
const router = express.Router();
const { getQuestions, submitQuiz } = require("../controllers/gameController");
// const auth = require("../middleware/auth");

// router.get("/questions/:subjectId", auth, getQuestions);
// router.post("/submit", auth, submitQuiz);
// module.exports = router;

router.get("/questions/:subjectId", getQuestions);
router.post("/submit", submitQuiz);
module.exports = router;
