const express = require("express");
const router = express.Router();
const { register, login, updateColourScheme } = require("../controllers/authController");
const auth = require("../middleware/auth");

router.post("/signup", register);
router.post("/login", login);
router.patch("/colour-scheme", auth, updateColourScheme);

module.exports = router;
