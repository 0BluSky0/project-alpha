const express = require("express");
const router = express.Router();
const { getLeaderboard, getDashboard } = require("../controllers/scoreController");

router.get("/leaderboard", getLeaderboard);
router.get("/dashboard", getDashboard);
module.exports = router;
