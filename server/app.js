const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());


const authRouter = require("./routers/authRouter");
const gameRouter = require("./routers/gameRouter");
const scoreRouter = require("./routers/scoreRouter");
const subjectRouter = require("./routers/subjectRouter");

app.use ("/auth", authRouter);
app.use("/game", gameRouter);
app.use("/scores", scoreRouter);
app.use("/subjects", subjectRouter);




app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

module.exports = app;