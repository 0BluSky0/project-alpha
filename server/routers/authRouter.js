const express = require("express");
const router = express.Router();

router.post("/signup", (req, res) =>{
    res.json({ message: "signupstub"});
});

router.post("/login", (req, res) => {
    res.json({message: "login stub"});
});
module.exports = router;
