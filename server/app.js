const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routers (import these once your route files exist)
// const authRouter = require("./routers/authRouter");
// const questionRouter = require("./routers/questionRouter");
// const scoreRouter = require("./routers/scoreRouter");

// Mount routers
// app.use("/auth", authRouter);
// app.use("/questions", questionRouter);
// app.use("/scores", scoreRouter);

// Health check route - useful for testing the server is running
app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

module.exports = app;