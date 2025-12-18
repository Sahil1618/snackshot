// create server
const express = require("express");
const cookierParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");

const app = express();

// middlewares
app.use(cookierParser());
app.use(express.json());

// root route
app.get("/", (req, res) => {
  res.send("Welcome to snackshot");
});

// secured routes
app.use("/api/auth", authRoutes);

module.exports = app;
