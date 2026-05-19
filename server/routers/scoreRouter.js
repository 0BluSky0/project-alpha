const express = require("express");
const router = express.Router();
const { getLeaderboard, getDashboard } = require("../controllers/scoreController");
const auth = require("../middleware/auth");

router.get("/leaderboard", getLeaderboard);
router.get("/dashboard", auth, getDashboard);
module.exports = router;
