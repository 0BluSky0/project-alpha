const express = require("express");
const router = express.Router();
const { getQuestions, submitAnswer } = require("../controllers/gameController");

router.get("/questions", getQuestions);
router.post("/answer", submitAnswer);
module.exports = router;
