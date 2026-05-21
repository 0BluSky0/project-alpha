const express = require("express");
const router = express.Router();
const { getAll } = require("../controllers/subjectController");

router.get("/", getAll);

module.exports = router;