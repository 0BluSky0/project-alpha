const express = require("express");
const router = rxpress.Router();
const {"getQuestions": getQuestions};

router.get("/questions", getQuestions);
router.post("/answer", submitAnswer);
module.exports = router;
